const mongoose=require('mongoose');
const schema=mongoose.Schema;

const OTPSchema=new schema({
    email:{
        type:String,    
    },
    code:{
        type:String,
    },
    expireIn:{
        type:Number,
    }
    
},{
    timestamps:true
})
module.exports=mongoose.model("OTP",OTPSchema);