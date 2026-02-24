# Technical Contract: Story 2 — Add time entry with validation feedback

**Epic:** Time Tracker — Nexus (02.1)  
**User Story:** [USER-STORIES-Time-Tracker-Nexus.md](USER-STORIES-Time-Tracker-Nexus.md) — Story 2  
**Screen:** 02.1 Time Tracker — Nexus (Figma node 12568-210659)

---

## 1. Angular Frontend

**Responsibilities**
- In Calendar view, make "click anywhere" (or WW + plus affordance) open the Add Entry form (modal/overlay).
- Render Add Entry form with fields: Description, Project : Task, Feature, Billable, Time; close X; Cancel and Save actions.
- **Required fields (all mandatory):** Description, Project : Task, Feature, Billable, Time. Show validation error state when any required field is invalid: red label, red border, red warning icon, tooltip below (e.g. "Select a task to add an entry" for task). Default state: light grey border on inputs.
- On Save with valid data: submit to backend (contract does not define API); on success close form and reflect new entry in calendar/list. On Cancel or close X: close without saving.

**Visual structure (all elements present)**
- **Add Entry form (functional):** Title "Add Entry"; Description (text input); Project : Task (dropdown/select); Feature (dropdown); Billable (toggle/control); Time (input(s), e.g. 00:00); Close X; Cancel button; Save button. Error state: red label, red border, red warning icon, tooltip.
- **Calendar view:** Primary action = add (click anywhere or WW + plus opens form). Time entry blocks, week navigation, Day/Week toggle **display-only or disabled** for add flow; no drag/resize in this story. Entry detail kebab **disabled** in this story.

**Visual states**
- Default: light grey border on inputs.
- Error: red label, red border, red warning icon, tooltip (e.g. "Select a task to add an entry") per Epic/UI Map.
- Modal open: Add Entry overlay over calendar.

**No invention**
- No code.

---

## 2. Node.js Backend

**Responsibilities**
- Accept creation of one time entry (description, project/task, feature, billable, time/duration as per form). Define endpoint, request body, and response **according to best practices** when implementing; validate required fields (description, task, feature, billable, time) and return appropriate errors.
- No additional business logic or validations beyond what Product specifies.

**No invention**
- No new APIs or validation rules not implied by the Epic/User Story.

---

## 3. PostgreSQL Database

**Responsibilities**
- Persist time entries. Schema must support at least: description, project/task (or references), feature, billable flag, time/duration (or start/end). Exact column names and types not specified; under-specification preferred.

**No invention**
- No extra tables or columns beyond what is needed for one time entry as shown in the form.

---

## 4. Visual Structure Reference (Epic / UI Map)

**From Epic:** Add Entry form (Description, Project : Task, Feature, Billable, Time; close X; error state). Primary action = add when clicking anywhere in calendar view (e.g. WW + plus).

**From UI Map:** Modals — Add Entry (Description, Project : Task, Feature, Billable, Time; error: red border, warning icon, tooltip). Visual states — error (red label, red border, warning icon, tooltip), default (light grey border).

**Display-only / disabled in this story:** Week navigation, day circles, date picker (usable but not focus of story); drag/resize of entries; entry detail kebab (Edit/Duplicate/Delete) — present but non-functional for this story.

---

## 5. Known Unknowns / NEEDS CLARIFICATION

- **Resolved:** All Add Entry form fields are required (Description, Project : Task, Feature, Billable, Time). Backend API contract to be defined according to best practices when implementing.
