import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import transporter from "../nodemailer/nodemailer.js";
import { resetPasswordTemplate, welcomeEmailTemplate } from "../config/emailTemplates.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1day
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to PG Finder",
      html: welcomeEmailTemplate(name),
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendResetOtp=async(req,res)=>{
  const {email}=req.body;

  if(!email){
    return res.status(400).json({success:false,message:'Email is required'})
  }

  try {
    const user=await userModel.findOne({email});
    if(!user){
      return res.status(404).json({success:false,message:'User not found'})
    }

    const otp=String(Math.floor(100000+ Math.random()*900000));

    user.resetOtp=otp;
    user.resetOtpExpiresAt=Date.now()+ 10 *60*1000;  
    await user.save();

    const mailOption={
      from: process.env.SMTP_USER,
      to: email,
      subject: "Reset Password OTP",

      html: resetPasswordTemplate(otp,user.name)
    }
    await transporter.sendMail(mailOption);
    return res.status(200).json({success:true,message:'OTP sent to your email'}); 
  } catch (error) {
    return res.status(500).json({success:false,message:error.message});
  }
}

export const resetPassword=async(req,res)=>{
  const {email,otp,newPassword}=req.body;
  if(!email || !otp || !newPassword){
    return res.status(400).json({success:false,message:'Email, OTP, and new Password are required'});
  }

  try {
    const user= await userModel.findOne({email});
    if(!user){
      return res.status(404).json({success:false,message:'User not found'});
    }
    if(user.resetOtp==='' || user.resetOtp!==otp){
      return res.status(401).json({success:false,message:'Invalid OTP'});
    }

    if(user.resetOtpExpiresAt<Date.now()){
      return res.status(410).json({success:false,message:'OTP expired'});
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpiresAt=0;

    await user.save();

    res.status(200).json({success:true, message:'Password has been reset successfully'});
  } catch (error) {
    return res.status(500).json({success:false,message:error.message});
  }
}

export const isAuthenticated =async(req,res)=>{
  try {
    return res.status(200).json({success:true});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
