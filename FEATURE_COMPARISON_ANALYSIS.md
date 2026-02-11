# Meal Planner App - Feature Comparison Analysis

## Overview
This document compares three versions of the Meal Planner application:
1. **Old Version** - `olderMealPlanner/MealPlannerApp/frontend/`
2. **Current v2** - `MealPlannerApp/frontend/v2/`
3. **Root Index** - `index.html` (standalone prototype with advanced features)

**New Prototype**: **v3 merged prototype** - `MealPlannerApp/frontend/v3/`

---

## FEATURES IN OLD VERSION (olderMealPlanner)

### ✅ Core Views
- **Meals Selection View** - Grid-based meal selection with cards
- **Shopping List View** - Aggregate shopping list from selected meals
- **Recipe/Cook View** - Detailed recipe display with cooking instructions

### ✅ Filtering & Sorting (Meals Selection)
- Filter by: All, Quick (<20 mins), Vegetarian, Fish, Asian, Italian, Healthy (Low Cal)
- Simple button-based filtering

### ✅ Shopping List Features
- **Pantry Check** - Pre-populated pantry items to exclude from shopping list
  - Hard-coded common pantry items (olive oil, salt, pepper, garlic, soy sauce, rice vinegar, sesame oil, honey)
  - Click items to toggle as "already have"
  - Excluded items removed from shopping list
- **Export List** - Copy list to clipboard
- **Supermarket Integration** - "Send to Tesco" button

### ✅ Recipe View
- Dropdown selector to choose meals to cook
- Display ingredients for selected meal
- Display cooking steps
- **Timer Controls** - Start/reset timer for cooking
- Recipe metadata (name, time, calories, etc.)

### ✅ UI/UX Features
- Header with meal count display
- Portions selector (input field for custom portions)
- Tab-based navigation with keyboard shortcuts (Ctrl+1, Ctrl+2, Ctrl+3)
- Meal cards with icon, name, cooking time, and calories

### ✅ Data Persistence
- localStorage support for selected meals

---

## FEATURES IN CURRENT v2 (MealPlannerApp/frontend/v2/)

### ✅ Core UI
- **Modern Card Layout** - Recipe cards with images and metadata
- **Modal System** - Recipe detail view in modal overlay
- **Filter Bar** - Advanced filtering and sorting options
- **Header** with action buttons

### ✅ Recipe Management
- **Add Recipe Button** - Ability to add new recipes
- **Edit Recipe** - Modal footer has "Edit" button for recipes
- **Recipe Cards** - Display recipe image, name, cooking time, calories, servings, difficulty, tags, and source

### ✅ Advanced Filtering & Sorting
- **Cooking For Selector** - Dropdown: Everyone Home (4), Just Me (1), Couple Night (2), Custom
- **Filter Pills** - All, Under 20m, Vegetarian, Asian, Italian, Healthy, Fish
- **Sort Options** - Recently Added, Family Favourites, Never Tried, Recently Cooked, Quick & Easy, Surprise Me

### ✅ Meal Plan Management
- **Add to Meal Plan Button** - Add recipes to meal plan
- **Meal Plan Summary** - Display "X meals planned" in header
- **Plan Count** - Track number of meals in plan

### ✅ Shopping & Inventory Features
- **Grocery List Button** - Access grocery/shopping list from header
- **What's in My Fridge** - Dedicated feature to check available ingredients
- **Allergen Filter** - Filter recipes by allergen restrictions

### ✅ Recipe Features
- **Favourites System** - Heart icon to favorite recipes
- **Times Cooked Badge** - Display "Made X times" when recipe has been cooked
- **Share Button** - Share recipes (modal action)
- **Recipe Source Attribution** - Display where recipe comes from (URL + name)

### ✅ Advanced Features
- **Recipe Editor v2** - Separate CSS and JS files for recipe editing
- **Lazy Loading** - Images use lazy loading for performance
- **Modal System** - Detailed recipe modal with multiple views
- **Settings Button** - Access settings/configuration

### ❌ Missing Features from Old Version
- ❌ Timer controls
- ❌ Portions selector visible on main screen
- ❌ Dedicated "Cook" view with step-by-step instructions
- ❌ Copy shopping list to clipboard
- ❌ Supermarket integration (Tesco)
- ❌ Pantry check feature

---

## FEATURES IN ROOT INDEX.HTML (Advanced Prototype)

### ✅ Weekly Meal Planning
- **Weekly Planner View** - 7-day meal plan with 2 meals per day (14 meals total)
- **Visual Daily Grid** - Shows breakfast and lunch for each day
- **Drag & Drop Ready** - Structure suggests D&D capability

### ✅ Advanced Filtering & Search
- **Cuisine Filter** - Dropdown: All, Mexican, Indian, British, Italian, Asian
- **Cook Time Filter** - Dropdown: Any, 15 mins, 30 mins, 45 mins, 60 mins
- **Allergen Filter** - Advanced section with allergen checkboxes (multi-select)
- **Favourites Only** - Checkbox to show only favorite recipes
- **Filter Reset** - Button to reset all filters

### ✅ Family Profiles with Allergens
- **Profile Management** - Create multiple family profiles
- **Active Profiles** - Display which profiles are currently selected/active
- **Per-Profile Allergens** - Each profile can have custom allergen restrictions
- **Per-Profile Dislikes** - Each profile has preference for disliked foods
- **Allergen Checkboxes UI** - Grid layout with scrollable allergen list for profiles

### ✅ Recipe Management
- **Add Recipe from URL** - Fetch and parse recipes from URLs
- **Manual Recipe Entry** - Form to manually add recipes:
  - Recipe name
  - Default servings
  - Ingredients (comma-separated)
  - Instructions (line-by-line)
- **Recipe Cards** - Display in responsive grid (1/2/3 columns)
- **Modal Recipe View** - Click recipe to view details in modal with:
  - Recipe name
  - Ingredients list
  - Instructions (numbered steps)
  - Portion controls (±/- buttons)
  - Stats bar (calories, cook time, servings, difficulty, allergens)
  - Allergen icons display
  - Source information

### ✅ Shopping List Features
- **Shopping List Tab** - Dedicated view for shopping list
- **Aggregated Ingredients** - Combine ingredients from selected meals
- **Copy List** - Copy entire list to clipboard
- **Clear Plan** - Clear all selected meals and shopping list
- **Shopping List Persistence** - Display and update as recipes are selected

### ✅ Pantry Management
- **Pantry List** - Manual pantry inventory
- **Add Pantry Item Form** - Input field to add pantry items
- **Remove Items** - Able to remove items from pantry
- **Shopping List Integration** - Pantry items excluded from shopping list

### ✅ Tab Navigation
- **Weekly Plan Tab** - View 7-day meal plan
- **Recipes Tab** - Browse and select recipes with filters
- **Shopping List Tab** - View shopping list
- **Settings Tab** - Profile and recipe management

### ✅ Advanced Features
- **Settings Tab** - Dedicated section for:
  - Recipe management
  - Profile management (left side)
  - Pantry management (right side)
- **Recipe Fetching** - Capability to fetch recipes from URLs
- **Responsive Design** - Tailwind CSS grid system (1/2/3 columns)
- **Modal System** - Recipe detail modals with interaction

### ❌ Missing Features
- ❌ Timer controls
- ❌ Cooking instructions view (step-by-step with highlights)
- ❌ Portions multiplier for shopping list
- ❌ Meal counts by day in planner view
- ❌ Drag & drop meal assignment
- ❌ Quick-access favorite meals

---

## FEATURES IN v3 MERGED PROTOTYPE (MealPlannerApp/frontend/v3/)

### ✅ Core Coverage
- Weekly planner grid with 3 slots/day + skip/undo
- Drag & drop move/swap meals between days
- Recipe cards + favourites + times cooked
- Recipe detail modal + cook mode + step timer
- Shopping list + copy + supermarket search
- Pantry staples persisted + required highlight + quantity hints
- Family profiles with allergens + dislikes
- Quiet safety filters (multi-select chips)
- Fridge items + optional filter
- Manual add recipe modal
- Long-press add-to-plan (choose day/slot)
- Per-meal exclusions + swap notes (excludes from shopping list)

### ⚠️ Partial / Missing
- v2 recipe editor parity (advanced fields, URL import)
- Per-day “Cooking for” and portion overrides in planner
- Booking-style filters UX polish
- Mobile drag & drop UX polish

---

## CRITICAL FEATURES MISSING FROM v2 THAT EXIST IN OTHER VERSIONS

| Feature | Old | v2 | Root | Priority |
|---------|-----|----|----|----------|
| **Weekly Meal Planner** | ❌ | ❌ | ✅ | **HIGH** |
| **Family Profiles** | ❌ | ❌ | ✅ | **HIGH** |
| **Per-Profile Allergens** | ❌ | ❌ | ✅ | **HIGH** |
| **Pantry Management** | ✅ | ❌ | ✅ | **HIGH** |
| **Recipe Fetching from URL** | ❌ | ❌ | ✅ | **MEDIUM** |
| **Timer Controls** | ✅ | ❌ | ❌ | **MEDIUM** |
| **Cooking View (Steps)** | ✅ | ❌ | ❌ | **MEDIUM** |
| **Copy Shopping List** | ✅ | ❌ | ✅ | **MEDIUM** |
| **Supermarket Integration** | ✅ | ❌ | ❌ | **LOW** |
| **Recipe Editor** | ❌ | ✅ | ❌ | **MEDIUM** |
| **Favourites System** | ❌ | ✅ | ❌ | **MEDIUM** |
| **Times Cooked Tracking** | ❌ | ✅ | ❌ | **LOW** |
| **Share Recipes** | ❌ | ✅ | ❌ | **LOW** |

---

## ARCHITECTURAL OBSERVATIONS

### Old Version
- Simple, functional approach
- Three separate JS modules: meals.js, recipes.js, shopping.js
- Basic event-driven architecture
- localStorage for persistence

### v2 Version
- Modern, UI-focused approach
- Single large app.js file (1015 lines)
- State management object
- Modal-driven interactions
- Lazy loading and performance optimization
- Recipe editor as separate feature module

### Root Index Version
- Feature-complete prototype
- Tab-based navigation
- Comprehensive form handling
- Responsive grid layouts
- Integration-ready architecture

---

## RECOMMENDATIONS FOR MIGRATION

### Phase 1: Essential Features to Preserve
1. **Weekly Meal Planner** (from Root) - Core feature
2. **Family Profiles + Per-Profile Allergens** (from Root) - Critical UX
3. **Pantry Management** (from Old/Root) - Essential shopping feature
4. **Recipe Editor** (from v2) - Already modern implementation
5. **Favourites System** (from v2) - User engagement

### Phase 2: Cooking Enhancements
1. **Timer Controls** (from Old) - Practical cooking feature
2. **Step-by-Step View** (from Old) - Enhance recipe display
3. **Portion Multiplier** (from Root) - Shopping list accuracy

### Phase 3: Integration Features
1. **Recipe Fetching from URL** (from Root) - Convenience feature
2. **Supermarket Integration** (from Old) - Optional enhancement
3. **Share/Export** (from v2) - Social features

---

## DATA STRUCTURE CONSIDERATIONS

### Required Data Models for Merged Version
```
Recipe {
  id, name, image, cookTime, calories, servings, difficulty,
  tags, source, ingredients, instructions, favourite, timesCooked,
  allergens
}

Profile {
  id, name, allergens[], dislikes[]
}

MealPlan {
  day, meal (breakfast/lunch/dinner), recipe, portions, profiles[]
}

PantryItem {
  id, name, quantity, unit
}

ShoppingItem {
  ingredient, quantity, unit, source_recipes[]
}
```

---

## Summary

**Old Version Strengths**: Cooking-focused, practical pantry integration
**v2 Strengths**: Modern UI, recipe management, favorite tracking
**Root Strengths**: Comprehensive planning, family profiles, allergen management

**Recommended Approach**: Merge root's planning architecture with v2's UI patterns and add old version's cooking features.
