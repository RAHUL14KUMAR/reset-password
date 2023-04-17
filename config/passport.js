var JWTStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
require("dotenv").config();
var users=require('../model/user');

module.exports=function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    passport.use(
        new JWTStrategy(opts,(jwt_payload,done)=>{
            console.log(jwt_payload);
            let email=jwt_payload.email
            users.find({email:email},(err,user)=>{
                if(err){
                    return done(err,false);
                }else if(user){
                    return done(null,user);
                }else{
                    return done(null,false);
                }
            })
            
        })
    )
}