const mongoose=require('mongoose');
const schema=mongoose.Schema;

const LoginSchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    profile:{
        type:String,required:true
    },
    token:{
        type:Array
    },
    
},{
    timestamps:true
})
module.exports=mongoose.model("users",LoginSchema);