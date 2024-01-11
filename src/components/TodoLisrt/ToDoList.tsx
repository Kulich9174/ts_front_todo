import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Style from './ToDoList.module.css';
import { RootState } from '../../network/store';
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskDone,deleteTask } from '../../network/taskSlide';
import axios from 'axios';


const ToDoList = ()=>{  
    const navigate = useNavigate();
    const tasks = useSelector((state:RootState) => state.tasks.tasks);
    const dispatch = useDispatch();
    function NavToForm (){
        navigate('/form');
    }
    const handleCheckboxChange = async (taskId :number|string) => {
        // Найдите задачу по id
        const taskToUpdate = tasks.find(task => task.id === taskId);
        if (!taskToUpdate) return;
        try {
            const response = await axios.patch(`http://localhost:3100/api/v1/todo/${taskId}`, 
                {
                    name: taskToUpdate.name,
                    description: taskToUpdate.description,
                    isDone: !taskToUpdate.isDone, // Переключить состояние isDone
                }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.getItem('token')
                    }
                }
            );
            console.log(response.data);
            // Обновление состояния Redux после успешного запроса
            dispatch(toggleTaskDone(taskId));
        }
        catch(error)
        {
        console.log('ошибка в изменении задачки',error)
        }
    }

    // DELETE THE TASK
    async function deleteTaskForm(e: React.MouseEvent<HTMLButtonElement>, taskId:string|number) {
        e.preventDefault(); // Предотвратить перезагрузку страницы
        try {
            const taskToDelete = tasks.find(task =>task.id===taskId);
            if (!taskToDelete) return;
            const response = await axios.delete(`http://localhost:3100/api/v1/todo/${taskId}`,
            {
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token':localStorage.getItem('token'),
                }
            },)
            console.log('DELETED',response.data);
            dispatch(deleteTask(taskId)); // Обновляем состояние Redux
        }
        catch(error){
            console.log('Ошибка при удалении', error)
        }
    }

    return(
        <>
        <header className={Style.header__container}>
            <p>Logo</p>
            <Link to='/'>Выход</Link>
        </header>
        <div>
            <button onClick={NavToForm}>Добавить задачу</button>

            
            {tasks.map((task) => (
                    <div key={task.id} className={Style.task__UI}>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <input 
                            type="checkbox" 
                            checked={task.isDone} 
                            onChange={() => handleCheckboxChange(task.id)} 
                        />
                        <label>Завершена</label>
                        <button onClick={(e)=>deleteTaskForm(e,task.id)}>Удалить</button>
                </div>
        ))}
        </div>
        </>
    )
}
export default ToDoList;