const mongoose=require("mongoose")

const userSchema=mongoose.Schema({

name:String,
email:String,
password:String,
gender:String

})

const userModel=mongoose.model("userdata",userSchema)

module.exports={userModel}