import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});



class UserRepository{

    generateToken(user: IUser): string {
        const payload = {
            id: user._id,
            email: user.email,
        };
        return jwt.sign(payload, process.env.JWT_SECRET as string);
    }

     generateOTP(){
        return crypto.randomInt(100000, 999999).toString();
    }


    async createUser(data: Partial<IUser>){
        try{
            const checkUser = await User.findOne({ email: data.email });
            if(checkUser){
                throw new Error("User already exists");
            }

            const otp = this.generateOTP();
            const otpExpiry = new Date(Date.now() + 10*60*1000);//10 minutes

            
            const user = await User.create({
                ...data,
                otp,
                otpExpiry
            });

            await transporter.sendMail({
                from: process.env.EMAIL,
                to: data.email,
                subject: "Verify your email",
                text: `Your OTP is ${otp}. It is valid for 10 minutes.`
            });

            return {...data};
        }
        catch(err){
            throw err;
        }
    }

    async findUser(email:string){
        try{
            const user = await User.findOne({
                email: email
            });

            if(!user){
                throw new Error("User does not exist");
            }

            const otp = this.generateOTP();
            const otpExpiry = new Date(Date.now() + 10*60*1000);

            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Verify your email",
                text: `Your OTP is ${otp}. It is valid for 10 minutes.`
            });

            return user;
        }
        catch(err){
            throw err;
        }
    }

    async findUserById(userId:string){
        try{
            const user = await User.findById(userId).select("-otp -otpExpiry -__v");
            return user;
        }
        catch(err){
            throw err;
        }
    }
}

export default UserRepository;