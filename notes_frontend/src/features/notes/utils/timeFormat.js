// PUBLIC_INTERFACE
export function formatCompactDateTime(epochMs) {
  /** Format a timestamp as a short, readable string. */
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(epochMs));
  } catch (_e) {
    return "";
  }
}

// PUBLIC_INTERFACE
export function formatFullDateTime(epochMs) {
  /** Format a timestamp as a full date/time string. */
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(epochMs));
  } catch (_e) {
    return "";
  }
}
