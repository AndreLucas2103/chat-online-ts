import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/reducers";
import { socket } from "../service/socket"
import dayjs from 'dayjs'
import { Socket } from "socket.io-client";

interface IUser {
    _id: string;
    name: string;
    avatar: string;
    email: string;
    socket_id: string;
}

interface IMessage {
    _id: string;
    to: IUser;
    text: string;
    created_at: Date;
    roomId: string;
}

interface IChatRoom {
    idUsers: IUser[];
    idChatRoom: string;
}

let idChatRoomSelecionado: string = ""

export const Chat = () => {
    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [textAreaMessage, setTextAreaMessage] = useState<string>("");
    const [userList, setUserList] = useState<IUser[]>([])
    const [chatAtivo, setChatAtivo] = useState<string>("")
    const [room, setRoom] = useState<IChatRoom | null>(null)
    const [messages, setMessages] = useState<IMessage[]>([])


    useEffect(() => {
        socket.emit("get_users", (users: IUser[]) => {
            const userNaoListado: IUser[] = []

            users.forEach(user => {
                if (user.email !== usuario.email) {
                    userNaoListado.push(user)
                }
            })

            setUserList(old => [...old, ...userNaoListado])
        })
    }, [])

    useEffect(() => {
        socket.on("new_users", (data: IUser) => {
            setUserList(old => {
                if (old.findIndex(u => u.email === data.email) === -1) {
                    return [...old, data]
                }

                return old
            })
        })

        socket.on("message", (data: any) => {
            if (data.message.roomId === idChatRoomSelecionado) {
                setMessages(old => [...old, {
                    ...data.message,
                    to: data.user
                }])
            }
        })
    }, [])

    function entrarRoom(idUser: string) {
        if (!socket) return;

        socket.emit('start_chat', {
            idUser,
        }, (data: any) => {
            idChatRoomSelecionado = data.room.idChatRoom
            setMessages(data.messages)
            setRoom(data.room)
        })
    }

    function sendMessage() {
        if (!socket) return;

        socket.emit('message', {
            message: textAreaMessage,
            idChatRoom: room?.idChatRoom,
            text: textAreaMessage
        })
        setTextAreaMessage("")
    }

    function Message({ message }: { message: IMessage }) {
        return (
            <div className="flex my-4">
                <img src={message.to.avatar} alt="" className="w-[30px] h-[30px] rounded-full mt-2" />
                <div className="ml-2 w-full bg-gray-700 p-2 rounded-lg">
                    <div className="text-sm font-semibold ">
                        <span>{message.to.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{message.to.email}</span>
                        <span className="text-xs text-gray-400 ml-2 font-normal">{dayjs(message.created_at).format("HH:mm:ss")}</span>
                    </div>
                    <div className="mt-2">
                        {message.text}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 h-screen text-white flex">

            <div className="w-[300px] border-r border-gray-700">
                <div className="w-full flex flex-col h-full">
                    <div className="flex-none"></div>
                    <div className="grow h-full overflow-y-auto mt-[20px]">

                        <ul>
                            {userList.map((user, index) => (
                                <li
                                    key={index}
                                    data-userId={user._id}
                                    data-socketId={user.socket_id}
                                    className={`px-[20px] flex h-[70px] items-center cursor-pointer
                                        ${user._id === chatAtivo ? "bg-gray-700" : ""}
                                    `}
                                    onClick={() => {
                                        entrarRoom(user._id)
                                        setChatAtivo(user._id)
                                    }}
                                >
                                    <img src={user.avatar} alt="" className="w-[30px] h-[30px] rounded-full" />
                                    <div>
                                        <p className="ml-3">{user.name}</p>
                                        <p className="text-xs ml-3 text-gray-500">{user.email}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>


                    </div>
                    <div className="flex-none border-t border-gray-700 h-[60px] flex items-center justify-center text-14px">
                        <img src={usuario.avatar} alt="" className="w-[30px] h-[30px] rounded-full" />
                        <div>
                            <p className="ml-3">{usuario.name}</p>
                            <p className="text-xs ml-3 text-gray-500">{usuario.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full flex flex-col h-full">
                    <div className="flex-none"></div>
                    <div className="grow h-full overflow-y-auto mt-[20px] p-4">

                        <div className="border-t border-gray-600 mt-[20px] p-3">
                            {
                                messages.map(message => <Message key={message._id} message={message} />)
                            }
                        </div>
                    </div>
                    <div className="flex-none flex items-center justify-center text-14px w-full p-4">
                        <textarea
                            className="w-full bg-gray-700 h-[60px] rounded-[8px] mr-[20px]"
                            onChange={e => setTextAreaMessage(e.target.value)}
                            value={textAreaMessage}
                        ></textarea>
                        <button
                            onClick={sendMessage}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}