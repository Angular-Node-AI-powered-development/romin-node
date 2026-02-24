# User Stories: Time Tracker — Nexus (02.1)

Epic: [EPIC-Time-Tracker-Nexus.md](EPIC-Time-Tracker-Nexus.md)  
Screen (Design Reference): **02.1 Time Tracker — Nexus** (Figma node 12568-210659)

---

## Story 1: Switch view and navigate by week and day

As a **user**,
I want **to switch between Logged and Calendar and navigate by week and day**,
so that **I can view my time entries for a chosen period**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus
- Interaction: Click Logged/Calendar segment; click day circles (S M T W T F S) or left/right arrows; click date picker; Week's log total updates to sum of entries for the displayed week.

**Acceptance Criteria**
- Given I am on the Time tracking screen, when I click "Logged" or "Calendar", then the view switches and the active segment is highlighted (Calendar = highlighted, Logged = inactive/grey).
- Given I am in Calendar view, when I click a day circle (S M T W T F S) or the left/right arrows, then the displayed week or day updates and the selected day is highlighted (e.g. dark purple or light green); inactive days use lower shade (grey).
- Given I click the date picker, when I select a date, then the calendar navigates to that date/week.
- Given the week is displayed, when the week changes, then Week's log shows the total of all time entries in that week only.
- Visual state matches design: Header (title, toggle, week's log, week nav, date picker), Today column, Day/Week toggle + hours, Project tasks column present; sidebar and main content layout as per Epic/UI Map.
- NEEDS CLARIFICATION: Default view on first load (Logged vs Calendar) and default week (current week vs last used).

**Visual Structure Reference**
- Epic specifies: Header with "Time tracking" title; Logged/Calendar toggle; Week's log = total for displayed week; week navigation (arrows, S M T W T F S); date picker; Today; Day/Week toggle + hours; Project tasks with dropdown.
- UI Map specifies: Top bar (title, segment control, week's log, left/right arrows, day circles, date picker); content row (Today, Day/Week, Project tasks).
- **Note**: Add Entry form, time entry blocks (drag/resize), entry detail pop-up, and list row edit/delete are **display-only or disabled** in this story; functionality in Stories 2, 3, 4.

**Definition of Done**
- UI matches Figma
- Interaction works as described
- No unresolved assumptions

---

## Story 2: Add time entry with validation feedback

As a **user**,
I want **to add a time entry via the Add Entry form and see clear validation feedback**,
so that **I can create correct entries**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus
- Interaction: Click anywhere in calendar view (primary action = add) or use add affordance (e.g. WW + plus); Add Entry form opens; fill Description, Project : Task, Feature, Billable, Time; invalid state shows red label/border, warning icon, tooltip (e.g. "Select a task to add an entry"); Save/Cancel/close X.

**Acceptance Criteria**
- Given I am in Calendar view, when I click anywhere in the calendar area (or the add/plus affordance), then the Add Entry form opens (modal/overlay).
- Given the Add Entry form is open, when I leave required fields invalid (e.g. no task selected), then the field shows error state: red label, red border, red warning icon, and tooltip below (e.g. "Select a task to add an entry").
- Given the Add Entry form is open, when I fill all required fields and click Save, then the entry is created and the form closes; new entry appears in the calendar/list as per Epic.
- Given the Add Entry form is open, when I click Cancel or close (X), then the form closes without saving.
- Visual state matches design: Add Entry form with Description, Project : Task, Feature, Billable, Time; close X; error state (red border, warning icon, tooltip); default state (light grey border on inputs).
- NEEDS CLARIFICATION: Required fields list and validation rules (beyond "Select a task") if any.

**Visual Structure Reference**
- Epic specifies: Add Entry form (Description, Project : Task, Feature, Billable, Time; close X; error state); primary action = add when clicking anywhere in calendar view (e.g. WW + plus).
- UI Map specifies: Modals — Add Entry (Description, Project : Task, Feature, Billable, Time; error: red border, warning icon, tooltip); Visual states — error (red label, red border, warning icon, tooltip), default (light grey border).
- **Note**: Week navigation, drag/resize of entries, and entry detail kebab (Edit/Duplicate/Delete) are **display-only or disabled** in this story; functionality in Stories 1, 3, 4.

**Definition of Done**
- UI matches Figma
- Interaction works as described
- No unresolved assumptions

---

## Story 3: Drag, drop, resize, and draw time entries in week view

As a **user**,
I want **to drag, drop, and resize time entries in week view (and draw to create)**,
so that **I can adjust time quickly**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus
- Interaction: In week view, drag a time entry block to another day/time; drop zone shows dashed border, placeholder at source; resize via vertical handles; drag on calendar to draw a new block (opens add flow); multiple entries allowed in same time duration (overlapping permitted).

**Acceptance Criteria**
- Given I am in week view with at least one time entry block, when I drag the block to another day or time slot, then it moves and the drop target shows a dashed border; the original position shows a placeholder during drag.
- Given I am in week view with a time entry block, when I drag the vertical resize handles, then the block duration changes (start/end time updates).
- Given I am in week view, when I drag to draw a range on the calendar, then a temporary block appears and releasing opens the add-entry flow (e.g. Add Entry form with pre-filled time/date).
- Given multiple entries exist in the same time duration, when I view the week, then all are visible (overlapping permitted per Epic).
- Visual state matches design: Week view (day headers, time scale 09:00–17:00, current time red line); draggable/resizable blocks; drop zone (dashed border); placeholder; draw-to-create semi-transparent block.
- NEEDS CLARIFICATION: Resize handle exact placement (top/bottom edge) and keyboard/snap behavior if any.

**Visual Structure Reference**
- Epic specifies: Calendar week view with draggable, droppable, resizable blocks; drag-to-draw to create; drop zone (dashed border) and placeholder; multiple entries in same time duration allowed.
- UI Map specifies: Calendar grid — week view (days × hours; time entry blocks draggable and resizable); Drag — time entry block between day cells, resize via vertical handles, draw new block; Indicators — drop zone (dashed border), placeholder, current time line (red).
- **Note**: Logged/Calendar toggle, day-circle navigation, Add Entry form fields/validation, and entry detail kebab are **display-only or disabled** in this story; functionality in Stories 1, 2, 4.

**Definition of Done**
- UI matches Figma
- Interaction works as described
- No unresolved assumptions

---

## Story 4: Entry detail pop-up — Edit, Duplicate, Delete

As a **user**,
I want **to open an entry's detail pop-up and use Edit, Duplicate, or Delete Entry**,
so that **I can manage a single entry**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus
- Interaction: Click a time entry block → detail pop-up (e.g. Quick Sync: title, category/project, time, date, avatar); kebab menu → Edit, Duplicate, Delete Entry; Edit opens edit pop-up (same fields + Delete button); Delete Entry triggers confirmation ("Delete 1 time entry?" with Cancel/Delete); menu item hover = light gray background.

**Acceptance Criteria**
- Given I am on the Time tracking screen with at least one time entry, when I click a time entry block, then the time entry detail pop-up opens (title, category/project, time, date, avatar) with a kebab menu.
- Given the detail pop-up is open, when I open the kebab menu and click "Edit", then the Edit entry pop-up opens with the same fields pre-filled and a Delete button; Save/Cancel work as per Epic.
- Given the detail pop-up is open, when I open the kebab menu and click "Duplicate", then a new entry is created as a copy and the pop-up closes (or duplicate form opens—NEEDS CLARIFICATION).
- Given the detail or Edit pop-up is open, when I click Delete (or "Delete Entry" from kebab), then the confirmation dialog appears ("Delete 1 time entry?" with Cancel/Delete); on Delete confirm, the entry is removed.
- Visual state matches design: Detail pop-up (title, category/project, time, date, avatar, kebab); context menu (Edit, Duplicate, Delete Entry); Delete Entry in red with hover = light gray background; confirmation dialog.
- NEEDS CLARIFICATION: Duplicate flow—opens form pre-filled or creates copy immediately.

**Visual Structure Reference**
- Epic specifies: Time entry detail pop-up (e.g. Quick Sync: title, category/project, time, date, avatar) with kebab → Edit, Duplicate, Delete Entry; New entry/Edit entry pop-ups with same fields and Cancel, Save, Delete; delete confirmation dialog.
- UI Map specifies: Modals — time entry detail (kebab → Edit, Duplicate, Delete Entry); Edit entry (same fields + Delete); confirmation ("Delete 1 time entry?" with Cancel/Delete); Hover — menu item (e.g. light gray background on "Delete Entry").
- **Note**: Week/day navigation, Add Entry (new) form, and drag/resize/draw in week view are **display-only or disabled** in this story; functionality in Stories 1, 2, 3.

**Definition of Done**
- UI matches Figma
- Interaction works as described
- No unresolved assumptions

---

## Story 5: Sidebar navigation and profile

As a **user**,
I want **the sidebar to show the active section and to open my profile from my avatar**,
so that **I can move between the time tracker and my profile page**.

**Design Reference**
- Screen: 02.1 Time Tracker — Nexus
- Interaction: Sidebar shows app logo, main nav (e.g. Time Tracker) with one item active (purple-blue on light purple-blue rounded rect); clicking nav item navigates to that section and highlights it; clicking profile avatar navigates to profile page (avatar, name, etc.).

**Acceptance Criteria**
- Given I am on the Time tracking screen, when the page loads, then the sidebar shows the app logo at top, main nav icons (e.g. clock/Time Tracker) with the current section highlighted (purple-blue icon on light purple-blue rounded rectangle); other nav items inactive (black outline on white).
- Given I am on the Time tracking screen, when I click an inactive sidebar nav item, then I navigate to that section and that item becomes active (highlighted).
- Given I am on the Time tracking screen, when I click the already-active nav item, then I remain on the section and it stays highlighted (no other effect).
- Given I am on the Time tracking screen, when I click my profile avatar at the bottom of the sidebar, then I navigate to the profile page showing avatar, name, and related details.
- Visual state matches design: Sidebar (logo, nav icons with active/inactive states, profile avatar); no notification or settings icons (out of scope).
- NEEDS CLARIFICATION: Other sidebar nav destinations beyond Time Tracker and profile (if any).

**Visual Structure Reference**
- Epic specifies: Sidebar — app logo; main nav (icon-only) with active state (purple-blue on light purple-blue rounded rect); profile avatar → profile page (avatar, name, etc.); notification and settings not in scope.
- UI Map specifies: Sidebar — app logo/brand (circular, purple-blue, white symbol); main nav icons (clock/stopwatch-style) inactive (black outline) and active (purple-blue on light purple-blue rounded rect); user profile avatar (circular image).
- **Note**: Header (view toggle, week nav, date picker), calendar blocks, Add Entry form, and entry detail pop-up are **display-only or disabled** in this story; functionality in Stories 1–4.

**Definition of Done**
- UI matches Figma
- Interaction works as described
- No unresolved assumptions
