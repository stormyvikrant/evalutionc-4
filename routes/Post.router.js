const express=require('express');
const jwt = require('jsonwebtoken');
const { PostModel, postModel } = require('../Model/postModel');

const postRouter=express.Router()


postRouter.get("/",async(req,res)=>{

    const token=req.headers.authorization

    jwt.verify(token,"private",async(err,decode)=>{

        if(err){

            res.send("You Need to  login first")

        }else if(decode){

            const postid=decode.userID

            let posts=await PostModel.find({postID:postid})
            res.send({data:posts})
        }
    })
})

//post Method 

postRouter.post("/add",async(req,res)=>{

    const token=req.headers.authorization
    console.log(token)


        jwt.verify(token,"vikrantprajapati",async(err,decode)=>{

        if(err){
            res.send("Please login again")
        }else if(decode){
            const data=req.body
            await postModel.insertMany(data)
            res.send("Data Succesfully Added")

        }
    })
})

//Ptach Method 
postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    
    const ID=req.params.id

    const token=req.headers.authorization
    console.log(token)
    jwt.verify(token,"vikrantprajapati",async(err,decode)=>{
        if(err){
            res.send("Please login again")
        }else if(decode){
            const postID=decode.postID
            const post=await PostModel.findOne({_id:ID})
            if(postID!==post.postID){
                res.send("You are Not authorization")
            }else{
                await PostModel.findByIdAndUpdate({_id:ID},payload)
                res.send("post updated sucessfully")
            }
        }
    })
})



postRouter.delete("/delete/:id",async(req,res)=>{

    const ID=req.params.id

  const post =await PostModel.findOne({_id:ID})
    const token=req.headers.authorization
    console.log(token)
    jwt.verify(token,"vikrantprajapati",async(err,decode)=>{
        if(err){
            res.send("Please login again")
        }else if(decode){
            const postID=decode.postID
            
            if(postID!==post.postID){
                res.send("No authorization")
            }else{
                await PostModel.findByIdAndDelete({_id:ID})
                res.send({msg:"post is deleted sucessfully"})
            }


        }
    })
})






module.exports={postRouter}