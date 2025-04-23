import express from 'express';
import { register, login, logout, sendResetOtp, resetPassword, isAuthenticated, getUserData } from '../controllers/user.controller.js'
import userAuth from '../middleware/userAuth.js';

const userRouter=express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.get('/is-auth',userAuth,isAuthenticated);
userRouter.post('/send-reset-otp',sendResetOtp);
userRouter.post('/reset-password',resetPassword);
userRouter.get('/data',userAuth,getUserData);

export default userRouter;