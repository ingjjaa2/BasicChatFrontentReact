import React,{useContext} from 'react';
import {SendMessages} from './SendMessages';
import {IncomingMessages} from './IncomingMessages';
import {OutgoinMessages} from './OutgoinMessages';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../auth/AuthContext';

export const Messages = () => {

    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    const {mensajes} = chatState;
    const {uid} = auth;


    return (
        <div className="mesgs">
            <div className="msg_history" id="mensajes">
                {mensajes.map((msg:any,i:number)=>(
                msg.de!==uid
                    ?<IncomingMessages key={i} msg={msg}/>
                    :<OutgoinMessages key={i} msg={msg}/>                 
                ))}
            </div>
            <SendMessages/>
        </div>
    )
}
