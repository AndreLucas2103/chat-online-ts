import { SocketEffect } from "./SocketEffect"
import { ToastOneOpen } from "./ToastOneOpen"

export const AppUseEffects = () => {
    return (
        <>
            <ToastOneOpen />
            <SocketEffect />
        </>
    )
}