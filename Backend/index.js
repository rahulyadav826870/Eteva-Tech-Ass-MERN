const express =require("express")
const cors = require("cors");
const { connected } = require("./utils/db");
const app =express()
require('dotenv').config()

app.use(express.json())
app.use(cors({ origin: "*" }));

app.get("/",(req,res)=>{
    try {
        res.send("This is home Page")
    } catch (error) {
        
    }
})

app.listen(process.env.port, async()=>{
    try {
       await connected
        console.log(`Server is Running at ${process.env.port}`)
    } catch (error) {
        
    }
})