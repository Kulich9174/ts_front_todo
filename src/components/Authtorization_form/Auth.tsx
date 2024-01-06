import React from 'react';
import Style from './Auth.module.css';
import { Link } from 'react-router-dom';
const Auth = () =>{
    return(
        <>
            <form className={Style.container_form}>
                <div className={Style.container}>
                    <h1 className={Style.header}>Авторизация</h1>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Email</p>
                        <input type="email" name="Email" placeholder='Email' />
                    </label>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Password</p>
                        <input type="password" name="Password" placeholder='password'/>
                    </label>  
                    <Link to='/registration' className={Style.reg_link}>Нет аккаунта? Зарегестрироваться.</Link>
                </div>
            </form>
        </>
    )
}
export default Auth;