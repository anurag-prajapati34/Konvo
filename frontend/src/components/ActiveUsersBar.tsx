import { chats } from "@/assets/data";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";
import socket from "@/socket/socket";
import type { AppDistpatch, RootState } from "@/redux/store";
import ActiveUserCard from "./ActiveUserCard";

export const ActiveUsersSidebar = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const activeUsers = useSelector((state: RootState) => state.activeUsers);

  console.log("active users form chatsidebar", activeUsers);

  const dispatch = useDispatch();

  const userId=useSelector((state:RootState)=>state.auth.user.userId);
  return (
    <div
      className={`${theme} w-1/4 h-screen border-r-[1px] border-slate-500 p-2 text-start overflow-y-scroll`}
    >
      <h1 className="text-2xl font-bold text-center">Active Users</h1>
      
      {Object.keys(activeUsers).map((id) => {
       
          if(id!==userId){
           return ( <ActiveUserCard
            key={id}
            recieverId={id}
            recieverSocketId={activeUsers[id]}
            name={"Someone"}
            image={
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            }
            messages={[]}
            lastMessage={"How are you"}
          />)
          }
          
       
      })}
    </div>
  );
};
