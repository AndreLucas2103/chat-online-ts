import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast"
import { LoadingSpinnerPage } from "./components/spinner/SpinnerLoading"
import { AppRoutes } from "./routes/AppRoutes"
import { socket } from "./utils/services/socketio";

export const App = () => {
  const [socketConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  if (!socketConnected) return null

  return (
    <>

      <LoadingSpinnerPage /> {/* rodar o spinner da aplicação*/}
      <AppRoutes />
      <Toaster position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 3000,
          style: {
            color: '#fff',
            fontSize: '14px',
          },
          // Default options for specific types
          success: {
            style: {
              background: '#009900',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#cc2121',
            },
          },
        }} /> {/* Notificação toas do sistema */}
    </>
  )
}

