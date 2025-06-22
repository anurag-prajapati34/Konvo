import React from 'react'
import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'

interface chatCardProps{
    recieverId:string,
    name:string,
    image:string,
    messages:string[],
    lastMessage:string,
}
const ChatCard = ({recieverId,name,image,messages,lastMessage}:chatCardProps) => {


  return (
    <Link to='/chat' state={{recieverId}}  key={recieverId} className='w-full p-2 text-start hover:bg-gray-200  rounded-md cursor-pointer flex gap-2'>
        <Avatar image={image}/>
        <div className='flex-1'>
          <h1 className='font-semibold '>{name}</h1>
        {lastMessage}
        </div>
        
    </Link>
  )
}

export default ChatCard