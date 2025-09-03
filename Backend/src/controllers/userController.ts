import User, { IUser } from "../models/User";
import UserRepository from "../repository/userRepository";
import { Request, Response } from "express";
const userRepo = new UserRepository();

export const createUser = async (req:Request,res:Response) => {
    try{
        const user = await userRepo.createUser(req.body);
        if(user){
            return res.status(200).json({
                success:true,
                data:user,
                message: "User Registered. Please verify email via OTP"
            })
        }
        return res.status(501).json({
            success: false
        })
    }
    catch(err){
        if (err instanceof Error && err.message === "User already exists") {
            return res.status(400).json({
                success: false,
                error: err.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}

export const verifyOTP = async (req:Request,res:Response) => {
    try{
        const {email, otp} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                error: "User does not exist"
            });
        }
        if(user.otp !== otp.toString()){
            return res.status(400).json({
                success: false,
                error: "Invalid OTP"
            });
        }
        if(user.otpExpiry && user.otpExpiry < new Date()){
            return res.status(400).json({
                success: false,
                error: "OTP Expired"
            });
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            token: userRepo.generateToken(user)
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: "Error validating OTP",
            message: err
        });
    }
}

export const login = async (req:Request,res:Response) => {
    try{
        const { email } = req.body;
        const user = await userRepo.findUser(email);
        
        if(user){
            return res.status(200).json({
                success:true,
                message: "OTP sent to the mail"
            });
        }
    }
    catch(err){
        if(err instanceof Error){
            if(err.message === "User does not exist" || err.message === "Incorrect Password"){
                return res.status(400).json({
                    success: false,
                    error: err.message
                });
            }
        }
        return res.status(500).json({
            success: false,
            error: err
        });
    }
}