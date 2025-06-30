import { useDispatch, useSelector } from "react-redux";
import type { AppDistpatch, RootState } from "./redux/store";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUserCredentials } from "./redux/slices/authSlice";
import socket from "./socket/socket";
import { Link, NavLink, useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDistpatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogedIn = useSelector((state: RootState) => state.auth.isLogedIn);
  const [activeUsers, setActiveUsers] = useState({});
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [privateMessages,setPrivateMessages]=useState([]);
const navigate=useNavigate();
  const handleMessageSend = () => {
    socket.emit("new-message", message);
  };


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/auth/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUserCredentials(res.data.user));
        navigate('/home');

      })
      .catch((err) => {
        console.log("user error:", err);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   socket.connect();

  //   socket.on("message", (message) => {
  //     console.log("message", message);
  //     setAllMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   socket.on("active-users", (res) => {
  //     console.log("total active users are 👥", res);
  //     console.log(typeof res);
  //     setActiveUsers(res);
  //   });

  //   socket.on("private-message",(data)=>{

  //     console.log("private message ",data);
  //     setPrivateMessages((prev)=>[...prev,data]);
  //   })

  //   socket.on("connect_error", (error: Error) => {
  //     console.log("Socket connection error", error);
  //   });

  //   return () => {
  //     socket.off("active-users");
  //     socket.off("message");
  //     socket.off('private-message');
  //   };
  // }, []);

  return (
    <>
      <h1>Home page</h1>
      <h1>Hello{user ? user.name : "developer"}</h1>
      <h1>user logedIN : {isLogedIn ? "YES" : "NO"}</h1>
      {/* <h1 className="text-2xl text-green-600">Active users 🟢</h1>
      <div className="text-black">
        {Object.keys(activeUsers).map((key) => {
          return (
            <div 
            onClick={()=>
            {
              navigate('/message',{state:{
                recieverId:activeUsers[key],
                senderId:socket.id,

              }})
            }
            }
              key={key}
              className="flex items-center gap-4 mt-3 p-4 border-2 border-green-400 rounded-xl "
            >
              <div className="h-6 w-6 flex  p-4 items-center justify-center font-bold text-white text-xl rounded-full bg-green-600">
                {key[0]}
              </div>
              <h1>{activeUsers[key]}</h1>
             
            </div>
          );
        })}
      </div>

      <hr></hr>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter message"
      ></input>
      <button onClick={handleMessageSend}>Send</button>

      <h1>Upcomming Messages</h1>
      {allMessages.map((message, index) => {
        return (
          <div key={index} className="text-black">
            {message}
          </div>
        );
      })}

      <h1>Private messages</h1>
      {
                privateMessages.map((data,index)=>{
                  return (
                    <div>
                     <p className="text-green-500"> {data.message}</p>
                      by 
                      <p className="text-red-800">{data.senderId}</p>
                      </div>
                  )
                })
              } */}
    </>
  );
}

export default App;
