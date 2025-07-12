import React, { useEffect, useState } from "react";
import { RecieverInfoBar } from "./RecieverInfoBar";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../api/userApi";
import socket from "@/socket/socket";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import MessageCard from "./SenderMessageCard";
import { getConversations, startConversation } from "@/api/conversationApi";
import SenderMessageCard from "./SenderMessageCard";
import RecieverMessageCard from "./RecieverMessageCard";

const ChatScreen = () => {
  const { recieverId, recieverSocketId } = useLocation().state;
  const [conversationId, setConversationId] = useState<string>();
  const userId = useSelector((state: RootState) => state.auth.user.userId);
  const [newMessage, setNewMessage] = useState("");

  const [recieverImage, setRecieverImage] = useState<string>(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  );
  const [recieverName, setRecieverName] = useState<string>("Someone");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUserProfile(recieverId).then((userDetails) => {
      if (!userDetails) {
        console.log("User not found");
      } else {
        setRecieverImage(userDetails.imageUrl);
        setRecieverName(userDetails.name);
        setMessages([]);
      }
    });
  }, [recieverId]);

  useEffect(() => {
    socket.on("chat-message", (data) => {
      const { sender } = data;

      // console.log("one message got",data);

      if (sender === recieverId || sender === userId) {
        console.log("chat message data is ", data);
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("chat-message");
    };
  }, [recieverId, userId, recieverSocketId]);

  useEffect(() => {
    //start conversation

    startConversation([userId, recieverId]).then((conversation) => {
      console.log({ conversation });
      setConversationId(conversation._id);
    });
  }, [recieverId]);

  useEffect(() => {
    if (conversationId) {
      getConversations(conversationId).then((res) => {
        console.log("All Conversations ->", res);
        setMessages(res);
      });
    }
  }, [conversationId, userId, recieverId]);

  const handleScrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleSendMessage = () => {
    socket.emit("chat-message", {
      recieverId,
      senderId: userId,
      message: newMessage,
      timestamp: Date.now(),
      conversationId,
    });

    handleScrollDown();
  };
  return (
    <div className=" bg-gray-200 w-full  flex flex-col">
      <RecieverInfoBar
        recieverId={recieverId}
        recieverImage={recieverImage}
        recieverName={recieverName}
      />
      <div className="w-full  flex-1 p-2 flex flex-col justify-between gap-4 realative">
        {/* <h1>
          socket id: {socket.id}
          {socket.disconnected ? "disconnected" : "connected"}
        </h1>
        <h1>reciver id : {recieverSocketId}</h1> */}

        <div className="w-full   flex flex-col gap-4 overflow-y-auto flex-1 ">
          {messages &&
            messages.map((msg) => (
              <div
                key={msg?.timestamp}
                className={`${
                  msg?.sender === userId ? "justify-end" : "justify-start"
                } flex w-full `}
              >
                {msg.sender === userId ? (
                  <SenderMessageCard
                    message={msg?.message}
                    recieverId={recieverId}
                    senderId={msg?.sender}
                    timestamp={msg?.timestamp}
                    userId={userId}
                  />
                ) : (
                  <RecieverMessageCard
                    message={msg?.message}
                    recieverId={recieverId}
                    senderId={msg?.sender}
                    timestamp={msg?.timestamp}
                    userId={userId}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="sticky bottom-1 px-4 py-1 ">
        <div className="flex gap-2 items-center border-[var(--primary-color)] border-1 shadow-sm rounded-full p-2 w-full m-auto   bottom-1 bg-white overflow-hidden">
          <input
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            placeholder="Type a message"
            className="flex-1 h-full outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
