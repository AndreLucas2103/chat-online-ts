import { Outlet } from "react-router-dom"
import { Header } from "./Header"


export const LayoutApp = () => {
    return (
        <div className="bg-slate-800 h-screen text-white min-w-[1366px] flex flex-col">
            <Header />
            <Outlet />
        </div>
    )
}

