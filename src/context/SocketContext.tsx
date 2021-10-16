import React,{useContext,useEffect,createContext} from 'react';
import { useSocket } from '../hooks/useSockets'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './ChatContext';
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';


export const SocketContext = createContext({} as ReturnType<any>);

export const SocketProvider = ({children}:{children:any}) => {

    const { socket, online,conectSocket,disconectSocket } = useSocket('http://localhost:8080');

    const {auth} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(() => {
        if(auth.logged){
            conectSocket();
        }
    }, [auth,conectSocket])

    useEffect(() => {
        if(!auth.logged){
            disconectSocket();
        }
    }, [auth,disconectSocket])

    useEffect(() => {
        socket?.on('lista-usuarios',(usuarios:any)=>{
            dispatch({
                type:types.usersInDB,
                payload:usuarios
            })
        })
    }, [socket,dispatch])

    useEffect(() => {
        socket?.on('personal-message', (payload:any) => {
            dispatch({
                type:types.addNewMessage,
                payload
            });

            scrollToBottomAnimated('mensajes');
        });
    }, [ socket,dispatch ])

    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}
