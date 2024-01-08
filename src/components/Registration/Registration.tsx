import React, { useEffect, useState } from 'react';
import Style from '../Authtorization_form/Auth.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Registration = () =>{
    const [name,setName]=useState('');
    const [surname,setSurname] = useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');
    const [errorName, setErrorName]=useState('');

    const navigate = useNavigate();


    useEffect(()=>{
        console.log('имя', name);
        console.log('фамилия', surname);
        console.log('почта', email);
        console.log('пароль', password);
    },[name,surname,email,password]);

    const Registration = async (name : string,surname : string,email : string, password : string)=>{
        try{
            const response = await axios.post('http://localhost:3100/api/v1/auth/sign-up',{name,surname,email,password});
            console.log(response.data);
            if(response){
                navigate('/todo');
            }
            return response;
        }
        catch(error:any){

            console.error('Ошибка при регистрации аккаунта', error.response);
            setErrorName('Ошибка при регистрации аккаунта');
        }
    }

    function handlerSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        Registration(name, surname, email, password)
            .then((data) => console.log(data))
            .catch((e) => console.log(e));
    }
    return(
        <>
            <form className={Style.container_form}>
                <div className={Style.container}>
                    <h1 className={Style.header}>Регистрация</h1>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Имя</p>
                        <input type="text" 
                            name="Username" 
                            value={name}
                            placeholder='Username'
                            onChange={e=>{setName(e.target.value)}}/>
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Фамилия</p>
                        <input type="text" 
                            name="SurName" 
                            placeholder='Фамилия'
                            value={surname}
                            onChange={e=>{setSurname(e.target.value)}}/>
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Email</p>
                        <input type="email" 
                            name="Email" 
                            placeholder='Email'
                            value={email}
                            onChange={e=>{setEmail(e.target.value)}} />
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Password</p>
                        <input type="password" 
                            name="Password" 
                            placeholder='password'
                            value={password}
                            onChange={e=>{setPassword(e.target.value)}}/>
                    </label>
                    <div>
                        <span>{errorName}</span>
                    </div>
                    <button type='submit' onClick={e=>handlerSubmit(e)}>Зарегестрироваться</button>  
                    <Link to='/' className={Style.reg_link}>Есть аккаунт? Войти.</Link>
                </div>
            </form>
        </>
    )
}
export default Registration;