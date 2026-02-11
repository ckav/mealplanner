# Meal Planner App - Project Context

> **For AI assistants:** Start here. This file consolidates all requirements, decisions, and current state. Check referenced files for implementation details.

---

## Quick Links to Detail Files

| Document | Purpose |
|----------|---------|
| `MealPlannerApp/docs/requirements.md` | Full requirements document |
| `MealPlannerApp/design/wireframes/recipe_card_wireframe.md` | Recipe card & detail view wireframes |
| `MealPlannerApp/frontend/v2/` | Current HTML/CSS/JS prototype |
| `notes.md` | Original concept discussion (ChatGPT transcript) |
| `future_ideas.md` | Advanced features for later phases |

---

## Project Overview

### What Is This?
A **HelloFresh-style web app** for meal planning - without the subscription box. Users browse recipe cards, plan meals for the week, generate shopping lists, and cook with step-by-step guidance.

### Core Problem Being Solved
- HelloFresh is expensive for single-person households
- Meal kits waste money on redundant ingredients
- Recipe blogs are full of unnecessary fluff
- Need flexibility to shop from any supermarket
- Want cooking inspiration without repetition

### Target Users
- Single-person households (primary)
- Couples
- Families with complex dietary needs (allergies, preferences)

---

## Design Philosophy

### UX Principles
1. **Recipe book browsing experience** - Visual, inspiring, colourful cards you *want* to flip through
2. **Dietary restrictions are invisible** - Unsafe recipes filtered out, not flagged with warnings
3. **No blog fluff** - Clean recipe cards, straight to ingredients and method
4. **Flexible sourcing** - Not locked to any subscription or supermarket
5. **Portion control** - Scale recipes for 1-12 people intelligently

### Key Insight: Subtle Safety
> "My nephew hates that his restrictions - ordering from restaurant he's embarrassed by having to make triple sure the kitchen understands."

Allergen/dietary handling should be **invisible filtering**, not prominent warning badges. The unsafe recipes simply don't appear.

---

## Household & Profile System

### Concept
- **Profiles** = Individual people with their restrictions/preferences
- **Groups** = Named collections for meal planning scenarios

### Example Groups
| Group Name | People | Portions |
|------------|--------|----------|
| Everyone Home | All household members | 4 |
| Just Me | Single user | 1 |
| Couple Night | 2 adults | 2 |
| Kids Week | Parent + children | 3 |
| Full House Weekend | Everyone + guests | 6 |

### How Filtering Works
```
Household Defaults (always applied - e.g., no peanuts/sesame)
    ↓
Selected Group's Combined Restrictions
    ↓
Personal Preferences (optional)
    ↓
= Recipes You See (already safe, no warnings needed)
```

---

## Current Implementation State

### Completed (v2 Prototype)
- ✅ Recipe card grid with hover effects
- ✅ Filter pills (All, Quick, Vegetarian, Asian, Italian, Healthy, Fish)
- ✅ Sort options (Recently Added, Favourites, Never Tried, etc.)
- ✅ Recipe detail modal with ingredients & method
- ✅ Portion scaling in detail view
- ✅ "Add to Plan" modal with "Who's eating?" selection
- ✅ Favourite toggle
- ✅ Cooked count badge
- ✅ 8 sample recipes with full data

### Not Yet Built
- ⬜ Meal Planner / Weekly View
- ⬜ Shopping List generation
- ⬜ Cook Mode (step-by-step cooking)
- ⬜ Settings / Profile management
- ⬜ Recipe import (URL scraping)
- ⬜ Data persistence (currently in-memory only)

---

## App Sections (User Flow)

### 1. Recipe Browse (DONE)
**Purpose:** Discover and select recipes
**Location:** `MealPlannerApp/frontend/v2/`

**Features:**
- Card grid with visual meal cards
- Filters by cuisine, diet, cook time
- Sort by various criteria
- View recipe details
- Add to meal plan

### 2. Meal Planner / Weekly View (TO BUILD)
**Purpose:** See what's planned for the week, who's home

**Key Requirements:**
- Calendar-style week view (Mon-Sun)
- Track who's home each day
- Assign meals to days (primarily dinner, maybe lunch)
- Visual overview of the week
- Easy to rearrange/swap meals

**Questions to resolve:**
- Planning horizon (this week? 2 weeks?)
- Meals per day (dinner only? lunch + dinner?)

### 3. Shopping List (TO BUILD)
**Purpose:** Generate consolidated list from meal plan

**Key Requirements:**
- Auto-generated from selected meals
- Grouped by category (Protein, Veg, Dairy, Pantry)
- Tick off items already in pantry
- Quantities scaled to portions
- Export options (copy, send to supermarket)

### 4. Cook Mode (TO BUILD)
**Purpose:** Guided cooking experience

**Key Requirements:**
- Step-by-step instructions
- Ingredients sidebar (checkable)
- Timer integration per step
- Mark recipe as cooked when done
- Clean, distraction-free interface

### 5. Settings / Profiles (MVP+1)
**Purpose:** Manage household, preferences, display options

**Key Requirements:**
- Household members with dietary restrictions
- Groups for meal planning
- Display preferences (show/hide calories, cost, etc.)
- Default sort order

---

## Recipe Card Specification

### Card Elements (Visible)
| Element | Description |
|---------|-------------|
| Hero Image | Visual appeal, AI placeholder if needed |
| Favourite ♡ | Heart icon, top right |
| Cooked Count | "Made 5×" badge (optional, user preference) |
| Meal Name | Bold, appetizing title |
| Quick Info | Cook time, calories, servings, difficulty |
| Tags | Cuisine, diet labels (clickable to filter) |
| Source | Attribution with link if URL source |
| Actions | "View Recipe" + "+ Add" buttons |

### Card Interactions
| Area | Action |
|------|--------|
| Image / Title | Opens recipe detail view |
| ♡ | Toggles favourite |
| Tags | Filters by that tag |
| "View Recipe" | Opens detail modal |
| "+ Add" | Opens "Who's eating?" modal |

### Recipe Detail View
See full wireframe: `MealPlannerApp/design/wireframes/recipe_card_wireframe.md`

Key sections:
- Large hero image
- Ingredients grouped by category with checkboxes
- Live portion scaling
- Numbered method steps with timing
- Tips & personal notes
- Add to Plan button

---

## Recipe Data Structure

```javascript
{
    id: 'thai-green-curry',
    name: 'Thai Green Curry',
    image: 'url-or-path',
    cookTime: 25,              // minutes
    calories: 380,             // per serving
    servings: 4,               // base recipe yield
    difficulty: 'Easy',        // Easy | Medium | Challenging
    tags: ['Asian', 'Curry', 'Healthy'],
    cuisine: 'asian',          // for filtering
    source: {
        name: 'BBC Good Food',
        url: 'https://...',    // null for family recipes
    },
    favourite: true,
    timesCooked: 5,
    lastCooked: '2024-11-15',
    dateAdded: '2024-01-10',
    personalNote: 'Kids loved it - less chilli next time',

    ingredients: {
        protein: [
            { name: 'Chicken breast', amount: 400, unit: 'g', scalable: true }
        ],
        vegetables: [...],
        sauce: [...],
        pantry: [...]          // "you might have" items
    },

    steps: [
        { instruction: 'Cut chicken...', time: null },
        { instruction: 'Heat oil...', time: 2 }  // time in minutes
    ],

    tips: ['Use chicken thigh for more flavour', ...],

    // Hidden data for filtering
    allergens: {
        contains: ['fish sauce'],
        mayContain: [],
        freeFrom: ['peanuts', 'sesame', 'dairy', 'gluten']
    }
}
```

---

## Sorting Options

| Sort | Description | Use Case |
|------|-------------|----------|
| Recently Added | Newest first | What's new? |
| Recently Cooked | Last made date | Avoid repeats |
| Most Cooked | Times made (desc) | Find favourites |
| Never Tried | Cooked count = 0 | Inspiration |
| Family Favourites | Highest rated | Crowd pleasers |
| Quick & Easy | By cook time | Busy nights |
| Random / Surprise Me | Shuffled | Can't decide |

---

## Parked Features (MVP+1)

These are documented but not being built yet:

### Ingredient Pairing
Two approaches identified:
1. **Fridge-First:** "I have X, Y, Z - what can I make?"
2. **Shopping Suggestions:** "You're buying sour cream, these recipes also use it"

### Advanced Portion Scaling
- Pantry-aware (don't scale salt/oil)
- Smart rounding for practical shopping
- Pack size awareness

### AI Features
- Recipe suggestions based on history
- Seasonal ingredient awareness
- Weather-based recommendations

---

## Technical Notes

### Current Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Data:** In-memory JavaScript objects (no persistence yet)
- **No backend** - purely client-side MVP

### Future Stack (planned)
- **Database:** Airtable (schema defined in `MealPlannerApp/database/airtable/`)
- **Automation:** n8n for recipe scraping
- **APIs:** Tesco, Sainsbury's for shopping list export

### File Structure
```
recipe_planner/
├── PROJECT_CONTEXT.md          ← YOU ARE HERE
├── MealPlannerApp/
│   ├── frontend/
│   │   ├── v2/                 ← Current prototype
│   │   │   ├── index.html
│   │   │   ├── styles.css
│   │   │   ├── app.js
│   │   │   └── recipes.js
│   │   └── [old v1 files]
│   ├── design/
│   │   └── wireframes/
│   │       └── recipe_card_wireframe.md
│   ├── database/
│   │   └── airtable/
│   │       └── schema.json
│   └── docs/
│       ├── requirements.md
│       └── getting_started.md
├── notes.md                    ← Original concept chat
└── future_ideas.md             ← Advanced feature ideas
```

---

## What To Work On Next

1. **Meal Planner wireframe** - Weekly view, who's home tracking
2. **Shopping List wireframe** - Generated list, categories, export
3. **Cook Mode wireframe** - Step-by-step cooking interface
4. **Build HTML/CSS** for above sections
5. **Connect sections** - Navigation between views

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| Web app, not native | Simpler, cross-platform, no app store |
| Vanilla JS for MVP | No build step, fast iteration |
| Allergens filtered not flagged | Respect user dignity, invisible safety |
| Groups not individuals for portion | Simpler UX, covers 90% of cases |
| Ingredient pairing parked | Need core experience working first |
| No user accounts for MVP | Focus on functionality first |

---

## How To Use This File

### For AI Assistants
1. Read this file first for context
2. Check referenced wireframes/docs for details
3. Look at `MealPlannerApp/frontend/v2/` for current code
4. Follow existing patterns when adding features

### For Humans
1. Update this file when making major decisions
2. Keep wireframes in sync with implementation
3. Mark completed items in "Current Implementation State"

---

*Last updated: 2024-11-29*
