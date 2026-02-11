# CLAUDE.md — Meal Planner App

> This file provides context for Claude Code when working on this project.

## What This Project Is

A meal planning app that replaces HelloFresh-style meal kit services with the convenience of guided meal planning but the economy and flexibility of doing your own grocery shopping. Built for a solo cook first, but designed to support families with complex dietary needs (including a nephew with milk/egg allergies where baked forms are tolerable).

**The core experience**: The "dopamine of choosing" — browsing and selecting meals should feel as satisfying as scrolling through a takeaway app, not like homework.

## Tech Stack

- **Frontend**: Flutter (Dart)
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Target platforms**: iOS (Apple Developer account pending) + Android
- **Development environment**: Windows, VS Code

## Project Structure

```
C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\
├── MealPlannerApp/
│   ├── frontend/
│   │   └── v2/                    # Current HTML/JS prototype (reference only)
│   │       ├── index.html
│   │       ├── styles.css
│   │       ├── app.js
│   │       └── recipes.js         # Sample recipe data
│   └── docs/
│       ├── FEATURE_INVENTORY.md   # All features by category with MVP phases
│       ├── PROJECT_OBJECTIVES.md  # User personas, pain points, success metrics
│       ├── MEAL_PLANNER_WEEKLY_VIEW_SPEC.md  # Weekly planner grid spec
│       ├── getting_started.md
│       └── requirements.md
├── olderMealPlanner/              # Earlier prototype (has timer, pantry, Tesco integration)
├── FEATURE_COMPARISON_ANALYSIS.md # Comparison of v2 vs older prototype
├── FUTURE_IDEAS_PARKING_LOT.md    # Low-priority ideas (chef licensing, etc.)
└── CLAUDE.md                      # ← This file
```

## Current State

**What exists**: An HTML/CSS/JS prototype (v2) with recipe browsing, shopping list generation, cooking guidance, and sample recipe data in `recipes.js`. This is a **reference prototype only** — the real app will be built in Flutter.

**What's NOT built yet**: The Flutter app itself. We are starting from scratch in Flutter, using the HTML prototype and documentation as the spec.

## Design Principles

1. **Solo-first, family-ready** — Design for 1-person households, but the data model supports families from day one
2. **The dopamine of choosing** — Recipe selection should feel rewarding (beautiful cards, satisfying interactions), inspired by takeaway app browsing UX
3. **Fresh & whole food focus** — Prioritise recipes with fresh, non-processed ingredients; differentiate from meal kits with packet sauces
4. **Invisible allergies** — Once configured, don't show what you can't eat; just show what you can. Safety without constant reminders
5. **Flexible, not prescriptive** — Support 3 dinners or 14 meals; allow skipping, changing, adapting
6. **Prevent the hungry supermarket trip** — Plan ahead so you buy smart, not impulsive

## MVP Scope (Phase 1 — Build This First)

### 1. Recipe Browsing
- Recipe cards with image, title, cook time, difficulty, tags
- Search and filter (cuisine, cooking time, ingredients, dietary)
- Favourites
- Horizontally scrollable filter chips, bottom-sheet dropdowns for multi-select
- "Relax filters" prompt when too restrictive (no results)

### 2. Recipe Detail & Cook Mode
- Full recipe view with ingredients list and method
- Portion scaling (1-6+ servings) — ingredients recalculate
- Step-by-step cook mode with timers
- "Mark as cooked" tracking

### 3. Weekly Planner (see `docs/MEAL_PLANNER_WEEKLY_VIEW_SPEC.md` for full spec)
- 7-day grid with Main Meal + 2 Extra Meal columns
- "X of Y meals selected" counter
- Empty states: "Click to add" (main) / "Not needed" (extras)
- Skip functionality with undo
- Recipe picker modal when clicking a slot
- Week navigation (prev/next)

### 4. Shopping List
- Auto-generated from meal plan
- Combines duplicate ingredients across recipes
- Groups by supermarket aisle/category
- Three-tier pantry system: Always Have (excluded), Check First (verify before shopping), Buy as Needed (normal)
- Supermarket links (Tesco, Sainsbury's, ASDA, Ocado)

### 5. Basic Settings
- Portion defaults
- Dietary preferences
- Planning horizon preference

## Post-MVP Features (Don't Build Yet)

- Full allergy management with "may contain" tolerance levels and baked-form distinctions
- Family profiles with per-person dietary restrictions
- "Cooking for who" per-day override on planner
- Pantry management with expiry date tracking
- Nutritional insights dashboard (observations not prescriptions)
- Ingredient overlap detection
- Smart leftover suggestions
- Weekend prep mode
- Seasonal produce optimisation
- Dynamic supermarket price integration
- Chef recipe licensing marketplace
- Drag and drop on planner

## Allergy System Design (for when we build it)

Goes beyond UK's 14 regulated allergens to include: nightshades, alliums, FODMAPs, histamine intolerance, coeliac disease.

Key feature: per-allergen "may contain" tolerance with three levels:
- **Strict Avoidance**: exclude recipes with allergen OR "may contain"
- **Ingredient Only**: exclude direct ingredients, allow "may contain" (e.g., nephew's milk tolerance)
- **Flag Only**: show warning but don't filter

Also supports **baked form tolerance** — e.g., can't have raw egg but baked egg in cakes is fine.

## Data Model (Firestore)

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

The project folder contains screenshots from competitor apps used as UX inspiration:
- **HelloFresh**: Recipe card layouts, recipe browsing with large images, "Customise" option, basket/counter pattern
- **Deliveroo**: Horizontally scrollable category icons, filter chips (Offers, Under 30 min, Pickup), bottom-sheet sort/filter modals, dietary filter checkboxes
- **Gousto**: Recipe cards with cook time + calories, +/- portion counter on cards, "View basket" with item count, "Still deciding? Keep browsing" prompt

Key patterns to replicate:
- Chunky tappable interfaces with generous touch targets
- Visual categorisation with emojis/icons
- Progressive disclosure (don't overwhelm)
- Smart filter memory (remember frequently used filters)
- Curated content rails (horizontally scrollable themed collections)

## Coding Conventions

- Use British English in all user-facing text (colour, favourite, organised, etc.)
- Follow Flutter/Dart style conventions (camelCase for variables, PascalCase for classes)
- Organise Flutter code: `/lib/models/`, `/lib/screens/`, `/lib/services/`, `/lib/widgets/`
- Keep widgets small and composable
- Use Provider or Riverpod for state management (decide and stick with one)
- Write code comments for complex business logic (especially allergy filtering)

## Monetisation (Low Priority)

Free or very low entry fee (~99p). Primary revenue via affiliate rewards (e.g., supermarket delivery referral links). Hosting costs expected to be low initially. Mid-term revenue planning needed post-launch.

## Key Commands

```bash
# Create Flutter project (if not yet done)
flutter create meal_planner

# Run on connected device/emulator
flutter run

# Run tests
flutter test

# Build for iOS
flutter build ios

# Build for Android
flutter build apk
```

## Important Notes

- The HTML prototype in `frontend/v2/` is reference only — don't modify it, build in Flutter
- `recipes.js` contains sample recipe data that should be migrated to Firestore
- The older prototype in `olderMealPlanner/` has features (timer, pantry check, Tesco integration) not yet in v2 — use as reference
- All documentation in `docs/` folder is the source of truth for feature specs
- When in doubt about a feature, check `FEATURE_INVENTORY.md` and `PROJECT_OBJECTIVES.md`
