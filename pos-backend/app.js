require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req,res)=>{
    res.json({message: "Hello from POS Server!"});
})

app.listen(PORT, () =>{
    console.log(`POS Server is listing on port ${PORT}`);
})