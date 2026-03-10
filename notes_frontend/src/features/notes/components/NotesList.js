import React, { useEffect, useMemo, useRef } from "react";
import { formatCompactDateTime } from "../utils/timeFormat";

export default function NotesList({
  notes,
  selectedId,
  onSelect,
  query,
  onQueryChange,
  onNew,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isCtrlK = (!isMac && e.ctrlKey && e.key.toLowerCase() === "k") || (isMac && e.metaKey && e.key.toLowerCase() === "k");
      if (isCtrlK) {
        e.preventDefault();
        if (searchRef.current) searchRef.current.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const countLabel = useMemo(() => {
    const total = notes.length;
    return total === 1 ? "1 note" : `${total} notes`;
  }, [notes.length]);

  return (
    <section className="card notesPane" aria-label="Notes list">
      <div className="cardBody stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="stack" style={{ gap: 4 }}>
            <div className="pill" aria-label="Notes count">
              <span aria-hidden="true">⟡</span>
              <span>{countLabel}</span>
            </div>
            <div className="muted" style={{ fontSize: 12 }}>
              Search title or content
            </div>
          </div>

          <button className="btn btnPrimary" type="button" onClick={onNew}>
            New
          </button>
        </div>

        <input
          ref={searchRef}
          className="field"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search notes…"
          aria-label="Search notes"
        />

        <div className="notesList" role="list" aria-label="Notes results">
          {notes.length === 0 ? (
            <div className="emptyState muted">
              No notes match your search.
            </div>
          ) : (
            notes.map((n) => {
              const isActive = n.id === selectedId;
              const title = n.title.trim() || "Untitled";
              const preview = (n.content || "").trim().slice(0, 80);
              return (
                <button
                  key={n.id}
                  type="button"
                  className={`noteRow ${isActive ? "noteRowActive" : ""}`}
                  onClick={() => onSelect(n.id)}
                  role="listitem"
                  aria-current={isActive ? "true" : "false"}
                >
                  <div className="noteRowTop">
                    <span className="noteRowTitle">{title}</span>
                    <span className="noteRowTime muted">
                      {formatCompactDateTime(n.updatedAt)}
                    </span>
                  </div>
                  <div className="noteRowPreview muted">
                    {preview || "No content yet…"}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
