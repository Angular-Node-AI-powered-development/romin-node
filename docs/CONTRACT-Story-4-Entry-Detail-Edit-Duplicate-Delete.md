# Technical Contract: Story 4 — Entry detail pop-up (Edit, Duplicate, Delete)

**Epic:** Time Tracker — Nexus (02.1)  
**User Story:** [USER-STORIES-Time-Tracker-Nexus.md](USER-STORIES-Time-Tracker-Nexus.md) — Story 4  
**Screen:** 02.1 Time Tracker — Nexus (Figma node 12568-210659)

---

## 1. Angular Frontend

**Responsibilities**
- On click of a time entry block, open the time entry detail pop-up (title, category/project, time, date, avatar) with a kebab menu (three dots). Menu items: Edit, Duplicate, Delete Entry. Delete Entry in red text; hover = light gray background.
- Edit: open Edit entry pop-up (same fields as Add/New entry plus Delete button); pre-fill from selected entry; Save/Cancel; Save persists changes.
- Duplicate: create a new entry as a copy of the current one **directly** (no form); create copy immediately and close detail pop-up.
- Delete: from kebab or from Edit pop-up Delete button → show confirmation dialog ("Delete 1 time entry?" with Cancel and Delete); on Delete confirm, remove entry and close dialogs.

**Visual structure (all elements present)**
- **Time entry detail pop-up (functional):** Title (e.g. "Quick Sync"); category/project; time range; date; avatar; kebab menu → Edit, Duplicate, Delete Entry.
- **Context menu:** Edit, Duplicate, Delete Entry; Delete Entry red; hover = light gray background.
- **Edit entry pop-up:** Same fields as Add Entry plus Delete button; Cancel, Save.
- **Confirmation dialog:** "Delete 1 time entry?" with Cancel and Delete buttons.
- **Header, calendar, Sidebar, Add Entry form:** **Display-only or disabled** in this story (Stories 1, 2, 3, 5).

**Visual states**
- Modal open: detail pop-up, context menu, edit pop-up, or confirmation dialog as appropriate.
- Hover on menu item: light gray background (e.g. "Delete Entry").

**No invention**
- No code.

---

## 2. Node.js Backend

**Responsibilities**
- Provide one time entry by id (for detail and edit). Update entry (Edit/Save). Delete entry by id (with confirmation handled in frontend). Create entry as copy (Duplicate — direct copy, no form). Define endpoints and payloads **according to best practices** when implementing for get-one, update, delete, duplicate.

**No invention**
- No new validations or business rules beyond Epic.

---

## 3. PostgreSQL Database

**Responsibilities**
- Support read one entry, update one entry, delete one entry. Duplicate = insert new row with copied data. Schema not specified; under-specification preferred.

**No invention**
- No extra tables; only operations implied by Edit, Delete, Duplicate.

---

## 4. Visual Structure Reference (Epic / UI Map)

**From Epic:** Time entry detail pop-up (e.g. Quick Sync: title, category/project, time, date, avatar) with kebab → Edit, Duplicate, Delete Entry; New entry/Edit entry pop-ups with same fields and Cancel, Save, Delete; delete confirmation dialog.

**From UI Map:** Modals — time entry detail (kebab → Edit, Duplicate, Delete Entry); Edit entry (same fields + Delete); confirmation ("Delete 1 time entry?" with Cancel/Delete). Hover — menu item (e.g. light gray background on "Delete Entry").

**Display-only / disabled in this story:** Week/day navigation (Story 1); Add Entry (new) form (Story 2); drag/resize/draw in week view (Story 3); sidebar nav and profile (Story 5).

---

## 5. Known Unknowns / NEEDS CLARIFICATION

- **Resolved:** Duplicate creates a copy directly (no pre-filled form). Backend API contract for get-one, update, delete, duplicate to be defined according to best practices when implementing.
