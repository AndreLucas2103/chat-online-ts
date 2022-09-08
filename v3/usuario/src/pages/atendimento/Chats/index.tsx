import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { socket } from "@/utils/services/socketio";
import { dateString } from "components/text/formatoDate";
import { ICallbackSocket } from "interfaces/ICallbackSocket";
import { IChat } from "interfaces/IChat";
import { Link, Outlet } from "react-router-dom"
import { setChatsAndamento, setChatsFilaEspera, setChatsRecusados } from "redux/store/actions/Chat.action";
import { MenusPagina } from "../components/MenusPagina"

export const Chats = () => {
    const { chatsFilaEspera, chatsAndamento } = useAppSelector((state) => state.chat);

    return (
        <div className="flex py-10px px-20px h-full">
            <div className="w-2/12 min-w-[220px]">
                <MenusPagina />

                <section className="mt-20px ">
                    <p className="font-semibold">FIla de atendimentos</p>

                    <div className="grid gap-[6px]">
                        {
                            chatsAndamento.map((chat, index) =>
                                <ChatCardAndamento key={index} chat={chat} />
                            )
                        }
                    </div>
                </section>

                <section className="mt-20px ">
                    <div className="grid gap-[6px]">
                        {
                            chatsFilaEspera.map((chat, index) =>
                                <ChatCardAguardando key={index} chat={chat} />
                            )
                        }
                    </div>
                </section>

            </div>
            <div className="w-10/12">
                {<Outlet />}
            </div>
        </div>
    )
}

const ChatCardAguardando = ({ chat }: { chat: IChat }) => {
    const { chatsRecusados, chatsFilaEspera, chatsAndamento } = useAppSelector((state) => state.chat);
    const { usuario } = useAppSelector((state) => state.usuario);

    const dispatch = useAppDispatch();

    function recusarChat() {
        dispatch(setChatsRecusados([...chatsRecusados, chat]));
        dispatch(setChatsFilaEspera(chatsFilaEspera.filter((c) => c._id !== chat._id)));
    }

    function aceitarChat() {
        socket.emit(
            'usuario_aceitar_chat',
            {
                idChat: chat._id,
                idUsuario: usuario?._id
            },
            (callback: ICallbackSocket<any>) => {
                if (!callback.erro) {
                    dispatch(setChatsFilaEspera(chatsFilaEspera.filter((c) => c._id !== chat._id)));
                    dispatch(setChatsAndamento([...chatsAndamento, {
                        ...chat,
                        idUsuarioFila: null,
                        situacao: 2,
                    }]));
                }
            }
        )
    }

    return (
        <div
            key={chat.uuid}
            className="border-2 rounded-[14px] min-h-[80px] bg-gray-100"
        >
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-12px ml-10px">{dateString(chat.dataInicio, { format: "HH:mm" })}</span>
                </div>
                <div
                    className="text-10px text-medium px-[10px] py-[1px] bg-gray-200 rounded-bl-[14px] rounded-tr-[14px]"
                >
                    Aguardando
                </div>
            </div>
            <div
                className="flex justify-between py-[10px] px-[10px] "
            >
                <span>{chat.cliente.nome}</span>
            </div>

            <div className="px-[8px] mb-10px flex justify-center">
                <button
                    className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-blue-500"
                    type="button"
                    onClick={aceitarChat}
                >
                    <img src="https://img.icons8.com/external-becris-lineal-becris/64/1A1A1A/external-check-mintab-for-ios-becris-lineal-becris-1.png" className="w-[14px]" />
                    <span className="ml-10px">Aceitar</span>
                </button>
                <button
                    className="border py-[4px] px-10px flex items-center rounded-[14px] hover:border-red-500 ml-10px"
                    type="button"
                    onClick={recusarChat}
                >
                    <img src="https://img.icons8.com/ios-glyphs/30/1A1A1A/delete-sign.png" className="w-[14px]" />
                    <span className="ml-[4px] text-10px text-medium">{chat.segundosFila}</span>
                </button>
            </div>
        </div>
    )
}

const ChatCardAndamento = ({ chat }: { chat: IChat }) => {
    return (
        <Link
            to={`/atendimento/chats/${chat.uuid}`}
            className="border-2 rounded-[14px] min-h-[40px] bg-gray-100"
        >
            <div className="flex justify-between">
                <div>
                    <span className="text-medium text-12px ml-10px">{dateString(chat.dataInicio, { format: "HH:mm" })}</span>
                </div>
                <div
                    className="text-10px text-green-600 px-[10px] py-[1px] bg-gray-200 rounded-bl-[14px] rounded-tr-[14px]"
                >
                    Andamento
                </div>
            </div>
            <div
                className="flex justify-between py-[10px] px-[10px] "
            >
                <span>{chat.cliente.nome}</span>
            </div>
        </Link>
    )
}
