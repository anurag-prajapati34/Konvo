import { useDispatch, useSelector } from "react-redux";
import type { AppDistpatch, RootState } from "./redux/store";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { setUserCredentials } from "./redux/slices/authSlice";


function App() {
  const dispatch = useDispatch<AppDistpatch>();
  const user = useSelector((state:RootState) => state.auth.user);
  const isLogedIn=useSelector((state:RootState)=>state.auth.isLogedIn);

  console.log("user is : ", user);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/auth/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
      
        dispatch(setUserCredentials(res.data.user));
      })
      .catch((err) => {
        console.log("user error:", err);
      });
  }, [dispatch]);

  return (
    <>
      <h1>Home page</h1>
      <h1>Hello{user ? user.name : "developer"}</h1>
      <h1>user logedIN : {isLogedIn?"YES":"NO"}</h1>
    </>
  );
}

export default App;
