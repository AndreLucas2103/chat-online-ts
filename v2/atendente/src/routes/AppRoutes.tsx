import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom"

import { LayoutApp } from "../components/layout/LayoutApp"
import { Inicio } from "../pages/Inicio";

import { Login } from "../pages/Login"
import { RootState } from "../redux/store/reducers";

export const AppRoutes = () => {
    const { usuario } = useSelector((state: RootState) => state.usuario); // busca o usuario no redux
    
    return (
        <Routes>
            {
                !usuario.socketId ?
                    <Route path="*" element={<Login />} />
                    :
                    <Route element={<LayoutApp />} >
                        <Route path="/" element={<Inicio />} />
                    </Route>
            }
        </Routes>
    )
}