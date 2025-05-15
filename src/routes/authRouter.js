import express  from "express";
import { getAllUsers, loginUser, registerUser } from "../controller/user/userController.js";
import tryCatch from "../middleware/tryCatch.js";

const authRouter = express.Router();
  authRouter.post('/register',tryCatch( registerUser));
  authRouter.post('/login', tryCatch(loginUser));
  authRouter.get('/users',tryCatch(getAllUsers))

export default authRouter;