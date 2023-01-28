const express=require('express');
const User=require('../models/email');
//const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs');
//const bcr=require('bcrypt');
const authRouter=express.Router();
const jwt=require("jsonwebtoken");
// authRouter.get("/ok",(req,res)=>{
//     res.send("hhkjhjkjk");
// })
//signup...

authRouter.get("/auth/go",async(req,res)=>{
return res.send("heloo guys");


});
authRouter.post("/auth/signup",async(req,res)=>{
try{
    const {name,email,password}=req.body;
    const existingUser=await User.findOne({email:email });
    const existingname=await User.findOne({name:name});
    //print(password);
    if (!req.body.name) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }
      if(existingUser){
       // res.setHeader('X-Foo', 'bar');
        return res.status(400).json({
    msg:'provided email already exist'

        })
    }
    if(existingname){
    //  res.setHeader('X-Foo', 'bar')
      return res.status(400).json({
  msg:'user name already exist'

      })
  }
  // res.setHeader('X-Foo', 'bar');
  //     res.status(200).json({
  //       status: 'succes',
  //       data: req.body,
  //     })



    //var salt=bcr.genSalt(2);
    //const hashedPassword=await bcr.hash(password,8)
 const hashedPassword=await bcryptjs.hash(password,8);

let user=new User({
    name,email,password:hashedPassword
});

user=await user.save();
//response.setHeader('Content-Type', 'application/json');
res.json({user:user});//or .res.json(user);both same..
//res.send("hhbj");

}
catch(e){
  
  return res.status(500).json({//error:'hkk'
    error:e.message
   // "key":"something went wrong"
    
    });
  
  //return res.status(500).json({error:e.message});
}
});

/////////////////////signin
authRouter.post("/auth/signin",async(req,res)=>{
try{
const{email,password}=await req.body;
//print(password);
const user=await User.findOne({email});
if(!user){
return res.status(400).json({msg:"user .with this email not exist."});
}
//const isMatch=bcr.compare(password,user.password);
//function(err, res) {
// if(err) {
// return res.json({error :e.message});
// }   } );
//                                                                );
const isMatch=await bcryptjs.compare(password,user.password);

if(!isMatch){

return res.status(400).json({error:'.incorrect password.'});
}

const token=jwt.sign({id:user._id},"passwordKey");
res.json({token,...user._doc});

}
catch(e){
return res.status(500).json({//error:'hkk'
//error:e.message
"key":"something went wrong"

});
}


//making auth router public that can be access from any file
});
module.exports=authRouter;