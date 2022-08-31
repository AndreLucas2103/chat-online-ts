import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux"
import { socket } from "@/utils/services/socketio"
import { dateString } from "components/text/formatoDate"
import { ICliente } from "interfaces/ICliente"
import { IMensagem } from "interfaces/IMensagem"
import { IUsuario } from "interfaces/IUsuario"
import { useEffect, useRef, useState } from "react"
import parse from 'html-react-parser';
import { IChat } from "interfaces/IChat"
import { setChat } from "redux/store/actions/Chat.action"

interface IChatAtendimento extends IChat {
    usuarioAtendimento: IUsuario
}

export const Chat = () => {
    const { chat } = useAppSelector(state => state.chat)

    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('usuario_aceitar_chat', (data: { data: { chat: IChatAtendimento} }) => {
            dispatch(setChat(data.data.chat))
        })

        return () => {
            socket.off('usuario_aceitar_chat')
        }
    }, [chat])

    if (!chat) return null

    return (
        <div className="text-padrao font-normal text-normal bg-[#f1f1f1] h-screen">
            {chat.situacao === 1 && <AguardandoAtendimento />}
            {
                chat.situacao === 2 && <ChatAtendimento />
            }

        </div>
    )
}

const AguardandoAtendimento = () => {
    return (
        <section className="h-full flex items-center justify-center w-full">
            <div className=" bg-orange-200 p-20px rounded-[14px]">
                Aguarde enquanto um atendente se conecta a você.
            </div>
        </section>
    )
}

interface IMensagemSocket extends IMensagem {
    cliente: ICliente | null
    usuario: IUsuario | null
}

const ChatAtendimento = () => {
    const { chat } = useAppSelector(state => state.chat)
    const { cliente } = useAppSelector(state => state.cliente)

    const [mensagem, setMensagem] = useState("")

    const [mensagens, setMensagens] = useState<IMensagemSocket[]>([]);
    const scrollMensagemNova = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on('nova_mensagem', (mensagem: { data: { mensagem: IMensagemSocket } }) => {
            setMensagens([...mensagens, mensagem.data.mensagem])
        })

        if (scrollMensagemNova.current) {
            scrollMensagemNova.current.scrollIntoView()
        }

        return () => {
            socket.off('nova_mensagem');
        };
    }, [mensagens, chat])

    const commentEnterSubmit = (e: any) => { // enviar o text usando o enter
        if (e.key === "Enter" && e.shiftKey == false) {
            e.preventDefault()
            return enviarMensagem();
        }
    }

    const enviarMensagem = () => { // enviar mensagem para o socket
        if (mensagem.length > 0) {
            socket.emit(
                'nova_mensagem',
                {
                    idChat: chat?._id,
                    mensagem,
                    idCliente: cliente?.id,
                },
                () => {

                }
            )

            setMensagem("")
        }
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <div className="min-h-[80px] flex items-center px-20px border-b">
                <p className="text-16px font-bold">Atendimento Online</p>
            </div>
            <div
                className="flex flex-col space-y-[6px] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch p-30px w-full"
            >
                {
                    mensagens.map((mensagem, index) => (
                        mensagem.idUsuario ? (
                            <div className="flex items-end" key={index} >
                                <div className="flex flex-col space-y-2 text-12px max-w-max-w-[60%] mx-2 order-2 items-start">
                                    <div>
                                        <span className="px-4 py-2 rounded-[14px] inline-block rounded-bl-none bg-gray-300 text-gray-600">
                                            <p className="font-bold">
                                                {
                                                    mensagem.usuario?.primeiroNome
                                                }
                                                <span className="text-10px ml-10px text-medium font-normal">
                                                    {
                                                        dateString(mensagem.data, {
                                                            format: "HH:mm",
                                                        })
                                                    }
                                                </span>
                                            </p>
                                            <p className="whitespace-pre-wrap">
                                                {
                                                    formatMensagem(mensagem.mensagem)
                                                }
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                                    alt="My profile"
                                    className="w-[30px] h-[30px] rounded-full order-1"
                                />
                            </div>
                        ) : (
                            <div className="flex items-end justify-end" key={index}>
                                <div className="flex flex-col space-y-2 text-12px max-w-[60%] mx-2 order-1 items-end">
                                    <div>
                                        <span className="px-4 py-2 rounded-[14px] inline-block rounded-br-none bg-slate-600 text-white ">
                                            <p className="text-10px text-light/40 font-normal">
                                                {
                                                    dateString(mensagem.data, {
                                                        format: "HH:mm",
                                                    })
                                                }
                                            </p>
                                            <p className="whitespace-pre-wrap">
                                                {
                                                    formatMensagem(mensagem.mensagem)
                                                }
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                }
                <div ref={scrollMensagemNova} />
            </div>
            <div className="min-h-[80px] flex px-20px pt-10px border-t">
                <textarea
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    onKeyPress={commentEnterSubmit}
                    className="w-full h-[60px] border-2 border-gray-300 rounded-lg focus:ring-0 focus:border text-padrao"
                />
                <button
                    type="button"
                    className="bg-blue-500 h-[60px] p-[10px] rounded-lg mx-10px text-white"
                    onClick={enviarMensagem}
                >
                    Enviar
                </button>

            </div>
        </div>
    )
}

const formatMensagem = (mensagem: string) => {
    function linkify() {
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
        return mensagem.replace(urlRegex, function (url) {
            return '<a href="' + url + '" target="_blank" className="hover:text-blue-400 underline " >' + url + "</a>";
        });
    }

    return parse(linkify())
}