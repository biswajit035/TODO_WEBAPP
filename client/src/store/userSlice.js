import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})


export const login = createAsyncThunk('user/login', async (cred) => {
    // const result = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
    const result = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: cred.email,
            password: cred.password
        })
    });

    const json = await result.json();
    if (result.status == 201) {
        secureLocalStorage.setItem('token', json.token);
        toast.success(json.msg)
    }
    else {
        toast.warn(json.msg)
        return json
    }
})


export const signup = createAsyncThunk('user/signup', async (cred) => {
    localStorage.clear();
    // const result = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login`, {
    const result = await fetch(`http://localhost:8000/api/auth/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:cred.name,
            email: cred.email,
            password: cred.password
        })
    });

    const json = await result.json();
    if (result.status==201) {
        secureLocalStorage.setItem('token', json.token);
        toast.success(json.msg)
        
    }
    else {
        toast.warn(json.msg)
        return json
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        data:[],
        status: STATUSES.IDLE
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
            .addMatcher(isAnyOf(login.pending,signup.pending), (state, action) => {
                state.status = STATUSES.LOADING
            })
            .addMatcher(isAnyOf(login.fulfilled,signup.fulfilled), (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE
            })
            .addMatcher(isAnyOf(login.rejected,signup.rejected), (state, action) => {
                state.status = STATUSES.ERROR
            })
    }
        
})

export default userSlice.reducer