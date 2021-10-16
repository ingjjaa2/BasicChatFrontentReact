import { useEffect,useState,useCallback } from 'react';
import { io } from "socket.io-client";


export const useSocket = ( serverPath:string ) => {
    
    // const socket = useMemo(() => io( serverPath, {transports: ['websocket']} ), [ serverPath ] );

    const [socket, setSocket] = useState<any>(null);

    const token = localStorage.getItem('tokenChatSimple')||"";

    const conectSocket = useCallback(() => {
            const socketTemp = io( serverPath, 
            {
                transports: ['websocket'],
                autoConnect:true,
                forceNew:true,
                query:{
                    'x-token':token
                }
            });  

            setSocket(socketTemp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[serverPath],
    )

    const disconectSocket = useCallback(() => {
        socket?.disconnect();
    },[socket]);
    
    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])



    return {
        socket,
        online,
        conectSocket,
        disconectSocket
    }
}