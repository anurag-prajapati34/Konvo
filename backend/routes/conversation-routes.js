const express=require("express");
const { startConversation, getConversations, getChatList, markMessageAsRead } = require("../controllers/conversation-controllers");
const router=express.Router();
router.post("/start",startConversation);
router.get("/all",getConversations);
//get chats for current users
router.get("/chats",getChatList);
router.post("/chats/mark-read",markMessageAsRead);

module.exports=router;