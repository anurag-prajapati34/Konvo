import socket from "@/socket/socket";
import React, {  useState } from "react";
import { useLocation } from "react-router-dom";

const MessagePage = () => {
  const state = useLocation().state;
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    socket.emit("private-message",{
        ...state,
        message
    });
  };

  console.log(state);
  return (
    <>
      <div>MessagePage</div>
      <h1>Upcomming Messages</h1>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Enter message"
      ></input>
      <button onClick={handleSendMessage}>Send</button>
    </>
  );
};

export default MessagePage;
