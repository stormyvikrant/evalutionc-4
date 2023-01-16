const express= require("express")
const { userModel } = require("../Model/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()



//get Method

userRouter.get("/",(req,res)=>{
    res.send("Welcome to my website")
})



//Post Method-->Register

userRouter.post("/register",async(req,res)=>{
// const data=req.body
const{email,name,password,gender}=req.body
try {
     bcrypt.hash(password, 5, async(err, secured_Password)=> {
        // Store hash in your password DB.
if(err){
    console.log(err)
}else{
    const userdata= new userModel({email,password:secured_Password,name,gender})
await userdata.save()
res.send("Register Succesfully")
}
    });

} catch (err) {
   console.log(err) 
}
})


//Post Method-->Login

userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body


try{
    const usercheck=await userModel.find({email})
const hased_pass=usercheck[0].password
console.log(usercheck)

if(usercheck.length>0){
    bcrypt.compare(password, hased_pass, (err, result)=> {
        // result == true
        if(result){
            const token=jwt.sign({privatepass:"vikrant123"},'vikrantprajapati')
            res.send({"msg":"Login Sucessfully","token":token})
          console.log("User Login SUcessfully")
        }else{
            res.send("Please enter valid credential")
        console.log("Please enter valid credential")
        }
    });
}
else{
    res.send ("Please enter valid credential")
}

}catch(error){
    console.log(error)
}
})


//Page



module.exports={
    userRouter
}