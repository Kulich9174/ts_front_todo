import React from 'react';
import { Link } from 'react-router-dom';
const MainPage = () =>{
    return(
        <>
            main pages
            <Link to='/auth'>Зарегестрироваться</Link>
        </>
    )
}
export {MainPage};