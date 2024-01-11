import { createSlice } from "@reduxjs/toolkit";

interface Task {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
}

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ ...action.payload, isDone: false });
        },
        /*
addTask: Этот редьюсер принимает текущее состояние (state) 
и действие (action). Он добавляет новую задачу в массив tasks. 
Новая задача создается из данных, переданных в action.payload, 
с дополнительным установленным свойством isDone: false
*/
        // Можно добавить редьюсер для изменения состояния isDone
        toggleTaskDone: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.isDone = !task.isDone;
            }
        },
/*
Метод find используется для нахождения первого элемента 
в массиве, который соответствует предоставленному условию. 
В toggleTaskDone, вы хотите изменить свойство isDone 
конкретной задачи. Поэтому вам нужно сначала найти эту задачу 
в массиве, используя её id. Как только задача найдена, 
вы изменяете её свойство isDone. 
Так как state.tasks является массивом объектов, 
метод find возвращает ссылку на объект внутри массива, 
и вы можете изменить этот объект напрямую.
*/
        deleteTask:(state,action)=>{
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        }
/*
В отличие от toggleTaskDone, в deleteTask вам нужно удалить 
элемент из массива. Метод filter создаёт новый массив, 
содержащий все элементы исходного массива, которые удовлетворяют
условию, заданному в переданной функции. 
В данном случае вы хотите сохранить в массиве все задачи, 
id которых не совпадает с id удаляемой задачи. 
Это приводит к созданию нового массива без задачи, 
id которой равен action.payload.
*/
    },
},);

export const { addTask,toggleTaskDone,deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;