import React, { useEffect, useMemo, useRef, useState } from "react";
import { formatFullDateTime } from "../utils/timeFormat";

export default function NoteEditor({ note, onChange, onDelete, onCreateFirst }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setConfirmingDelete(false);
  }, [note ? note.id : null]);

  useEffect(() => {
    // When a new note is created (empty title/content), focus title for fast entry.
    if (!note) return;
    const isNewish = (note.title || "") === "" && (note.content || "") === "";
    if (isNewish && titleRef.current) titleRef.current.focus();
  }, [note]);

  const meta = useMemo(() => {
    if (!note) return null;
    return {
      created: formatFullDateTime(note.createdAt),
      updated: formatFullDateTime(note.updatedAt),
    };
  }, [note]);

  if (!note) {
    return (
      <section className="card editorPane" aria-label="Note editor">
        <div className="cardBody stack" style={{ minHeight: 320 }}>
          <div className="pill">
            <span aria-hidden="true">⟡</span>
            <span>No note selected</span>
          </div>
          <p className="muted" style={{ margin: 0 }}>
            Create your first note to get started. Your notes are stored locally in this browser.
          </p>
          <div>
            <button className="btn btnPrimary" type="button" onClick={onCreateFirst}>
              Create a note
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="card editorPane" aria-label="Note editor">
      <div className="cardBody stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="stack" style={{ gap: 4 }}>
            <div className="pill" aria-label="Note metadata">
              <span aria-hidden="true">⌁</span>
              <span>Editing</span>
            </div>
            {meta ? (
              <div className="muted" style={{ fontSize: 12 }}>
                Updated {meta.updated} · Created {meta.created}
              </div>
            ) : null}
          </div>

          <div className="row">
            {!confirmingDelete ? (
              <button
                className="btn btnDanger"
                type="button"
                onClick={() => setConfirmingDelete(true)}
              >
                Delete
              </button>
            ) : (
              <>
                <button className="btn btnDanger" type="button" onClick={onDelete}>
                  Confirm
                </button>
                <button
                  className="btn btnGhost"
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <label className="stack" style={{ gap: 6 }}>
          <span className="muted" style={{ fontSize: 12 }}>
            Title
          </span>
          <input
            ref={titleRef}
            className="field"
            value={note.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Untitled"
            aria-label="Note title"
          />
        </label>

        <label className="stack" style={{ gap: 6 }}>
          <span className="muted" style={{ fontSize: 12 }}>
            Content
          </span>
          <textarea
            className="field textarea"
            value={note.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="Write something…"
            aria-label="Note content"
          />
        </label>
      </div>
    </section>
  );
}
