const express=require("express");
const { startConversation } = require("../controllers/conversation-controllers");
const router=express.Router();
router.post("/start",startConversation);


module.export=router;