const mongoose=require("mongoose")

const connectionn=mongoose.connect("mongodb+srv://vikrantmodern:vikrantmodern@cluster0.vbffj.mongodb.net/socialMediaApp?retryWrites=true&w=majority")


module.exports={connectionn}