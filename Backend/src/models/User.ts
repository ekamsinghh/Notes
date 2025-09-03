import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  otp: string;
  otpExpiry: Date;
  dob: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    dob: { type: Date }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;