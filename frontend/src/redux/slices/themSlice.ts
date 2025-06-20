import { createSlice } from "@reduxjs/toolkit";
const ThemeSlice=createSlice({
    name:"theme",
    initialState:"light",
    reducers:{
        toggleTheme:(state)=>{
            console.log(state);
            if(state==="light"){
                return "dark";

            }
            else{
                return "light"
            }
        }
    }
    
})
export const {toggleTheme}=ThemeSlice.actions;
export default ThemeSlice.reducer;