import React from "react";
import NotesPage from "./features/notes/pages/NotesPage";
import AppHeader from "./components/layout/AppHeader";

export default function App() {
  return (
    <div className="appRoot">
      <AppHeader />
      <main className="appMain" aria-label="Notes application">
        <NotesPage />
      </main>
    </div>
  );
}
