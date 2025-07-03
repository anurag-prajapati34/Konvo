const express=require("express");
const { startConversation, getConversations } = require("../controllers/conversation-controllers");
const router=express.Router();
router.post("/start",startConversation);
router.get("/all",getConversations);


module.exports=router;