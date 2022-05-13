import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/reducers";
import { Chat } from "../pages/Chat";

export const AppRoute = () => {
    const { usuario } = useSelector((state: RootState) => state.usuario); // busca o usuario no redux

    return (
        <Routes>
            {
                usuario.email ?
                    <>
                        <Route path="/" element={<Chat />} />
                    </>
                    :
                    <Route path="/" element={<Login />} />
            }
        </Routes>
    )
}
