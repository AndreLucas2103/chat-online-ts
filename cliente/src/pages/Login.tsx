import { socket } from '../service/socket';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUsuario } from '../redux/store/actions/Usuario.action';

interface ILoginFormData {
    email: string;
    name: string;
    avatar: string;
}

export const Login = () => {
    const { register, handleSubmit } = useForm<ILoginFormData>();
    const dispatch = useDispatch();

    const submitForm = ({ name, avatar, email }: ILoginFormData) => {
        socket.emit('start', {
            name,
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
            email
        });

        dispatch(setUsuario({
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gull_portrait_ca_usa.jpg/300px-Gull_portrait_ca_usa.jpg",
            email,
            name
        }))


    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitForm)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>

                            <input
                                type="text"
                                required
                                {...register("name", { required: true })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div>

                            <input
                                id="email-address"
                                type="email"
                                required
                                {...register("email", { required: true })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        {/* <div>

                            <input
                                id="email-address"
                                type="text"
                                required
                                {...register("avatar", { required: true })}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Avatar"
                            />
                        </div> */}
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
    )
}