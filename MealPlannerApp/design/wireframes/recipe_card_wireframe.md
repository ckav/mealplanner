# Recipe Card Wireframe

## Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ┌─────────────┐                      │
│                    │  FAVOURITE  │  ← Heart icon        │
│                    │     ♡       │    (top right)       │
│                    └─────────────┘                      │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                   │  │
│  │                                                   │  │
│  │                                                   │  │
│  │               HERO IMAGE                          │  │
│  │                                                   │  │
│  │           (AI generated if needed)               │  │
│  │                                                   │  │
│  │                                                   │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                   │  │
│  │  MEAL NAME                                        │  │
│  │  Thai Green Curry                                 │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Quick Info Bar                                      ││
│  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                ││
│  │ │ 25m  │ │ 380  │ │ 4    │ │ Med  │                ││
│  │ │ ⏱️   │ │ kcal │ │ 🍽️   │ │ ⚡   │                ││
│  │ │ Cook │ │      │ │ Srv  │ │ Easy │                ││
│  │ └──────┘ └──────┘ └──────┘ └──────┘                ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Tags                                                ││
│  │ ┌────────┐ ┌────────┐ ┌────────┐                   ││
│  │ │ Asian  │ │ Curry  │ │ Veggie │                   ││
│  │ └────────┘ └────────┘ └────────┘                   ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Source: BBC Good Food                    [→]       ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│            ┌──────────────────────┐                     │
│            │   + ADD TO PLAN      │  ← Primary action   │
│            └──────────────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Card Elements Breakdown

### 1. HERO IMAGE (Top)
| Attribute | Description |
|-----------|-------------|
| **Size** | Dominant, ~60% of card height |
| **Aspect** | 4:3 or 16:9 landscape |
| **Source options** | Uploaded photo, URL scraped, AI placeholder |
| **Placeholder** | Gradient with cuisine icon if no image |
| **Enhancement** | Option to improve uploaded photos later |

### 2. FAVOURITE INDICATOR (Top Right Overlay)
| Attribute | Description |
|-----------|-------------|
| **Icon** | Heart (♡ empty / ♥ filled) |
| **Tap action** | Toggle favourite |
| **Visibility** | Always visible on hover/tap, subtle otherwise |
| **Scope** | Can be personal or household favourite |

### 3. COOKED COUNT (Subtle, Optional Display)
| Attribute | Description |
|-----------|-------------|
| **Display** | Small, subtle - e.g. "Made 5×" or just "5" with cook icon |
| **Position** | Bottom corner of image or near source |
| **Purpose** | Enables sorting by "recently cooked", "most cooked", "never tried" |
| **Visibility** | User preference - can hide if not wanted |

### 4. MEAL NAME
| Attribute | Description |
|-----------|-------------|
| **Style** | Bold, appetizing, clear |
| **Max length** | ~40 chars before truncation |
| **Examples** | "Thai Green Curry", "Grandma's Sunday Roast" |

### 4. QUICK INFO BAR
| Icon | Label | Description |
|------|-------|-------------|
| ⏱️ | **Cook Time** | Total time (prep + cook), e.g. "25m", "1h 20m" |
| 🔥 | **Calories** | Per serving, e.g. "380 kcal" |
| 🍽️ | **Base Servings** | Original recipe yield, e.g. "Serves 4" |
| ⚡ | **Difficulty** | Easy / Medium / Challenging |

### 5. TAGS (Filterable)
| Category | Examples |
|----------|----------|
| **Cuisine** | Asian, Italian, Mexican, British, Indian |
| **Meal Type** | Dinner, Lunch, Breakfast, Snack |
| **Diet** | Vegetarian, Vegan, Pescatarian |
| **Style** | Quick, Comfort, Light, Batch-cook |
| **Season** | Summer, Winter, BBQ |

### 6. SOURCE ATTRIBUTION
| Attribute | Description |
|-----------|-------------|
| **Text** | "BBC Good Food", "Family Recipe", "Cookbook: Ottolenghi Simple" |
| **Link** | Clickable to original (if URL source) |
| **Icon** | External link indicator for web sources |

### 7. CARD ACTIONS

#### Two Interaction Modes

| Action | Trigger | Result |
|--------|---------|--------|
| **View Details** | Tap card / "View" button | Opens full recipe detail view |
| **Quick Add** | "+ Add" button | Opens "Who's eating?" modal, then adds to plan |

#### Button Layout
```
┌─────────────────────────────────┐
│  [  View Recipe  ] [ + Add ]   │
└─────────────────────────────────┘
```

| Button | Style | Notes |
|--------|-------|-------|
| **View Recipe** | Secondary/outline | Primary way to explore |
| **+ Add** | Primary/filled | Quick action for familiar recipes |

#### Card Tap Behaviour
- Tapping the card image/name = View Details
- Only the "+ Add" button triggers the add flow
- Prevents accidental adds when browsing

---

## Hidden/Backend Data (Not Displayed on Card)

These are stored but not shown on the card face - used for filtering, shopping lists, and cooking view:

### Ingredients Data
```
ingredients: [
  {
    name: "Chicken breast",
    amount: 400,
    unit: "g",
    category: "Protein",
    scalable: true,
    notes: "or use thigh for more flavour"
  },
  {
    name: "Coconut milk",
    amount: 1,
    unit: "can (400ml)",
    category: "Pantry",
    scalable: true,
    sharedWith: ["Thai Red Curry", "Coconut Rice"]  // ← Ingredient pairing!
  },
  {
    name: "Thai green curry paste",
    amount: 2,
    unit: "tbsp",
    category: "Pantry",
    scalable: "partial",  // doesn't scale linearly
    notes: "adjust to taste"
  }
]
```

### Allergen Data
```
allergens: {
  contains: ["fish sauce"],  // Contains allergen
  mayContain: [],
  freeFrom: ["peanuts", "sesame", "dairy", "gluten"]
}
```

### Recipe Steps (for Cook view)
```
steps: [
  { step: 1, instruction: "Cut chicken into bite-size pieces", time: null },
  { step: 2, instruction: "Heat oil in wok over high heat", time: "1 min" },
  { step: 3, instruction: "Add curry paste and fry until fragrant", time: "2 min" },
  ...
]
```

### Metadata
```
metadata: {
  id: "thai-green-curry-001",
  source: {
    type: "url",  // "url" | "family" | "cookbook" | "original"
    name: "BBC Good Food",
    url: "https://...",
    author: "Original author name"
  },
  dateAdded: "2024-01-15",
  lastCooked: "2024-03-20",
  timesCooked: 5,
  rating: 4.5,  // personal rating
  notes: "Kids loved it, add less chilli next time"
}
```

---

## Portion Control System

### The Problem
- Most recipes serve 4
- Single person = same meal 4 days straight = boring
- Dividing by 4 doesn't always work (liquids, spices, minimum amounts)

### The Solution: Smart Scaling + Ingredient Pairing

#### On Card Selection
```
┌─────────────────────────────────────────────┐
│  Thai Green Curry                           │
│  Base recipe: Serves 4                      │
│                                             │
│  How many portions?                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐            │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5+│            │
│  └───┘ └───┘ └───┘ └───┘ └───┘            │
│                                             │
│  💡 Tip: This uses 1 can coconut milk.     │
│     "Coconut Rice" also uses coconut milk!  │
│     ┌─────────────────────────────┐        │
│     │ + Add Coconut Rice (2 srv)  │        │
│     └─────────────────────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
```

#### Scaling Rules
| Ingredient Type | Scaling Behaviour |
|-----------------|-------------------|
| **Proteins** | Linear (400g ÷ 4 = 100g per person) |
| **Vegetables** | Linear with minimum threshold |
| **Liquids (stock, milk)** | Step-based (can't buy half a can) |
| **Spices** | Non-linear (1 portion ≠ ¼ of 4-portion amount) |
| **Aromatics (garlic, ginger)** | Minimum amount (1 clove minimum) |
| **Pantry staples** | Often "to taste" or fixed |

---

## Ingredient Sharing / Meal Pairing

### Concept
When you select a recipe, the system identifies:
1. **Awkward quantities** - e.g., recipe uses half a can of coconut milk
2. **Shared ingredients** - other recipes using the same item
3. **Suggested pairings** - "You're buying X anyway, consider Y"

### Example Flow
```
You selected: Thai Green Curry (2 portions)
  → Uses: 1 can coconut milk (but only needs 200ml for 2 portions)

System suggests:
  "You'll have leftover coconut milk! These recipes use it:"
  - Coconut Rice (uses remaining 200ml)
  - Thai Butternut Soup (uses 200ml)
  - Banana Coconut Smoothie (uses 100ml)
```

### Shopping List Intelligence
```
SHOPPING LIST
─────────────
Selected meals:
  • Thai Green Curry (2 srv)
  • Coconut Rice (2 srv)

Coconut milk          1 can (400ml)
  └─ Thai Green Curry: 200ml
  └─ Coconut Rice: 200ml
  └─ Remaining: 0ml ✓ No waste!

Chicken breast        200g
  └─ Thai Green Curry: 200g
```

---

## Card States

### Default
Normal appearance, ready to select

### Hover/Focus
Subtle lift/shadow, favourite heart more visible

### Selected (In Plan)
```
┌─────────────────────────────────┐
│  ✓ ADDED                        │  ← Overlay badge
│  ┌─────────────────────────┐    │
│  │      [Image]            │    │
│  └─────────────────────────┘    │
│  Thai Green Curry               │
│  ...                            │
│  ┌──────────────────────────┐   │
│  │  ✓ In Plan (2 portions)  │   │  ← Shows portion count
│  └──────────────────────────┘   │
└─────────────────────────────────┘
```

### Filtered Out (Doesn't Meet Criteria)
Not shown at all - clean, uncluttered browsing

### Greyed/Unavailable
Only if browsing "all recipes" with household filter off - shows with subtle warning

---

## Sharing Recipe Cards

### Export Options
| Format | Use Case |
|--------|----------|
| **Image** | Share on WhatsApp/social - pretty card format |
| **PDF** | Print for cookbook collection |
| **Link** | Share within app (if multi-user) |
| **Text** | Copy ingredients + steps as plain text |

### Share Card Preview
```
┌─────────────────────────────────────┐
│  [Pretty card image]                │
│                                     │
│  Thai Green Curry                   │
│  From: Claire's Kitchen             │
│                                     │
│  "My go-to weeknight curry!"        │
│                                     │
│  Scan QR or visit:                  │
│  [QR CODE]  mealplanner.app/r/xyz   │
└─────────────────────────────────────┘
```

---

---

## Recipe Detail View (Full Recipe)

When tapping "View Recipe" or the card itself, opens a detailed view:

### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                        ♡  Share  ⋮     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │                     HERO IMAGE                            │  │
│  │                     (larger)                              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Thai Green Curry                                               │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ⏱️ 25 mins  │  🔥 380 cal  │  Serves 4  │  Easy               │
│                                                                 │
│  [Asian] [Curry] [Healthy] [Dairy-Free]                        │
│                                                                 │
│  Source: BBC Good Food →                                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  INGREDIENTS                              Portions: [2] [-][+]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Protein                                                        │
│  ☐ 200g chicken breast (scaled from 400g)                      │
│                                                                 │
│  Vegetables                                                     │
│  ☐ 1 red pepper, sliced                                        │
│  ☐ 100g baby corn                                              │
│  ☐ Handful of Thai basil                                       │
│                                                                 │
│  Sauce                                                          │
│  ☐ 200ml coconut milk                                          │
│  ☐ 2 tbsp Thai green curry paste                               │
│  ☐ 1 tbsp fish sauce                                           │
│                                                                 │
│  Pantry (you might have)                                        │
│  ☐ 1 tbsp vegetable oil                                        │
│  ☐ Salt to taste                                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  METHOD                                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Step 1                                                         │
│  Cut the chicken into bite-sized pieces. Slice the pepper      │
│  into strips.                                                   │
│                                                                 │
│  Step 2                                               ⏱️ 2 min  │
│  Heat oil in a wok over high heat. Add the curry paste and     │
│  fry until fragrant.                                            │
│                                                                 │
│  Step 3                                               ⏱️ 5 min  │
│  Add the chicken pieces and stir-fry until sealed on all       │
│  sides.                                                         │
│                                                                 │
│  Step 4                                              ⏱️ 10 min  │
│  Pour in the coconut milk and bring to a simmer. Add the       │
│  vegetables and cook until tender.                              │
│                                                                 │
│  Step 5                                                         │
│  Season with fish sauce. Scatter with Thai basil and serve     │
│  with jasmine rice.                                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  TIPS & NOTES                                                   │
├─────────────────────────────────────────────────────────────────┤
│  💡 Use chicken thigh for more flavour                         │
│  💡 Add more paste if you like it spicy                        │
│  📝 Your note: "Kids loved it - less chilli next time"         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │                + ADD TO MEAL PLAN                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Made this? [Mark as Cooked] [Add Personal Note]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Detail View Features

| Section | Features |
|---------|----------|
| **Header** | Back nav, favourite toggle, share, menu (edit/delete) |
| **Hero** | Larger image, swipeable if multiple photos |
| **Quick info** | Same as card but more space |
| **Ingredients** | Grouped by category, checkboxes, portion scaling |
| **Method** | Numbered steps, timing indicators, clear formatting |
| **Tips** | Recipe tips + personal notes |
| **Actions** | Add to plan, mark as cooked, add note |

### Ingredient Checkboxes
- Tick off ingredients as you prep
- State persists during cooking session
- Helps track what you've gathered

### Portion Scaling (In Detail View)
```
Portions: [2] [-][+]

200g chicken breast
  └─ (scaled from 400g for 4 servings)
```
- Adjust portions and see ingredients update live
- Original amount shown subtly for reference

### Personal Notes
- Add notes after cooking: "too spicy", "double the garlic"
- Notes appear on future views of this recipe
- Private to your household

---

## Card Sorting & Display Order

### Sort Options
| Sort | Description | Use Case |
|------|-------------|----------|
| **Recently Added** | Newest recipes first | "What's new?" |
| **Recently Cooked** | Last made date | Avoid repeats |
| **Most Cooked** | Times made (descending) | Find favourites |
| **Never Tried** | Cooked count = 0 | Inspiration, try something new |
| **Family Favourites** | Highest household rating | Crowd pleasers |
| **Quick & Easy** | By cook time (ascending) | Busy weeknights |
| **Random / Surprise Me** | Shuffled | Can't decide |

### AI-Assisted Display (Future)
Could suggest order based on:
- What you haven't cooked recently
- Seasonal ingredients
- Weather (comfort food on cold days?)
- What's already in your fridge
- Balancing variety across the week

---

## "Cooking For Who" Selection

### Flow When Adding to Plan
```
┌─────────────────────────────────────────────────┐
│  Thai Green Curry                               │
│                                                 │
│  Who's eating?                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ ○ Everyone Home (4)        ← default    │   │
│  │ ○ Just Me (1)                           │   │
│  │ ○ Couple Night (2)                      │   │
│  │ ○ Kids Week (3)                         │   │
│  │ ○ Custom...                             │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Portions: [4]  ← auto-filled from group       │
│                                                 │
│         [ Add to Plan ]                         │
└─────────────────────────────────────────────────┘
```

### What This Enables
- **Portion auto-calculation** - group size = portions
- **Allergen safety** - recipe already filtered for group
- **Shopping list accuracy** - quantities match who's eating
- **Personal preferences** - "Nephew doesn't like this" noted

---

## Customisable Card Display (User Preferences)

### Show/Hide Elements
Users can toggle visibility of card elements in their settings:

| Element | Default | Notes |
|---------|---------|-------|
| **Cook time** | Show | Core info |
| **Calories** | Show | Hide if not tracking |
| **Protein** | Hide | Show for fitness goals |
| **Cost per portion** | Hide | Show for budgeting |
| **Difficulty** | Show | Hide once confident |
| **Cooked count** | Hide | Show for tracking habits |
| **Allergen badges** | Hide | Already filtered out, but can show for sharing |
| **Source** | Show | Attribution |

### Preferences Panel Wireframe
```
┌─────────────────────────────────────────────────┐
│  Card Display Preferences                       │
│                                                 │
│  Show on recipe cards:                          │
│  ┌─────────────────────────────────────────┐   │
│  │ ✓ Cook time                             │   │
│  │ ✓ Calories per portion                  │   │
│  │ ○ Protein per portion                   │   │
│  │ ○ Approx cost per portion               │   │
│  │ ✓ Difficulty level                      │   │
│  │ ○ Times cooked                          │   │
│  │ ○ Allergen warnings                     │   │
│  │ ✓ Recipe source                         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Default sort: [Recently Added ▼]               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Ingredient Pairing (MVP+1 - Parked)

> **Note**: This feature is valuable but adds complexity. Parking for after MVP user testing.

### Two Approaches Identified

**1. Fridge-First ("Use What I Have")**
- Input: "I have sour cream, chicken, peppers"
- Output: Recipes that use those ingredients
- Reduces waste, uses what's expiring

**2. Shopping List Suggestions ("You're Buying This Anyway")**
- Trigger: Shopping list shows "150ml sour cream" but pots are 300ml
- Output: "These recipes also use sour cream" suggestions
- Maximises purchased ingredients

### Why Parking for MVP+1
- Core card selection experience needs to work first
- Need real user data on shopping habits
- Complexity of tracking pack sizes, fridge contents
- Can add after validating base concept works

---

## Updated Visual Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                        ♡                │ ← Favourite
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                   │  │
│  │                                                   │  │
│  │               HERO IMAGE                          │  │
│  │            (tap to view recipe)                   │  │
│  │                                                   │  │
│  │                                         Made 5×   │  │ ← Cooked count
│  └───────────────────────────────────────────────────┘  │   (if enabled)
│                                                         │
│  Thai Green Curry                                       │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ⏱️ 25m  │ 380cal │ £2.50  │ ⚡Easy                  ││ ← Customisable
│  └─────────────────────────────────────────────────────┘│   info bar
│                                                         │
│  [Asian] [Curry] [Healthy]                             │
│                                                         │
│  BBC Good Food                                    →     │
│                                                         │
│  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │    View Recipe      │  │      + Add          │      │
│  └─────────────────────┘  └─────────────────────┘      │
│      (secondary)              (primary)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Card Interaction Summary
| Area | Action |
|------|--------|
| Image / Title | Tap → View full recipe details |
| Favourite ♡ | Tap → Toggle favourite |
| "View Recipe" button | Opens detail view |
| "+ Add" button | Opens "Who's eating?" → adds to plan |
| Tags | Tap → Filter by that tag |

---

## Next Steps

1. ✅ Wireframe complete with all elements
2. ✅ Sorting options documented
3. ✅ "Cooking for who" flow documented
4. ✅ Customisable display preferences documented
5. ✅ Ingredient pairing parked for MVP+1
6. → Build HTML/CSS for card component
7. → Build card selection/browsing experience
