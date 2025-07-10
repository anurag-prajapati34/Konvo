import React, { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { getUserProfile } from "@/api/userApi";

interface ActiveUserCardProps {
  recieverId: string;
  recieverSocketId: string;
  lastMessage: string;
}
const ActiveUserCard = ({
  recieverId,
  lastMessage,
  recieverSocketId,
}: ActiveUsersCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  );
  const [name, setName] = useState<string>("Someone");

  console.log("recieverId", recieverId);
  console.log("recieverSocketId", recieverSocketId);

  useEffect(() => {
    getUserProfile(recieverId).then((userDetails) => {
      if (!userDetails) {
        alert("User not found");
      } else {
        setImageUrl(userDetails.imageUrl);
        setName(userDetails.name);
      }
    });
  }, [recieverId]);
  return (
    <Link
     
      to="/home/chat"
      state={{ recieverId, recieverSocketId }}
      key={recieverId}
      className="w-full p-2 text-start hover:bg-gray-200  rounded-md cursor-pointer flex gap-2"
    >
      <Avatar image={imageUrl} />
      <div className="flex-1">
        <h1 className="font-semibold ">{name}</h1>
        {lastMessage}
      </div>
    </Link>
  );
};

export default ActiveUserCard;
