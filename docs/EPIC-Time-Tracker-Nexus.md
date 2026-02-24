## Epic: Time Tracker — Nexus (02.1)

### Goal
Users can track and manage time entries across calendar, list, and board views so that time is visible, editable, and navigable by day/week from a single time-tracking screen.

### In Scope
- Sidebar: app logo; main nav (icon-only, e.g. Time Tracker) with active state (purple-blue on light purple-blue rounded rect); profile avatar clicking navigates to profile page (avatar, name, etc.)
- Header: “Time tracking” title; Logged/Calendar view toggle; Week’s log = total of all time entries in the currently displayed week (one week total); week navigation (left/right arrows, S M T W T F S day circles, date picker); Today column; Day/Week toggle with hours (e.g. 08:24 hrs); Project tasks column with entries and dropdown
- Calendar: month and week views; week view with day headers (e.g. Sun Mar 16–Sat Mar 22), time scale (09:00–17:00), current time red line; time entry blocks that are draggable, droppable, and resizable; drag-to-draw to create a new entry; primary action = add — clicking anywhere in the calendar view opens/adds a new entry (e.g. WW + plus); multiple time entries allowed in the same time duration (overlapping entries permitted)
- Boards: project/team column boards with drag-and-drop; drop zone (dashed border) and placeholder for dragged card
- Time entry list: date range selector; filters (Project, Client, Task, Team); list rows (date, duration, task, project, client, edit/delete icons); total hours; **filters and date range persist after page reload**
- Add Entry form: Description, Project : Task, Feature, Billable, Time; close X; error state (red label/border, warning icon, tooltip e.g. “Select a task to add an entry”)
- New entry / Edit entry pop-ups with same fields and Cancel, Save, Delete; delete confirmation dialog (“Delete 1 time entry?”)
- Time entry detail pop-up (e.g. Quick Sync: title, category/project, time, date, avatar) with kebab menu → Edit, Duplicate, Delete Entry
- Visual states: default (incl. light grey border on inputs); active/selected (sidebar and header); hover (incl. menu item light gray background); disabled (lower shades of same color for inactive days, Logged, Day); error (red + tooltip); focused/menu selection; modal open
- **Access:** Everyone has full access (view and edit all time entries) as of now.

### Out of Scope
- Notification icon and notification menu/panel
- Settings icon and settings menu/page
- Backend behavior, APIs, validations, permissions, or business rules not defined by the UI (must be specified separately)

### Known Unknowns
- None (access, week's log, overlapping entries, filter/date persistence, and primary add action in calendar view clarified as above.)

### User Stories (max 5)
1. As a user, I want to switch between Logged and Calendar and navigate by week and day so that I can view my time entries for a chosen period.
2. As a user, I want to add a time entry via the Add Entry form and see clear validation feedback so that I can create correct entries.
3. As a user, I want to drag, drop, and resize time entries in week view (and draw to create) so that I can adjust time quickly.
4. As a user, I want to open an entry’s detail pop-up and use Edit, Duplicate, or Delete Entry so that I can manage a single entry.
5. As a user, I want the sidebar to show the active section and to open my profile from my avatar so that I can move between the time tracker and my profile page.
