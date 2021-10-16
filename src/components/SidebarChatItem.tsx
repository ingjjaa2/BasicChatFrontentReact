import React,{useContext} from 'react'
import { scrollToBottom } from '../helpers/scrollToBottom'
import { ChatContext } from '../context/ChatContext'
import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'

export const SidebarChatItem = ({user}:any) => {

    const {dispatch,chatState} = useContext(ChatContext)

    const onClick=async()=>{
        dispatch({
            type:types.activeChat,
            payload:user.uid
        })

        // Load Previous Messages
        const resp = await fetchConToken({endpoint:`messages/${user.uid}`});
        if(resp?.ok){
            dispatch({
                type:types.cargarChat,
                payload:resp.last30
            });

            scrollToBottom('mensajes');
        }
    }

    return (
        <div className={`chat_list ${chatState.chatActivo===user.uid&&"active_chat"} `} onClick={onClick}>
            {/* active_chat */}
        <div className="chat_people">
            <div className="chat_img"> 
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
            </div>
            <div className="chat_ib">
                <h5>{user.nombre}</h5>
                {user.online?(
                    <span className="text-success">Online</span>
                ):(
                    <span className="text-danger">Offline</span>
                )}
            </div>
        </div>
        </div>
    )
}
