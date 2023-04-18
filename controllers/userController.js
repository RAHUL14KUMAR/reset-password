const user=require('../model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const otp=require('../model/otp');

const generateJwt = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: "30m" });
};

const userList=async(req,res)=>{
   try{
    // console.log("this is the user",req.user);
    // const data=await user.find({});
    const data=req.user;
    if(data){
        res.status(200).json({data:data});
    }

   }catch(error){
    res.status(500).json({message:"we dont find any list"})
   }
    // res.status(200).json(data)
}
const userAdd=async(req,res)=>{

    console.log(req.file)
    const profile=(req.file)?req.file.filename:null;
    const{name,email,phone,password}=req.body;
    if (!name || !email || !password||!phone) {
        res.status(400);
        throw new Error("Enter all details");
    }
    const registered=await user.findOne({email});
    if (registered) {
        res.status(400);
        throw new Error("User already Exists");
    }
    const salt=await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(password,salt);
    let params={
        email:email,
        phone:phone
    }
    const tokenValue=jwt.sign(params , process.env.JWT_SECRET)
    const data=await user.create({
        name:name,
        email:email,
        phone:phone,
        password:hashpass,
        profile:profile,
        token:tokenValue
    });
    res.status(200).json({
        _id: data._id,
        name: data.name,
        email: data.email,
        phone:data.phone,
        token: tokenValue
    });
}
const userLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if (!email || !password) {
            res.status(301).json({message:"enter all the details"});
        }
        const login=await user.findOne({email:email});
        if(login){
                res.status(200).json({message:"login successfully",data:login})
            // }else{
            //     // res.status(301).json({message:"error",data:"invalid password"})
            // }
        }else{
            res.status(301).json({message:"error",data:"invalid email id"})
            // console.log(error);
        }
    }catch(error){
        console.log(error);
    }
}
const emailSend=async(req,res)=>{
    try{
        // const {email}=req.body;
        const data=await user.findOne({email:req.body.email});
        if(data){
            let otpcode=Math.floor((Math.random()*10000)+1);
            await otp.create({
                email:req.body.email,
                code:otpcode,
                expireIn:new Date().getTime()+300*1000
            })
            res.status(200).json({message:"check your email id"});
        }else{
            res.status(401).json({message:"emailId not exists"});
        }
    }catch(err){
        res.status(500).json({err:"we caught error from emailSend Routes"});
        // console.log(err);
    }
}
const changePassword=async(req,res)=>{
    try{
        let data=await otp.find({email:req.body.email.email,code:req.body.code});
        if(data){
            let currentTime=new Date().getTime();
            let diff=data.expireIn-currentTime;
            if(diff<0){
                res.status(500).json({message:"token expired"})
            }else{
                let users=await user.findOne({email:req.body.email.email})
                users.password=req.body.password;
                users.save();
                res.status(200).json({message:"passowrd change"})
            }
        }else{
            res.status(401).json({messsage:"error invalid otp"});
        }
    }catch(err){
        res.status(500).json({err:"we caught error from changePassword Routes"});
    }

}

const mailer=(email,otp)=>{

    var nodeMailer=require('nodemailer');
    var transporter=nodeMailer.createTransport({
        service:'gmail',
        port:587,
        secure:false,
        auth:{
            user:'APNA EMAIL ID',
            pass:'USS EMAIL ID KA PASSWORD'
        }
    });

    var mailOptions={
        from:'agrawal.r1412@gmail.com',
        to:'ram@gmail.com',
        subject:'sending email using node js',
        text:'thank u sir!'
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('email sent: ',info.response);
        }
    })
}
module.exports={
    userList,userAdd,userLogin,emailSend,changePassword
}