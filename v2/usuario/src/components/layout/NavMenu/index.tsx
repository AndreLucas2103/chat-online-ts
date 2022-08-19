import { Link } from "react-router-dom"
import { useAppSelector } from "../../../utils/hooks/useRedux"
import { IMenu, menus } from "./menus"

export const NavMenu = () => {
    return (
        <nav className="h-full bg-blue-600 rounded-[20px] py-20px flex justify-center w-full">

            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-center mb-10px">
                    <div>
                        <img src="https://img.icons8.com/ios/50/FFFFFF/react-native--v1.png" className="w-[30px]" />
                    </div>
                </div>
                <div
                    className="flex items-center justify-center overflow-y-auto  overflow-x-hidden scrollbar-navMenu"
                >
                    <div className="h-full flex flex-col ">
                        {
                            menus.map((menu, index) =>
                                menu.titulo === "Chats" ?
                                    <MenuChats
                                        key={index}
                                        menu={menu}
                                    />
                                    :
                                    <Link
                                        key={index}
                                        to={menu.url}
                                        className="static min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
                                    >
                                        {menu.icone}
                                    </Link>

                            )
                        }
                    </div>
                </div>
                <div className="flex justify-center mt-10px">
                    <div>
                        <img src="https://img.icons8.com/ios-filled/50/FFFFFF/settings.png" className="w-[20px]" />
                    </div>
                </div>
            </div>

        </nav>
    )
}

const MenuChats = ({ menu }: { menu: IMenu }) => {

    const chatsAndamento = useAppSelector(state => state.chat.chatsAndamento)
    const chatsFila = useAppSelector(state => state.chat.chatsFIlaEspera)

    const chatComMensagem = chatsAndamento.find(chat => chat.novaMensagem !== 0)

    return (
        <Link
            to={menu.url}
            className="static min-h-[36px] bg-blue-500 flex items-center min-w-[36px] justify-center rounded-[14px] mt-10px hover:bg-blue-700"
        >
            {menu.icone}
            {
                chatComMensagem || chatsFila.length > 0 ?
                    <span className="fixed inline-flex rounded-full h-3 w-3 bg-red-600 mb-[26px] ml-[26px]" />
                    : null
            }
        </Link>
    )
}