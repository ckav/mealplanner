# Meal Planner - Feature Inventory

> **Purpose**: Comprehensive breakdown of all features organised by functional category  
> **Status**: Planning document for feature scoping and prioritisation  
> **Tech Stack**: Flutter + Firebase (iOS + Android)  
> **Last Updated**: February 2026  
> **See also**: `PROJECT_OBJECTIVES.md` for user personas and problem statements

---

## Quick Reference: Problems → Features

| Problem | Features That Solve It |
|---------|----------------------|
| **HelloFresh replacement** (cost, waste, inflexibility) | Flexible portions (§6), Recipe browsing (§2), Shopping list (§7), Fresh food focus |
| **"What's for dinner?" paralysis** | Weekly planner (§9), Inspiration (§10), Recipe cards with dopamine-friendly UX (§2) |
| **Food waste** | Portion scaling (§6), Pantry tracking (§7), Leftover management, Ingredient overlap, Fridge-aware suggestions (§7) |
| **Allergy mental load** | Allergy config with nuance (§4), Family profiles (§5), Invisible filtering |
| **Family puzzle** (schedules, preferences) | Profiles (§5), "Cooking for who" (§5), Preference tags (§3), Schedule awareness |
| **Stack of printed recipes** | Recipe library (§1), Search/filter (§3), Import from URL (§1) |

---

## Tech Stack & Platform

| Component | Choice | Notes |
|-----------|--------|-------|
| Frontend | Flutter | Cross-platform iOS + Android from single codebase |
| Backend | Firebase / Firestore | Realtime sync, authentication, cloud functions |
| iOS Distribution | Apple Developer Account | Applied, awaiting approval |
| Android Distribution | Google Play | TBD |

**Migration Note**: Pivoted from HTML/CSS/JS prototype to Flutter + Firebase for native mobile experience.

---

## Core Design Principles

1. **Solo-First, Family-Ready** - Design for single-person households first, but architecture supports families from day one
2. **The Dopamine of Choosing** - Meal selection should feel rewarding, not like homework; beautiful cards, satisfying progress indicators
3. **Fresh & Whole Food Focus** - Prioritise recipes using fresh, non-processed ingredients; differentiate from meal kits with packet sauces
4. **Invisible Allergies** - Once configured, don't show what you *can't* eat - just show what you *can*; safety without constant reminders
5. **Flexible, Not Prescriptive** - Support 3 dinners as easily as 14 meals; allow skipping, changing, adapting
6. **Reduce Mental Load** - Make decisions easier; smart defaults, sensible suggestions, minimal required configuration
7. **Prevent the Hungry Supermarket Trip** - A clear plan and shopping list stops poor decisions and duplicate purchases

---

## Prototype v3 (HTML) — Implementation Status (Feb 2026)

> **Location**: `MealPlannerApp/frontend/v3/`

### ✅ Implemented (Working)
- Weekly planner grid with 3 slots per day, skip/undo
- Drag & drop move/swap meals between days (handle drag)
- Recipe cards + favourites + times cooked
- Recipe detail modal + cook mode + step timer
- Shopping list aggregation + copy + supermarket search
- Pantry/cupboard staples (persisted) + required highlight + quantity hints
- Family profiles with allergens + dislikes (profile-based filtering)
- Quiet safety filters (multi-select chips incl. hide allergens/dislikes)
- Fridge items + optional filter (“use what you have”)
- Add recipe modal (manual entry)
- Long-press add-to-plan → day/slot selector + portions
- Per-meal exclusions + swap note (excludes items from shopping list)

### ⚠️ Partial / Needs Polish
- Booking-style filter UX (visual hierarchy + toggle clarity)
- Per-day “Cooking for” and portion overrides in planner
- Recipe editor parity with v2 (advanced fields, URL import)
- Mobile drag & drop improvements (touch UX)

---

## 1. Adding New / Editing Recipes

### Adding Recipes
- **Manual Entry**
  - Recipe name, description, source attribution
  - Ingredient list with quantities and units
  - Step-by-step instructions
  - Prep time, cook time, total time
  - Serving size (base portions)
  - Difficulty level
  - Category/tags assignment
  - Photo upload (hero image)
  - Optional: step-by-step photos

- **Import from URL**
  - Paste URL from supported sites (BBC Good Food, etc.)
  - Auto-parse recipe data where possible
  - Manual correction/confirmation step
  - Store source attribution

- **Quick Add**
  - Minimal entry: name + ingredients + rough method
  - Flesh out details later

### Editing Recipes
- Edit any field after creation
- Version history (optional, post-MVP)
- "Fork" a recipe - create personal variation of shared/imported recipe
- Bulk editing for tags/categories

---

## 2. Recipe Cards

> **Key Insight**: The "picking meals" part of HelloFresh was the dopamine hit. Recipe cards need to feel rewarding to browse and select.

### Card Display Elements
- Recipe image (thumbnail) - **high quality, appetising**
- Recipe name
- Cook time (with timer icon)
- Difficulty indicator
- Dietary tags (visual icons/pills)
- Servings (base portions)
- Source attribution (small text)

### Card Actions
- **Favourite** (heart icon toggle) - satisfying animation
- **Add to Plan** (opens day/slot picker) - the key dopamine moment
- **Quick View** (expand card with more details)
- **Full View** (navigate to recipe detail page)
- **Share** (generate shareable link)
- **Edit** (if user-owned recipe)
- **Delete** (if user-owned recipe)

### Card States
- Default
- Favourited (filled heart)
- Recently cooked (subtle indicator)
- New/Unseen (for shared recipes)
- **Added to this week's plan** (visual indicator to avoid duplicates)

---

## 3. Sorting / Filtering Options

### Quick Filters (Pill/Chip style)
- **Time-based**
  - Under 15 mins
  - Under 30 mins
  - Under 1 hour
  - Slow cooker / long prep

- **Complexity**
  - One pan
  - 5 ingredients or less
  - No-cook
  - Beginner friendly

- **Meal Type**
  - Breakfast
  - Lunch
  - Dinner
  - Snack
  - Dessert

- **Cuisine**
  - British, Italian, Indian, Chinese, Thai, Mexican, etc.

- **Dietary** (see Category 4 for full details)
  - Vegetarian
  - Vegan
  - Gluten-free
  - Dairy-free
  - Safe for [profile name]

### Sort Options
- Recently added
- Recently cooked
- Alphabetical
- Cook time (shortest first)
- Most favourited (if social features enabled)
- Seasonal relevance

### Search
- Full-text search across recipe names, ingredients, descriptions
- Search by ingredient ("what can I make with chicken?")

---

## 4. Allergies / Dietary Preferences

> **Design Goal**: Make dietary restrictions feel invisible - the app should surface safe recipes without constant reminders of what can't be eaten.

### Allergy Types

| Category | Examples | Severity Options |
|----------|----------|------------------|
| **Common Allergens** | Peanuts, tree nuts, eggs, milk, fish, shellfish, wheat, soy | Strict / Tolerant |
| **Gluten-related** | Celiac disease, gluten sensitivity, wheat allergy | Strict / Tolerant |
| **Nightshades** | Tomatoes, potatoes, peppers, aubergine, chilli | Strict / Tolerant |
| **Alliums** | Garlic, onions, leeks, shallots, chives, spring onions | Strict / Tolerant |
| **FODMAP triggers** | Garlic, onions, beans, certain fruits | Configurable |
| **Other intolerances** | Lactose, histamine, sulfites | Configurable |

### Allergy Configuration Options

**Per-allergen settings:**

```
Allergen: Milk
├── Severity: [Strict] / [Can tolerate trace amounts]
├── "May contain" products: [Exclude] / [Allow with warning] / [Allow]
├── Baked/cooked form: [Still avoid] / [Can have baked milk]
└── Notes: "Nephew can have baked milk as of Jan 2026"
```

**Key insight**: Some people (like children outgrowing allergies) can tolerate:
- "May contain" trace amounts in ingredients
- Baked/cooked forms (baked eggs, baked milk in cakes)
- Small quantities but not large amounts

### Dietary Preferences (non-allergy)

- Vegetarian (no meat/fish)
- Vegan (no animal products)
- Pescatarian
- Flexitarian (reduce meat, not eliminate)
- Halal
- Kosher
- Low-sodium
- Low-sugar
- Keto / low-carb

### Per-Profile Application
- Each family member can have different restrictions
- "Cooking for" selector shows which restrictions apply
- Recipes auto-filter based on who's eating
- Visual indicators when a recipe has substitution options

### Substitution Suggestions (Post-MVP)
- "This recipe uses onion. For [profile], try asafoetida instead."
- Link to common substitutions database
- User can save successful substitutions

---

## 5. Family / Individual Profiles

### Profile Setup
- Profile name
- Avatar/photo (optional)
- Role: Adult / Child / Guest
- Dietary restrictions (from Category 4)
- Portion size preference: Small / Regular / Large

### "Cooking For Who" System

**Groups:**
- Everyone Home (all profiles, full household)
- Just Us (adults only)
- Kids Only
- Solo (single person)
- Custom groups

**Behaviour:**
- Selecting a group auto-calculates portions
- Applies combined dietary restrictions of all members
- Can override per-meal

### Profile Types
- **Owner**: Creates household, full admin
- **Member**: Can plan meals, add recipes
- **Guest**: Can view, suggest recipes

---

## 6. Portion Control / Scaling

> **Key Problem**: HelloFresh serves 2, which means a solo cook eats the same meal 3× in a row. We need true flexibility from 1 serving upward.

### Base Recipe Scaling
- Every recipe has a base serving size (e.g., "Serves 4")
- User can scale: **1, 2, 3, 4, 5, 6+, or custom**
- Ingredient quantities recalculate automatically
- **Default for solo users**: 1-2 servings
- **Default for couples**: 2 servings
- **Default for families**: Based on household size

### Intelligent Scaling
- Handle non-linear scaling (e.g., seasoning doesn't double exactly)
- Flag when scaling affects cooking time
- Round to sensible quantities (not "1.375 eggs")
- Suggest "make 2 and have leftovers for lunch" when appropriate

### Per-Meal Portions
- Set portions when adding recipe to meal plan
- Override default based on "cooking for who"
- Portion badge visible on meal slot (e.g., "❷")

### Leftover Awareness (Post-MVP)
- If scaling up: "This will make extra - leftover lunch tomorrow?"
- Track expected leftovers in meal plan
- Suggest same recipe for two non-consecutive days to avoid repetition
- "You've had Thai Green Curry twice this week - swap for variety?"

---

## 7. Shopping List & Pantry Management

> **Key Problem**: Without a plan and list, you end up at the supermarket hungry, buying things you already have, portions for 4 when you're 1, and making poor choices.

### Ingredient Status Levels

| Status | Behaviour | Examples |
|--------|-----------|----------|
| **Always Have** | Never on shopping list - assumed in stock | Salt, olive oil, soy sauce, dried pasta, rice |
| **Check First** | Prompts verification before shopping | Self-raising flour, baking powder, specialty spices |
| **Buy as Needed** | Normal behaviour - on list when recipe requires | Fresh veg, meat, dairy |

### Pantry Features
- Optional expiry date tracking
- "Opened on" date for items that spoil faster once opened
- "Verify these first" section before finalising shopping list
- Post-shopping prompt to update pantry records
- "Running low" quick action → adds to shopping list

### Fridge Inventory & "Use What You Have"
- Add fridge items manually (quick list) or via photo upload (future vision)
- Fridge inventory can be used as a filter: "Show recipes that use my fridge items"
- Suggest recipes that maximise use of current fridge items (ingredient overlap scoring)
- Highlight missing items needed to complete a fridge-based recipe

### Pack Size Awareness (Minimise Leftovers)
- Store pack sizes for bought items (e.g., chicken breast 500g)
- Track how much of a pack each recipe uses (e.g., 200g)
- Show leftover amount after planning (e.g., "300g remaining")
- Nudge to use remaining pack quantity in upcoming recipes
- Optional reminders when leftover quantities remain unused for too long

### Shopping List Generation
- Auto-generated from meal plan
- Combines duplicate ingredients across recipes
- Groups by supermarket aisle / category
- Excludes "Always Have" items
- Shows "Check First" items separately
### Supermarket Cost Comparison
- **Integration with price services**: Connect to web scraping or API services (e.g., Basket, MySupermarket) to fetch current prices
- **Supported supermarkets**: Waitrose, Tesco, Morrisons, Sainsbury's, Lidl, Aldi, M&S, etc.
- **User preference setup**: Select which supermarkets are available to you (e.g., "I can shop at Tesco and Lidl")
- **Shopping list cost breakdown**:
  - Total cost per selected supermarket
  - Highlight cheapest option
  - Item-by-item price comparison (e.g., chicken breast: Lidl £3.50 vs Tesco £4.20)
  - Show which supermarket has best price per item
- **Multi-shop optimisation** (Post-MVP):
  - Suggest splitting shopping across two supermarkets if significantly cheaper
  - "Buy these at Lidl, these at Tesco" with cost savings shown

### Weekly Specials & Price-Aware Recipe Suggestions
- **Weekly specials integration**: Fetch supermarket promotional items (chicken, salmon, seasonal veg)
- **Smart suggestions based on specials**:
  - "Chicken is on sale this week at Tesco — here are 5 recipes using it"
  - "Salmon is discounted — try this recipe instead of the planned beef?"
  - Prioritise expensive items on special offer
- **Meal plan cost optimisation**:
  - Show estimated weekly grocery cost based on current prices
  - Suggest swapping recipes if similar but cheaper option available
  - "Swap beef lasagne for chicken stir-fry and save £2.50 this week"

### Seasonal & Sustainability Awareness
- **Seasonal ingredient data**: Track which vegetables/fruits are in season by month and region (UK-focused)
- **Environmental impact prioritisation**:
  - Filter recipes by "In Season" to reduce food miles and environmental impact
  - Highlight seasonal ingredients in recipe ingredient lists
  - Suggest recipes that maximise use of current-season produce
- **Farmer's market awareness** (Future):
  - Integrate with local producer networks
  - Show "from local farm" badges
- **Carbon footprint estimates** (Post-MVP):
  - Rough estimate of recipe carbon footprint based on ingredients
  - Comparisons: "Choose this veg option instead and save X kg CO₂"
### Smart Features (Post-MVP)
- Ingredient overlap detection ("3 recipes use coconut milk - buy large tin")
- Leftover usage suggestions ("You'll have half a jar of pesto - here are recipes that use it")
- Expiring ingredient alerts
- Pack size optimisation ("You’ll have 300g chicken left — add a stir-fry this week")

---

## 8. Cooking Instructions / Cook Mode

### Cook Mode Features
- Step-by-step view
- Large text, high contrast
- Timer integration per step
- Ingredient panel alongside instructions
- "Done" checkbox per step
- Voice control (post-MVP)
- Screen stays awake

### Recipe Detail View
- Full ingredient list with quantities
- Grouped instructions by phase (prep, cook, serve)
- Nutritional info (if available)
- Tips and variations
- User notes field
- "I cooked this" button (logs to history)

---

## 9. Meal Planning (Weekly View)

> See `MEAL_PLANNER_WEEKLY_VIEW_SPEC.md` for full specification

### Core Features
- 7-day grid × configurable meal columns (default: 3)
- "X of Y meals selected" progress counter
- Empty/Filled/Skipped states per slot
- Recipe picker modal with search and filters
- Portion selector when adding meals

### Slot States
- **Empty** (main meal): "Click to add" + Skip button
- **Empty** (extra meal): "+" icon + "Not needed" text
- **Filled**: Thumbnail, recipe name, cook time, portions badge
- **Skipped**: Greyed out with Undo option

### Planning Horizon Options
- This week (Mon-Sun)
- Rolling 7 days
- Two weeks
- Custom date range

---

## 10. Inspiration & Discovery

### Inspiration Sources
- Seasonal suggestions (what's in season this week)
- "Based on your favourites" recommendations
- "Use up" suggestions (ingredients expiring soon)
- Random recipe / "Surprise me"
- Trending recipes (if community features)
- "Try something new" - cuisines/ingredients you haven't cooked

### Discovery Features
- Browse by category, cuisine, ingredient
- Collections (e.g., "Weeknight Winners", "Batch Cooking")
- Search external recipe sites (import flow)

---

## 11. Nutritional Insights (Post-MVP)

> **Philosophy**: Provide observations and suggestions, not prescriptions. Claire is not a dietitian.

### Per-Recipe Data (where available)
- Estimated calories per serving
- Macros: protein, carbs, fat
- Key vitamins and minerals
- Fibre content

### Weekly Dashboard
- Summary of planned meals only (doesn't account for breakfasts, lunches, eating out)
- "Based on your planned dinners:"
  - Meat vs meatless meal count
  - Estimated average calories
  - Nutrient patterns

### Suggestion System
- User-configurable goals:
  - "I'd like more meatless meals"
  - "Help me balance omega-3"
  - "Reduce red meat"
- Gentle suggestions, not prescriptions:
  - "You've planned 6 meat-based dinners. Here are some fish options if you'd like variety."
  - "Omega-3 seems low this week - consider adding salmon or mackerel?"

### Caveats (always visible)
- "This only reflects planned dinners in the app"
- "Consult a professional for dietary advice"

---

## 12. Supermarket Export / Import

### Export to Supermarkets
- Generate shopping list compatible with:
  - Tesco
  - Sainsbury's
  - ASDA
  - Waitrose
  - Ocado
- One-tap to open supermarket app/website with items

### Price Integration (Post-MVP)
- Fetch current prices from supermarket APIs
- Show estimated basket cost
- Highlight deals and offers
- Compare prices across supermarkets
- Suggest cheaper alternatives

### Import
- Import recipes from supermarket meal planners
- Scan barcode to add pantry items

---

## 13. Database & Accounts (Firebase)

### Authentication
- Email/password
- Google Sign-In
- Apple Sign-In
- Guest mode (local storage only)

### Data Structure
- Users collection
- Households collection
- Recipes collection (shared + private)
- MealPlans collection
- ShoppingLists collection
- Pantry collection

### Sync
- Realtime sync via Firestore
- Offline capability with sync on reconnect
- Conflict resolution: last-write-wins for simple fields

---

## 14. Sharing & Privacy

### Recipe Sharing
- **Public recipes**: Searchable by all users (e.g., imported BBC Good Food)
- **Private recipes**: Only visible to creator/household
- **Shared link**: Generate link to share specific recipe

### Personal Notes
- Add private notes to any recipe (even public ones)
- Notes only visible to you
- Substitutions, tips, "kids didn't like this"

### No Public Comments
- Avoiding moderation burden
- Keep it simple and personal

---

## 15. Shared Household Access

### Household Setup
- Account owner creates household
- Invite members via email or link
- Accept/decline invitation flow

### Access Levels
- **Owner**: Full access, billing, delete household
- **Admin**: Manage members, edit settings
- **Member**: Add/edit recipes, plan meals, shop
- **Viewer**: View only (e.g., kids)

### Shared Resources
- Recipe library (combined view)
- Meal plan (collaborative editing)
- Shopping list (real-time sync)
- Cupboard staples

### Individual Resources
- Personal favourites
- Personal notes
- Cooking history

---

## Summary Table

| # | Category | MVP Priority | Complexity | Dependencies |
|---|----------|--------------|------------|--------------|
| 1 | Adding/Editing Recipes | High | Medium | Database |
| 2 | Recipe Cards | High | Low | None |
| 3 | Sorting/Filtering | High | Medium | Recipe data |
| 4 | Allergies/Preferences | **High** | **High** | Profiles |
| 5 | Profiles | High | High | Database, Auth |
| 6 | Portion Control | High | Medium | Recipe data |
| 7 | Shopping List | High | Medium | Meal plan, Recipes |
| 8 | Cooking Instructions | High | Medium | Recipes |
| 9 | Meal Planning | High | High | All above |
| 10 | Inspiration | Low | Medium | Recipe library |
| 11 | Nutritional Insights | **Low (Post-MVP)** | Medium | Recipe data |
| 12 | Export/Import | Medium | High | External APIs |
| 13 | Database/Accounts | High | High | None (foundational) |
| 14 | Sharing/Privacy | Medium | Medium | Database, Auth |
| 15 | Shared Access | Low | High | Auth, Database, Profiles |

---

## What This App is NOT

- ❌ **Not a diet/nutrition app** - We may show nutritional info, but we don't prescribe diets or count calories obsessively
- ❌ **Not a social network** - No public comments, ratings, or community moderation burden
- ❌ **Not a meal kit delivery service** - We help you shop and cook yourself, with fresh ingredients you choose
- ❌ **Not a restaurant/takeaway app** - Focus is home cooking
- ❌ **Not an AI chef** - We curate and organise, not generate recipes from nothing
- ❌ **Not HelloFresh** - No subscriptions, no plastic packaging, no limp spring onions, no missing kecap manis

---

## MVP Feature Set

> **Guiding Question**: What's the minimum needed to replace HelloFresh for a solo cook AND help a family with allergies?

### Phase 1 (Core MVP) - Solves: HelloFresh replacement + Allergy safety
- ✅ Recipe Cards with dopamine-friendly UX (beautiful browsing, satisfying selection)
- ✅ Weekly Meal Planning grid with progress indicator ("5 of 7 meals planned!")
- ✅ Flexible Portion Scaling (1-6+ servings, not just "serves 2")
- ✅ Shopping List Generation (prevents hungry supermarket trips)
- ✅ Basic Filtering (time, dietary flags)
- ✅ Basic Allergy Flags (safe/unsafe per recipe)
- ✅ Firebase persistence + auth

### Phase 2 (Post-MVP) - Solves: Family puzzle + Food waste
- User profiles with dietary restrictions
- Full allergy management (including "may contain" tolerance, baked-form exceptions)
- Household sharing (multiple family members)
- Pantry management with expiry tracking
- "Cooking for who" selector with combined restrictions
- Kid preference tags

### Phase 3 (Future) - Solves: Advanced optimisation
- Supermarket export (Tesco basket integration)
- Nutritional dashboard with gentle suggestions
- Ingredient overlap detection ("buy one large coconut milk tin")
- Smart leftover suggestions ("use up that pesto before Friday")
- Schedule-aware planning ("sport day = quick meal")
- Weekend prep mode

---

## Parking Lot (Worry About Later)

- **Monetisation**: Affiliate commission, sponsorship, or keep free
- **Voice control** in cook mode
- **Barcode scanning** for pantry
- **AI recipe generation** based on available ingredients
- **Community features** (sharing, collections, ratings)

---

*Document created: January 2026*  
*For: Meal Planner App (Flutter + Firebase)*  
*Motivation: Helping families (including brother's family) plan meals around allergies and preferences*
