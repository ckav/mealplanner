# Meal Planner - Weekly View Specification

> **Purpose**: Comprehensive specification for the Weekly Planner view, capturing all features shown in the current design and requirements from project discussions.
> **Reference Screenshot**: Shows grid layout with Mon-Fri visible, 3 columns (Main Meal + 2 Extra Meals), meal counter "8 of 14 meals selected"

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

**Interactions:**
- Click on card → Opens recipe detail modal
- Hover → Shows "Remove" or "Swap" action buttons
- Badge (portions) → May be editable on click (portion adjustment)

### 4. Skipped State
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

---

## ➕ Quick Add Functionality

### How Users Add Meals

**Option 1: Click Empty Slot**
1. User clicks empty slot or "Click to add"
2. Recipe Picker modal opens
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
│  [Quick & Easy] [Family Favourites] [Recently Cooked]            │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Recipe  │ │  Recipe  │ │  Recipe  │ │  Recipe  │            │
│  │   Card   │ │   Card   │ │   Card   │ │   Card   │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
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
- Quick filter chips (recently cooked, favourites, quick meals)
- Recipe cards grid (compact version)
- Portion selector
- "Add to Plan" confirmation button

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

### Tablet (768px - 1024px)
- Grid compresses, smaller thumbnails
- Day labels may collapse to abbreviations (Mon, Tue...)

### Mobile (<768px)
- Switch to list/card view
- One day visible at a time with horizontal swipe
- Or vertical scroll with collapsible day sections

---

## 🎨 Visual Design Notes

### Colours (from screenshot)
- **Header background**: White
- **Active tab**: Blue (#4F46E5 or similar purple-blue)
- **Row backgrounds**: Alternating white / light grey (#F9FAFB)
- **Empty slot border**: Dashed light grey
- **Filled slot border**: Solid subtle grey
- **Badge (portions)**: Blue circle with white number
- **"Not needed" text**: Light grey, muted
- **Skip button**: Subtle grey pill

### Typography
- **Day names**: Bold, dark grey
- **Recipe names**: Semi-bold, black
- **Cook time**: Regular weight, grey, small
- **"Click to add"**: Regular, grey, centred
- **"Not needed"**: Small, light grey

### Spacing
- Consistent padding within cells
- Clear visual separation between rows
- Adequate touch targets for mobile (44px minimum)

---

## 🔗 Integration Points

### With Recipe Cards (from recipe_card_wireframe.md)
- Recipe picker uses same card component
- Filled slots show mini version of recipe card

### With Shopping List
- Changes to meal plan auto-update shopping list
- "Generate Shopping List" counts ingredients from planned meals only

### With Cook Mode
- "Cook" button on filled slot opens cook mode for that recipe
- Can mark recipe as "Cooked" directly from planner

### With Settings
- Number of meal columns configurable
- Column labels customisable
- Planning horizon preference saved
- "Who's cooking for" defaults

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
          portions: null
        },
        {
          slotType: 'extra',
          status: 'filled',
          recipeId: 'thai-green-curry',
          portions: 4
        },
        {
          slotType: 'extra',
          status: 'notNeeded', // Extra meals default to not needed
          recipeId: null,
          portions: null
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
- [ ] Quick filter chips available
- [ ] Recipe cards are clickable
- [ ] Portion selector available before adding
- [ ] "Add to Plan" confirms selection

### Interactions
- [ ] Hover on filled slot shows remove/swap actions
- [ ] Clicking filled slot opens recipe detail
- [ ] Drag and drop from Recipes tab (stretch goal)

### Responsive
- [ ] Works on desktop, tablet, mobile
- [ ] Touch-friendly targets

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

---

*Document created: November 2024*
*Based on: Screenshot analysis + PROJECT_CONTEXT.md + Previous discussions*
*For: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\*
