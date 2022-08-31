import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { socket } from "@/utils/services/socketio";
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom";
import { setChatsFilaEspera, setChatsRecusados } from "redux/store/actions/Chat.action";

export const SocketEffect = () => {
    const { chatsFilaEspera, chatsRecusados } = useAppSelector((state) => state.chat);

    const dispatch = useAppDispatch();

    const location = useLocation()

    console.log(location)

    useEffect(() => { // cronometro para atualizar o tempo de espera dos chats em fila
        if (chatsFilaEspera.length > 0) {

            const timer = setInterval(() => {
                const chatsAtualizados = chatsFilaEspera
                    .filter((chat) => {
                        if (chat.segundosFila < 1) { // função para enviar o chat como recusado
                            dispatch(setChatsRecusados([...chatsRecusados, chat]));
                        }

                        return chat.segundosFila > 0;
                    })
                    .map((chat) => {
                        return {
                            ...chat,
                            segundosFila: chat.segundosFila - 1
                        }
                    });

                dispatch(setChatsFilaEspera(chatsAtualizados))

            }, 1000);

            return () => clearTimeout(timer);
        }

    }, [chatsFilaEspera, chatsRecusados])

    useEffect(() => { // chats em fila, observo quando um cliente entra na fila para ser aceito
        socket.on('novo_chat', (data: any) => {
            dispatch(setChatsFilaEspera([...chatsFilaEspera, {
                cliente: {
                    email: data.data.cliente.nome,
                    foto: data.data.cliente.foto,
                    nome: data.data.cliente.nome,
                },
                _id: data.data.chat._id,
                segundosFila: 666,
                idUsuarioFila: data.data.chat.idUsuarioFila,
                situacao: data.data.chat.situacao,
                uuid: data.data.chat.uuid,
                novaMensagem: 0,
                dataInicio: data.data.chat.dataInicio,
            }]))
        })

        return () => {
            socket.off('novo_chat');
        }
    }, [chatsFilaEspera])

    useEffect(() => { // chats recusados, trato eles de enviar para o servidor novamente
        console.log(chatsRecusados)
    }, [chatsRecusados])

    useEffect(() => {
        socket.on('nova_mensagem', (data: any) => {
            console.log(data)
        })

        return () => {
            socket.off('nova_mensagem')
        }
    }, [])

    return null
}