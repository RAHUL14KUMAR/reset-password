const express=require('express');
const router=require('./routes/users');
const morgan=require('morgan');
const errorMiddleware = require("./middleware/errorMiddleware");
const connect =require('./config/db');
const passport=require("passport");
const cors=require('cors');


require('dotenv').config();

const port=3002;
const app=express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use(express.static(__dirname+'/public')); 
app.use('/images/:string', express.static(__dirname+'/public/images/'));

app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/upload',router);

app.use(errorMiddleware);
connect;
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})