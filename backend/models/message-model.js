const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    message: {
      text: String,
      image: String,
      file: String,
      video: String,
      audio: String,
    },
    sender: {
      type: String,
      required: true,
    },
    reciever: {
      type: String,
      required: true,
    },

    readBy: [
      {
        userId: String,
        readAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
