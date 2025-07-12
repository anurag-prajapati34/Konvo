import React from "react";
import "../App.css";
import { timestampToDateTime } from "../utils";
interface MessageCardProps {
  message: string;
  recieverId: string;
  senderId: string;
  timestamp: number;
  userId: string;
}
const RecieverMessageCard = ({
  message,
  recieverId,
  senderId,
  timestamp,
  userId,
}: MessageCardProps) => {
  // Example usage:
  const exampleTimestamp = 1678886400000; // March 15, 2023 12:00:00 PM UTC
  const { formattedLocal } = timestampToDateTime(exampleTimestamp);

  return (
    <span className=" flex gap-2 ">
       <span className="text-xl bg-blue-300 rounded-full p-4 h-6 w-6  flex items-center justify-center">
        A
      </span>
    
        <span className="flex flex-col gap-2 items-start">
        <span
          className={`bg-white  text-wrap  shadow-sm rounded-tl-full rounded-tr-full rounded-br-full px-4 py-1`}
        >
          <p>{message}</p>
        </span>
        <p className="text-[10px] text-gray-600">{formattedLocal}</p>
        </span>
  
     
    </span>
  );
};

export default RecieverMessageCard;
