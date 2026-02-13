# Meal Planner - Weekly View Specification

> **Purpose**: Comprehensive specification for the Weekly Planner view, capturing all features shown in the current design and requirements from project discussions.
> **Reference Screenshot**: Shows grid layout with Mon-Fri visible, 3 columns (Main Meal + 2 Extra Meals), meal counter "8 of 14 meals selected"
> **Reference Wireframe**: `cook-forward-wireframe.html` — tappable prototype showing linked meals, prep nudges, freezer stash, and persona switching (Claire solo / Luciana family)

---

## 📐 Layout Structure

### Header
```
┌──────────────────────────────────────────────────────────────────────┐
│  🔍 Meal Planner                              8 of 14 meals selected │
└──────────────────────────────────────────────────────────────────────┘
```

**Header Elements:**
- **App Logo/Icon** (magnifying glass with plate)
- **Page Title**: "Meal Planner"
- **Meal Counter**: "X of Y meals selected"
  - X = number of meal slots filled (not skipped)
  - Y = total meal slots available in the planning horizon
  - Updates dynamically as user adds/removes meals

### Navigation Tabs
```
┌─────────────────┐ ┌─────────────┐ ┌───────────────┐ ┌──────────────┐
│  📅 Weekly Plan │ │ 🍳 Recipes  │ │ 🛒 Shopping   │ │ ⚙️ Settings  │
│    (active)     │ │             │ │    List       │ │              │
└─────────────────┘ └─────────────┘ └───────────────┘ └──────────────┘
```

**Tab States:**
- **Weekly Plan** (active): Blue background, white text, calendar emoji
- **Recipes**: Inactive, grey text, cooking pot emoji
- **Shopping List**: Inactive, grey text, shopping cart emoji
- **Settings**: Inactive, grey text, gear emoji

---

## 📊 Grid Structure

### Column Headers
```
│           │    Main Meal     │   Extra Meal    │   Extra Meal    │
```

**Columns:**
1. **Day Label Column** (left side) - Shows day names
2. **Main Meal** - Required meal slot for each day
3. **Extra Meal** (column 2) - Optional additional meal
4. **Extra Meal** (column 3) - Optional additional meal

**Column Configuration (Settings):**
- Number of meal columns: Configurable (default: 3)
- Column labels: Customisable (e.g., "Lunch", "Dinner", "Snack")
- For MVP: Keep as "Main Meal" + "Extra Meal" × 2

### Row Structure (One per day)
```
┌───────────┬─────────────────────┬─────────────────────┬─────────────────────┐
│  Monday   │  [Meal Slot]        │  [Extra Slot]       │  [Extra Slot]       │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│  Tuesday  │  [Meal Slot]        │  [Extra Slot]       │  [Extra Slot]       │
├───────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│  ...      │  ...                │  ...                │  ...                │
└───────────┴─────────────────────┴─────────────────────┴─────────────────────┘
```

**Row Styling:**
- Alternating row colours (white / light grey) for readability
- Day labels left-aligned, bold
- Full week visible: Monday → Sunday (7 rows)

---

## 🎴 Meal Slot States

### 1. Empty State (Main Meal)
```
┌─────────────────────────────────┐
│                                 │
│  ╔═══════════════════════════╗  │
│  ║                           ║  │
│  ║      Click to add         ║  │
│  ║                           ║  │
│  ║        [ Skip ]           ║  │
│  ║                           ║  │
│  ╚═══════════════════════════╝  │
│                                 │
└─────────────────────────────────┘
```

**Empty State Elements:**
- Dashed border (light grey)
- "Click to add" text (grey, centred)
- **Skip Button**: Small pill button to mark day as skipped
- Entire area is clickable → Opens recipe picker modal

**Behaviour:**
- On click → Opens recipe selection modal (see Recipe Picker section)
- On "Skip" click → Marks slot as skipped (doesn't count toward meal total)

### 2. Empty State (Extra Meal)
```
┌─────────────────────────────────┐
│                                 │
│           +                     │
│      Not needed                 │
│                                 │
└─────────────────────────────────┘
```

**Extra Meal Empty State Elements:**
- Solid light grey border (more subtle than main meal)
- Small "+" icon (top right corner)
- "Not needed" text (grey, smaller font)
- Clicking "+" or slot → Opens recipe picker

**Behaviour:**
- Extra meals are optional - "Not needed" is the default state
- Does not require "Skip" button (no expectation to fill)
- Clicking anywhere → Opens recipe picker

### 3. Filled State (with recipe)
```
┌─────────────────────────────────┐
│ ┌─────────────┐  ❷             │
│ │  [Recipe    │                 │
│ │   Image]    │                 │
│ └─────────────┘                 │
│                                 │
│  Beer Battered Fish & Chips    │
│  25 min                        │
│                                 │
└─────────────────────────────────┘
```

**Filled State Elements:**
- **Recipe Image Thumbnail**: Small square/rectangle, left-aligned
- **Badge (circled number)**: Top-right, indicates servings/portions (e.g., "❷" = 2 portions)
- **Recipe Name**: Below image, bold text
- **Cook Time**: Below name, smaller grey text with timer icon
- **🔗 Cook Forward Badge** (optional): Shows chain relationship (see section below)

**Interactions:**
- Click on card → Opens recipe detail modal
- Hover → Shows "Remove" or "Swap" action buttons
- Badge (portions) → May be editable on click (portion adjustment)

### 4. Filled State with Cook Forward Link
```
┌─────────────────────────────────┐
│ ┌─────────────┐  ❷             │
│ │  [Recipe    │                 │
│ │   Image]    │                 │
│ └─────────────┘                 │
│                                 │
│  Chicken Fried Rice            │
│  15 min                        │
│  🔗 Uses Sun's chicken         │
│                                 │
└─────────────────────────────────┘
```

**Additional elements for linked meals:**
- **Chain badge**: Small pill below cook time — `🔗 Uses Sun's chicken` or `🔗 Feeds Mon, Wed`
- **Chain badge colours**: Purple/violet background (#f5f3ff) with purple text (#7c3aed)
- **Anchor meals** (the meal that starts a chain): `🔗 ANCHOR` or `🔗 Feeds → Mon, Wed`
- **Linked meals** (meals that consume from an anchor): `🔗 Uses Mon's sauce` or `🔗 Sun's stock`

**Chain connector lines between linked days:**
- Thin vertical line (2px, purple gradient) connecting linked day rows
- Small 🔗 icon centred on the connector
- Only visible when adjacent days are linked

### 5. Skipped State
```
┌─────────────────────────────────┐
│                                 │
│          ~~Skipped~~            │
│       [Undo] [Leftovers]        │
│                                 │
└─────────────────────────────────┘
```

**Skipped State Elements:**
- Greyed out appearance
- "Skipped" label (struck through or muted)
- **Undo**: Returns to empty state
- **Leftovers**: Quick option to mark as "eating leftovers" (optional)

### 6. Empty State with Freezer Suggestion
```
┌─────────────────────────────────┐
│                                 │
│      No meal planned            │
│                                 │
│  ❄️ You have: Beef Chilli       │
│     (frozen 3 days ago) · 2     │
│     [ Use this ] [ Plan new ]   │
│                                 │
└─────────────────────────────────┘
```

**Freezer suggestion on empty slots:**
- When a day has no meal planned and the freezer stash has items, surface them
- Teal/cyan accent colour (#0891b2) for all freezer-related UI
- "Use this" adds the frozen meal to the slot
- "Plan new" opens the standard recipe picker

---

## 🔢 Meal Counter Logic

### "X of Y meals selected"

**Y (Total Slots) Calculation:**
```
Y = (Days in horizon) × (Meal columns)
Example: 7 days × 2 required meals = 14
```

**Configuration Options:**
- Count all columns, or only "Main Meal" column
- Exclude weekends from count (optional setting)
- Adjustable per week if some days don't need planning

**X (Selected) Calculation:**
```
X = Slots with a recipe assigned (not empty, not skipped)
```

**Display:**
- "8 of 14 meals selected" = 8 slots filled, 14 total expected
- Colour coding: Green when complete, amber when partial, grey when empty
- Optional Cook Forward stat: "3 linked 🔗" shown alongside the counter

---

## ➕ Quick Add Functionality

### How Users Add Meals

**Option 1: Click Empty Slot**
1. User clicks empty slot or "Click to add"
2. Recipe Picker modal opens (with Cook Forward suggestions if available)
3. User searches/filters/selects recipe
4. Recipe added to that slot

**Option 2: Drag from Recipes Tab**
1. User is on Recipes tab, finds a recipe
2. Drags recipe card
3. Drops onto Weekly Plan slot
4. Recipe added with default portions

**Option 3: "Add to Plan" from Recipe Card/Detail**
1. User clicks "+ Add" on recipe card
2. Modal asks: "Which day?" (dropdown or calendar)
3. User selects day + slot (Main/Extra)
4. Recipe added

### Recipe Picker Modal
```
┌──────────────────────────────────────────────────────────────────┐
│  Add meal for: Tuesday - Main Meal                         ✕     │
├──────────────────────────────────────────────────────────────────┤
│  🔍 Search recipes...                                            │
│                                                                  │
│  [Quick & Easy] [Family Favourites] [🔗 Cook Forward] [Recent]  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ 🔗 Cook Forward suggestions                              │    │
│  │ These work with what you're already cooking this week     │    │
│  │                                                          │    │
│  │  [Chicken Fried Rice] [Veggie Stir Fry] [Caesar Wrap]   │    │
│  │   🔗 Sun's chicken    🔗 Mon's rice     🔗 Sun's chicken │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ─── or browse all recipes ───                                   │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Recipe  │ │  Recipe  │ │  Recipe  │ │  Recipe  │            │
│  │   Card   │ │   Card   │ │   Card   │ │   Card   │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│                                                                  │
│                                         Portions: [2] [+] [-]    │
│                                         [ Add to Plan ]          │
└──────────────────────────────────────────────────────────────────┘
```

**Modal Elements:**
- Title showing which day/slot being filled
- Search bar
- Quick filter chips (recently cooked, favourites, quick meals, **🔗 Cook Forward**)
- **Cook Forward suggestion panel** (when links available): Purple-tinted panel at top showing recipes that chain with this week's plan. Horizontal scrollable. Each card shows the chain relationship.
- "or browse all recipes" divider — Cook Forward is a suggestion, never a gate
- Recipe cards grid (compact version)
- Portion selector
- "Add to Plan" confirmation button

**Cook Forward panel logic:**
- Only appears when the app detects chain opportunities with the current week's plan
- Suggestions based on: shared ingredients, leftover outputs, shared prep steps
- Each suggestion card shows: recipe name, cook time, and chain relationship (e.g., "🔗 Uses Sun's chicken")
- Panel is dismissible / togglable via the 🔗 chip filter
- If no chains detected, panel doesn't appear — no empty state for it

---

## 🔗 Cook Forward Feature

> **Concept**: Meals linked in chains where today's cooking effort makes tomorrow easier. Not leftovers (same thing twice) — intentional pivots where the same base becomes a different dish.
> **Wireframe**: See `cook-forward-wireframe.html` for full interactive prototype.
> **Philosophy**: Zero additional activation energy. Extend a task already in motion. Always skippable, never guilt-inducing.

### Three Layers

#### Layer 1: "While You're At It" (Micro-prep nudges in Cook Mode)

Small suggestions surfaced during cooking that reduce tomorrow's prep time.

**When it appears:** As a pre-cooking checklist in cook mode, or as mid-cooking contextual prompts.

**Examples:**
- "Tomorrow's stir-fry needs diced onion too — chop an extra one now"
- "The food processor is already out — blitz tomorrow's garlic and ginger paste"
- "You're boiling rice tonight — cook an extra cup for Thursday's fried rice"
- "The oven is at 200°C — roast some butternut squash for Wednesday's soup"

**UX:**
```
┌─────────────────────────────────────────────────┐
│  🔗 Cook Forward · Before you start             │
│                                                 │
│  ☐ Cook 1 extra cup of rice                     │
│    → Mon's Fried Rice + Tue's Stir Fry          │
│    Saves 20 min                                 │
│                                                 │
│  ☐ Dice 2 extra onions                          │
│    → Monday + Wednesday                         │
│    Saves 10 min                                 │
│                                                 │
│  ☐ Save the chicken carcass                     │
│    → Wednesday's soup stock                     │
│                                                 │
│  [ Skip all — just cook tonight ]               │
└─────────────────────────────────────────────────┘
```

**Design rules:**
- Always skippable — "Skip all" always available, zero guilt
- Show time saved per item — dopamine of efficiency
- Maximum 2-3 suggestions at a time
- Tappable checkboxes — mark done ✓ to update linked meal's prep status
- Pre-cooking checklist appears BEFORE recipe steps
- Mid-cooking nudges appear contextually (e.g., "oven is on" nudge only while oven is in use)

#### Layer 2: "Intentional Pivots" (Linked meals in planning)

Recipes designed to work in sequence — tonight's cooking creates the foundation for a different meal later.

**When it appears:** In the recipe picker (Cook Forward suggestion panel), in the weekly view (chain badges and connectors).

**Examples:**
- Roast chicken Sunday → Chicken fried rice Monday → Chicken noodle soup Wednesday
- Bolognese Monday → Lasagne Wednesday (same sauce base, different dish)
- Sambal/paste made Saturday → Foundation for 3 meals across the week

**In the weekly view:**
- Chain badges on linked meal cards (see Filled State with Cook Forward Link above)
- Connector lines between linked days
- "Anchor" meal clearly indicated — the meal that starts the chain

**In the recipe picker:**
- Cook Forward suggestion panel at top (see Recipe Picker Modal above)
- Linked recipes shown with chain relationship explanation
- Non-linked recipes always available below

**Chain confirmation screen:**
When a linked recipe is added, show a summary:
```
┌─────────────────────────────────────────────────┐
│  Your chain this week                           │
│                                                 │
│  SUN  🍗 Roast Chicken         ANCHOR           │
│   │                                             │
│  MON  🍚 Chicken Fried Rice    🔗 chicken+rice  │
│   │                                             │
│  TUE  🍲 Veggie Stir Fry      🔗 rice           │
│   │                                             │
│  WED  🍜 Chicken Noodle Soup   🔗 stock          │
│                                                 │
│  1 chicken → 3 meals · ~35 min saved            │
└─────────────────────────────────────────────────┘
```

#### Layer 3: "Future-Me Insurance" (Freezer stash)

On a good energy day, cook something extra that goes in the freezer for a bad day.

**When it appears:**
- During cooking: "This freezes well — make a double batch?" prompt
- On empty/unplanned days: "You have frozen chilli from last week" suggestion
- Dedicated ❄️ Freezer Stash view (accessible from bottom nav or settings)

**Freezer stash view:**
- Simple inventory of frozen items
- Each item: recipe name, frozen date, portions, expiry window
- "Quick wins" section: recipes that use frozen items
- Colour: Teal/cyan (#0891b2) accent for all freezer UI
- Amber warning for items approaching expiry

**Design rules:**
- Items added to freezer when user accepts a "freeze" prompt during cooking
- Items removed when used in a meal plan
- Gentle expiry warnings, never nagging
- "Quick wins" suggestions surface on empty planner days

### Cook Forward: Graceful Degradation

Critical: If a chain link breaks (user swaps or removes the anchor meal), the linked meals must NOT break. They simply become standalone recipes that need their own full ingredients. The shopping list updates accordingly. No error states, no warnings, no guilt.

### Cook Forward: ADHD Design Principles

1. **No guilt.** Skipping a nudge has zero consequences. No compliance tracking, no streaks.
2. **No extra initiation cost.** Every action extends something already in motion.
3. **Visible progress.** "You saved 35 minutes this week" — occasional, satisfying, not nagging.
4. **Novelty engine.** Chains naturally introduce variety (chicken becomes fried rice becomes soup).
5. **Graceful degradation.** Skip a link, nothing breaks.
6. **Body doubling.** Pre-cooking checklists act like a gentle external voice in the kitchen.

---

## 🧑‍🍳 "Cooking For Who" Integration

### Per-Day Group Selection

Each day row could optionally show WHO is being cooked for:

```
┌───────────┬─────────────────────┬─────────────────────┐
│  Monday   │  [Meal Slot]        │  👨‍👩‍👧 Everyone (4)   │
│           │  Thai Green Curry   │                     │
├───────────┼─────────────────────┼─────────────────────┤
│  Tuesday  │  [Meal Slot]        │  👫 Just Us (2)     │
│           │  Fish & Chips       │                     │
└───────────┴─────────────────────┴─────────────────────┘
```

**Or simpler: Week-level default with per-day override**
- Header shows: "This week: Everyone Home (4 portions)"
- Per-day override available in slot settings

**Cook Forward + "Who's Eating" interaction:**
- All Cook Forward suggestions respect who's eating on the target day
- If Monday's anchor is allergy-safe for everyone but Wednesday only has 3 people (no Fynn), the linked Wednesday recipe must still be safe for whoever IS eating Wednesday
- The recipe picker's Cook Forward panel filters linked suggestions by the day's dietary requirements

---

## 📅 Planning Horizon

### Options (configurable in Settings):

1. **This Week Only** (default)
   - Shows Mon-Sun of current week
   - "Next Week" button to advance

2. **Rolling 7 Days**
   - Today → 6 days ahead
   - Rolls forward daily

3. **Two Weeks**
   - Current week + next week
   - Useful for batch shopping

4. **Custom Date Range**
   - User picks start/end dates
   - For holidays, events, etc.

### Navigation:
```
   < Previous Week  │  [This Week: 25 Nov - 1 Dec]  │  Next Week >
```

---

## 📱 Responsive Behaviour

### Desktop (>1024px)
- Full grid visible with all 3 meal columns
- Recipe images shown
- All interactions visible
- Chain connector lines visible between rows

### Tablet (768px - 1024px)
- Grid compresses, smaller thumbnails
- Day labels may collapse to abbreviations (Mon, Tue...)
- Chain badges may collapse to icon-only (🔗)

### Mobile (<768px)
- Switch to list/card view
- One day visible at a time with horizontal swipe
- Or vertical scroll with collapsible day sections
- Chain badges always visible (important context)
- Cook Forward nudges in cook mode: full-width cards

---

## 🎨 Visual Design Notes

### Colours (from screenshot + Cook Forward additions)
- **Header background**: White
- **Active tab**: Blue (#4F46E5 or similar purple-blue)
- **Row backgrounds**: Alternating white / light grey (#F9FAFB)
- **Empty slot border**: Dashed light grey
- **Filled slot border**: Solid subtle grey
- **Badge (portions)**: Blue circle with white number
- **"Not needed" text**: Light grey, muted
- **Skip button**: Subtle grey pill
- **🔗 Cook Forward chain badge**: Purple/violet — bg #f5f3ff, text #7c3aed, border #ddd6fe
- **🔗 Chain connector line**: Purple gradient (#ddd6fe → #7c3aed)
- **❄️ Freezer elements**: Teal/cyan — bg #ecfeff, text #0891b2, border #a5f3fc
- **⏱ Time saved badge**: Green — bg #dcfce7, text #16a34a
- **Cook Forward nudge cards**: Gradient background (violet-light to purple-light)

### Typography
- **Day names**: Bold, dark grey
- **Recipe names**: Semi-bold, black
- **Cook time**: Regular weight, grey, small
- **"Click to add"**: Regular, grey, centred
- **"Not needed"**: Small, light grey
- **Chain badge text**: 10px, semi-bold, purple
- **Cook Forward nudge label**: 12px, bold, uppercase, purple
- **Time saved**: 10px, semi-bold, green

### Spacing
- Consistent padding within cells
- Clear visual separation between rows
- Adequate touch targets for mobile (44px minimum)
- Chain connector: 16px tall, 2px wide, positioned at left margin of day column

---

## 🔗 Integration Points

### With Recipe Cards (from recipe_card_wireframe.md)
- Recipe picker uses same card component
- Filled slots show mini version of recipe card
- Cook Forward badges overlay on recipe cards when relevant

### With Shopping List
- Changes to meal plan auto-update shopping list
- "Generate Shopping List" counts ingredients from planned meals only
- **Cook Forward shopping savings**: When meals are linked, shared ingredients are bought once (e.g., "🔗 Chicken used in 3 meals — buy 1 large bird")
- Extra prep ingredients (e.g., extra rice for Tuesday) automatically added to shopping list

### With Cook Mode
- "Cook" button on filled slot opens cook mode for that recipe
- Can mark recipe as "Cooked" directly from planner
- **Cook Forward pre-cooking checklist**: Appears before recipe steps, showing micro-prep items for upcoming linked meals
- **Cook Forward mid-cooking nudges**: Contextual suggestions during cooking (oven is on → roast extra veg; chopping board is out → chop extra onion)
- **Freezer prompt**: Appears after cooking if recipe is freezable and user has surplus

### With Freezer Stash
- Simple inventory of frozen items (recipe name, date frozen, portions, expiry)
- Items added via cook mode freezer prompts
- Items suggested on empty/unplanned planner days
- "Quick wins" recipes that use frozen items
- Accessible from bottom nav (replaces or supplements Settings tab) or dedicated section

### With Settings
- Number of meal columns configurable
- Column labels customisable
- Planning horizon preference saved
- "Who's cooking for" defaults
- **Cook Forward toggle**: Enable/disable Cook Forward suggestions (on by default)
- **Freezer stash toggle**: Enable/disable freezer tracking

### With "Cooking For Who" / Dietary Filtering
- Cook Forward suggestions respect all dietary restrictions for the target day's diners
- Chain recipes filtered: if anchor is safe for everyone, linked meal must be safe for whoever is eating that day
- "Who's eating" changes on a day may invalidate a chain suggestion — handle gracefully (remove suggestion, offer alternatives)

---

## 📋 Data Structure

### Meal Plan Object
```javascript
{
  weekStartDate: '2024-11-25', // Monday of the week
  horizon: 'week', // 'week' | 'twoWeeks' | 'rolling7' | 'custom'
  defaultGroup: 'everyone', // Group ID for default portions
  days: [
    {
      date: '2024-11-25',
      dayName: 'Monday',
      groupOverride: null, // or group ID if different from default
      slots: [
        {
          slotType: 'main', // 'main' | 'extra'
          status: 'empty', // 'empty' | 'filled' | 'skipped'
          recipeId: null,
          portions: null,
          cookForward: null // Cook Forward link data (see below)
        },
        {
          slotType: 'extra',
          status: 'filled',
          recipeId: 'chicken-fried-rice',
          portions: 2,
          cookForward: {
            consumesFrom: {
              sourceDay: '2024-11-24',
              sourceRecipe: 'roast-chicken',
              outputUsed: 'Shredded roast chicken'
            },
            prepCompleted: [
              { step: 'Dice onion', completedOn: '2024-11-24' }
            ]
          }
        },
        {
          slotType: 'extra',
          status: 'notNeeded',
          recipeId: null,
          portions: null,
          cookForward: null
        }
      ]
    },
    // ... more days
  ]
}
```

### Slot Status Enum
- `empty` - Main meal not yet assigned, awaiting input
- `filled` - Recipe assigned with portions
- `skipped` - User explicitly skipped this meal (leftovers, eating out, etc.)
- `notNeeded` - Extra meal slot, user hasn't added anything (default for extras)

### Recipe Metadata — Cook Forward Extensions
```javascript
{
  recipeId: 'roast-chicken',
  // ... existing recipe fields ...

  cookForward: {
    // What this recipe produces beyond the meal itself
    yields: [
      {
        outputType: 'leftover-protein',  // category for matching
        outputName: 'Shredded roast chicken',
        estimatedQuantity: '300g',
        storageMethod: 'fridge',  // 'fridge' | 'freezer' | 'counter'
        shelfLife: 3,             // days
        usableIn: ['chicken-fried-rice', 'chicken-noodle-soup', 'chicken-caesar']
      },
      {
        outputType: 'stock-base',
        outputName: 'Chicken stock (from carcass)',
        estimatedQuantity: '1L',
        storageMethod: 'fridge',
        shelfLife: 5,
        usableIn: ['chicken-noodle-soup', 'risotto', 'gravy']
      }
    ],

    // What this recipe can consume from a previous Cook Forward meal
    consumes: [
      {
        inputType: 'leftover-protein',
        inputName: 'Cooked chicken',
        fromRecipes: ['roast-chicken', 'poached-chicken']
      }
    ],

    // Prep steps shareable with other recipes this week
    shareablePrep: [
      {
        step: 'Dice onion',
        ingredient: 'onion',
        quantity: '1 medium',
        sharedWith: ['bolognese', 'stir-fry', 'curry-base'],
        timeSaved: 8  // minutes
      }
    ],

    // Freezability
    freezer: {
      canFreeze: true,
      maxMonths: 3,
      freezeInstructions: 'Cool completely, portion into containers',
      reheatingInstructions: 'Defrost overnight, reheat in pan until piping hot',
      freezesWellAs: 'sauce-only'  // or 'complete-dish', 'components'
    }
  }
}
```

### Freezer Stash Object
```javascript
{
  freezerItems: [
    {
      id: 'freezer-001',
      recipeId: 'beef-chilli',
      recipeName: 'Beef Chilli',
      frozenDate: '2024-11-20',
      portions: 2,
      expiryDate: '2025-02-20',  // frozenDate + maxMonths
      notes: 'In blue container, top shelf',
      status: 'available'  // 'available' | 'used' | 'expired'
    }
  ]
}
```

---

## ✅ Acceptance Criteria

### Core Functionality
- [ ] Grid displays 7 days × 3 meal columns
- [ ] "X of Y meals selected" updates dynamically
- [ ] Empty main meal slots show "Click to add" + Skip button
- [ ] Empty extra meal slots show "+" and "Not needed"
- [ ] Clicking empty slot opens recipe picker modal
- [ ] Filled slots show recipe thumbnail, name, cook time, portions badge
- [ ] Skip button marks slot as skipped
- [ ] Navigation tabs switch between Weekly Plan, Recipes, Shopping List, Settings

### Recipe Picker Modal
- [ ] Opens with context (which day/slot)
- [ ] Search bar filters recipes
- [ ] Quick filter chips available (including 🔗 Cook Forward chip)
- [ ] Recipe cards are clickable
- [ ] Portion selector available before adding
- [ ] "Add to Plan" confirms selection
- [ ] **Cook Forward suggestion panel appears when chain opportunities exist**
- [ ] **Cook Forward suggestions show chain relationship (e.g., "🔗 Uses Sun's chicken")**

### Cook Forward — Weekly View
- [ ] Filled slots with chain links show 🔗 chain badge
- [ ] Anchor meals show "🔗 Feeds → Day, Day" badge
- [ ] Linked meals show "🔗 Uses Day's [item]" badge
- [ ] Chain connector lines appear between linked adjacent days
- [ ] Removing/swapping an anchor meal gracefully breaks the chain (linked meals become standalone)
- [ ] Meal counter optionally shows "X linked 🔗" stat

### Cook Forward — Cook Mode
- [ ] Pre-cooking checklist shows micro-prep items for upcoming linked meals
- [ ] Each checklist item is tappable to mark done
- [ ] "Skip all" option always available
- [ ] Mid-cooking nudges appear contextually (oven on, chopping board out, etc.)
- [ ] Nudges show time saved per item
- [ ] Maximum 2-3 nudges at a time
- [ ] Freezer prompt appears post-cooking for freezable recipes

### Cook Forward — Freezer Stash
- [ ] Freezer inventory shows items with date, portions, expiry
- [ ] Items added via cook mode freezer prompts
- [ ] Expired/expiring items show amber warning
- [ ] "Quick wins" suggest recipes using frozen items
- [ ] Empty planner days suggest frozen items

### Interactions
- [ ] Hover on filled slot shows remove/swap actions
- [ ] Clicking filled slot opens recipe detail
- [ ] Drag and drop from Recipes tab (stretch goal)

### Responsive
- [ ] Works on desktop, tablet, mobile
- [ ] Touch-friendly targets
- [ ] Chain badges visible on all screen sizes

---

## 🚀 Implementation Priority

### Phase 1 (MVP)
1. Static grid layout with 7 days × 3 columns
2. Empty states for main meal and extra meal
3. Meal counter in header
4. Basic recipe picker modal
5. Fill slot with recipe (thumbnail, name, time)

### Phase 2
1. Skip functionality
2. Portions badge and adjustment
3. Week navigation (prev/next)
4. Integration with shopping list

### Phase 3
1. "Cooking for who" per-day override
2. Drag and drop
3. Custom planning horizon
4. Mobile-optimised view

### Phase 4 — Cook Forward: Foundations
1. Add `cookForward` metadata to recipes (start with 20-30 recipes)
2. Recipe-to-recipe relationship data (`yields`, `consumes`, `shareablePrep`)
3. Recipe picker: Cook Forward suggestion panel (detect chains from weekly plan)
4. Weekly view: 🔗 chain badges on filled slots
5. Chain connector lines between linked days

### Phase 5 — Cook Forward: Cook Mode Integration
1. Pre-cooking checklist (micro-prep items for upcoming linked meals)
2. Mid-cooking contextual nudges (oven is on, chopping board out, etc.)
3. Checklist item completion updates linked meal prep status
4. "Skip all" and individual skip for nudges
5. Time saved tracking (per item and per week)

### Phase 6 — Cook Forward: Freezer Stash
1. Freezer inventory (add/remove items)
2. Freezer prompts during cooking (for freezable recipes)
3. Freezer item expiry tracking and warnings
4. Empty day suggestions from freezer stash
5. "Quick wins" recipes using frozen items

### Phase 7 — Cook Forward: Intelligence
1. Learn which Cook Forward suggestions users actually accept
2. Prioritise chains that match user's cooking style
3. Seasonal chain suggestions (autumn → roast veg chains)
4. "This week's Cook Forward plan" — suggested full-week chain
5. Shopping list savings summary from Cook Forward chains

---

*Document created: November 2024*
*Updated: February 2026 — Added Cook Forward feature (linked meals, prep nudges, freezer stash)*
*Based on: Screenshot analysis + PROJECT_CONTEXT.md + Previous discussions + Cook Forward concept*
*Wireframes: cook-forward-wireframe.html (tappable prototype)*
*For: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\*
