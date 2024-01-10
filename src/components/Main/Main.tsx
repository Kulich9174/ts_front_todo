import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Предполагается, что токен хранится в localStorage
        const token = localStorage.getItem('token');
        // Проверка наличия токена аутентификации
        if (!token) {
            // Если токен отсутствует, перенаправляем на страницу регистрации
            navigate('/registration');
        } else {
            // Выполните проверку токена на сервере или проверьте его валидность здесь
            // Если токен невалиден или пользователь не существует, перенаправляем на страницу регистрации
            // Это может быть запрос к API для верификации токена
        }
    }, [navigate]);

    return (
        <>
            <header>
                USE TO DO
            </header>
            <Link to='/auth'>Вход</Link>
        </>
    );
};

export default Main;
