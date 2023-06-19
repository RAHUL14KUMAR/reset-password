const express=require('express');
const router=express.Router();
const {userList,userAdd,userLogin,emailSend,changePassword}=require('../controllers/userController');
const passport=require('passport');
require('../config/passport')(passport)
const user=require('../model/user')


var multer=require('multer')
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname)
    }
})
var upload=multer({storage:storage});

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
.get(jwtAuth,userList);

// router.route('/list')
// .get(passport.authenticate('jwt',{session:false}),userController.userList);

// router.route('/list')
// .get(jwtAuth,userController.userList);

router.route('/add')
.post(upload.single('files'),userAdd)

router.route('/login')
.post(userLogin)


router.route('/emailsend')
.post(emailSend);

router.route('/changepassword')
.post(changePassword)

module.exports=router;