import api from ".";
import { AddNote } from "../types/note-type";

type AtLeastOne<T, Keys extends keyof T = keyof T> = Keys extends keyof T
  ? Pick<T, Keys> & Partial<Omit<T, Keys>>
  : never;

type UpdateNoteData = AtLeastOne<{ text: string; checked: boolean }>;

const noteService = {
  /**
   * Get all notes from the server
   * @returns Promise<AxiosResponse<Note[]>>
   */
  async getNotes() {
    return api.get("/notes");
  },
  /**
   * Add a new note to the server
   * @param data AddNote
   * @returns Promise<AxiosResponse<Note>>
   */
  async addNotes(data: AddNote) {
    return api.post("/notes", data);
  },
  /**
   * Delete a note from the server
   * @param id number
   * @returns Promise<AxiosResponse<Note>>
   */
  async deleteNotes(id: number) {
    return api.delete(`/notes/${id}`);
  },
  /**
   * Update a note on the server
   * @param id number
   * @param data UpdateNoteData
   * @returns Promise<AxiosResponse<Note>>
   */
  async updateNotes(id: number, data: UpdateNoteData) {
    return api.patch(`/notes/${id}`, data);
  },
};

export default noteService;
