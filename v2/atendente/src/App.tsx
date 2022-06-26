import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

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
        }}
      />
    </>
  )
}

export default App
