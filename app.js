import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from './src/routes/authRouter.js';
import adminRouter from "./src/routes/adminRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

dotenv.config()
const app=express()


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders:["Content-Type","Authorization"]
}));
app.use(express.json())


app.use('/api/auth', authRouter); 
app.use('/api/admin', adminRouter);
app.use('/api/user',userRouter) 




mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`)
}); 









