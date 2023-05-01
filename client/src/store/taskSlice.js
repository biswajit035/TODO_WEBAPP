import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";

export const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
})



export const add = createAsyncThunk('task/add', async (data) => {
    const result = await fetch(`${process.env.REACT_APP_HOST}/api/task/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "token": secureLocalStorage.getItem('token')
        },
        body: JSON.stringify({
            name: data.name,
            date: data.date,
            isDone: data.isDone
        })
    });

    const json = await result.json();
    if (result.status == 201) {
        toast.success("Task added")
        return json
    }
    else {
        toast.warn(json.msg)
        return json
    }
})
export const edit = createAsyncThunk('task/add', async ({data,id}) => {
    // console.log(id);
    const result = await fetch(`${process.env.REACT_APP_HOST}/api/task/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "token": secureLocalStorage.getItem('token')
        },
        body: JSON.stringify({taskId:id,data})
    });

    const json = await result.json();
    if (result.status == 201) {
        toast.success("Task added")
        return json
    }
    else {
        toast.warn(json.msg)
        return json
    }
})
export const remove = createAsyncThunk('task/remove', async (id) => {
    const result = await fetch(`${process.env.REACT_APP_HOST}/api/task/remove`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            "token": secureLocalStorage.getItem('token')
        },
        body: JSON.stringify({id})
    });

    const json = await result.json();
    if (result.status == 201) {
        toast.success("Task DELETED")
        return json
    }
    else {
        toast.warn(json.msg)
        return json
    }
})

export const getTask = createAsyncThunk('task/getTask', async () => {
    const result = await fetch(`${process.env.REACT_APP_HOST}/api/task/fetch`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "token": secureLocalStorage.getItem('token')
        }
    });
    
    const json = await result.json();
    if (result.status == 201) {
        return json.task
    }
    else {
        toast.warn(json.msg)
        return json
    }
})



export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(add.pending, getTask.pending), (state, action) => {
                state.status = STATUSES.LOADING
            })
            .addMatcher(isAnyOf(add.fulfilled, remove.fulfilled, getTask.fulfilled), (state, action) => {
                state.data = action.payload
                state.status = STATUSES.IDLE
            })
            .addMatcher(isAnyOf(add.rejected, remove.rejected, getTask.rejected), (state, action) => {
                state.status = STATUSES.ERROR
            })
    }

})

export default taskSlice.reducer