import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/reducers'
import { Link } from 'react-router-dom'

const navigation = [
    { name: 'Dashboard', href: '/', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function Header() {
    const { usuario } = useSelector((state: RootState) => state.usuario);

    return (
        <>
            <div className="w-full h-16">
                <Disclosure as="nav" className="bg-gray-900">
                    <div className="mx-auto px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-12 w-12"
                                        src="https://app.sistemasca.com/img/sca-branco.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-center">
                                    <Menu as="div" className=" relative">
                                        <div>
                                            <Menu.Button className="bg-gray-600 rounded-full flex items-center text-sm focus:ring-0">
                                                <img className="h-8 w-8 rounded-full" src={usuario.foto} alt="" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <button
                                                        className={"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"}
                                                    >
                                                        {
                                                            usuario.status === "online" ? "Ausente" : "Online"
                                                        }
                                                    </button>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <button
                                                        className={"w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"}
                                                    >
                                                        Desconectar
                                                    </button>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </div>
        </>
    )
}
