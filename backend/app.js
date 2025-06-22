const express =require('express');
const app=express();
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes')
const cors=require('cors')
const cookieParser=require('cookie-parser');
const authenticate = require('./middlewares/authenticate');
//middlewares

app.use(cors({
    origin:['http://localhost:5173','*'],
    credentials:true,
}));
app.use(express.json());// Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
//routes
app.get('/',authenticate,(req,res)=>{
    
    console.log("Hello from backend!")
    res.send("Hello from backend !")
})

//auth
app.use('/api/auth/user',authRoutes);
app.use('/api/user',userRoutes);

module.exports=app;