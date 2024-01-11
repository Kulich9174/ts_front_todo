import {configureStore} from '@reduxjs/toolkit';
import formStateReducer from './formStateReducer';
import tasksReducer from './taskSlide';

export const store = configureStore ({
    reducer:{
        formState : formStateReducer,
        tasks: tasksReducer,
    }
}) 
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;