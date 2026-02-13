# Cook Forward

Linked meal system where today's cooking effort makes tomorrow easier. Not leftovers — intentional pivots where the same base becomes a different dish.

**Location:** `docs/features/cook-forward/`

**Documentation:**
- 📖 [README.md](./README.md) - This file — feature overview
- 📋 [COOK_FORWARD_SPEC.md](./COOK_FORWARD_SPEC.md) - Full implementation specification (data models, acceptance criteria, algorithms)
- 🖥️ [cook-forward-wireframe.html](./cook-forward-wireframe.html) - Tappable HTML prototype (7 screens, persona switching)

**Status:** 📐 Design complete — ready for implementation (Phase 4+ in meal planner roadmap)

**Depends on:** [Meal Planner Weekly View](../meal-planner-weekly/) (Cook Forward integrates into the weekly planner, recipe picker, and cook mode)

---

## What It Does

Cook Forward operates across three layers:

### Layer 1: "While You're At It" — Micro-prep nudges
Small suggestions in cook mode that extend a task already in motion. You're already chopping onions — chop tomorrow's too. The oven's already on — throw in pumpkin for Wednesday's soup. Zero extra activation energy.

- Pre-cooking checklist before recipe steps
- Mid-cooking contextual nudges (oven on, chopping board out)
- Always skippable, shows time saved per item

### Layer 2: "Intentional Pivots" — Linked meals
Recipes that chain together during planning. Sunday's roast chicken → Monday's fried rice → Wednesday's noodle soup. The recipe picker surfaces chain suggestions when opportunities exist.

- Cook Forward suggestion panel in recipe picker
- 🔗 chain badges and connector lines in weekly view
- Chain confirmation screen with time-saved summary

### Layer 3: "Future-Me Insurance" — Freezer stash
On a good energy day, cook extra and freeze it for a bad day. Simple freezer inventory with expiry tracking and recipe suggestions.

- Freezer prompts during cooking for freezable recipes
- Frozen item suggestions on empty/unplanned planner days
- "Quick wins" recipes using frozen items

---

## Key Design Principles

- **Zero initiation cost** — every action extends something already happening
- **Always skippable** — no guilt, no streaks, no compliance tracking
- **Graceful degradation** — if a chain link breaks, meals become standalone (no errors)
- **Max 2-3 suggestions** at any time — never overwhelming
- **Time saved always shown** — the dopamine/reward feedback
- **ADHD-friendly** — body doubling effect, novelty through variety, no executive function overhead

---

## Data Model Summary

Recipes gain a `cookForward` metadata block with:
- `yields` — what the recipe produces beyond the meal (leftover protein, stock, sauce)
- `consumes` — what the recipe can use from a previous Cook Forward meal
- `shareablePrep` — prep steps shareable with other recipes (dice onion, blitz paste)
- `freezer` — freezability info (can freeze, max months, reheating instructions)

Meal slots gain a `cookForward` link with:
- `consumesFrom` — which source meal/day/output this slot uses
- `prepCompleted` — which micro-prep items were done in advance

New `FreezerItem` collection for freezer stash inventory.

See [COOK_FORWARD_SPEC.md](./COOK_FORWARD_SPEC.md) for full TypeScript interfaces and the chain detection algorithm.

---

## Starter Recipe Chains

Implementation should begin with these 5 chains (20-30 recipes):

1. **Roast chicken** → Chicken fried rice → Chicken noodle soup → Chicken Caesar wrap
2. **Bolognese** → Lasagne → Chilli con carne
3. **Curry base paste** → Thai curry → Laksa → Stir fry
4. **Rice** → Fried rice → Rice pudding → Stuffed peppers
5. **Roast veg** → Soup → Frittata → Wrap filling

---

## Related Features

- [Meal Planner Weekly View](../meal-planner-weekly/) — Cook Forward integrates into the weekly grid, recipe picker, and meal counter
- [Allergen Filter](../allergen-filter/) — All Cook Forward suggestions respect dietary restrictions
- Use It Up (future) — Complements Cook Forward: Use It Up is reactive (stuff going off), Cook Forward is proactive (planned chains)
