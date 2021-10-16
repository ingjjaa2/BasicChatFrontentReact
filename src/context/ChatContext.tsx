import React, { createContext,useReducer } from 'react'
import { chatReducer } from './chatReduces';

export const ChatContext = createContext({} as ReturnType<any>);


const initialState ={
    uid:'',
    chatActivo:null, //uid del usuario al que se le enviara mensajes
    usuarios:[], //lista de usuarios
    mensajes:[] //mensajes del chat seleccionado
}


export const ChatProvider = ({children}:any) => {
    
    
    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    
    return (
        <ChatContext.Provider value={{
            chatState,dispatch 
        }}>
            {children}
        </ChatContext.Provider>
    );
}
