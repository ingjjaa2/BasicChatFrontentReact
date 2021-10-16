import { types } from "../types/types";



export const chatReducer = (state:any,action:any)=>{

    switch (action.type) {
        case types.usersInDB:

            return{
                ...state,
                users:[...action.payload]
            }

        case types.activeChat:

            if(state.chatActivo===action.payload){
                return state
            }

            return{
                ...state,
                chatActivo:action.payload,
                mensajes:[]
            }

        case types.addNewMessage:

            if(state.chatActivo===action.payload.de||state.chatActivo===action.payload.para){
                const _newMessages = [...state.mensajes,action.payload];
                return{
                    ...state,
                    mensajes:_newMessages
                }
            }
            return state

        case types.cargarChat:

            return {
                ...state,
                mensajes:action.payload
            }

        case types.cerrarSesion:
            
            return {
                uid:'',
                chatActivo:null, 
                usuarios:[],
                mensajes:[] 
            }


    
        default:
            return state;
    }


}