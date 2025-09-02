import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserRepository{
    comparePassword(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    generateToken(user: IUser): string {
        const payload = {
            id: user._id,
            email: user.email,
        };
        return jwt.sign(payload, process.env.JWT_SECRET as string);
    }

    async createUser(data: Partial<IUser>){
        try{
            const checkUser = await User.findOne({ email: data.email });
            if(checkUser){
                throw new Error("User already exists");
            }
            const user = await User.create(data);
            return {
                ...data,
                token: this.generateToken(user)
            };
        }
        catch(err){
            throw err;
        }
    }

    async findUser(email:string,password:string){
        try{
            const user = await User.findOne({
                email: email
            });
            if(!user){
                throw new Error("User does not exist");
            }

            if(user && this.comparePassword(password,user.password)){
                return {
                    token: this.generateToken(user)
                };
            }
            else{
                throw new Error("Incorrect Password");
            }
        }
        catch(err){
            throw err;
        }
    }
}

export default UserRepository;