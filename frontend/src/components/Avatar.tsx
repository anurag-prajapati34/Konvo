import React from 'react'

interface AvatarPorps{
    image:string
}
export const Avatar = ({image}:AvatarPorps) => {

  return (
    <div style={{backgroundImage:`url(${image})`, backgroundSize:"cover", backgroundPosition:"center"}} className='h-10 aspect-square rounded-full '>

    </div>
  )
}