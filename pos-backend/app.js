require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(express.json());  //parse incoming request in json formate

//Root Endpoint
app.get("/", (req,res)=>{
    res.json({message: "Hello from POS Server!"});
})

//Other End point
app.use("/api/user", require("./routes/userRoute"));

//Global ErrorHandlers
app.use(globalErrorHandler);

//server
app.listen(PORT, () =>{
    console.log(`POS Server is listing on port ${PORT}`);
})