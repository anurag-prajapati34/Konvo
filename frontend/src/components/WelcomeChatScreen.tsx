import React from 'react'
import conversationIllustration from '../assets/Illustrations/Conversation.svg'

const WelcomeChatScreen = () => {
  return (
    <div className='m-auto'>

<div>
  <img src={conversationIllustration} alt="Start a conversation" />
  <h1 className='text-4xl font-bold'>Start a conversation</h1>
  <p>Send a message to your friend</p>
</div>

    </div>
  )
}

export default WelcomeChatScreen