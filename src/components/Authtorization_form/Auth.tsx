import React, { useState } from 'react';
import Style from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = () => {
    // Создаем состояния для хранения email и password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorName,setErrorName] = useState('');
    const navigate = useNavigate();

    // Функция для отправки запроса на вход в аккаунт
    const signIn = async (email : string, password : string|number) => {
        try {
            const response = await axios.post('http://localhost:3100/api/v1/auth/sign-in', { email, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            // Дополнительная логика после успешного входа
            if(response){
                navigate('/todo');
            }
        } catch (error : any) {
            // Обработка ошибок запроса
            console.error('Ошибка при входе в аккаунт', error.response);
            setErrorName('Ошибка при входе в аккаунт');
        }
    };

    // Функция для обработки отправки формы
    const Authtorization = async (event : any) => {
        event.preventDefault(); // Предотвратить стандартное поведение формы
        await signIn(email, password); // Вызвать функцию signIn с email и password
    };

    return (
        <>
            <form className={Style.container_form} onSubmit={Authtorization}>
                <div className={Style.container}>
                    <h1 className={Style.header}>Авторизация</h1>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Email</p>
                        <input 
                            type="email" 
                            name="Email" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Обновить состояние при изменении поля
                        />
                    </label>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Password</p>
                        <input 
                            type="password" 
                            name="Password" 
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Обновить состояние при изменении поля
                        />
                    </label>  
                    <div>
                        <span>{errorName}</span>
                    </div>
                    <button type="submit" onClick={e=>Authtorization(e)} >Войти</button>
                    <Link to='/registration' className={Style.reg_link}>Нет аккаунта? Зарегестрироваться.</Link>
                </div>
            </form>
        </>
    )
}

export default Auth;
