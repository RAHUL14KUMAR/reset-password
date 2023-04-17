const mongoose=require('mongoose');
const schema=mongoose.Schema;
const tokenSchema=new schema({
    token:{
        type:String,
        required:true
    }
})
const LoginSchema=new schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    phone:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        // required:true
    },
    token:{
        type:Array,
        // required:true
    },
    
},{
    timestamps:true
})
module.exports=mongoose.model("users",LoginSchema);