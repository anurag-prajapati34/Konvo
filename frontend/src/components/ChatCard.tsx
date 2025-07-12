import React, { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { getUserProfile } from "@/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { clearUnreadCount } from "@/redux/slices/chatSlice";
interface chatCardProps {
  recieverId: string;
  recieverSocketId: string;
  lastMessage: string;
  unreadCount: number;
  conversationId: string;
}
const ChatCard = ({
  recieverId,
  lastMessage,
  recieverSocketId,
  unreadCount,
  conversationId,
}: chatCardProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  );
  const [name, setName] = useState<string>("Someone");
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
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

  const handleChatClick = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/conversation/chats/mark-read`,
        {
          userId: currentUser.userId,
          conversationId,
        }
      );

      dispatch(clearUnreadCount(conversationId));

      console.log("chat read reponseis", res.data);
    } catch (error) {
      console.log("Error reading chats", error);
    }
  };

  return (
    <Link
      onClick={handleChatClick}
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
      {unreadCount > 0 ? (
        <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {unreadCount}
        </div>
      ) : (
        ""
      )}
    </Link>
  );
};

export default ChatCard;
