import api from ".";
import { AddNote } from "../types/note-type";

type AtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Pick<T, Keys> & Partial<Omit<T, Keys>>
  : never;

type UpdateNoteData = AtLeastOne<{ text: string; checked: boolean }>;

const noteService = {
  async getNotes() {
    return api.get("/notes");
  },
  async addNotes(data: AddNote) {
    return api.post("/notes", data);
  },
  async deleteNotes(id: number) {
    return api.delete(`/notes/${id}`);
  },
  async updateNotes(id: number, data: UpdateNoteData) {
    return api.patch(`/notes/${id}`, data);
  },
};

export default noteService;
