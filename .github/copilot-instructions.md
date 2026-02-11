ome# Meal Planner v3 — Copilot Instructions

PROJECT: Meal Planner v3 — HTML/CSS/JS prototype
LOCATION: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\MealPlannerApp\frontend\v3\

FILES:
- index.html — App shell, tab navigation, all modals (picker, detail, cook mode, tesco)
- styles.css — Full design system using CSS custom properties (--c-* colours, --radius-*, --shadow-*)
- recipes.js — Recipe data array with structured ingredients (name/amount/unit/category/prep) and steps (text/time)
- app.js — All application logic, state management, rendering, event handlers

ARCHITECTURE:
- Single-page app with 4 tab views: Weekly Plan, Recipes, Shopping List, Settings
- State stored in a single `state` object, persisted to localStorage under key 'mealPlannerV3'
- All rendering is done via render*() functions that rebuild innerHTML from state
- Event delegation used throughout (listeners on parent containers)
- No frameworks — vanilla JS, no build step. Uses DM Sans from Google Fonts.

KEY PATTERNS:
- Meal plan stored as state.mealPlan[dateKey] where dateKey is 'YYYY-MM-DD', each day has 3 slots (main + 2 extra)
- Slot statuses: 'empty', 'filled', 'skipped', 'notNeeded'
- Recipes have structured ingredients with {name, amount, unit, category, prep} — NOT plain strings
- Allergen detection via keyword matching against UK 14 allergens in ALLERGENS constant
- Family profiles with per-profile allergens that filter recipe views when active
- Pantry items auto-excluded from shopping list
- Cook mode is a full-screen overlay with step-by-step navigation and countdown timer

DESIGN SYSTEM:
- Primary: #4338ca (indigo), Success: #16a34a, Danger: #dc2626, Warning: #d97706
- Components: .btn (primary/secondary/success/danger/ghost/sm/icon), .pill (active/danger), .card, .form-input
- Meal slots: .meal-slot-empty, .meal-slot-filled, .meal-slot-skipped, .meal-slot-extra-empty
- Modals: .modal-overlay.open to show, .modal (sm/md/lg sizes)

WHAT'S WORKING:
- Weekly planner grid with prev/next week navigation and meal counter
- Recipe cards with filtering (cuisine/speed), sorting, favourites
- Recipe picker modal when clicking empty planner slots
- Recipe detail modal with ingredients, method, allergen detection
- Cook mode with step-by-step navigation, ingredient checkboxes, countdown timer
- Shopping list auto-generated from planned meals, grouped by category
- Pantry/cupboard staples management (excluded from shopping list)
- Family profiles with allergen selection that filters unsafe recipes
- Supermarket search (opens Tesco/Sainsbury's/ASDA/Ocado/Ocado tabs with ingredient searches)
- Copy shopping list to clipboard
- localStorage persistence

WHAT'S NOT YET BUILT:
- Recipe editor/add new recipe form (was in v2, needs adding back)
- URL recipe fetcher
- Drag and drop recipes onto planner
- "Cooking for who" per-day group selection on planner
- Portion scaling in detail modal (only picker has portions currently)
- Mobile-optimised planner (basic responsive exists but needs swipe navigation)

WHEN MAKING CHANGES:
- Follow existing patterns: render functions rebuild from state, saveState() after mutations
- Keep all CSS in styles.css using the existing custom properties
- Keep recipe data in recipes.js
- Add new event listeners in the setupEvents() function
- Test all 4 views after changes — they share state
