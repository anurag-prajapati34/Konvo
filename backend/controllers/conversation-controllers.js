const Conversation = require("../models/conversation-model");
const Message = require("../models/message-model");

const startConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    participants.sort();

    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    });

    if (conversation) {
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

const getConversation = async (req, res) => {
  try {
    const conversationId = req.query?.conversationId;
    const allConversationMessages = await Message.find({
      conversationId: conversationId,
    }).sort({ timestamp: -1 });

    return res.status(200).json({
      success: true,
      message: "Conversation found successfully",
      conversations: allConversationMessages,
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
    const newMessage = new Message({
      conversationId: conversationId,
      ...messageData,
    });

    await newMessage.save();

    return newMessage;
  } catch (error) {
    return null;
  }
};

module.exports = { startConversation, getConversation, addMessageToDB };
