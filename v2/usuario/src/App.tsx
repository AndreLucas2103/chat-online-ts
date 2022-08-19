import { Toaster } from "react-hot-toast"
import { LoadingSpinnerPage } from "./components/spinner/SpinnerLoading"
import { AppRoutes } from "./routes/AppRoutes"

export const App = () => {
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