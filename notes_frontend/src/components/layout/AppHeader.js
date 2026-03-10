import React from "react";

export default function AppHeader() {
  return (
    <header className="appHeader" aria-label="Application header">
      <div className="appHeaderInner card">
        <div className="appHeaderLeft">
          <div className="pill" aria-label="App badge">
            <span aria-hidden="true">⌁</span>
            <span>Retro Notes</span>
          </div>
          <div className="appTitleBlock">
            <h1 className="appTitle">Notes, but make it neon.</h1>
            <p className="appSubtitle muted">
              Everything stays in your browser via <strong>localStorage</strong>.
            </p>
          </div>
        </div>
        <div className="appHeaderRight" aria-label="Keyboard tips">
          <span className="kbd">Ctrl</span> <span className="kbd">K</span>
          <span className="muted" style={{ marginLeft: 8 }}>
            focus search
          </span>
        </div>
      </div>
    </header>
  );
}
