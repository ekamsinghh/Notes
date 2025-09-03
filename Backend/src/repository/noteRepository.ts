import Note, { INote } from "../models/Note";

class NoteRepository {

  async createNote(data: Partial<INote>): Promise<INote> {
    try {
      const note = await Note.create(data);
      return note;
    }
    catch (err) {
      throw new Error("Error creating note");
    }
  }

  async updateNote(noteId: string, data: Partial<INote>): Promise<INote | null> {
    try {
      const note = await Note.findByIdAndUpdate(noteId, data, {
        new: true,
        runValidators: true,
      });
      return note;
    }
    catch (err) {
      throw new Error("Error updating note");
    }
  }

  async deleteNote(noteId: string): Promise<boolean> {
    try {
      const result = await Note.findByIdAndDelete(noteId);
      return result ? true : false;
    } 
    catch (err) {
      throw new Error("Error deleting note");
    }
  }

  async getNotesByUser(userId: string): Promise<INote[]> {
    try {
      const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
      return notes;
    } catch (err) {
      throw new Error("Error fetching user notes");
    }
  }
}

export default NoteRepository;
