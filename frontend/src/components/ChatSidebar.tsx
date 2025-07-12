import type { RootState } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";
import socket from "@/socket/socket";
import { setChatList } from "@/redux/slices/chatSlice";
import Search from "./Search";
import { ChatSidebarHeader } from "./ChatSidebarHeader";
const ChatSidebar = () => {
  const theme = "light";
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const chats = useSelector((state: RootState) => state.chats);
  const dispatch = useDispatch();
  const getChats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/conversation/chats`,
        { params: { userId: currentUser.userId } }
      );

      console.log("chats are ", res.data.chatList);
      dispatch(setChatList(res.data.chatList));
    } catch (error) {
      console.log("Error fetching chats", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      console.log("message get by soemone", data);

      const updatedChats = chats.map((chat) => {
        if (chat.conversationId === data.conversationId) {
          return {
            ...chat,
            lastMessage: data,
            unreadCount: chat.unreadCount + 1,
          };
        }
        return chat;
      });

      dispatch(setChatList(updatedChats));
    });

    return () => {
      socket.off("chat-message");
    };
  }, [chats]);

  if (!chats) {
    return <div>loading</div>;
  }
  return (
    <div
      className={`${theme} w-1/4 h-screen border-r-[1px] shadow-sm p-2 text-start overflow-y-scroll sticky top-0`}
    >
      <ChatSidebarHeader />
      <div className="mt-2"></div>
      <Search />
      <div className="w-full overflow-auto mt-4">
        {chats.map((chat) => {
          return (
            <ChatCard
              key={chat.conversationId}
              recieverId={chat.participants[0]}
              recieverSocketId={""}
              lastMessage={chat.lastMessage ? chat.lastMessage.message : ""}
              unreadCount={chat.unreadCount}
              conversationId={chat.conversationId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
