import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/reducers";
import { socket } from "../service/socket";

interface User {
    _id: string;
    name: string;
    avatar: string;
    email: string;
    socket_id: string;
}

export const Chat = () => {
    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [userList, setUserList] = useState<User[]>([])

    useEffect(() => {
        socket.on("new_users", data => {
            setUserList(old => [...old, data])
        })

        socket.emit("get_users", (users: User) => {
            console.log(users)
        })
    }, [])

    return (
        <div className="bg-gray-800 h-screen text-white flex">

            <div className="w-[300px] border-r border-gray-700">
                <div className="w-full flex flex-col h-full">
                    <div className="flex-none"></div>
                    <div className="grow h-full overflow-y-auto mt-[20px]">

                        {userList.map((user, index) => (
                            <div key={index} className="px-[20px] flex h-[70px] items-center">
                                <img src={user.avatar} alt="" className="w-[30px] h-[30px] rounded-full" />
                                <div>
                                    <p className="ml-3">{user.name}</p>
                                    <p className="text-xs ml-3 text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        ))}

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
                        Mensagems
                    </div>
                    <div className="flex-none flex items-center justify-center text-14px w-full p-4">
                        <textarea name="" className="w-full bg-gray-700 h-[60px] rounded-[8px] mr-[20px]"></textarea>
                        <button>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}