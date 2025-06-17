import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface User {
  userId:string,
  name: string,
  email: string,
  imageUrl?:string,
}
interface initialStateInterface {
  user: User ;
  isLogedIn: boolean;
}
const initialState: initialStateInterface = {
  user: {
    userId: "",
    name: "",
    email: "",
    imageUrl: "",
  },
  isLogedIn: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      name: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      await axios
        .post(`${SERVER_URL}/api/auth/user/register`, credentials, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("User Register Response", res);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      await axios
        .post(`${SERVER_URL}/api/auth/user/login`, credentials, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("User login response", res);
        });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const {name,email,_id}=action.payload;
      state.user.userId=_id;
      state.user.name=name;
      state.user.email=email;
      state.isLogedIn = true;
    },
  },
});

export const { setUserCredentials } = authSlice.actions;
export default authSlice.reducer;
