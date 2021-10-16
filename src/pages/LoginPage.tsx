import React,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';

import Swal from 'sweetalert2';

export const LoginPage = () => {

    const [form, setForm] = useState({
        email:"",
        password:"",
        rememberme:true
    });

    useEffect(() => {
        const remembermeEmail = localStorage.getItem('email');
        if(remembermeEmail){
            setForm({...form,"email":remembermeEmail})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const {login} = useContext(AuthContext);

    const handleOnChange =(e:any)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleToggleCheck =()=>{
        setForm({...form,"rememberme":!form.rememberme});
    }

    const handleOnSubmit =async(e:any)=>{
        e.preventDefault();
        (form.rememberme)
            ?localStorage.setItem('email',form.email)
            :localStorage.removeItem('email');

        const {email,password} = form;

       const resp = await login(email,password);
    
       if(!resp){
         Swal.fire('Error','Verifique el usuario y contraseña','error');
       }


    }

    const handleOk=()=>{
        if(form.email.length>0&&form.password.length>0){
            return true
        }
            return false
    }

    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleOnSubmit}>
        <span className="login100-form-title mb-3">
            Chat - Ingreso
        </span>
        
        <div className="wrap-input100 validate-input mb-3">
            <input 
                className="input100" 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={form.email}
                onChange={handleOnChange}
            />
            <span className="focus-input100"></span>
        </div>
        
        
        <div className="wrap-input100 validate-input mb-3">
            <input 
                className="input100" 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={form.password}
                onChange={handleOnChange}
            />
            <span className="focus-input100"></span>
        </div>
        
        <div className="row mb-3">
            <div className="col" onClick={handleToggleCheck}>
                <input 
                    className="input-checkbox100" 
                    id="ckb1" 
                    type="checkbox" 
                    name="rememberme" 
                    checked={form.rememberme}
                    readOnly
                />
                <label className="label-checkbox100">
                    Recordarme
                </label>
            </div>

            <div className="col text-right">
                <Link to="/auth/register" className="txt1">
                    Nueva cuenta?
                </Link>
            </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
            <button className="login100-form-btn" type='submit' disabled={!handleOk()}>
                Ingresar
            </button>
        </div>

    </form>
    )
}
