# Technical Contract: Story 5 — Sidebar navigation and profile

**Epic:** Time Tracker — Nexus (02.1)  
**User Story:** [USER-STORIES-Time-Tracker-Nexus.md](USER-STORIES-Time-Tracker-Nexus.md) — Story 5  
**Screen:** 02.1 Time Tracker — Nexus (Figma node 12568-210659)

---

## 1. Angular Frontend

**Responsibilities**
- Render sidebar: app logo at top; main nav as icon-only items (e.g. clock/Time Tracker); one item active (purple-blue icon on light purple-blue rounded rectangle), others inactive (black outline on white). Bottom: user profile avatar (circular image). No notification or settings icons (out of scope per Epic).
- On load: current section (e.g. Time Tracker) shown as active in sidebar.
- Click inactive nav item → navigate to that section and set it active (highlight).
- Click already-active nav item → remain on section, keep highlighted (no other effect).
- Click profile avatar → navigate to profile page; profile page shows avatar, name, and related details (per Epic). **Profile data (avatar, name) is static as of now** (client/static; no backend).
- **Sidebar nav destinations:** Time Tracker and profile only; no other destinations.

**Visual structure (all elements present)**
- **Sidebar (functional):** App logo/brand (circular, purple-blue, white symbol); main nav icons (e.g. clock/stopwatch-style) — inactive (black outline on white), active (purple-blue on light purple-blue rounded rect); user profile avatar (circular image).
- **Header, Main Content (calendar, list, boards), Modals (Add Entry, entry detail, confirmation):** **Display-only or disabled** in this story; layout and elements present but navigation to/from and interactions are in Stories 1–4.

**Visual states**
- Active/Selected (sidebar): one nav item with purple-blue on light purple-blue rounded rect.
- Default: other nav items black outline on white.
- Profile page: avatar, name, and related details displayed.

**No invention**
- No code.

---

## 2. Node.js Backend

**Responsibilities**
- **No backend required for this story:** Profile page data (avatar, name) is static (client-side); no profile API needed as of now.

**No invention**
- No new APIs or business logic unless Product specifies profile data source.

---

## 3. PostgreSQL Database

**Responsibilities**
- **No profile storage in DB for this story:** Profile (avatar, name) is static; no database read required for profile as of now.

**No invention**
- No schema changes unless profile persistence is in scope.

---

## 4. Visual Structure Reference (Epic / UI Map)

**From Epic:** Sidebar — app logo; main nav (icon-only) with active state (purple-blue on light purple-blue rounded rect); profile avatar → profile page (avatar, name, etc.); notification and settings not in scope.

**From UI Map:** Sidebar — app logo/brand (circular, purple-blue, white symbol); main nav icons (clock/stopwatch-style) inactive (black outline) and active (purple-blue on light purple-blue rounded rect); user profile avatar (circular image).

**Display-only / disabled in this story:** Header (view toggle, week nav, date picker); calendar blocks; Add Entry form; entry detail pop-up; list edit/delete — present in layout but functionality in Stories 1–4.

---

## 5. Known Unknowns / NEEDS CLARIFICATION

- **Resolved:** No other sidebar nav destinations beyond Time Tracker and profile. Profile page avatar and name are static (client/static) as of now; no backend or DB required for profile.
