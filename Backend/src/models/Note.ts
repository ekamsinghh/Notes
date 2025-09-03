import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface INote extends Document {
  title: string;
  content: string;
  user: IUser["_id"];
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true } // reference
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;