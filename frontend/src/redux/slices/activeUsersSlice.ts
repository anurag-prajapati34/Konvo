import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const activeUsers=createSlice({
    name:"activeUsers",
    initialState:[],
    reducers:{
        setActiveUsers:(state,action)=>{
            console.log(action.payload)
            return action.payload;
        }
    }
})

export const {setActiveUsers}=activeUsers.actions;
export default activeUsers.reducer;