import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom";
import { chatsAguardandoRemoverTodos } from "redux/store/actions/ChatsAguardando.action";
import { chatsAndamentoSocketDesconectado } from "redux/store/actions/ChatsAndamento.action";
import { LoadingSpinnerPage } from "./components/spinner/SpinnerLoading"
import { AppRoutes } from "./routes/AppRoutes"
import { useAppDispatch } from "./utils/hooks/useRedux";
import { SocketIoProvider } from "./utils/providers/SocketIoProvider";
import { ToastProvider } from "./utils/providers/ToastProvider";
import { socket } from "./utils/services/socketio";

export const App = () => {
    const [socketConnected, setIsConnected] = useState(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.io.on("reconnect_attempt", (attempt) => {
            console.log(attempt)
        });

        socket.on('disconnect', (reason) => {
            dispatch(chatsAndamentoSocketDesconectado())
            dispatch(chatsAguardandoRemoverTodos())
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <ToastProvider> {/* Provider do toast, para avisos */}
            <LoadingSpinnerPage /> {/* rodar o spinner da aplicação*/}

            <BrowserRouter>
                <SocketIoProvider>
                    <AppRoutes />
                </SocketIoProvider>
            </BrowserRouter>

        </ToastProvider>

    )
}

