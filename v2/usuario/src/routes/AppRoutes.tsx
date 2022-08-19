
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { LayoutSistema } from "../components/layout/LayoutSistema";
import { Chats } from "../pages/Chats";
import { Inicio } from "../pages/Inicio";

import { Login } from "../pages/Login";
import { useAppSelector } from "../utils/hooks/useRedux";

export const AppRoutes = () => {
    const { usuario } = useAppSelector((state) => state.usuario);

    const rotaUsuarioLogado = (
        <Route element={<LayoutSistema />} >
            <Route path="/" element={<Inicio />} />
            <Route path="/chats" element={<Chats />} />
        </Route>
    )

    return (
        <BrowserRouter>
            <Routes>
                {
                    usuario ?
                        rotaUsuarioLogado :
                        <Route path="*" element={<Login />} />
                }
            </Routes>
        </BrowserRouter>
    );
}
