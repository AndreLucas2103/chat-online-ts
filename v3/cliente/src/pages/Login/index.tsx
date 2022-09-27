import { useAppDispatch } from '@/utils/hooks/useRedux'
import { socket } from '@/utils/services/socketio'
import { toastError } from 'components/avisos/toast'
import { IChat } from 'interfaces/IChat'
import { ICliente } from 'interfaces/ICliente'
import { useForm } from 'react-hook-form'
import { setChat } from 'redux/store/actions/Chat.action'
import { setCliente } from 'redux/store/actions/Cliente.action'
import { ICallbackSocket } from '../../interfaces/ICallbackSocket'

interface ILoginFormData {
    email: string
    nome: string
}

export const Login = () => {

    const { register, handleSubmit } = useForm<ILoginFormData>();

    const dispatch = useAppDispatch();

    const onSubmitLogin = (data: ILoginFormData) => {
        socket.emit(
            'cliente_iniciar_chat',
            {
                "email": data.email,
                "nome": data.nome
            },
            (callback: ICallbackSocket<{ cliente: ICliente, chat: IChat }>) => {
                if (callback.erro) {
                    toastError(callback.erro.mensagem)
                } else {
                    dispatch(setCliente({
                        email: data.email,
                        nome: data.nome,
                        foto: callback.data.cliente.foto,
                        id: callback.data.cliente.id
                    }))
                    dispatch(setChat({
                        id: callback.data.chat.id,
                        situacao: callback.data.chat.situacao,
                        usuarioAtendimento: null,
                        uuid: callback.data.chat.uuid
                    }))
                }
            }
        )
    }

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-blue-200">
            <div className="max-w-md w-full space-y-8 bg-gray-100 p-40px rounded-[20px] ">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=500"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-medium">
                        Acessar Chat
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmitLogin)}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Endereço de e-mail"
                            />
                        </div>
                        <div>
                            <input
                                {...register("nome", { required: true })}
                                type="text"
                                autoComplete="nome"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Digite seu nome"
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Acessar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}