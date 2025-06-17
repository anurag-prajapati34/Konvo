import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const SERVER_URL=import.meta.env.VITE_SERVER_URL;

const initialState = {
  user: null,
  loading: false,
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
        .post(
          `${SERVER_URL}/api/auth/user/register`,
          credentials,
          {
            withCredentials: true,
          }
        )
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

  async (credentials :{email:string,password:string}, thunkAPI) => {
    try {
      await axios
        .post(
          `${SERVER_URL}/api/auth/user/login`,
          credentials,
          {
            withCredentials: true,
          }
        )
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
  reducers: {},
});

export default authSlice.reducer;
