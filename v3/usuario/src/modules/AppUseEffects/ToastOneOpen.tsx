import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

export const ToastOneOpen = () => {
    const { toasts } = useToasterStore();
  
    useEffect(() => { // remover os toast, para que seja exibido somente 1 sempre
      toasts
        .filter((t) => t.visible) // Only consider visible toasts
        .filter((_, i) => i >= 1) // Is toast index over limit?
        .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);
  
    return null;
  }