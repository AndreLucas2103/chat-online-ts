import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useEffect } from 'react'


interface IModalConfirmacaoProps {
    open: boolean; // status se o modal deve estar aberto ou não
    setOpen: any; // se o modal deve estar aberto ou fechado
    children: ReactNode; // corpo do modal
    className?: string; // tamanho do modal, é opcional
    titulo: string; // titulo para exclusão ou cancelamento
    acaoConfirmar: any // acao para ocorrer quando clicar em SIM
}

export const ModalConfirmacao = ({ open, setOpen, children, className, titulo, acaoConfirmar }: IModalConfirmacaoProps) => {

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)

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
                        <div className={`${className ? className : "w-[400px]"} inline-block  text-left align-middle transition-all transform bg-white shadow-lg rounded-sm`}>
                        <div className="p-4 flex">
                                <div className="w-20 flex justify-center mr-3">
                                    <div>
                                        <img src="https://icon-v1.vercel.app/cancelar2.svg" alt="" />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="text-md font-semibold text-red-700 ">
                                        {titulo}
                                        <button className="float-right mt-1 text-gray-500 hover:text-red-400" onClick={() => setOpen(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        {children}
                                    </div>

                                    <div className="flex mt-4">
                                        <button
                                            type="button"
                                            className="px-3 py-1 bg-green-600 text-white rounded-[4px] text-sm"
                                            onClick={acaoConfirmar}
                                        >
                                            Sim
                                        </button>

                                        <button
                                            type="button"
                                            className="px-3 py-1 bg-gray-200 rounded-[4px] text-sm ml-2 mr-1"
                                            onClick={() => setOpen(false)}
                                        >
                                            Não
                                        </button>

                                        <button
                                            type="button"
                                            className="ml-2 button-voltar text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Voltar
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}