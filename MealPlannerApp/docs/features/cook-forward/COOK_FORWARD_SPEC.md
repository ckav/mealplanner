# Cook Forward — Feature Specification

> **Purpose**: Implementation spec for the Cook Forward feature — a system that links meals together so today's cooking effort makes tomorrow easier.
> **Parent spec**: MEAL_PLANNER_WEEKLY_VIEW_SPEC.md (Cook Forward is integrated into the weekly planner)
> **Wireframe**: cook-forward-wireframe.html (tappable prototype with 7 screens, persona switching)
> **Status**: Design complete, ready for implementation (Phase 4+ in meal planner roadmap)

---

## Overview

Cook Forward links meals in chains where one meal's output feeds into the next. It operates across three layers:

1. **"While You're At It"** — Micro-prep nudges during cooking (Layer 1)
2. **"Intentional Pivots"** — Linked meals during planning (Layer 2)
3. **"Future-Me Insurance"** — Freezer stash management (Layer 3)

### Core Principles
- Every Cook Forward action extends a task already in motion — zero extra initiation cost
- Always skippable — no guilt, no streaks, no compliance tracking
- Graceful degradation — if a chain link breaks, linked meals become standalone (no error states)
- Maximum 2-3 suggestions at any time — never overwhelming
- Time saved is always shown — the reward/dopamine feedback

---

## Layer 1: Micro-Prep Nudges (Cook Mode)

### Pre-Cooking Checklist

Appears in cook mode BEFORE the recipe steps. Shows prep items that benefit upcoming linked meals.

**Trigger:** User opens cook mode for a recipe that has `shareablePrep` items matching other recipes in this week's plan.

**Display:**
- Card with purple/violet gradient background
- Header: "🔗 Cook Forward · Before you start"
- Subtitle: "A few things to prep now that'll make [days] much easier"
- Checklist items, each with:
  - Checkbox (tappable to mark done)
  - Prep action (e.g., "Cook 1 extra cup of rice")
  - Target meals (e.g., "→ Monday's Fried Rice + Tuesday's Stir Fry")
  - Time saved (e.g., "Saves 20 min")
- Footer: "Skip all — just cook tonight" link

**Behaviour:**
- Marking an item done updates `prepCompleted` on the target meal's `cookForward` data
- Skipping has no negative consequence
- If all items are skipped or completed, the checklist collapses
- Maximum 3 checklist items

### Mid-Cooking Nudges

Contextual suggestions that appear during cooking when the app detects an opportunity.

**Triggers:**
- Oven is in use (detected from recipe step mentioning oven temperature) → suggest roasting extra items
- Chopping board / food processor in use (detected from prep steps) → suggest prepping extra ingredients
- Boiling water / rice cooker in use → suggest cooking extra grains

**Display:**
- Card with purple/violet gradient background (same style as pre-cooking)
- Header: "🔗 While the oven's on" (contextual to trigger)
- Body: suggestion with explanation
- Reason: what it's for (e.g., "Goes perfectly in Friday's soup")
- Actions: "[Good idea ✓]" primary button + "[Not today]" secondary button

**Behaviour:**
- Maximum 2 mid-cooking nudges per cooking session
- Accepting a nudge may add items to a future meal's prep or to the freezer stash
- "Not today" dismisses with no consequence
- Nudge state: default → accepted (green, "Done ✓") or dismissed (hidden)

### Freezer Prompt (Post-Cooking)

Appears after cooking completes if the recipe has `freezer.canFreeze: true` and the user cooked surplus.

**Display:**
- Card with teal/cyan gradient background (freezer colour scheme)
- Header: "❄️ Freezer stash"
- Body: "This [recipe] freezes perfectly. Freeze a portion for a busy day?"
- Context: shelf life info ("Good for up to 3 months")
- Actions: "[Freeze some ❄️]" primary button + "[Skip]" secondary button

**Behaviour:**
- Accepting adds an item to the freezer stash inventory
- User can optionally add notes (e.g., "blue container, top shelf")

---

## Layer 2: Linked Meals (Planning)

### Chain Detection

The app analyses the current week's meal plan to detect chain opportunities.

**Detection logic:**
1. For each recipe in the plan, check `cookForward.yields` for outputs
2. For each empty slot in the plan, find recipes whose `cookForward.consumes` matches an available output
3. For each recipe in the plan, check `cookForward.shareablePrep` for prep steps shared with other planned or candidate recipes
4. Score candidates by: number of links, total time saved, dietary compatibility with target day's diners

**Output:** A ranked list of recipe suggestions with chain relationship metadata.

### Recipe Picker Integration

When the user opens the recipe picker for an empty slot:

1. Run chain detection against the current week's plan
2. If chain opportunities exist, show the **Cook Forward suggestion panel** at the top of the picker
3. Panel contains horizontally scrollable recipe cards, each showing:
   - Recipe image/emoji
   - Recipe name
   - Cook time
   - Chain relationship (e.g., "🔗 Uses Sun's chicken")
4. Below the panel: "or browse all recipes" divider
5. Standard recipe grid below (unlinked recipes)

**🔗 Cook Forward filter chip:** Toggles the Cook Forward panel visibility. Active by default when chains exist.

**If no chains detected:** Panel doesn't appear. No empty state. The picker works normally.

### Weekly View Integration

**Chain badges on filled slots:**
- Anchor meals: `🔗 Feeds → Mon, Wed` (purple pill badge)
- Linked meals: `🔗 Uses Sun's chicken` (purple pill badge)
- Badge position: below cook time in the meal card

**Chain connector lines:**
- Thin vertical line (2px wide) between linked adjacent day rows
- Purple gradient: light (#ddd6fe) to dark (#7c3aed)
- Small 🔗 emoji centred on the line
- Only between adjacent linked days (skip non-adjacent)

**Meal counter extension (optional):**
- "3 of 5 meals · 2 linked 🔗" — appended to existing counter

### Chain Confirmation Screen

After adding a linked recipe, show a summary:
- Full chain visualisation (vertical timeline)
- Each link: day abbreviation, recipe name, chain role (ANCHOR / linked item)
- Total time saved across the chain
- "1 chicken → 3 meals" type summary

### Chain Break Handling

When user removes or swaps an anchor meal:
1. Linked meals remain in the plan as standalone recipes
2. Their `cookForward.consumesFrom` is set to `null`
3. Shopping list updates: ingredients previously provided by the anchor are now added individually
4. No error states, no warnings, no confirmation dialogs about breaking the chain
5. Chain badges and connector lines are removed from affected meals

---

## Layer 3: Freezer Stash

### Freezer Inventory

A simple list of items the user has frozen via Cook Forward prompts.

**Data per item:**
- `id`: Unique identifier
- `recipeId`: Source recipe
- `recipeName`: Display name
- `frozenDate`: When frozen
- `portions`: Number of portions
- `expiryDate`: frozenDate + recipe's `freezer.maxMonths`
- `notes`: Optional user notes (e.g., "blue container")
- `status`: `available` | `used` | `expired`

**Freezer Stash View:**
- Accessible from bottom nav or dedicated section
- Header: "❄️ Freezer Stash — Your future-self safety net"
- List of frozen items with: name, frozen date, portions, expiry status
- Expiry states:
  - Green: plenty of time remaining
  - Amber: "Use within 2 weeks" (when <14 days to expiry)
  - Red: expired (auto-mark, keep visible for manual removal)
- "Quick wins" section: recipes that use frozen items (horizontal scroll)

### Freezer Suggestions on Empty Days

When a planner day has no meal and the freezer has available items:
- Show a subtle suggestion within the empty slot
- "❄️ You have: Beef Chilli (frozen 3d ago) · 2 portions"
- Actions: "[Use this]" + "[Plan new]"
- "Use this" fills the slot with the frozen item (marks freezer item as `used`)

---

## Data Model

### Recipe.cookForward
```typescript
interface CookForwardMeta {
  yields?: CookForwardYield[];
  consumes?: CookForwardConsumes[];
  shareablePrep?: ShareablePrep[];
  freezer?: FreezerMeta;
}

interface CookForwardYield {
  outputType: string;        // e.g., 'leftover-protein', 'stock-base', 'sauce', 'cooked-grain'
  outputName: string;        // e.g., 'Shredded roast chicken'
  estimatedQuantity: string; // e.g., '300g'
  storageMethod: 'fridge' | 'freezer' | 'counter';
  shelfLife: number;         // days
  usableIn: string[];        // recipe IDs
}

interface CookForwardConsumes {
  inputType: string;         // matches outputType
  inputName: string;         // e.g., 'Cooked chicken'
  fromRecipes: string[];     // recipe IDs that can provide this
}

interface ShareablePrep {
  step: string;              // e.g., 'Dice onion'
  ingredient: string;        // e.g., 'onion'
  quantity: string;          // e.g., '1 medium'
  sharedWith: string[];      // recipe IDs
  timeSaved: number;         // minutes
}

interface FreezerMeta {
  canFreeze: boolean;
  maxMonths: number;
  freezeInstructions: string;
  reheatingInstructions: string;
  freezesWellAs: 'complete-dish' | 'sauce-only' | 'components';
}
```

### MealSlot.cookForward
```typescript
interface SlotCookForward {
  consumesFrom?: {
    sourceDay: string;       // ISO date of the source meal
    sourceRecipe: string;    // recipe ID
    outputUsed: string;      // name of the output consumed
  };
  prepCompleted?: {
    step: string;            // prep step description
    completedOn: string;     // ISO date when completed
  }[];
}
```

### FreezerItem
```typescript
interface FreezerItem {
  id: string;
  recipeId: string;
  recipeName: string;
  frozenDate: string;        // ISO date
  portions: number;
  expiryDate: string;        // ISO date
  notes?: string;
  status: 'available' | 'used' | 'expired';
}
```

---

## Visual Design

### Colour Palette (Cook Forward specific)
| Element | Background | Text | Border |
|---------|-----------|------|--------|
| Chain badge | #f5f3ff | #7c3aed | #ddd6fe |
| Chain connector | — | — | gradient #ddd6fe → #7c3aed |
| Nudge card | gradient(#f5f3ff, #faf5ff) | #334155 | #ddd6fe |
| Nudge label | — | #7c3aed | — |
| Freezer badge | #ecfeff | #0891b2 | #a5f3fc |
| Freezer nudge | gradient(#ecfeff, #f0fdfa) | #334155 | #a5f3fc |
| Time saved | #dcfce7 | #16a34a | — |
| Completed nudge | #dcfce7 | #16a34a | #bbf7d0 |

### Typography
| Element | Size | Weight | Colour |
|---------|------|--------|--------|
| Chain badge text | 10px | 600 | #7c3aed |
| Nudge label | 12px | 700 | #7c3aed (uppercase) |
| Nudge body | 14px | 400 | #334155 |
| Time saved | 10px | 600 | #16a34a |
| Freezer badge text | 10px | 600 | #0891b2 |
| Checklist item | 13px | 400 | #334155 |
| Checklist detail | 11px | 400 | #94a3b8 |

---

## Acceptance Criteria

### Layer 1: Micro-Prep Nudges
- [ ] Pre-cooking checklist appears in cook mode when shareable prep exists
- [ ] Each checklist item shows prep action, target meal, and time saved
- [ ] Tapping checkbox marks item as done (visual + data update)
- [ ] "Skip all" dismisses the entire checklist
- [ ] Maximum 3 items in pre-cooking checklist
- [ ] Mid-cooking nudges appear contextually (max 2 per session)
- [ ] Accepting a nudge updates nudge state to "done" (green)
- [ ] "Not today" dismisses with no consequence
- [ ] Freezer prompt appears post-cooking for freezable recipes

### Layer 2: Linked Meals
- [ ] Chain detection runs when recipe picker opens
- [ ] Cook Forward suggestion panel appears at top of picker when chains exist
- [ ] Each suggestion shows recipe name, time, and chain relationship
- [ ] 🔗 filter chip toggles the panel
- [ ] No panel shown when no chains detected
- [ ] Weekly view shows chain badges on linked meal cards
- [ ] Chain connector lines appear between linked adjacent days
- [ ] Chain confirmation screen shows full chain + time saved
- [ ] Removing anchor meal gracefully breaks chain (no errors, meals become standalone)
- [ ] Shopping list updates when chain breaks (adds previously-shared ingredients)

### Layer 3: Freezer Stash
- [ ] Freezer inventory stores items with date, portions, expiry
- [ ] Items added via cook mode freezer prompt
- [ ] Expiry warnings at <14 days (amber)
- [ ] "Quick wins" section shows recipes using frozen items
- [ ] Empty planner days suggest available freezer items
- [ ] "Use this" on a suggestion fills the slot and marks item as used

### Cross-Cutting
- [ ] All Cook Forward suggestions respect dietary restrictions for target day's diners
- [ ] Cook Forward is fully optional — can be disabled in settings
- [ ] All nudges/suggestions have visible dismiss/skip options
- [ ] Time saved tracking: per item and weekly total (optional summary)
- [ ] Persona adaptation: portions (1 for solo, 4 for family), chain recipes differ, "who's eating" labels appear on family view

---

## Implementation Notes

### Starting Recipe Set
Begin with 20-30 recipes that form natural chains. Priority chains:
1. **Roast chicken chain**: Roast → Fried rice → Noodle soup → Caesar wrap
2. **Bolognese chain**: Bolognese → Lasagne → Chilli con carne
3. **Curry base chain**: Paste → Thai curry → Laksa → Stir fry
4. **Rice chain**: Plain rice → Fried rice → Rice pudding → Stuffed peppers
5. **Roast veg chain**: Roasted veg → Soup → Frittata → Wrap filling

### Chain Detection Algorithm
```
1. Get all filled slots in current week
2. For each filled slot, collect all yields
3. For candidate recipe (to fill empty slot):
   a. Check if any of its consumes match available yields
   b. Check if yield's shelfLife covers the gap between source day and target day
   c. Check dietary compatibility with target day's diners
   d. Score: (number of matches × time saved) / gap in days
4. Return top 5 candidates sorted by score
```

### Performance Considerations
- Chain detection should run client-side (small dataset per week)
- Recipe `cookForward` metadata cached with recipe data
- Freezer stash synced via Firebase (small collection, infrequent writes)
- Nudge display logic: simple date/recipe comparisons, no heavy computation

---

*Document created: February 2026*
*Builds on: MEAL_PLANNER_WEEKLY_VIEW_SPEC.md*
*Wireframe: cook-forward-wireframe.html*
*For: Meal Planner App (Flutter + Firebase)*
