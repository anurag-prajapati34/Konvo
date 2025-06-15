const app=require('./app');
const connectDB=require('./config/db-config')

const PORT=process.env.PORT || 3000;

connectDB();

app.get('/',(req,res)=>{
    console.log("Hello from backend!")
    res.send("Hello from backend !")
})

app.listen(PORT,()=>{
    console.log(`Server started successfully 🚀 at PORT -> ${PORT}`)
})