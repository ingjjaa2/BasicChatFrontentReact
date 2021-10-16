import React,{useContext} from 'react';
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {SidebarChatItem} from './SidebarChatItem';

export const SideBar = () => {

    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    return (
            <div className="inbox_chat">
    
                {chatState?.users
                ?.filter((user:any)=>user.uid!==auth.uid)
                ?.map((x:any,i:number)=>(<SidebarChatItem  user={x} key={i}/>))}
                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>
    
    
            </div>
    )
}
