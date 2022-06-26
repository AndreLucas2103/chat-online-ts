import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect } from 'react'

interface IModalProps { // propriedades d modal
    open: boolean; // status se o modal deve estar aberto ou não
    setOpen: (valor: boolean) => void; // se o modal deve estar aberto ou fechado
    children: ReactNode; // corpo do modal
    className?: string; // tamanho do modal, é opcional
    disableEsc?: boolean; // se o esc pode ser habilitado ou não
}

export function ModalSimples({ open, setOpen, children, className, disableEsc }: IModalProps) {

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', disableEsc ? () => { } : handleEscapeKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={() => { }}
            >
                <div className="min-h-screen px-4 text-center ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-25" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    ></span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={`${className ? className : "w-1/2"} inline-block  text-left align-middle transition-all transform bg-white shadow-lg rounded-sm`}>
                            <Dialog.Title
                                className="p-3 h-[30px]"
                            >
                                <button className="float-right text-fontes hover:text-gray-400" onClick={() => setOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </Dialog.Title>

                            <div className="pb-[10px] px-[10px]">
                                {children}
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
