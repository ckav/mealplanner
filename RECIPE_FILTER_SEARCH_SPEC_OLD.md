# Recipe Filter & Search UX Specification

> **Purpose**: Define the filtering, search, and sort experience for recipe browsing — both in the main Recipes tab and within the Recipe Picker modal (when adding to the Weekly Planner).
> **Design Reference**: Inspired by Deliveroo horizontal filter chips, HelloFresh's "Refine search" drill-down, and Gousto's inline add-to-basket pattern.
> **Principle**: Takeaway-menu simplicity. Users shouldn't feel like they're configuring a database query — it should feel like browsing a menu.

---

## 🎯 Design Principles

1. **Remember me** — The app learns which filters a user applies frequently and surfaces them as quick-access chips (e.g., if you always filter by "Asian", that chip appears first)
2. **Progressive disclosure** — Show the top 5-6 filter chips across the top; the full filter panel is one tap away
3. **Additive, not restrictive** — Filters feel like "show me more of this" rather than "exclude everything else"
4. **Instant feedback** — Results update live as filters change; show count of matching recipes
5. **Easy escape** — One-tap "Clear all" to reset; individual ×  to remove single filters
6. **Context-aware** — When opening from Recipe Picker (Weekly Planner), remember context: "I'm picking dinner for Tuesday, I usually want something quick"

---

## 📐 Layout: Filter Bar

### Position
Sits directly below the search bar, horizontally scrollable. Always visible when browsing recipes.

```
┌──────────────────────────────────────────────────────────────────┐
│  🔍 Search recipes...                                    ⚙️      │
├──────────────────────────────────────────────────────────────────┤
│  [Asian ×] [Quick ▾] [Cuisine ▾] [Cook Time ▾] [Effort ▾] [Sort ▾] → │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Showing 23 recipes                                              │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                         │
│  │  Recipe  │ │  Recipe  │ │  Recipe  │                         │
│  │   Card   │ │   Card   │ │   Card   │                         │
│  └──────────┘ └──────────┘ └──────────┘                         │
└──────────────────────────────────────────────────────────────────┘
```

### Chip Types

**1. Active filter chip (applied)**
- Filled background (brand colour)
- White text
- × icon to remove
- Example: `[Asian ×]`

**2. Dropdown filter chip (not yet applied)**
- Outlined/light background  
- Dark text with ▾ dropdown indicator
- Tapping opens a bottom sheet / dropdown with options
- Example: `[Cuisine ▾]`

**3. Sort chip (always rightmost)**
- Outlined with sort icon
- Shows current sort if not default
- Example: `[Sort ▾]` or `[Sort: Quick & Easy ▾]`

---

## 🏷️ Filter Categories

### Tier 1: Quick Filter Chips (always visible in the scrollable bar)

These are the filters shown as horizontal chips. The ORDER is personalised — most-used filters appear first.

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
    // ...
  ],
  chipOrder: ['cuisine', 'cookTime', 'effort', 'dietary', 'mealType', 'sort'],
  // Reordered based on usage frequency
}
```

**Personalisation rules:**
1. Top 3 most-used filters appear as the first chips (left-most, most visible)
2. If a user has applied the same filter value 5+ times, it appears as a "suggested" quick chip at the start: e.g., `[Asian]` appears pre-rendered (but unselected) because you always pick it
3. Last session's filters are offered as a "Resume filters?" prompt on return

### "Resume Filters" Prompt
When a user returns to the Recipes tab:
```
┌──────────────────────────────────────────────────────────────────┐
│  Last time you filtered by: Asian, Under 30 min                  │
│  [Apply these filters]  [Start fresh]                            │
└──────────────────────────────────────────────────────────────────┘
```
This appears as a subtle banner above the filter chips. Dismisses after one interaction.

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
│  │              Apply                   │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

- Slider AND preset chips (both work — tapping a chip moves the slider)
- Follows HelloFresh's pattern but adds the quick-tap presets

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
│  │              Done                    │
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
| **Layout** | Full screen, large cards | Modal with compact cards |
| **Filter memory** | Full history | Inherits from Browse history |

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

Follows HelloFresh's pattern (Image 6) — show "Most recent recipes" below the empty state so the user always has something to browse.

### Few Results (< 5)
Show a subtle suggestion: "Only 4 recipes match. [Broaden filters?]"

---

## 📱 Responsive Notes

### Mobile (primary target)
- Filter chips: horizontally scrollable, single row
- Dropdowns: bottom sheets (slide up from bottom)
- Search: full-width, collapses filter bar when focused

### Tablet / Desktop
- Filter chips: may wrap to two rows if many active
- Dropdowns: positioned dropdown panels (not bottom sheets)
- Search: inline with filter bar

---

## ✅ Acceptance Criteria

### Core
- [ ] Horizontal scrollable filter chip bar below search
- [ ] Cuisine filter with multi-select bottom sheet
- [ ] Cook Time filter with slider + preset chips
- [ ] Effort filter (Quick & Easy / Weeknight / Weekend)
- [ ] Sort dropdown with radio options
- [ ] Active filters shown as filled chips with × removal
- [ ] "Clear all" option when any filter is active
- [ ] Result count updates dynamically ("Showing 23 recipes")
- [ ] Search bar with live filtering

### Smart Memory
- [ ] Track filter usage per user
- [ ] Reorder chips based on frequency
- [ ] "Resume filters?" prompt on return
- [ ] Frequently used filter values suggested as quick chips

### Empty States
- [ ] "No results" with suggestions + fallback recipes
- [ ] "Few results" subtle prompt to broaden

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
6. Basic empty state

### Phase 2
1. Effort / ingredient count filter
2. Cook Time slider
3. Filter memory (track usage, reorder chips)
4. "Resume filters?" prompt
5. Dietary filters (connected to user profile)

### Phase 3
1. Smart suggestions (frequently used values as quick chips)
2. Protein / ingredient search filter
3. Season filter
4. Cost filter
5. Context-aware defaults in Recipe Picker

---

*Document created: February 2026*
*Based on: Competitive analysis of HelloFresh, Deliveroo, Gousto, and Just Eat filter UX*
*For: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\*
