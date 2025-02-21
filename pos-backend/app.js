require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors =   require("cors");
const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
    }))
app.use(express.json());  //parse incoming request in json formate
app.use(cookieParser());


//Root Endpoint
app.get("/", (req,res)=>{
    res.json({message: "Hello from POS Server!"});
})

//Other End point
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

//Global ErrorHandlers
app.use(globalErrorHandler);

//server
app.listen(PORT, () =>{
    console.log(`POS Server is listing on port ${PORT}`);
})