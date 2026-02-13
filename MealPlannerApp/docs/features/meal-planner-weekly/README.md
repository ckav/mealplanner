# Meal Planner — Weekly View

The core weekly planning interface. A grid of days × meal slots where users build their week's meals, with Cook Forward chain suggestions, skip/leftovers support, and integration with shopping lists and cook mode.

**Location:** `docs/features/meal-planner-weekly/`

**Documentation:**
- 📖 [README.md](./README.md) - This file — feature overview
- 📋 [MEAL_PLANNER_WEEKLY_VIEW_SPEC.md](../cook-forward/MEAL_PLANNER_WEEKLY_VIEW_SPEC.md) - Full specification (layout, states, data model, acceptance criteria)

**Status:** 📐 Core spec complete — Phase 1 (MVP grid) through Phase 7 (Cook Forward intelligence) defined

**Related wireframes:**
- `cook-forward/cook-forward-wireframe.html` — Shows weekly view with chain badges and linked meals
- Sort My Week wireframe (separate feature, guided planning flow)

---

## What It Does

### Core Grid
- 7 days (Mon–Sun) × 3 meal columns (Main Meal + 2 Extra Meals)
- Meal counter: "X of Y meals selected" — updates dynamically
- Navigation: previous/next week, configurable planning horizon

### Meal Slot States
1. **Empty** (main) — dashed border, "Click to add" + Skip button
2. **Empty** (extra) — subtle "+" and "Not needed" (no expectation to fill)
3. **Filled** — recipe thumbnail, name, cook time, portions badge
4. **Filled with Cook Forward link** — adds 🔗 chain badge (e.g., "Uses Sun's chicken")
5. **Skipped** — greyed out, "Eating out" / "Leftovers" label, undo option
6. **Empty with freezer suggestion** — surfaces frozen items on unplanned days

### Recipe Picker Modal
- Opens with context (which day/slot)
- Search bar + quick filter chips (Under 20 min, Favourites, 🔗 Cook Forward, Recent)
- **Cook Forward suggestion panel** at top when chain opportunities exist
- Standard recipe grid below
- Portion selector + "Add to Plan" confirmation

### Cook Forward Integration
- 🔗 chain badges on linked meal cards
- Chain connector lines between linked adjacent days
- Chain confirmation screen showing full chain + time saved
- Graceful degradation: removing anchor meal makes linked meals standalone

---

## Implementation Phases

| Phase | Scope | Status |
|-------|-------|--------|
| Phase 1 (MVP) | Static grid, empty states, meal counter, basic recipe picker | 🔲 |
| Phase 2 | Skip, portions, week nav, shopping list integration | 🔲 |
| Phase 3 | "Cooking for who" per-day, drag & drop, custom horizon, mobile view | 🔲 |
| Phase 4 | Cook Forward foundations: recipe metadata, chain badges, suggestion panel | 🔲 |
| Phase 5 | Cook Forward cook mode: pre-cooking checklist, mid-cooking nudges | 🔲 |
| Phase 6 | Cook Forward freezer stash: inventory, prompts, empty-day suggestions | 🔲 |
| Phase 7 | Cook Forward intelligence: learning, seasonal chains, weekly chain plans | 🔲 |

---

## Data Model

Core objects defined in the spec:

- **Meal Plan** — `weekStartDate`, `horizon`, `defaultGroup`, `days[]`
- **Day** — `date`, `dayName`, `groupOverride`, `slots[]`
- **Slot** — `slotType`, `status`, `recipeId`, `portions`, `cookForward` (chain link data)
- **Recipe.cookForward** — `yields[]`, `consumes[]`, `shareablePrep[]`, `freezer{}`
- **FreezerItem** — `recipeId`, `frozenDate`, `portions`, `expiryDate`, `status`

See [MEAL_PLANNER_WEEKLY_VIEW_SPEC.md](../cook-forward/MEAL_PLANNER_WEEKLY_VIEW_SPEC.md) for full data structures and TypeScript interfaces.

---

## Related Features

- [Cook Forward](../cook-forward/) — Linked meals, prep nudges, freezer stash (integrates deeply into this view)
- [Allergen Filter](../allergen-filter/) — Recipe picker filters by dietary restrictions; Cook Forward suggestions respect these
- Sort My Week (future feature folder) — Guided planning flow that feeds into this weekly view
- Shopping List (future) — Auto-generated from the weekly plan, with Cook Forward savings
