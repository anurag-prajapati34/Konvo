const app=require('./app');
const connectDB=require('./config/db-config')
const {createServer}=require('node:http')
const PORT=process.env.PORT || 3000;
const server=createServer(app);
const {Server}=require('socket.io')
const socketHandler=require('./socket/socket')
connectDB();
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173'],
        methods:["GET","POST"],
        credentials:true
    }
});

// socketHandler(io);
/** -------------websocket logic */

const activeUsers={}

    io.on('connection',(socket)=>{
        
        const socketId=socket.id;
        socket.join(socketId);
        console.log("Someone Connected 🤝 -> ",socketId);

        let id;
        socket.on('userId',(userId)=>{
            activeUsers[userId]=socketId;
            id=userId;
            io.emit('active-users',activeUsers);
        })
        
        socket.on("chat-message",(data)=>{
            const {recieverId,senderId,message,timestamp}=data;
            console.log("chat message data is ",{
                recieverId,
                senderId,
                message,
                timestamp
            });
            console.log({senderId,recieverId});
            console.log(activeUsers);
            const recieverSocketId=activeUsers[recieverId];
            const senderSocketId=activeUsers[senderId];

            console.log({recieverSocketId,senderSocketId})
            
            io.to(recieverSocketId).emit('chat-message',{recieverId,senderId,message,timestamp});
            io.to(senderSocketId).emit('chat-message',{recieverId,senderId,message,timestamp});
            
            
        })

        
        




        // socket.on('new-message',(message)=>{
        //     io.emit('message',message)
        // })
        // socket.on("private-message",(data)=>{
        //     console.log("private message data : ",data)
        //     const {recieverId,senderId,message}=data;
        //     io.to(recieverId).emit('private-message',data)
        // })
        socket.on('disconnect',()=>{
          
            delete activeUsers[id];
            console.log(" Disconnected -> ❌",socketId)
            io.emit('active-users',activeUsers);
        })
        
    })


server.listen(PORT,()=>{
    console.log(`Server started successfully 🚀 at PORT -> ${PORT}`)
})