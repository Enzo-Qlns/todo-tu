import noteService from "../api/note-service";
import api from "../api";
import { AddNote, Note } from "../types/note-type";

jest.mock("../api");

describe("noteService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all notes", async () => {
    const mockResponse: Note[] = [];
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await noteService.getNotes();

    expect(api.get).toHaveBeenCalledWith("/notes");
    expect(result).toEqual(mockResponse);
  });

  it("should add a new note", async () => {
      const newNote: AddNote = { text: "New Note", checked: false, time: "12:00" };
      const mockResponse = { data: newNote };
      (api.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await noteService.addNotes(newNote);

      expect(api.post).toHaveBeenCalledWith("/notes", newNote);
      expect(result).toEqual(mockResponse);
  });

  it("should delete a note", async () => {
      const noteId = 1;
      const mockResponse = { data: {} };
      (api.delete as jest.Mock).mockResolvedValue(mockResponse);

      const result = await noteService.deleteNotes(noteId);

      expect(api.delete).toHaveBeenCalledWith(`/notes/${noteId}`);
      expect(result).toEqual(mockResponse);
  });

  it("should update a note", async () => {
      const noteId = 1;
      const updateData = { text: "Updated Note" };
      const mockResponse = { data: updateData };
      (api.patch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await noteService.updateNotes(noteId, updateData);

      expect(api.patch).toHaveBeenCalledWith(`/notes/${noteId}`, updateData);
      expect(result).toEqual(mockResponse);
  });
});
