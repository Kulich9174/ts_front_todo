import React, {useState} from 'react';
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
    const [taskIdNum, setTaskIdNum] = useState('');

    function NavToForm (){
        navigate('/form');
    }
    // Получение всех todo юзера
    const getAllUserTask = async () => {
        try {
            // Отправляем запрос на получение всех задач пользователя
            const response = await axios.get('http://localhost:3100/api/v1/todo', {
                headers: {
                    "Content-Type":'application/json',
                    'x-access-token': localStorage.getItem('token'),
                }
            });
            console.log('все тудушки',response.data); // Выводим полученные данные
        } catch (error) {
            console.log('Ошибка при получении задач', error);
        }
    }
    //получение по id 
    const getTaskUsingID = async (id : string) => {
        if (!id) return; // Проверяем, что ID был введен
    
        try {
            const response = await axios.get(`http://localhost:3100/api/v1/todo/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log("Задача:", response.data);
        } catch (error) {
            console.log("Ошибка при получении задачи:", error);
        }
    };

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
        <div className={Style.task__list}>
            <div className={Style.task_button}>
            <button onClick={NavToForm} className={Style.task__add_button}>Добавить задачу</button>
            </div>
            {tasks.map((task) => (
                    <div key={task.id} className={Style.task__UI}>
                        <div>
                            <h3>Задача: {task.name}</h3>
                            <p>Описание: {task.description}</p>
                            <button onClick={(e)=>deleteTaskForm(e,task.id)}>Удалить</button>
                        </div>
                        <label htmlFor=''>
                        <span>Завершена</span>
                        <input 
                            className={Style.task__input_isdone}
                            type="checkbox" 
                            checked={task.isDone} 
                            onChange={() => handleCheckboxChange(task.id)} 
                        />
                        </label>
                        
                </div>
        ))}
        <div className={Style.task_button}>
            <button onClick={getAllUserTask}  className={Style.task__add_button}>Выгрузить в консоль все тудушки юзера</button>
        </div>
        <div>
    <input 
        type="text" 
        placeholder="Введите ID задачи" 
        value={taskIdNum}
        onChange={(e) => setTaskIdNum(e.target.value)}
        />
    <button onClick={() => getTaskUsingID(taskIdNum)}>Получить задачу</button>
</div>
        </div>
        </>
    )
}
export default ToDoList;