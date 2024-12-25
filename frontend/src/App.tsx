import React from "react"
import { useEffect, useState } from "react"
import VanishList from "./components/ui/vanish-list"
import { AddNote, Note } from "./types/note-type"
import noteService from "./api/note-service"

function App(): React.ReactNode {
  const [notes, setNotes] = useState<Note[]>([])

  /**
   * Get all notes from the server
   */
  const getNotes = async () => {
    try {
      const res = await noteService.getNotes()
      setNotes(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Add a new note to the server
   * @param note AddNote
   */
  const handleAdd = async (note: AddNote) => {
    try {
      const res = await noteService.addNotes(note)
      setNotes([...notes, res.data])
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update the checked status of a note
   * @param note Note
   */
  const handleCheck = async (note: Note) => {
    try {
      const res = await noteService.updateNotes(note.id, { checked: !note.checked });
      setNotes(notes.map((n: Note) => (n.id === note.id ? res.data : n)));
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Remove a note from the server
   * @param id number
   */
  const handleRemove = async (id: number) => {
    try {
      await noteService.deleteNotes(id)
      setNotes(notes.filter((n: Note) => n.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <VanishList
      notes={notes}
      onAddNewNote={handleAdd}
      onCheckNote={handleCheck}
      onRemoveNote={handleRemove}
    />
  )
}

export default App;