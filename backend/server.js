const app = require("./app");
const connectDB = require("./config/db-config");
const { createServer } = require("node:http");
const PORT = process.env.PORT || 3000;
const server = createServer(app);
const { Server } = require("socket.io");
const socketHandler = require("./socket/socket");
const { addMessageToDB } = require("./controllers/conversation-controllers");
connectDB();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socketHandler(io);
/** -------------websocket logic */

const activeUsers = {};

io.on("connection", (socket) => {
  const socketId = socket.id;
  socket.join(socketId);
  console.log("Someone Connected 🤝 -> ", socketId);

  let id;
  socket.on("userId", (userId) => {
    activeUsers[userId] = socketId;
    id = userId;
    io.emit("active-users", activeUsers);
  });

  socket.on("chat-message", async (data) => {
    const { recieverId, senderId, message, timestamp, conversationId } = data;
    // console.log("chat message data is ", {
    //   recieverId,
    //   senderId,
    //   message,
    //   timestamp,
    //   conversationId,
    // });
   
    // console.log("active users are ", activeUsers);
    const newMessage = await addMessageToDB(conversationId, data);

    console.log("new message is ", newMessage);
    const recieverSocketId = activeUsers[recieverId];

    console.log("reciever socket id is ", recieverSocketId);
    
   
    const senderSocketId = activeUsers[senderId];
    console.log("sender socket id is ", senderSocketId);
    io.to(recieverSocketId).emit("chat-message", newMessage);
    io.to(senderSocketId).emit("chat-message-sender", newMessage);
  });

  // socket.on('new-message',(message)=>{
  //     io.emit('message',message)
  // })
  // socket.on("private-message",(data)=>{
  //     console.log("private message data : ",data)
  //     const {recieverId,senderId,message}=data;
  //     io.to(recieverId).emit('private-message',data)
  // })
  socket.on("disconnect", () => {
    delete activeUsers[id];
    console.log(" Disconnected -> ❌", socketId);
    io.emit("active-users", activeUsers);
  });
});

server.listen(PORT, () => {
  console.log(`Server started successfully 🚀 at PORT -> ${PORT}`);
});
