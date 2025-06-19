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
        console.log("Someone Connected 🤝 -> ",socketId);
        activeUsers[socketId]=socket.id;
        io.emit('active-users',activeUsers);
        socket.on('new-message',(message)=>{
            io.emit('message',message)
        })
        socket.on("private-message",(data)=>{
            console.log("private message data : ",data)
            const {recieverId,senderId,message}=data;
            io.to(recieverId).emit('private-message',data)


        })
        socket.on('disconnect',()=>{
            delete activeUsers[socketId];
            console.log(" Disconnected -> ❌",socketId)
            io.emit('active-users',activeUsers);
        })
        
    })


server.listen(PORT,()=>{
    console.log(`Server started successfully 🚀 at PORT -> ${PORT}`)
})