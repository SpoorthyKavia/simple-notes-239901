/**
 * Notes domain model utilities.
 * A note is:
 *  {
 *    id: string,
 *    title: string,
 *    content: string,
 *    createdAt: number,
 *    updatedAt: number
 *  }
 */

// PUBLIC_INTERFACE
export function createEmptyNote() {
  /** Create a new empty note with generated id and timestamps. */
  const now = Date.now();
  return {
    id: generateId(),
    title: "",
    content: "",
    createdAt: now,
    updatedAt: now,
  };
}

// PUBLIC_INTERFACE
export function touchNote(note) {
  /** Return a copy of the note with updatedAt refreshed. */
  return { ...note, updatedAt: Date.now() };
}

function generateId() {
  // Simple, collision-resistant-enough id for local-only usage.
  return `note_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}
