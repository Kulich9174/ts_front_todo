import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RootState } from "../../network/store";

const TaskForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const formStateValue = useSelector((state: RootState) => state.formState.value);

    useEffect(() => {
        console.log(formStateValue);
        console.log(name);
        console.log(description);
    }, [name,description]);

    function handleTaskName(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    async function publishTask(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault(); // Предотвратить перезагрузку страницы
        try {
            // Подставьте ваш адрес сервера и путь к эндпоинту
            console.log(localStorage.getItem('token'));
            const response = await axios.post('http://localhost:3100/api/v1/todo', 
            {
                name: name,
                description: description,
                isDone: false // Предполагаем, что новая задача еще не выполнена
            }, 
            {headers:{
                "Content-Type":'application/json',
                'x-access-token': localStorage.getItem('token'),
            }},
            );
            console.log(response.data);
            navigate('/todo'); // Перенаправить пользователя на страницу '/todo'
        } catch (error) {
            console.error('Ошибка при публикации задачи', error);
        }
    }

    return (
        <>
            <form>
                <h1>Task Form</h1>
                <label htmlFor="taskName">
                    <span>Напишите название задачи</span>
                    <input
                        type="text"
                        id="taskName"
                        placeholder='Задача'
                        value={name}
                        onChange={handleTaskName}
                    />
                </label>

                <label htmlFor="description">
                    <span>Добавьте описание задачи</span>
                    <input
                        type="text"
                        id="description"
                        placeholder='Описание'
                        value={description}
                        onChange={handleDescription}
                    />
                </label>

                <button onClick={publishTask}>Опубликовать</button><br/>
                <Link to='/todo'>Вернутся в меню</Link>
            </form>
        </>
    );
};

export default TaskForm;
