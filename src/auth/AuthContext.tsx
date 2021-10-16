import React,{createContext, useState,useCallback,useContext} from 'react';
import { ChatContext } from '../context/ChatContext';
import { fetchSinToken,fetchConToken} from '../helpers/fetch';
import { types } from '../types/types';



export const AuthContext = createContext({} as ReturnType<any>);

const initialState ={
    uid:null,
    checking:true,
    logged:false,
    name:null,
    email:null
}


export const AuthProvider = ({children}:{children:any}) => {


    const [auth, setAuth] = useState(initialState);

    const {dispatch} = useContext(ChatContext);

    const login =async(email:any,password:any)=>{

        const data = {email,password}

        const resp = await fetchSinToken({endpoint:'login',data,method:'POST'});

        if(resp.ok){
            localStorage.setItem('tokenChatSimple',resp.token);
            setAuth({
                uid:resp.user.uid,
                checking:false,
                logged:true,
                name:resp.user.nombre,
                email:resp.user.email
            });
        }

        return resp.ok;
    }

    const logOut =(email:any,password:any)=>{
        localStorage.removeItem('token');
        setAuth({...initialState,checking:false});
        dispatch({type:types.cerrarSesion})
    }

    const register =async(name:any,email:any,password:any)=>{

        const data ={nombre:name,email,password};

        const resp = await fetchSinToken({endpoint:'login/new',data,method:'POST',});

        return resp.ok;
    }

    const verifyToken = useCallback(async() => {

        const token = localStorage.getItem('tokenChatSimple');

        if(!token){
            setAuth({...auth,checking:false});
        }else{
            const resp = await fetchConToken({endpoint:'login/renew'});

            if(resp.ok){
                localStorage.setItem('tokenChatSimple',resp.token);
                setAuth({
                    uid:resp.user.uid,
                    checking:false,
                    logged:true,
                    name:resp.user.nombre,
                    email:resp.user.email
                });
            }else{
                localStorage.removeItem('tokenChatSimple');
                setAuth({    uid:null,
                    checking:false,
                    logged:false,
                    name:null,
                    email:null});
            }

        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <AuthContext.Provider value={{
            auth,
            login,logOut,
            register,verifyToken,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

