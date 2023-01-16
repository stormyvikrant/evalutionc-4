const express= require("express")
const {connection}=require("./Config/config")
const { postRouter } = require("./routes/Post.router")
const { userRouter } = require("./routes/User.router")

const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)



app.listen(4500,async()=>{
    try {
        await connection
        console.log("Data basse running succesfully")
    } catch (error) {
        console.log(error)
    }
    console.log("run server on 4500")
})
