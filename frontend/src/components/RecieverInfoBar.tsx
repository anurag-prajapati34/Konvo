import React from 'react'
import { Avatar } from './Avatar'

interface RecieverInfoBarProps{
    recieverId:string,
    recieverName:string,
    recieverImage:string,
    

}
export const RecieverInfoBar = ({recieverImage,recieverName,recieverId}:RecieverInfoBarProps) => {
    const isOnline=true;
  return (
    <div className='bg-white p-2 text-start flex gap-2 items-center sticky top-0'>

        <Avatar image={recieverImage}/>
        <div>
            <h1 className='font-semibold '>{recieverName}</h1>
            <p className='text-sm text-gray-400'>{isOnline?'Online':'Offline'}</p>
        </div>
    </div>
  )
}
