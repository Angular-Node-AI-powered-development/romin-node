# Technical Contract: Story 3 — Drag, drop, resize, and draw time entries in week view

**Epic:** Time Tracker — Nexus (02.1)  
**User Story:** [USER-STORIES-Time-Tracker-Nexus.md](USER-STORIES-Time-Tracker-Nexus.md) — Story 3  
**Screen:** 02.1 Time Tracker — Nexus (Figma node 12568-210659)

---

## 1. Angular Frontend

**Responsibilities**
- In week view, render calendar grid: day headers (e.g. Sun Mar 16–Sat Mar 22), time scale (e.g. 09:00–17:00), current time indicator (red line). Render time entry blocks with duration, description, project, color; allow multiple entries in the same time duration (overlapping permitted per Epic).
- Implement drag: move a time entry block to another day/time slot; show drop zone (dashed border) and placeholder at source during drag.
- Implement resize: vertical handles on blocks; drag to change duration (start/end time). **Resize rules:** Duration can be any length and can span multiple days; entry remains **bound to the displayed week** (cannot extend outside that week).
- Implement draw-to-create: user drags on calendar to draw a range; show temporary semi-transparent block; on release open add-entry flow (e.g. Add Entry form with time/date pre-filled from drawn range).
- Persist filter and date range after reload (per Epic).

**Visual structure (all elements present)**
- **Week view (functional):** Day headers; time scale; current time red line; time entry blocks (draggable, droppable, resizable); drop zone (dashed border); placeholder during drag; draw-to-create temporary block (semi-transparent). Overlapping blocks allowed.
- **Header / Sidebar:** Logged/Calendar toggle, day circles, date picker, Project tasks, Sidebar nav **display-only or disabled** for this story (navigation in Story 1). Add Entry form opens from draw-to-create only; form fields/validation as in Story 2. Entry detail pop-up **disabled** in this story.

**Visual states**
- Active/Dragging: hand cursor, placeholder at source, block follows pointer.
- Drop target: dashed border on valid drop area.
- Default, hover on blocks.

**No invention**
- No code.

---

## 2. Node.js Backend

**Responsibilities**
- **Update entry after resize or drag-and-drop:** Accept update of a time entry when the user moves (drag-and-drop) or resizes it; persist the new date/time and duration. Define endpoint and payload **according to best practices** when implementing.
- Create entry from draw-to-create: same as Story 2 (add entry) with optional pre-filled time/date from frontend.

**No invention**
- No new business rules (e.g. overlap rules) beyond Epic: overlapping entries permitted.

---

## 3. PostgreSQL Database

**Responsibilities**
- Store time entries with date/time or start/end (or duration) so that move and resize can be persisted. Schema not specified; support update of existing row for move/resize.

**No invention**
- No schema changes beyond what supports "update entry's time range."

---

## 4. Visual Structure Reference (Epic / UI Map)

**From Epic:** Calendar week view; draggable, droppable, resizable blocks; drag-to-draw to create; drop zone (dashed border), placeholder; multiple entries in same time duration allowed.

**From UI Map:** Calendar grid — week view (days × hours; time entry blocks draggable and resizable). Drag: time entry block between day cells, resize via vertical handles, draw new block. Indicators: drop zone (dashed border), placeholder, current time line (red).

**Display-only / disabled in this story:** Logged/Calendar toggle, day-circle navigation (Story 1); Add Entry form fields/validation (Story 2) except when opened from draw; entry detail kebab (Story 4).

---

## 5. Known Unknowns / NEEDS CLARIFICATION

- **Resolved:** Resize can be any duration and can span multiple days; entry is bound to the displayed week. Backend updates the entry after resize or drag-and-drop; API to be defined according to best practices when implementing.
