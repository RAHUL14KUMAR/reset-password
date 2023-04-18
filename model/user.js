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
        type:String
    },
    password:{
        type:String
    },
    token:{
        type:Array
    },
    
},{
    timestamps:true
})
module.exports=mongoose.model("users",LoginSchema);