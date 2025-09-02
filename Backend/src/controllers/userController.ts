import { IUser } from "../models/User";
import UserRepository from "../repository/userRepository";
import { Request, Response } from "express";
const userRepo = new UserRepository();

export const createUser = async (req:Request,res:Response) => {
    try{
        const user = await userRepo.createUser(req.body);
        if(user){
            return res.status(200).json({
                success:true,
                data:user
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

export const login = async (req:Request,res:Response) => {
    try{
        const { email, password } = req.body;
        const user = await userRepo.findUser(email,password);
        if(user){
            return res.status(200).json({
                success:true,
                ...user
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