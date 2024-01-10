import {configureStore} from '@reduxjs/toolkit';
import formStateReducer from './formStateReducer';

export const store = configureStore ({
    reducer:{
        formState : formStateReducer,
    }
}) 
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;