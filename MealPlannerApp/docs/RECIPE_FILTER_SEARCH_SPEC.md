# Recipe Filter & Search UX Specification

> **Purpose**: Define the filtering, search, and sort experience for recipe browsing — both in the main Recipes tab and within the Recipe Picker modal (when adding to the Weekly Planner).
> **Design Reference**: Inspired by Deliveroo horizontal filter chips, HelloFresh's "Refine search" drill-down, and Gousto's inline add-to-basket pattern.
> **Principle**: Takeaway-menu simplicity. Users shouldn't feel like they're configuring a database query — it should feel like browsing a menu.
> **Prototype**: `frontend/v3/recipe-filter-preview.html` (toggle between Claude Prototype and Enhancements Layer)
> **Last Updated**: February 2026

---

## 🎯 Design Principles

1. **Remember me** — The app learns which filters a user applies frequently and surfaces them as quick-access chips (e.g., if you always filter by "Asian", that chip appears first)
2. **Progressive disclosure** — Show the top 5-6 filter chips across the top; the full filter panel is one tap away
3. **Additive, not restrictive** — Filters feel like "show me more of this" rather than "exclude everything else"
4. **Instant feedback** — Results update live as filters change; show count of matching recipes
5. **Easy escape** — One-tap "Clear all" to reset; individual × to remove single filters
6. **Context-aware** — When opening from Recipe Picker (Weekly Planner), remember context: "I'm picking dinner for Tuesday, I usually want something quick"
7. **Ordering feel** — Filters should feel like ordering from a takeaway menu, not configuring a database query. One-tap filters like "Quick (≤30m)", "No cauliflower", "Favourites", "Never tried"
8. **Dopamine design** — Keep it fresh: rotate content daily, surface "New this week" badges, make discovery fun

---

## 📐 Layout: Full Recipe Browse View

### Overall Structure (Enhanced)

```
┌──────────────────────────────────────────────────────────────────┐
│  🔍 Search recipes...                                    ⚙️      │
├──────────────────────────────────────────────────────────────────┤
│  [✅ No cauliflower] [⚡ Under 30 min] [Asian ×] [Cuisine ▾] → │
├──────────────────────────────────────────────────────────────────┤
│  3 filters · 12 results                          [Clear all]    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ── For you tonight ──────────────────────────────               │
│  [Card] [Card] [Card] [Card] [Card] [Card] →   (horizontal)    │
│  "Quick to cook · Based on your dislikes"                        │
│                                                                  │
│  ── Weeknight Winners ────────────────────── See more →          │
│  [Card] [Card] [Card] [Card]                                    │
│  [Card] [Card] [Card] [Card]                                    │
│                                                                  │
│  ── All Recipes ──────────────────────────────                   │
│  Showing 12 of 48                                                │
│  [Card] [Card] [Card] ...                                        │
│  [Load more]                                                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Curated Content Rails (Enhancement Layer)

### "For You Tonight" Rail
- **Position**: Top of recipe browse, above the main grid
- **Content**: 6–10 recipe cards in a horizontally scrollable rail
- **Subtext**: "Quick to cook · Based on your dislikes" (personalised)
- **Logic**: Filters recipes that are quick (≤30 min), exclude disliked ingredients, and haven't been cooked recently
- **Rotation**: Content rotates daily to keep it fresh
- **Card style**: Compact preview cards (small image, 2-line info)

### Curated Collections
- **Examples**: "Weeknight Winners", "20-min Meals", "New This Week", "Never Tried"
- **Size**: 8–12 items max per collection
- **Layout**: 2×4 grid within the collection
- **"See more" link**: Expands to show full collection (or applies equivalent filter)
- **Rotation**: Collections can be seasonal or profile-driven

### "New This Week" Badge
- Small badge on recipe cards added in the last 7 days
- Appears on cards both in rails and in the main grid
- Creates a sense of freshness and discovery

---

## 📊 Capped Results & Load More

### Default Behaviour
- Show **12 recipes** initially (not endless scroll)
- Display count: **"Showing 12 of 48"**
- **"Load more"** button loads next 12
- Prevents overwhelm when browsing 100+ recipes

### Why Not Infinite Scroll
- Capped view feels more intentional, less overwhelming
- Users can see where they are in the collection
- Encourages use of filters to narrow down rather than scrolling forever
- "Load more" is an active choice, not passive consumption

---

## 🏷️ Filter Bar

### Position
Sits directly below the search bar, horizontally scrollable. Always visible when browsing recipes.

### Sticky Mini-Summary
Below the filter chip bar, a compact summary line:
```
3 filters · 12 results                              [Clear all]
```
- Shows active filter count and result count at a glance
- "Clear all" button always visible when filters are active
- Stays sticky when scrolling on mobile

### Chip Types

**1. Active preference chip (from user profile)**
- Shows with confidence icon
- Example: `✅ No cauliflower` — derived from disliked ingredients
- Example: `⚡ Under 30 min` — derived from usage patterns
- Can be dismissed with × but will return next session
- Distinguished from manual filter chips by icon prefix

**2. Active filter chip (manually applied)**
- Filled background (brand colour)
- White text with × icon to remove
- Example: `[Asian ×]`

**3. Dropdown filter chip (not yet applied)**
- Outlined/light background
- Dark text with ▾ dropdown indicator
- Example: `[Cuisine ▾]`

**4. Sort chip (always rightmost)**
- Outlined with sort icon
- Shows current sort if not default
- Example: `[Sort ▾]` or `[Sort: Quick & Easy ▾]`

### One-Tap Quick Filters
These are pre-built filter shortcuts that feel like ordering:
- `⚡ Quick (≤30m)` — Sets cook time to under 30 min
- `✅ No cauliflower` — Excludes disliked ingredient (personalised)
- `♥ Favourites` — Shows only favourited recipes
- `✨ Never tried` — Shows recipes with 0 cook count

---

## 🏷️ Filter Categories

### Tier 1: Quick Filter Chips (always visible in the scrollable bar)

The ORDER is personalised — most-used filters appear first.

| Filter | Type | Options | Default |
|--------|------|---------|---------|
| **Cuisine** | Multi-select dropdown | Asian, Italian, Mexican, Indian, Thai, Mediterranean, British, American, Middle Eastern, Japanese, Chinese, Korean, African, Caribbean, French | None |
| **Cook Time** | Slider / preset chips | Under 15 min, Under 30 min, Under 45 min, Under 60 min, Any | Any |
| **Effort** | Single-select | Quick & Easy (≤5 ingredients), Weeknight (≤8 ingredients), Weekend Project (any) | Any |
| **Meal Type** | Multi-select | Dinner, Lunch, Breakfast, Snack, Side | Context-dependent |
| **Dietary** | Multi-select | Vegetarian, Vegan, Dairy-Free, Gluten-Free | From profile |
| **Sort** | Single-select | Recommended, Recently Added, Quick & Easy, Most Cooked, Never Tried, Random/Surprise Me | Recommended |

### Tier 2: "More Filters" (accessed via ⚙️ icon or "More" chip)

Opens a full-screen filter panel (à la HelloFresh's "Refine search"):

| Filter | Type | UI Pattern |
|--------|------|------------|
| **Spice Level** | Toggle chips | Not Spicy, Mild, Medium, Hot |
| **Protein** | Multi-select chips | Chicken, Beef, Pork, Fish, Seafood, Tofu, Beans/Lentils |
| **Season** | Auto/manual | In Season Now, Spring, Summer, Autumn, Winter |
| **Ingredients** | Search + select | "Contains: [ingredient]" or "Without: [ingredient]" |
| **Favourites Only** | Toggle | Show only ♥ recipes |
| **Never Tried** | Toggle | Show only recipes with 0 cook count |
| **Cost** | Range | £ Budget, ££ Mid-range, £££ Premium |

---

## 💡 Confidence Cues on Recipe Cards

### Card Badges & Indicators
When a recipe matches the user's profile well, show subtle confidence indicators:

- **"Matches your profile"** — Small green text/badge when recipe has no disliked ingredients and fits dietary preferences
- **"No disliked ingredients"** — Shown when user has disliked ingredients configured and this recipe avoids them all
- **"New this week"** — Small badge for recipes added in last 7 days
- **"Made 5×"** — Existing cooked count badge
- **"Never tried"** — Badge for recipes with 0 cook count

### Card Sizes by Context

| Context | Card Style | Info Shown |
|---------|-----------|------------|
| **Recipes Tab (Browse)** | Large, visual | Full image, name, time, cuisine, dietary tags, confidence badge, cooked count |
| **Recipe Picker Modal** | Compact, 2-line | Small thumbnail, name, time — minimal info for quick scanning |
| **"For You Tonight" Rail** | Compact preview | Small image, name, 1-line subtitle |
| **Curated Collection** | Medium | Image, name, time, key badge |

---

## 🧠 Smart Filter Memory

### How It Works

The app tracks which filters each user applies most frequently and uses this to personalise the filter bar order and pre-populate suggestions.

**Data tracked per user:**
```javascript
{
  filterHistory: [
    { filter: 'cuisine', value: 'Asian', usageCount: 23, lastUsed: '2025-02-08' },
    { filter: 'cookTime', value: 'under30', usageCount: 18, lastUsed: '2025-02-10' },
    { filter: 'effort', value: 'quickEasy', usageCount: 15, lastUsed: '2025-02-09' },
  ],
  chipOrder: ['cuisine', 'cookTime', 'effort', 'dietary', 'mealType', 'sort'],
  dislikedIngredients: ['cauliflower', 'coriander'],
  // Quick filter chips auto-generated from dislikes
}
```

**Personalisation rules:**
1. Top 3 most-used filters appear as the first chips (left-most, most visible)
2. If a user has applied the same filter value 5+ times, it appears as a "suggested" quick chip at the start
3. Last session's filters are offered as a "Resume filters?" prompt on return
4. Disliked ingredients auto-generate `✅ No [ingredient]` preference chips

### "Resume Filters" Prompt
When a user returns to the Recipes tab:
```
┌──────────────────────────────────────────────────────────────────┐
│  Last time you filtered by: Asian, Under 30 min                  │
│  [Apply these filters]  [Start fresh]                            │
└──────────────────────────────────────────────────────────────────┘
```
Appears as a subtle banner above the filter chips. Dismisses after one interaction.

---

## 📋 Filter Dropdown UI Patterns

### Pattern A: Bottom Sheet with Chips (for Cuisine, Dietary, Protein)

```
┌──────────────────────────────────────────────┐
│  ─── (drag handle)                           │
│                                              │
│  Cuisine                                     │
│                                              │
│  [Asian] [Italian] [Mexican] [Indian]        │
│  [Thai] [Mediterranean] [British]            │
│  [American] [Middle Eastern] [Japanese]      │
│  [Chinese] [Korean] [African] [Caribbean]    │
│  [French]                                    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │          Done (3 selected)           │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

- Multi-select: tap chips to toggle (filled = selected)
- "Done" button shows count of selected
- Chips are chunky, tappable (44px+ height)

### Pattern B: Slider (for Cook Time)

```
┌──────────────────────────────────────────────┐
│  ─── (drag handle)                           │
│                                              │
│  Cook Time                                   │
│                                              │
│  Show recipes up to:                         │
│                                              │
│  ●━━━━━━━━━━━━━━━━━━━━━━━○                  │
│  15 min              30 min           60 min  │
│                                              │
│  Quick presets:                               │
│  [15 min] [30 min] [45 min] [Any]            │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │              Apply                   │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

### Pattern C: Simple List with Radio (for Sort)

```
┌──────────────────────────────────────────────┐
│  ─── (drag handle)                           │
│                                              │
│  Sort by                                     │
│                                              │
│  ◉ Recommended                               │
│  ○ Recently Added                            │
│  ○ Quick & Easy                              │
│  ○ Most Cooked                               │
│  ○ Never Tried                               │
│  ○ Surprise Me 🎲                            │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │              Done                    │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

---

## 🔎 Search Bar Behaviour

### Interaction Flow

1. **Idle**: Shows placeholder "Search recipes..." with magnifying glass icon
2. **Focused**: Keyboard opens, shows recent searches below
3. **Typing**: Live results filter as user types (debounced 300ms)
4. **Results**: Matched against recipe name, ingredients, cuisine tags, and description

### Recent & Suggested Searches

```
┌──────────────────────────────────────────────┐
│  🔍 Thai gr|                                 │
│                                              │
│  Recent:                                     │
│  🕐 Thai green curry                         │
│  🕐 Green salad                              │
│                                              │
│  Suggestions:                                │
│  Thai Green Curry                            │
│  Thai Red Curry                              │
│  Thai Basil Stir Fry                         │
└──────────────────────────────────────────────┘
```

### Search + Filter Interaction
- Search and filters work TOGETHER (AND logic)
- Searching "chicken" + filter "Asian" = Asian chicken recipes
- Active search term appears as a chip: `[🔍 "chicken" ×]`

---

## 🎯 Context: Recipe Picker vs. Browse

The filter UX appears in two contexts with slightly different defaults:

| Aspect | Recipes Tab (Browse) | Recipe Picker Modal (from Weekly Planner) |
|--------|---------------------|------------------------------------------|
| **Default sort** | Recommended | Quick & Easy (weeknight context) |
| **Preselected filters** | None (or resume last) | Based on day context (e.g., weeknight = faster recipes) |
| **"Add" action** | "+ Add to Plan" (asks which day) | Adds directly to the slot that opened the picker |
| **Layout** | Full screen, large visual cards | Modal with compact 2-line cards |
| **Filter memory** | Full history | Inherits from Browse history |
| **Curated rails** | "For you tonight", collections | Simplified — just "Suggested" rail |
| **Results cap** | 12 with "Load more" | 8 with "Load more" (space constrained) |

---

## 📊 Empty & Edge States

### No Results
```
┌──────────────────────────────────────────────┐
│                                              │
│  😕 No recipes match your filters            │
│                                              │
│  Try:                                        │
│  • Removing a filter                         │
│  • Broadening your search                   │
│  • [Clear all filters]                       │
│                                              │
│  ─────────────────────────────────            │
│                                              │
│  You might like:                             │
│  (Shows 4 popular/recent recipes regardless) │
│                                              │
└──────────────────────────────────────────────┘
```

Follows HelloFresh's pattern — show "You might like" / "Most recent recipes" below the empty state so the user always has something to browse.

### Few Results (< 5)
Show a subtle suggestion with action: "Only 4 recipes match. [Relax filters?]"
- "Relax filters" removes the most restrictive filter (the one excluding the most recipes)
- Gentle, not pushy — the user might genuinely only want 4 results

### "You Might Like" Fallback Panel
When filters are too strict (< 3 results), show a panel:
```
┌──────────────────────────────────────────────┐
│  ── You might also like ───────────────────  │
│                                              │
│  These don't quite match your filters but    │
│  are popular picks:                          │
│                                              │
│  [Card] [Card] [Card] [Card]                 │
│                                              │
│  [Relax filters]                             │
└──────────────────────────────────────────────┘
```

---

## 📱 Responsive Notes

### Mobile (primary target)
- Filter chips: horizontally scrollable, single row
- Dropdowns: bottom sheets (slide up from bottom)
- Search: full-width, collapses filter bar when focused
- Curated rails: horizontal scroll
- Cards: compact in picker, larger in browse

### Tablet / Desktop
- Filter chips: may wrap to two rows if many active
- Dropdowns: positioned dropdown panels (not bottom sheets)
- Search: inline with filter bar
- Curated rails: wider, show more cards

---

## ✅ Acceptance Criteria

### Core Filter UX
- [ ] Horizontal scrollable filter chip bar below search
- [ ] Cuisine filter with multi-select bottom sheet
- [ ] Cook Time filter with slider + preset chips
- [ ] Effort filter (Quick & Easy / Weeknight / Weekend)
- [ ] Sort dropdown with radio options
- [ ] Active filters shown as filled chips with × to remove
- [ ] Sticky mini-summary: "3 filters · 12 results" with Clear all
- [ ] Result count updates dynamically
- [ ] Search bar with live filtering

### Preference Chips & Confidence Cues
- [ ] Active preference chips with icons: `✅ No cauliflower`, `⚡ Under 30 min`
- [ ] Confidence badges on cards: "Matches your profile", "No disliked ingredients"
- [ ] "New this week" badge on recently added recipes
- [ ] Preference chips auto-generated from user profile (dislikes, usage patterns)

### Curated Content
- [ ] "For you tonight" rail with 6–10 horizontally scrollable cards
- [ ] Curated collections ("Weeknight Winners", "20-min Meals") with 8–12 items
- [ ] "See more" link on collections
- [ ] Daily rotation of top rail content
- [ ] "New this week" badge on cards

### Capped Results
- [ ] Default to showing 12 of total, not endless grid
- [ ] "Showing 12 of 48" count display
- [ ] "Load more" button for next batch
- [ ] Works in both Browse and Picker contexts

### Smart Memory
- [ ] Track filter usage per user
- [ ] Reorder chips based on frequency
- [ ] "Resume filters?" prompt on return
- [ ] Frequently used filter values suggested as quick chips

### Empty & Edge States
- [ ] "No results" with suggestions + "You might like" fallback panel
- [ ] "Few results" with gentle "Relax filters" action
- [ ] "You might like" panel when filters are too strict

### Card Variants
- [ ] Large visual cards in Recipes tab browse
- [ ] Compact 2-line cards in Recipe Picker modal
- [ ] Compact preview cards in curated rails

### Integration
- [ ] Works in both Recipes tab and Recipe Picker modal
- [ ] Filters combine with search (AND logic)
- [ ] Respects user's dietary profile (pre-applied but dismissible)

---

## 🚀 Implementation Priority

### Phase 1 (MVP)
1. Search bar with text search
2. Cuisine filter (multi-select chips in bottom sheet)
3. Cook Time filter (preset chips only — no slider yet)
4. Sort (simple radio list)
5. Active filter chips with × removal
6. Basic empty state with "You might like" fallback
7. Capped results (12) with "Load more"

### Phase 2
1. Effort / ingredient count filter
2. Cook Time slider
3. Filter memory (track usage, reorder chips)
4. "Resume filters?" prompt
5. Dietary filters (connected to user profile)
6. Sticky mini-summary bar
7. Preference chips from user profile (`✅ No cauliflower`)

### Phase 3
1. "For you tonight" curated rail
2. Curated collections with "See more"
3. Confidence cues on cards ("Matches your profile")
4. "New this week" badges + daily rotation
5. Smart suggestions (frequently used values as quick chips)
6. Context-aware defaults in Recipe Picker
7. Compact vs large card variants by context
8. "Relax filters" smart action

---

*Document created: February 2026*
*Updated: February 2026 — Added v3 enhancement layer (curated rails, capped results, confidence cues, preference chips)*
*Based on: Competitive analysis of HelloFresh, Deliveroo, Gousto, Just Eat + v3 prototype refinements*
*Prototype: `frontend/v3/recipe-filter-preview.html`*
*For: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\*
