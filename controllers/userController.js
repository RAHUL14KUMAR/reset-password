const user=require('../model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

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
        if ( !email || !password) {
            res.status(301).json({message:"enter all the details"});
        }
        const login=await user.findOne({email});
        if(login){
            var match=await bcrypt.compare(password,login.password)
            if(match){
                res.status(200).json({message:"login successfully",data:login})
            }else{
                res.status(301).json({message:"error",data:"invalid password"})
            }
        }else{
            res.status(301).json({message:"error",data:"invalid email id"})
        }
    }catch(error){
        console.log(error);
    }
}
module.exports={
    userList,userAdd,userLogin
}