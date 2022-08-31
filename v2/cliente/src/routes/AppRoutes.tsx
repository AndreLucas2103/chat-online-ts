
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";



import { Login } from "pages/Login";
import { useAppSelector } from "utils/hooks/useRedux";
import { Chat } from "pages/Chat";

export const AppRoutes = () => {
    const { cliente } = useAppSelector((state) => state.cliente);

    const rotaChatIniciado = (
        <Route path="*" element={<Chat />} />
    )

    return (
        <BrowserRouter>
            <Routes>
                {
                    cliente ?
                        rotaChatIniciado :
                        <Route path="*" element={<Login />} />
                }
            </Routes>
        </BrowserRouter>
    );
}
