const express=require("express");
const cors=require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const app=express();

app.use(express.json());
app.use(cors());
app.use("/contacts",userRouter)

app.listen(8080,async()=>{
    await connection;
    console.log("connected to db.")
    console.log("Server is running at port 8080.")
})