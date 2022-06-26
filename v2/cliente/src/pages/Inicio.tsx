import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toastError } from "../components/avisos/toast";
import { ICallbackSocket } from "../interface/ICallbackSocket";
import { socket } from "../service/socketio";
import { IChat } from "../interface/IChat";
import { IMessage } from "../interface/IMensagem";
import { IUsuario } from "../interface/IUsuario";

export const Inicio = () => {
    const [chat, setChat] = useState<IChat>();
    const [usuario, setUsuario] = useState<IUsuario>();
    const [situacaoIniciandoChat, setSituacaoIniciandoChat] = useState<number>(1)

    useEffect(() => {
        socket.on("usuario_entrou_chat", (data) => {
            setSituacaoIniciandoChat(3)
            setUsuario(data.data.usuario)
        })
    }, [])

    const IniciarChat = () => {
        interface ILoginFormData {
            nome: string;
        }

        const { register, handleSubmit } = useForm<ILoginFormData>();

        const submitLogin = ({ nome }: ILoginFormData) => {

            socket.emit("cliente_inicar_chat", { nome }, (callback: ICallbackSocket<{ chat: IChat }>) => {
                if (callback?.erro) return toastError();

                setChat({
                    _id: callback.data.chat._id,
                    nome: callback.data.chat.nome,
                    idChat: callback.data.chat.idChat,
                    socketId: callback.data.chat.socketId,
                    status: callback.data.chat.status,
                    createdAt: callback.data.chat.createdAt,
                })

                setSituacaoIniciandoChat(2)
            });
        }

        return (
            <>
                <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-800">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">Cliente</h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitLogin)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm ">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        {...register('nome')}
                                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Nome"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Acessar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {
                situacaoIniciandoChat === 1 ?
                    <IniciarChat />
                    :
                    situacaoIniciandoChat === 2 ?
                        <div>
                            Esperando atendente
                            {chat?.idChat}
                        </div>
                        :
                        <ChatMessage chat={chat} usuario={usuario} />
            }
        </div>
    )
}

const ChatMessage = ({ chat, usuario }: { chat?: IChat, usuario?: IUsuario }) => {
    const [textMensagem, setTextMensagem] = useState<string>("")
    const [mensagens, setMensagens] = useState<IMessage[]>([]);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on('nova_mensagem', (data: ICallbackSocket<{ mensagem: IMessage }>) => {
            setMensagens(old => [...old, data.data.mensagem])

            setTimeout(() => {
                if (divRef.current) {
                    divRef.current.scrollTop = divRef.current.scrollHeight;
                }
            }, 1000)
        })
    }, [])

    function enviarMensagem() {
        if (textMensagem.length > 0) {
            socket.emit('enviar_mensagem', {
                _idChat: chat?._id,
                conteudo: textMensagem,
                enviadaPorCliente: true,
                socketId: chat?.socketId
            })
            setTextMensagem("")
        }
    }

    return (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl flex items-center">
                            <img src={usuario?.foto} alt="" className="w-8 rounded-full" />
                            <span className="text-gray-700 mr-3 ml-2">{usuario?.nome}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div id="messages" ref={divRef} className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {
                    mensagens.map((mensagem, index) =>
                        mensagem.enviadaPorCliente ?
                            <div
                                className="flex items-end justify-end"
                                key={index}
                            >
                                <div className="flex flex-col space-y-2 text-xs max-w-[80%] mx-2 order-1 items-end">
                                    <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                                            {mensagem.conteudo}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div
                                className="flex items-end"
                                key={index}
                            >
                                <div className="flex flex-col space-y-2 text-xs max-w-[80%] mx-2 order-2 items-start">
                                    <div>
                                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                            {mensagem.conteudo}
                                        </span>
                                    </div>
                                </div>
                            </div>
                    )
                }

            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <input
                        type="text"
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
                        onChange={(e) => setTextMensagem(e.target.value)}
                        value={textMensagem}
                    />
                    <button
                        type="button"
                        className="ml-2 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                        onClick={() => { enviarMensagem() }}
                    >
                        <span className="font-bold">Send</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}