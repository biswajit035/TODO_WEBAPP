import {  configureStore } from "@reduxjs/toolkit";
import userReducers from "./userSlice";
import taskReducers from "./taskSlice";



const store = configureStore({
    reducer: {
        user: userReducers,
        task: taskReducers,
    }
})

export default store;