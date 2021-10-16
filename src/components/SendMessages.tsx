import React,{useState,useContext} from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { SocketContext } from '../context/SocketContext';

export const SendMessages = () => {

    const [message, setMessage] = useState('');

    const {socket} = useContext(SocketContext);
    const {auth} = useContext(AuthContext);
    const {chatState} = useContext(ChatContext)

    const handleOnChange = (e:any)=>{
        setMessage(e.target.value)
    }

    const handleOnSubmit=(e:any)=>{
        e.preventDefault();

        if(message.length!==0){
            console.log(message);
            socket?.emit('personal-message',{
                de:auth.uid,
                para:chatState.chatActivo,
                message:message
            })
            setMessage('');
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
        <div className="type_msg row">
            <div className="input_msg_write col-sm-9">
                <input 
                    className="write_msg" 
                    type="text" 
                    placeholder="Mensaje..." 
                    value={message}
                    onChange={handleOnChange}
                />
            </div>
            <div className="col-sm-3 text-center">
                <button className="msg_send_btn mt-3" type="submit">
                    enviar
                </button>
            </div>         
        </div>
        </form>
    )
}
