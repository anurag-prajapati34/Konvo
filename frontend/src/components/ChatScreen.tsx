import React, { useEffect, useState } from "react";
import { RecieverInfoBar } from "./RecieverInfoBar";
import { useLocation } from "react-router-dom";
import { getUserProfile } from "../api/userApi";

const ChatScreen = () => {
  const recieverId = useLocation().state.recieverId;

  const [recieverImage, setRecieverImage] = useState<string>(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  );
  const [recieverName, setRecieverName] = useState<string>("Someone");

  useEffect(() => {
    getUserProfile(recieverId).then((userDetails) => {
      if (!userDetails) {
        alert("User not found");
      } else {
        setRecieverImage(userDetails.imageUrl);
        setRecieverName(userDetails.name);
      }
    });
  }, [recieverId]);
  return (
    <div className=" bg-gray-200 w-full">
      <RecieverInfoBar
        recieverId={recieverId}
        recieverImage={recieverImage}
        recieverName={recieverName}
      />
      <h1>{recieverName}</h1>
    </div>
  );
};

export default ChatScreen;
