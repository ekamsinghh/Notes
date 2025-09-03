import { Request, Response } from "express";
import NoteRepository from "../repository/noteRepository";

const noteRepo = new NoteRepository();

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "userId is required",
      });
    }

    const note = await noteRepo.createNote({ title, content, user: userId });

    return res.status(201).json({
      success: true,
      data: note,
    });
  } 
  catch (err) {
    console.error("Error creating note:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await noteRepo.updateNote(id, { title, content });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } 
  catch (err) {
    console.error("Error updating note:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await noteRepo.deleteNote(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } 
  catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};

export const getNotesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "userId is required",
      });
    }

    const notes = await noteRepo.getNotesByUser(userId);

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};
