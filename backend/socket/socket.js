module.exports=function(io){

    const activeUsers={}

    io.on('connection',(socket)=>{
        
        const socketId=socket.id;
        console.log("Someone Connected 🤝 -> ",socketId);
        activeUsers[socketId[0]]=socket.id;
        socket.emit('active-users',activeUsers);
        socket.on('disconnect',()=>{
            delete activeUsers.socketId[0];
            console.log(" Disconnected -> ❌",socketId)
            socket.emit('active-users',activeUsers);
        })
    })
}