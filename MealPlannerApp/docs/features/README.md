# Features Documentation

Central location for all feature documentation in the Meal Planner application. Each feature has its own folder with consistent documentation structure.

## Features List

### 1. [Allergen Filter](./allergen-filter/)
Comprehensive allergen filtering system supporting the 16 European allergens.

**Location:** `docs/features/allergen-filter/`

**Documentation:**
- 📖 [README.md](./allergen-filter/README.md) - Feature overview & quick start
- 📋 [ALLERGEN_FEATURE_GUIDE.md](./allergen-filter/ALLERGEN_FEATURE_GUIDE.md) - Detailed feature guide

**Status:** ✅ Complete and tested

**Quick Facts:**
- 16 EU allergens supported
- Quick filter panel for instant use
- Family profile allergen preferences
- Automatic ingredient scanning
- localStorage persistence

---

### 2. [Meal Planner — Weekly View](./meal-planner-weekly/)
The core weekly planning interface — a grid of days × meal slots where users build their week's meals.

**Location:** `docs/features/meal-planner-weekly/`

**Documentation:**
- 📖 [README.md](./meal-planner-weekly/README.md) - Feature overview & phase summary
- 📋 [MEAL_PLANNER_WEEKLY_VIEW_SPEC.md](./meal-planner-weekly/MEAL_PLANNER_WEEKLY_VIEW_SPEC.md) - Full specification (layout, states, data model, acceptance criteria, Cook Forward integration)

**Status:** 📐 Design complete — Phases 1–7 defined

**Quick Facts:**
- 7-day grid with 3 configurable meal columns
- Meal counter ("X of Y meals selected")
- 6 slot states: empty, empty-extra, filled, filled-with-chain, skipped, empty-with-freezer-suggestion
- Recipe picker with search, filters, and Cook Forward suggestion panel
- "Cooking for who" per-day dietary filtering
- Cook Forward chain badges and connector lines integrated into the grid

---

### 3. [Cook Forward](./cook-forward/)
Linked meal system where today's cooking effort makes tomorrow easier. Three layers: micro-prep nudges, intentional meal pivots, and freezer stash insurance.

**Location:** `docs/features/cook-forward/`

**Documentation:**
- 📖 [README.md](./cook-forward/README.md) - Feature overview, design principles, starter chains
- 📋 [COOK_FORWARD_SPEC.md](./cook-forward/COOK_FORWARD_SPEC.md) - Full implementation specification (data models, algorithms, acceptance criteria)
- 🖥️ [cook-forward-wireframe.html](./cook-forward/cook-forward-wireframe.html) - Tappable HTML prototype (7 screens, persona switching: Claire solo / Luciana family)

**Status:** 📐 Design complete — ready for implementation (Phase 4+ in meal planner roadmap)

**Quick Facts:**
- Layer 1: "While You're At It" — micro-prep nudges in cook mode (zero extra activation energy)
- Layer 2: "Intentional Pivots" — linked meals during planning (1 chicken → 3 different meals)
- Layer 3: "Future-Me Insurance" — freezer stash with expiry tracking and recipe suggestions
- ADHD-friendly design: always skippable, no guilt, graceful degradation, visible time-saved rewards
- 5 starter recipe chains defined (roast chicken, bolognese, curry base, rice, roast veg)
- Respects all dietary restrictions via "who's eating" per-day filtering

---

### Future Features (documented but not yet specced)
- **Sort My Week** — Guided planning flow (wireframe exists, feature folder TBD)
- **Use It Up** — Perishable ingredient management (wireframe exists, feature folder TBD)
- **Shopping List** — Auto-generated from weekly plan with Cook Forward savings
- **Cook Mode** — Step-by-step cooking interface with Cook Forward nudges
- **Freezer Stash** — Standalone view (part of Cook Forward, may get own feature folder)

See [future_ideas.md](./future_ideas.md) for longer-term concepts (AI recipe processing, advanced portion scaling).

---

## Adding New Features

When creating a new feature, follow this structure:

```
features/
├── feature-name/
│   ├── README.md              # Overview and quick links
│   ├── FEATURE_SPEC.md        # Detailed specifications
│   └── [OPTIONAL]
│       ├── wireframe.html     # Tappable HTML prototype
│       ├── IMPLEMENTATION.md  # Developer/technical docs
│       ├── USER_GUIDE.md      # User-facing documentation
│       └── EXAMPLES.md        # Code examples
```

### README.md Template
- Feature name and description
- Quick links to other docs in the folder
- Status indicator (✅ Complete / 📐 Design complete / 🔲 Not started)
- Brief overview of what it does
- Dependencies on other features
- Related features

### FEATURE_SPEC.md Template
- Implementation-ready specification
- Data models (TypeScript interfaces)
- Acceptance criteria (checkboxes)
- Visual design tokens (colours, typography)
- Algorithm descriptions where needed

---

## Related Documentation

Core documentation for the entire project:
- [PROJECT_OBJECTIVES.md](../PROJECT_OBJECTIVES.md) - Project goals and user personas
- [FEATURE_INVENTORY.md](../FEATURE_INVENTORY.md) - Complete feature list
- [FEATURE_PRIORITY_MATRIX.md](../FEATURE_PRIORITY_MATRIX.md) - Priority and effort matrix
- [requirements.md](../requirements.md) - Functional and non-functional requirements
- [getting_started.md](../getting_started.md) - Getting started guide
- [RECIPE_FILTER_SEARCH_SPEC.md](../RECIPE_FILTER_SEARCH_SPEC.md) - Recipe filtering/search spec
- [RECIPE_ADD_EDIT_UX.md](../RECIPE_ADD_EDIT_UX.md) - Recipe add/edit UX spec
