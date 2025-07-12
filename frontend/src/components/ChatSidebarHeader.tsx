import { MessageCirclePlus, MoreHorizontal } from 'lucide-react'
import React from 'react'

export const ChatSidebarHeader = () => {
  return (
    <div className='flex justify-between items-center '> 
      <h1 className='text-2xl font-bold test-start'>Konvo</h1>
      <span className='flex gap-2'>
        <MessageCirclePlus size={20}/>
        <MoreHorizontal size={20}/>
      </span>
    </div>
  )
}
