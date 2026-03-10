import React from "react";
import { useNotes } from "../hooks/useNotes";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import "./notesPage.css";

export default function NotesPage() {
  const {
    filteredNotes,
    selectedId,
    selectedNote,
    query,
    setQuery,
    createNote,
    updateNote,
    deleteSelectedNote,
    selectNote,
  } = useNotes();

  return (
    <div className="twoCol" aria-label="Notes workspace">
      <NotesList
        notes={filteredNotes}
        selectedId={selectedId}
        onSelect={selectNote}
        query={query}
        onQueryChange={setQuery}
        onNew={createNote}
      />
      <NoteEditor
        note={selectedNote}
        onChange={updateNote}
        onDelete={deleteSelectedNote}
        onCreateFirst={createNote}
      />
    </div>
  );
}
