const mongoose = require("mongoose");
const ConverSationSchema = new mongoose.Schema({
  participants: [
    {
      type: String,
      required: true,
    },
  ],
  lastMessage: {},
  createAt: Date,
  updatedAt: Date,
});

const Conversation = mongoose.model("Conversation", ConverSationSchema);
module.exports = Conversation;
