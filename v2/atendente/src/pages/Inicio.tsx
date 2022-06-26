import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ICallbackSocket } from "../interface/ICallbackSocket";
import { IChat } from "../interface/IChat";
import { IMensagem } from "../interface/IMensagem";
import { RootState } from "../redux/store/reducers";
import { socket } from "../service/socketio";

export const Inicio = () => {
    const { usuario } = useSelector((state: RootState) => state.usuario);

    const [filaAtendimentoChats, setFilaAtendimentoChats] = useState<IChat[]>([]);
    const [chatsEmAndamento, setChatsEmAndamento] = useState<IChat[]>([]);

    const [chatAberto, setChatAberto] = useState<IChat | null>(null);

    useEffect(() => {
        socket.on('novo_chat', (data) => {
            setFilaAtendimentoChats(old => [...old, data.chat]);
        })
    }, [])

    const entrarChat = (idChat: string) => {
        socket.emit(
            'usuario_entrar_chat',
            {
                idChat,
                idUsuario: usuario._id
            },
            (data: ICallbackSocket<{
                chat: IChat
            }>) => {
                if (data.erro) return

                setChatsEmAndamento(old => [...old, data.data.chat])
                setFilaAtendimentoChats(old => old.filter(chat => chat.idChat !== data.data.chat.idChat))
            }
        );
    }

    return (
        <div className="h-full text-white flex">
            <div className="min-w-[300px] h-full border-r border-gray-700 p-4">

                <div className="">
                    <div className="text-xs font-semibold bg-gray-900 p-2 rounded-t-md">
                        Chats em andamento
                    </div>
                    <div className="my-2">
                        <ul>
                            {
                                chatsEmAndamento.map((chat, index) => (
                                    <li
                                        key={index}
                                        className={`
                                            w-full border border-gray-700 p-2 rounded-md mt-1
                                            ${chatAberto?.idChat === chat.idChat ? 'bg-gray-700' : ''}
                                        `}
                                        onClick={() => setChatAberto(chat)}
                                    >
                                        {chat.nome}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="text-xs font-semibold bg-gray-900 p-2 rounded-t-md">
                        Fila de atendimento
                    </div>
                    <div className="my-2">
                        <ul>
                            {
                                filaAtendimentoChats.map((chat, index) => (
                                    <li
                                        key={index}
                                        className="w-full border border-gray-700 p-2 rounded-md mt-1"
                                        onClick={() => entrarChat(
                                            chat.idChat,
                                        )}
                                    >
                                        {chat.nome}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {chatAberto && <ChatMensagem chat={chatAberto} />}
        </div>
    )
}

const ChatMensagem = ({ chat }: { chat: IChat }) => {
    const { usuario } = useSelector((state: RootState) => state.usuario);

    const divRef = useRef<HTMLDivElement>(null);

    const [textMensagem, setTextMensagem] = useState<string>("")
    const [mensagens, setMensagens] = useState<IMensagem[]>([]);

    useEffect(() => {
        socket.on('nova_mensagem', (data: ICallbackSocket<{ mensagem: IMensagem }>) => {
            if(data.erro) return

            if(data.data.mensagem.idChat === chat._id) {
                setMensagens(old => [...old, data.data.mensagem])

                setTimeout(() => {
                    if (divRef.current) {
                        divRef.current.scrollTop = divRef.current.scrollHeight;
                    }
                }, 1000)
            }
        })

        return () => {
            socket.off('nova_mensagem')
        }
    }, [chat])

    useEffect(() => {
        setMensagens([])

        socket.emit('get_mensagens', {_idChat: chat._id}, (data: any) => {
            console.log(data)
        })
    }, [chat])

    function enviarMensagem() {
        if (textMensagem.length > 0) {
            socket.emit('enviar_mensagem', {
                _idChat: chat._id,
                conteudo: textMensagem,
                socketId: chat.socketId,
                idUsuario: usuario._id
            })
            setTextMensagem("")
        }
    }

    return (
        <div className="p-8 w-full">
            <div className="overflow-auto mb-4 h-[400px] space-y-2" id="messages" ref={divRef} >
                {
                    mensagens.map((mensagem, index) =>
                        mensagem.enviadaPorCliente ?
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
                            :
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

                    )
                }
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="bg-gray-400 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={textMensagem}
                    onChange={(e) => setTextMensagem(e.target.value)}
                />
                <button
                    className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-normal text-sm py-2 px-4 rounded-md"
                    onClick={() => enviarMensagem()}
                >
                    Enviar
                </button>
            </div>
        </div>
    )
}