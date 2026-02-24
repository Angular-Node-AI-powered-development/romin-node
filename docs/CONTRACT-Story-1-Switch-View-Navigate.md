# Technical Contract: Story 1 — Switch view and navigate by week and day

**Epic:** Time Tracker — Nexus (02.1)  
**User Story:** [USER-STORIES-Time-Tracker-Nexus.md](USER-STORIES-Time-Tracker-Nexus.md) — Story 1  
**Screen:** 02.1 Time Tracker — Nexus (Figma node 12568-210659)

---

## 1. Angular Frontend

**Responsibilities**
- Render the Time tracking screen with Header, Main Content area, and Sidebar as per Epic/UI Map.
- Implement view switch (Logged / Calendar) and week/day navigation; display Week's log total for the currently displayed week.
- **Default on first load:** Calendar view (Logged inactive, Calendar highlighted); default week = **current week**.
- Persist filter and date-range selection across page reload via **server-side** storage (backend stores and returns user preferences so they survive reload).

**Visual structure (all elements present)**
- **Header (functional in this story):** Page title "Time tracking"; Logged/Calendar segment control (Calendar = highlighted, Logged = inactive/grey); Week's log total (numeric, e.g. 32:30 hrs); week navigation — left arrow, right arrow, seven circular day buttons (S M T W T F S) with active day highlighted (e.g. dark purple or light green), inactive days grey; date picker (calendar icon + date label, e.g. "19 May 2025"). Content row: "Today" (with time e.g. 09:00); Day/Week toggle with hours (e.g. 08:24 hrs); "Project tasks" column with entries and dropdown.
- **Sidebar (functional):** App logo; main nav icons (e.g. Time Tracker) — active state (purple-blue on light purple-blue rounded rect), inactive (black outline on white); profile avatar (navigate to profile page). No notification/settings (out of scope).
- **Main Content area:** Calendar or list view container; time entry blocks and list rows **display-only** (no drag/resize/edit/delete in this story). Add Entry form, entry detail pop-up, list row edit/delete **disabled or not openable** in this story.
- **Visual states:** Default; Active/Selected (segment, day circle, sidebar nav); Disabled (inactive segment, inactive days — lower shade of same color).

**State / data**
- Current view: Logged | Calendar.
- Current week/date range and selected day (for calendar).
- Week's log total = sum of time entries for the displayed week (source: backend or client-side from entries in range).
- Persisted filter and date range via server (backend stores and returns on load so they survive reload).

**Interactions**
- Click Logged or Calendar → switch view; update active segment styling.
- Click day circle or left/right arrows → update displayed week/day; update selected day styling.
- Click date picker → open date picker; on date select → navigate to that date/week.
- No code; no invented validation or business rules.

---

## 2. Node.js Backend

**Responsibilities**
- Provide time entries for a given date range (week) so the frontend can render calendar/list and compute Week's log total. Define endpoints and request/response shape **according to best practices** when implementing.
- **Server-side persistence:** Store and retrieve the user's last filter and date range so they persist across reload.

**No invention**
- No new business logic, validations, or APIs beyond the minimal data needed for "entries in week" and "week total."

---

## 3. PostgreSQL Database

**Responsibilities**
- Store time entries with at least: date/time range, and any fields needed to compute duration and week total. Schema to support querying entries by date range and aggregating total duration per week.
- Store user preferences for filter and date range (server-side persistence for reload).

**No invention**
- No new tables or columns beyond what is implied by Epic (time entries with date/duration).

---

## 4. Visual Structure Reference (Epic / UI Map)

**From Epic:** Header with "Time tracking" title; Logged/Calendar toggle; Week's log = total for displayed week; week navigation (arrows, S M T W T F S); date picker; Today; Day/Week toggle + hours; Project tasks with dropdown. Sidebar: logo, nav with active state, profile avatar. Filters and date range persist after reload.

**From UI Map:** Top bar (title, segment control, week's log, left/right arrows, day circles, date picker); content row (Today, Day/Week, Project tasks). Sidebar (logo, nav icons active/inactive, profile avatar). Layout Sections: Header, Main Content, Sidebar.

**Display-only / disabled in this story:** Add Entry form, time entry blocks (drag/resize), entry detail pop-up, list row edit/delete — present in DOM/layout but non-functional for this story.

---

## 5. Known Unknowns / NEEDS CLARIFICATION

- **Resolved:** Default view = Calendar on first load; default week = current week. Filter and date-range persistence = server-side. Backend API contract to be defined according to best practices when implementing.
