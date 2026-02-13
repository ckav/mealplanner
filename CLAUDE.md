# CLAUDE.md — Meal Planner App

> This file provides context for Claude Code when working on this project.

## What This Project Is

A meal planning app that replaces HelloFresh-style meal kit services with the convenience of guided meal planning but the economy and flexibility of doing your own grocery shopping. Built for a solo cook first, but designed to support families with complex dietary needs (including a nephew with milk/egg allergies where baked forms are tolerable).

**The core experience**: The "dopamine of choosing" — browsing and selecting meals should feel as satisfying as scrolling through a takeaway app, not like homework.

## Tech Stack & Roadmap

- **Current**: HTML5, CSS3, Vanilla JavaScript (v3 prototype)
- **Data persistence**: localStorage (client-side only)
- **Current phase**: User testing with the v3 prototype
- **Next phase**: Work out hosting (likely PWA or static hosting)
- **Future goal**: App stores (Google Play, potentially iOS) — approach TBD (Flutter, PWA wrapper, etc.)

## Project Structure

```
mealplanner/
├── MealPlannerApp/
│   ├── frontend/
│   │   ├── v3/                        # ← CURRENT prototype (this is the app)
│   │   │   ├── index.html             # Main app shell (4 views, 6 modals)
│   │   │   ├── app.js                 # Application logic (1,530 lines)
│   │   │   ├── recipes.js             # 13 sample recipes with full data
│   │   │   ├── styles.css             # Design system & responsive styles
│   │   │   └── recipe-filter-preview.html  # Filter UX preview
│   │   ├── v2/                        # Earlier prototype (reference only)
│   │   │   ├── index.html, app.js, recipes.js, styles.css
│   │   │   └── features/recipe-editor/  # Recipe editor feature (v2 only)
│   │   ├── index.html                 # v1 entry point
│   │   ├── css/                       # v1 styles
│   │   └── js/                        # v1 scripts
│   ├── docs/
│   │   ├── FEATURE_INVENTORY.md       # All features by category with MVP phases
│   │   ├── PROJECT_OBJECTIVES.md      # User personas, pain points, success metrics
│   │   ├── MEAL_PLANNER_WEEKLY_VIEW_SPEC.md  # Weekly planner grid spec
│   │   ├── FEATURE_PRIORITY_MATRIX.md # Priority classification
│   │   ├── RECIPE_FILTER_SEARCH_SPEC.md  # Search/filter spec
│   │   ├── ALLERGY_UX_WIREFRAME.md    # Allergy UI spec
│   │   ├── RECIPE_ADD_EDIT_UX.md      # Recipe editing spec
│   │   ├── requirements.md
│   │   ├── getting_started.md
│   │   └── features/                  # Detailed feature docs
│   ├── database/airtable/             # Schema definitions (for future backend)
│   ├── backend/n8n_workflows/         # Recipe scraper workflow skeleton
│   └── design/wireframes/             # UI wireframes
├── archive/                           # Superseded prototypes & docs (reference only)
├── FEATURE_COMPARISON_ANALYSIS.md     # Comparison across all prototype versions
├── CLAUDE.md                          # ← This file
└── .github/copilot-instructions.md
```

## Current State (v3 Prototype — Feb 2026)

**Location**: `MealPlannerApp/frontend/v3/`

The v3 prototype is a fully functional single-page app with four main views and six modals. Open `index.html` in a browser to run it.

### What's working

- **Weekly Planner**: 7-day grid (Main Meal + 2 Extra Meals), week navigation, "X of Y meals planned" counter, skip/undo, drag & drop move/swap
- **Recipe Browsing**: Recipe cards with images, 12 filter types (cuisine, time, dietary, allergens, dislikes, fridge items, favourites), 5 sort options, "no results" message
- **Recipe Detail**: Full recipe view with ingredients, method, allergen badges, source attribution
- **Recipe Picker**: Modal for adding meals to plan slots, with search, filters, portion selector, per-meal ingredient exclusions, swap notes
- **Cook Mode**: Full-screen step-by-step cooking with ingredient checklist, countdown timer with alerts, step navigation, "mark as cooked" tracking
- **Shopping List**: Auto-generated from meal plan, ingredient aggregation across recipes, grouped by category, pantry-aware (staples excluded), copy to clipboard, supermarket search links (Tesco, Sainsbury's, ASDA, Ocado)
- **Pantry Staples**: Editable list of always-have items, excluded from shopping list, "required" highlighting when a planned recipe needs them
- **Family Profiles**: Create profiles with allergens (UK 14) + dislikes, toggle active/inactive, quiet safety filtering (unsafe recipes just don't appear)
- **Allergen Detection**: Auto-detects allergens from ingredient names using keyword matching
- **Fridge Matching**: "What's in my fridge" — add items, filter to recipes using those ingredients
- **Add Recipe**: Manual entry modal (name, image, time, servings, difficulty, cuisine, tags, ingredients, steps, source)
- **Persistence**: All state saved to localStorage
- **Responsive Design**: Mobile breakpoints for all views

### Still to polish

- Per-day "Cooking for" + portion overrides (partially wired — select exists but doesn't affect individual days)
- v2 recipe editor parity (URL import, advanced fields — v2 has a richer editor in `v2/features/recipe-editor/`)
- Booking-style filter UX refinement (bottom-sheet approach)
- "Relax filters" prompt when filters are too restrictive

## Design Principles

1. **Solo-first, family-ready** — Design for 1-person households, but the data model supports families from day one
2. **The dopamine of choosing** — Recipe selection should feel rewarding (beautiful cards, satisfying interactions), inspired by takeaway app browsing UX
3. **Fresh & whole food focus** — Prioritise recipes with fresh, non-processed ingredients; differentiate from meal kits with packet sauces
4. **Invisible allergies** — Once configured, don't show what you can't eat; just show what you can. Safety without constant reminders
5. **Flexible, not prescriptive** — Support 3 dinners or 14 meals; allow skipping, changing, adapting
6. **Prevent the hungry supermarket trip** — Plan ahead so you buy smart, not impulsive

## Post-MVP Features (Don't Build Yet)

- Full allergy management with "may contain" tolerance levels and baked-form distinctions
- Pantry management with expiry date tracking
- Nutritional insights dashboard (observations not prescriptions)
- Ingredient overlap detection
- Smart leftover suggestions
- Weekend prep mode
- Seasonal produce optimisation
- Dynamic supermarket price integration
- Chef recipe licensing marketplace

## Allergy System Design (for when we build it)

Goes beyond UK's 14 regulated allergens to include: nightshades, alliums, FODMAPs, histamine intolerance, coeliac disease.

Key feature: per-allergen "may contain" tolerance with three levels:
- **Strict Avoidance**: exclude recipes with allergen OR "may contain"
- **Ingredient Only**: exclude direct ingredients, allow "may contain" (e.g., nephew's milk tolerance)
- **Flag Only**: show warning but don't filter

Also supports **baked form tolerance** — e.g., can't have raw egg but baked egg in cakes is fine.

## Data Model (for future backend)

```
users/
  {userId}/
    profile: { name, email, defaultPortions, dietaryPreferences }
    allergies: { allergenId: { level: 'strict'|'ingredient'|'flag', bakedFormOk: bool } }
    pantry: { itemId: { status: 'alwaysHave'|'checkFirst', expiryDate?, openedDate? } }

recipes/
  {recipeId}/
    name, image, cookTime, calories, servings, difficulty
    tags[], cuisine, source: { name, url }
    ingredients: [{ name, amount, unit, category, prep? }]
    steps: [{ text, time? }]
    allergens: []  // auto-derived from ingredients

mealPlans/
  {userId}/
    {weekId}/
      weekStartDate, horizon, defaultGroup
      days: [{ date, slots: [{ slotType, status, recipeId, portions }] }]

shoppingLists/
  {userId}/
    {weekId}/
      items: [{ name, amount, unit, category, recipeIds[], checked }]
```

## UX References

Inspiration from competitor apps:
- **HelloFresh**: Recipe card layouts, large images, "Customise" option, basket/counter pattern
- **Deliveroo**: Horizontally scrollable category icons, filter chips, bottom-sheet sort/filter modals, dietary filter checkboxes
- **Gousto**: Recipe cards with cook time + calories, +/- portion counter, "View basket" with item count

Key patterns to replicate:
- Chunky tappable interfaces with generous touch targets
- Visual categorisation with emojis/icons
- Progressive disclosure (don't overwhelm)
- Smart filter memory (remember frequently used filters)
- Curated content rails (horizontally scrollable themed collections)

## Coding Conventions

- Use British English in all user-facing text (colour, favourite, organised, etc.)
- Current codebase is vanilla JS — keep functions focused, use event delegation
- CSS uses custom properties (design tokens in `:root`), BEM-ish class naming
- State is managed in a single `state` object with `saveState()`/`loadState()` for persistence
- Recipe data lives in `recipes.js` as a plain array of objects
- Write code comments for complex business logic (especially allergy filtering)

## Monetisation (Low Priority)

Free or very low entry fee (~99p). Primary revenue via affiliate rewards (e.g., supermarket delivery referral links). Hosting costs expected to be low initially. Mid-term revenue planning needed post-launch.

## Key Commands

```bash
# Open the current prototype
open MealPlannerApp/frontend/v3/index.html

# Or serve locally (avoids CORS issues with some features)
cd MealPlannerApp/frontend/v3 && python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Important Notes

- The v3 prototype in `frontend/v3/` is the current app — this is what users will test
- The v2 prototype in `frontend/v2/` has a richer recipe editor (URL import, advanced fields) not yet ported to v3
- `recipes.js` contains 13 sample recipes — will need real recipe content for user testing
- All documentation in `docs/` folder is the source of truth for feature specs
- When in doubt about a feature, check `FEATURE_INVENTORY.md` and `PROJECT_OBJECTIVES.md`
- The `archive/` folder contains superseded prototypes and docs — reference only, don't modify
