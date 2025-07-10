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
    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation id is required",
      });
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

    await Conversation.updateOne({
      _id:conversationId
    },{
      $set:{lastMessage:newMessage,updatedAt:Date.now()}
    })
    console.log("new message is -> ", newMessage);

    await newMessage.save();

    return newMessage;
  } catch (error) {
    console.log("Error adding message to DB", error);
    return null;
  }
};


const getChatList = async (req, res) => {
  console.log("fetchign chat list", req.query.userId);
  try {
    const currentUserId = req.query.userId;
    const conversations = await Conversation.find({
      participants: currentUserId,
    }).sort({ "lastMessage.timestamp": -1 });

    const chatList = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await Message.countDocuments({
          conversationId: conv._id,
          sender: { $ne: currentUserId },
          "readBy.userId": { $ne: currentUserId },
        });

        const otherParticipants = conv.participants.filter(
          (participant) => participant !== currentUserId
        );

        return {
          conversationId: conv._id,
          participants: otherParticipants,
          lastMessage: conv.lastMessage,
          unreadCount: unreadCount,
          updatedAt: conv.updatedAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Chat list fetched successfully",
      chatList,
    });
  } catch (error) {
    console.log("error fetchign chat list", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const markMessageAsRead = async (req, res) => {
  console.log("marking message as read");
  try {
    const conversationId = req.body.conversationId;
    const currentUserId = req.body.userId;

    const messages = await Message.updateMany(
      {
        conversationId: conversationId,
        "readBy.userId": { $ne: currentUserId },
        senderId: { $ne: currentUserId },
      },
      {
        $push: { readBy: { userId: currentUserId, readAt: Date.now() } },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Messages marked as read successfully",
    });
  } catch (error) {
    console.log("error marking message as read", error);
    res.staus(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  startConversation,
  getConversations,
  addMessageToDB,
  getChatList,
  markMessageAsRead
};
