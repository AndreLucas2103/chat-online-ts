import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toastError } from "../components/avisos/toast";
import { ICallbackSocket } from "../interface/ICallbackSocket";
import { IUsuario } from "../interface/IUsuario";
import { setUsuario } from "../redux/store/actions/Usuario.action";
import { socket } from "../service/socketio";

export const Login = () => {
    const dispatch = useDispatch();

    interface ILoginFormData {
        email: string;
    }

    const { register, handleSubmit } = useForm<ILoginFormData>();

    const submitLogin = ({ email }: ILoginFormData) => {
        socket.emit("usuario_login", { email }, (callback: ICallbackSocket<IUsuario>) => {
            if (callback?.erro) {
                toastError();
            } else {
                dispatch(setUsuario({
                    _id: callback.data._id,
                    email: callback.data.email,
                    socketId: callback.data.socketId,
                    nome: callback.data.nome,
                    foto: callback.data.foto,
                    status: callback.data.status,
                }));
            }
        });
    }

    return (
        <>
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-800">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">Usuario</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitLogin)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm ">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email-address"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    {...register('email')}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Acessar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
