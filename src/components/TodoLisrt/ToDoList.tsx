import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Style from './ToDoList.module.css';
import TaskForm from '../TaskForm/TaskForm';
import { RootState } from '../../network/store';
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../network/formStateReducer";


const ToDoList = ()=>{  
    const navigate = useNavigate();
    function NavToForm (){
        {navigate('/form')}
    }
    return(
        <>
        <header className={Style.header__container}>
            <p>Logo</p>
            <Link to='/'>Выход</Link>
        </header>
        <div>
            <button onClick={NavToForm}>Добавить задачу</button>
        </div>
        </>
    )
}
export default ToDoList;