import express from "express";
import { createUser, login, verifyOTP } from "../controllers/userController";
import { createNote, updateNote, deleteNote, getNotesByUser } from "../controllers/noteController";
const router = express.Router();

router.post("/register",createUser);
router.post("/login",login);
router.post("/verify-otp", verifyOTP);

router.post("/notes/create", createNote);                    
router.post("/notes/:id", updateNote);                  
router.delete("/notes/:id", deleteNote);               
router.get("/notes/user/:userId", getNotesByUser);

export default router;