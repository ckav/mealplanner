# Use It Up & Waste Reduction — Summary & Handoff

> **Purpose**: Summary of all decisions made in this chat for the "Use It Up" feature. Use this to brief any new chat continuing work on meal planning functionality.
> **Created**: February 2025
> **Files produced**:
> - `USE_IT_UP_UX_FLOW.md` — Full screen-by-screen UX specification
> - `use-it-up-wireframe.html` — Tappable 7-screen interactive wireframe

---

## What We Built

A complete UX flow for helping users reduce food waste and save money by incorporating ingredients they already have into their weekly meal plan. The feature sits as an **optional first step** before meal planning — never mandatory, never guilt-tripping.

---

## Locked-In Decisions

### 1. Entry Point & Tone
- **"Got anything to use up this week?"** banner appears at the top of an empty weekly plan
- Friendly, low-pressure — like a friend asking, not a fridge audit
- "Skip for now" always visible, never guilt-tripping
- After 3 consecutive skips, reduces to a compact icon (stops nagging)
- Setting available: "Ask me about fridge items" on/off

### 2. Three Input Methods
- **📸 Snap fridge** — Photo capture with AI ingredient detection (Phase 2)
- **💬 Tell me** — Voice/text natural language input ("I've got some sad courgettes and chicken that needs using") (Phase 2)
- **✏️ Add items** — Manual selection with tappable chips (Phase 1 / MVP)

### 3. Manual Add UX (MVP)
- Search bar at top for finding specific items
- **"From your last shop"** section — pre-populated from previous week's shopping list (smartest shortcut: if you bought it last week, it's probably in your fridge)
- **"Common perishables"** section — items most likely to go off
- Chunky tappable chips with emojis (Unimeal-style, recognition over recall)
- Selected items collect in a tray at the bottom with ✕ to remove
- Items the user frequently adds bubble up over time

### 4. Two-Tier Urgency (Simplified)
- **🔴 Use soon** — Perishable, needs using in 1-2 days. Strongly influences recipe suggestions.
- **🟢 Have at home** — In cupboard/freezer, no rush. Light influence (cost saving).
- A middle tier (🟡 This week) exists in the spec but may simplify to just two for MVP
- Defaults: photo input → "Use soon"; manual add → "Have at home"; voice → parsed from language cues
- **No exact quantities required** — "I've got chicken" is enough. Exact amounts add friction for minimal value at this stage.

### 5. Recipe Matching & Display
- Recipes ranked by how many "use up" items they contain
- **"Best matches · uses 2+ items"** section appears first (this is the magic moment)
- Green badges on each recipe card show which of your ingredients it uses: `🥩 chicken` `🍄 mushrooms`
- Multi-ingredient match teaser on the confirm screen: "12 recipes use your ingredients — 3 use chicken AND mushrooms together"
- "Show all recipes without ingredient filter" link at the bottom

### 6. Adding Recipes — Keep It Simple
- **"+ Add" button** on each recipe card
- On tap: button changes to **"✓ Added"**, card dims, toast shows "✓ Added to your plan"
- **No day assignment** at this stage — recipes go into a "selected" collection
- User arranges into specific days in the planner if they want to
- Keeps the browsing flow fast and commitment-free

### 7. Shopping List Integration
- Use-up items are **excluded from the shopping list** (you already have them)
- Savings banner: "4 items from your fridge, 7 from your pantry — estimated saving: ~£9.20"
- Details tucked behind a toggle: "Already have · from fridge & pantry (11)" — **details on demand**, following the same pattern locked in for allergen UX

### 8. Planner Nudges
- Compact progress bar: "🧊 Use-up: 3 of 4 items planned" with tag chips
- Gentle amber nudge on empty slots for unplanned "use soon" items: "💡 Coconut milk still to use"
- **Nudges only for "Use soon" items**, not "Have at home"
- Nudges disappear once the item is covered by a planned recipe

---

## Open Questions (Parked for User Testing)

### Day Auto-Assignment
Should "+ Add" automatically slot recipes into the next empty day?
- **For**: Saves a step for active meal planners. The "✓ Monday" green button felt satisfying.
- **Against**: Not everyone plans Mon→Sun. Some only plan 2-3 meals. Some weeks start Thursday.
- **Possible middle ground**: If entered from the planner (clicking an empty slot), auto-assign. If browsing recipes with "use up" filter, just collect.
- **Decision**: Park for testing. "✓ Added" without day works for MVP.

### Quantity Tracking
Users know roughly what they have ("some chicken", "half a jar") but exact quantities add friction. Phase 2's package size intelligence may need approximate amounts — address then, not during initial fridge capture.

### Photo AI Accuracy
How good does the image recognition need to be? Current approach: show detected items for user to confirm/correct/add. Imperfect detection is fine if the confirmation step is fast.

---

## Phase Summary

### Phase 1 (MVP)
- Manual add with search + tappable chips
- "From recent shops" pre-populated
- Two-tier urgency (use soon / have at home)
- Recipe filtering/ranking by use-up items
- Shopping list exclusion with savings estimate
- Planner nudges for unplanned items

### Phase 2
- Photo capture + AI detection
- Voice/text natural language input
- Package size suggestions ("You'll have 200g chicken left — here are recipes")
- Seasonal produce badges on recipe cards

### Phase 3
- Multi-ingredient recipe matching intelligence
- "Zero waste week" celebration
- Week rollover for unused items
- Learning/personalisation
- Supermarket price comparison

---

## Design Approach Used (Apply to Meal Planning)

This is the methodology we followed — use the same pattern for meal planning UX work:

1. **Start with the UX spec** — Screen-by-screen flow document with wireframe ASCII layouts, data structures, acceptance criteria, and phased implementation. Written as a markdown file for the project docs folder.

2. **Build a tappable HTML wireframe** — Phone-frame mockup with clickable screens. Uses the app's design system (DM Sans, indigo #4338ca primary, consistent component styles). Navigation buttons along the top to jump between screens. Interactive elements (chip selection, button states, toasts) so the flow can be *felt* not just read.

3. **Iterate based on feedback** — Walk through the wireframe, identify what feels wrong, update immediately. Lock in decisions and capture open questions with pros/cons.

4. **"Details on demand" principle** — Following the allergen UX v2 approach: the app handles things quietly and correctly. Details are available behind a deliberate tap, never plastered across the UI. Confidence without nagging.

5. **File naming convention**:
   - Specs: `FEATURE_NAME_UX.md` or `FEATURE_NAME_UX_FLOW.md`
   - Wireframes: `feature-name-wireframe.html` (versioned as v2, v3 if iterated)
   - Save to: `C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\docs\`

---

## Key Project Files Referenced

| File | Purpose |
|------|---------|
| `MEAL_PLANNER_WEEKLY_VIEW_SPEC.md` | Weekly planner grid spec (in project) |
| `FEATURE_INVENTORY.md` | Full feature breakdown by category |
| `RECIPE_ADD_EDIT_UX.md` | Recipe add/edit flow with scaling tips & allergen safety |
| `recipe-allergen-ux-wireframe-v2.html` | Allergen resolution wireframe (locked-in approach) |
| `USE_IT_UP_UX_FLOW.md` | This feature's full spec |
| `use-it-up-wireframe.html` | This feature's tappable wireframe |

---

## What's Next: Meal Planning UX

The weekly planner view has a spec (`MEAL_PLANNER_WEEKLY_VIEW_SPEC.md`) but needs the same UX treatment we gave to "Use It Up" and allergen management:

- Tappable wireframe for the core planning flow
- Recipe picker modal experience (how does browsing/selecting feel?)
- Skip/leftovers/eating out handling
- "Cooking for who" per-day selection
- How "Use It Up" items integrate into the planner slots
- Mobile experience (the grid works on desktop but needs rethinking for phone)
- The Gousto-style "add all the recipes you like, narrow down at checkout" browsing pattern (from your competitive research screenshots)

The open question about day auto-assignment from this chat directly feeds into how the planner works — so that decision should be revisited as part of the meal planning UX work.
