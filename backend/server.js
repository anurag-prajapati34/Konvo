const app=require('./app');;

const PORT=process.env.PORT || 3000;

app.get('/',(req,res)=>{
    console.log("Hello from backend!")
    res.send("Hello from backend !")
})

app.listen(PORT,()=>{
    console.log(`Server started successfully 🚀 at PORT -> ${PORT}`)
})