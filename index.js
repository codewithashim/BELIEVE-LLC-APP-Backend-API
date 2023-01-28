//console.log('hello');
const express=require('express');
const app=express();
const authRouter=require('./routes/auth');
const mongoose=require('mongoose');

//const adminRouter = require('./routes/admin');

app.use(express.json());
const Port=process.env.PORT || 3000;
app.use(authRouter);
// app.use(adminRouter);
// app.use(productRouter);
// app.use(userRouter);

//connecting to mongodb
mongoose.connect("mongodb+srv://nick:123456abc@cluster0.oijzi1e.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('sucessfully connected')
}).catch(e=>{
    console.log(e);
});




app.listen(Port,
"0.0.0.0",
    ()=>{
console.log("connected to port"+Port);
});


