import React from 'react';
import Style from '../Authtorization_form/Auth.module.css';
import { Link } from 'react-router-dom';

const Registration = () =>{
    return(
        <>
            <form className={Style.container_form}>
                <div className={Style.container}>
                    <h1 className={Style.header}>Регистрация</h1>
                    <label className={Style.input}>
                        <p className={Style.label_text}>Имя</p>
                        <input type="text" name="Username" placeholder='Username' />
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Фамилия</p>
                        <input type="text" name="Second name" placeholder='Фамилия' />
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Email</p>
                        <input type="email" name="Email" placeholder='Email' />
                    </label>

                    <label className={Style.input}>
                        <p className={Style.label_text}>Password</p>
                        <input type="password" name="Password" placeholder='password'/>
                    </label>  
                    <Link to='/' className={Style.reg_link}>Есть аккаунт? Войти.</Link>
                </div>
            </form>
        </>
    )
}
export default Registration;