import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';

import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const {register} = useContext(AuthContext);

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        rememberme:true
    });

    const handleOnChange =(e:any)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleCheckFillForm=()=>{

        if(form.email.length>3&&form.name.length>3&&form.password.length>3){
            return true;
        }
            return false;

    }

    const handleOnSubmit =async(e:any)=>{
        e.preventDefault();

        const {name,email,password} = form;

       const resp = await register(name,email,password);

       if(!resp){
            Swal.fire('Error','Verifique los datos','error');
       }else if(resp) {
            Swal.fire('OK','User Created','success'); 
       }


    }



    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={handleOnSubmit}>
        <span className="login100-form-title mb-3">
            Chat - Registro
        </span>

        <div className="wrap-input100 validate-input mb-3">
            <input 
                className="input100" 
                type="text" 
                name="name" 
                placeholder="Nombre" 
                value={form.name}
                onChange={handleOnChange}
            />
            <span className="focus-input100"></span>
        </div>

        
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
            <div className="col text-right">
                <Link  to="/auth/login" className="txt1">
                    Ya tienes cuenta?
                </Link>
            </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
            <button className="login100-form-btn" type="submit" disabled={!handleCheckFillForm()}>
                Crear cuenta
            </button>
        </div>

    </form>
    )
}
