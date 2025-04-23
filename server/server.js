import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB  from "./db/connectDB.js";
import userRouter from "./routes/user.route.js"


dotenv.config();

const app=express();
const port=process.env.PORT || 5000;
connectDB();             

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}))

app.use('/api/auth',userRouter); 

app.listen(port,()=>{
  console.log(`Server started at port:${port}`)
})

