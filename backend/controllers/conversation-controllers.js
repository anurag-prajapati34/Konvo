const Conversation = require("../models/conversation-model");
const Message = require("../models/message-model");

const startConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    participants.sort();

    const conversation = await Conversation.findOne({
      participants: {$all:participants },
    });

    if (conversation) {
      console.log("Conversation already exists");
      return res.status(200).json({
        success: true,
        message: "Conversation established successfully",
        conversation: conversation,
      });
    }

    const newConverSation = new Conversation({
      participants: participants,
      createAt: Date.now(),
      updatedAt: Date.now(),
    });

    await newConverSation.save();

    return res.status(200).json({
      success: true,
      message: "Conversation established successfully",
      conversation: newConverSation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getConversations = async (req, res) => {
  try {
   
    const conversationId = req.query?.conversationId;
    console.log("conversation id is -> ", conversationId);
    if(!conversationId){
        return res.status(400).json({
            success:false,
            message:"Conversation id is required"
        })
    }
    const allConversationMessages = await Message.find({
      conversationId: conversationId,
    }).sort({ timestamp: -1 });

    return res.status(200).json({
      success: true,
      message: "Conversation found successfully",
      conversations: allConversationMessages.reverse(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addMessageToDB = async (conversationId, messageData) => {
  try {
    const { recieverId, senderId, message, timestamp } = messageData;

    console.log("message data to add in db is -> ", messageData);
    const newMessage = new Message({
      conversationId: conversationId,
      reciever: recieverId,
      sender: senderId,
      message: message,
      timestamp: timestamp,
    });

    console.log("new message is -> ", newMessage);

    await newMessage.save();

    return newMessage;
  } catch (error) {
    console.log("Error adding message to DB", error);
    return null;
  }
};

module.exports = { startConversation, getConversations, addMessageToDB };
