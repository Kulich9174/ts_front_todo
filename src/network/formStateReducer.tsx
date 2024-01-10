import { createSlice } from "@reduxjs/toolkit";

interface formState{
    value:boolean;
}
const initialState : formState = {
    value:false,
}

const formStateReducer = createSlice({
    name:'formState',
    initialState,
    reducers:{
        changeValue:(state) => {
            state.value = !state.value
        }
    }
})
export const {changeValue} = formStateReducer.actions;
export default formStateReducer.reducer;