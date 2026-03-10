import { useEffect, useMemo, useState } from "react";
import { loadNotes, saveNotes } from "../storage/notesStorage";
import { createEmptyNote, touchNote } from "../utils/noteModel";

function normalizeQuery(q) {
  return (q || "").trim().toLowerCase();
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Notes application state (CRUD + search) with localStorage persistence. */
  const [notes, setNotes] = useState(() => loadNotes());
  const [selectedId, setSelectedId] = useState(() => (loadNotes()[0] ? loadNotes()[0].id : null));
  const [query, setQuery] = useState("");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Ensure selected note stays valid.
  useEffect(() => {
    if (selectedId && notes.some((n) => n.id === selectedId)) return;
    setSelectedId(notes[0] ? notes[0].id : null);
  }, [notes, selectedId]);

  const selectedNote = useMemo(() => notes.find((n) => n.id === selectedId) || null, [
    notes,
    selectedId,
  ]);

  const filteredNotes = useMemo(() => {
    const q = normalizeQuery(query);
    if (!q) return notes;
    return notes.filter((n) => {
      const hay = `${n.title}\n${n.content}`.toLowerCase();
      return hay.includes(q);
    });
  }, [notes, query]);

  // PUBLIC_INTERFACE
  function createNote() {
    /** Create a new note and select it. */
    const newNote = createEmptyNote();
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id);
    return newNote.id;
  }

  // PUBLIC_INTERFACE
  function updateNote(patch) {
    /** Update selected note fields (title/content) and bump updatedAt. */
    if (!selectedId) return;
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== selectedId) return n;
        const next = touchNote({
          ...n,
          ...patch,
        });
        return next;
      })
    );
  }

  // PUBLIC_INTERFACE
  function deleteSelectedNote() {
    /** Delete currently selected note. */
    if (!selectedId) return;
    setNotes((prev) => prev.filter((n) => n.id !== selectedId));
    // selectedId will be corrected by effect.
  }

  // PUBLIC_INTERFACE
  function selectNote(id) {
    /** Select a note by id. */
    setSelectedId(id);
  }

  return {
    notes,
    filteredNotes,
    selectedId,
    selectedNote,
    query,
    setQuery,
    createNote,
    updateNote,
    deleteSelectedNote,
    selectNote,
  };
}
