import type { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themSlice";
import { ChatSidebar } from "@/components/ChatSidebar";
import ChatScreen from "@/components/ChatScreen";
import { Outlet } from "react-router-dom";
import socket from "@/socket/socket";
import { setActiveUsers } from "@/redux/slices/activeUsersSlice";
const HomePage = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.user.userId);
  console.log("user id : ",userId);
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("userId", userId);
    });

    socket.on("active-users", (users) => {
      console.log("Active users :", users);
      dispatch(setActiveUsers(users));
    });

    return () => {
      
      socket.off("connect");
      socket.off("active-users");
    };
  }, []);

  return (
    <div className="flex ">
      <ChatSidebar />
      <Outlet />
    </div>
  );
};

export default HomePage;
