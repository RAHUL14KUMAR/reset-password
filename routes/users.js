const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const passport=require('passport');
require('../config/passport')(passport)
const user=require('../model/user')
// const jwt=require('jsonwebtoken');

const jwt=require('jsonwebtoken');
var jwtAuth=async(req,res,next)=>{
    var token=req.headers.authorization;
    token=token.split(' ')[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    console.log(decoded);
    req.user=await user.find({email:decoded.email}).select("-password");
    if(req.user===null){
        res.send({message:'invalid token'})
    }
    next();
    // jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
    //     if(err){
    //         res.send({message:'invalid token'})
    //     }else{
    //         next();
    //     }
    // });
}
router.route('/list')
.get(jwtAuth,userController.userList);

// router.route('/list')
// .get(passport.authenticate('jwt',{session:false}),userController.userList);

// router.route('/list')
// .get(jwtAuth,userController.userList);

router.route('/add')
.post(userController.userAdd)

router.route('/login')
.post(userController.userLogin)


router.route('/emailsend')
.post(userController.emailSend);

router.route('/changepassword')
.post(userController.changePassword)

module.exports=router;