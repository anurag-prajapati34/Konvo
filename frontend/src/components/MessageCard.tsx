import React from "react";
import '../App.css'
import {timestampToDateTime} from '../utils'
interface MessageCardProps {
  message: string;
  recieverId: string;
  senderId: string;
  timestamp: number;
  userId: string;
}
const MessageCard = ({
  message,
  recieverId,
  senderId,
  timestamp,
  userId,
}: MessageCardProps) => {

    // Example usage:
  const exampleTimestamp = 1678886400000; // March 15, 2023 12:00:00 PM UTC
  const {formattedLocal} = timestampToDateTime(exampleTimestamp);
  
  
  return (
    <span
      className={`${
        senderId === userId ? "sender" : "reciever"
      }  max-w-1/2 text-wrap `}
    >
      <p>{message}</p>
      <p className="text-xs text-gray-400">{formattedLocal}</p>
     
    </span>
  );
};

export default MessageCard;
