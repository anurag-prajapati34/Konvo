
const Conversation = require("../models/conversation-model");

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
      conversation: conversation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { startConversation };
