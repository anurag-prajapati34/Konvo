const { text } = require("express");
const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    message: {
     type:String,
     required:true
    },
    sender: {
      type: String,
      required: true,
    },
    reciever: {
      type: String,
      required: true,
    },
    timestamp:{
      type:Date,
      default:Date.now
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
