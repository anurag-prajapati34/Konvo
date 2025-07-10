import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const chatSlice=createSlice({
    name:"conversations",
    initialState:[],
    reducers:{

        setChatList:(state,action)=>{
            return action.payload;
        },
        clearUnreadCount:(state,action)=>{
            const conversationId=action.payload;
            const conversation=state.find((c)=>c.conversationId===conversationId);
            if(conversation){
                conversation.unreadCount=0;
            }
        }

    }
})

export const {setChatList,clearUnreadCount}=chatSlice.actions;
export default chatSlice.reducer;