# Feature: Portion Control & Selection

> **Primary User**: Solo cook (Claire) — solving the "solo cooking boredom" problem  
> **Secondary Users**: Couples, families (default recipe portions work as-is)  
> **Status**: Discovery / Design  
> **Last Updated**: February 2026

---

## Problem Statement

Solo cooks face two compounding problems:
1. **Most recipes are written for 4** — and not all recipes scale down sensibly (you can't make a quarter lasagna)
2. **Recipe fatigue** — opening the app on a Tuesday night and seeing the same three defaults, or recipes that clearly aren't designed for one person

The real problem isn't maths — it's **curation**. The app needs to make solo cooking feel exciting and varied, not like a compromise.

---

## Core Principle

**This is a solo cook boredom problem, not a scaling problem.**

Rather than building an elaborate scaling engine that tries to make every recipe work at every portion size, the approach is:
- Tag recipes with what portion sizes they actually work at
- Surface solo-friendly recipes when cooking for one
- Handle batch/leftover recipes honestly ("this serves 4, plan for leftovers")
- Keep mathematical scaling simple for recipes that do scale down

---

## Feature Design

### Recipe-Level Metadata (set at entry/upload)

Each recipe gets:

| Field | Type | Description |
|-------|------|-------------|
| `defaultServings` | Integer | What the recipe is written for (e.g., 4) |
| `minimumServings` | Integer | Lowest portion count that works (e.g., 1, 2, or 4) |
| `soloFriendly` | Boolean | Works well at 1-2 portions without feeling like a compromise |
| `scalingNotes` | String (optional) | Any gotchas ("Sauce works at half quantity minimum") |
| `complexity` | Enum | `simple` / `moderate` / `involved` — informs solo suggestions |

### AI-Assisted Classification on Upload

When a recipe is added, an AI pass automatically:
- Classifies whether the recipe is solo-friendly
- Sets a sensible `minimumServings` value
- Flags ingredients with scaling thresholds (sauces, spices)
- User can review/adjust but most won't need to

### Ingredient Scaling Rules (for recipes that DO scale)

For recipes where scaling works, each ingredient gets a scaling type:

| Scaling Type | Behaviour | Example |
|-------------|-----------|---------|
| `linear` | Scales proportionally | Chicken breast, pasta, rice |
| `threshold` | Scales down but has a minimum | Soy sauce (min 1 tbsp), curry paste |
| `fixed` | Stays the same regardless | 1 clove garlic, 1 tin coconut milk |

This is metadata on the ingredient within the recipe, not a global property — soy sauce might be linear in a stir-fry (where you use a lot) but threshold in a marinade.

### Frontend: Portion Selector

Simple UI on the recipe card / detail view:
- **Serves:** `[1] [2] [4]` (only shows valid options based on `minimumServings`)
- Greyed-out / unavailable options for portions below minimum
- For batch recipes (min 4): shows "Serves 4 — plan for leftovers?" with option to auto-fill subsequent planner slots

### Integration with Weekly Planner

- When browsing for a solo night, app prioritises `soloFriendly: true` recipes
- Batch recipes that generate leftovers can auto-populate follow-on day slots as "Leftovers: [Recipe Name]"
- Ties into **Cook Forward** concept — cooking once feeds multiple days intentionally
- Planner understands "this cooking event covers Monday AND Tuesday" rather than two separate cooks

---

## What This Feature Does NOT Do

- Does not attempt to make every recipe work at every portion size
- Does not require users to manually configure scaling rules per ingredient
- Does not add complexity for family users (they cook at default portions and never see this)
- Does not solve recipe variety on its own (that's a discovery/recommendation feature)

---

## User Scenarios

### Scenario 1: Solo Tuesday Night
> Claire opens the app, it's just her tonight. She taps "Cooking for 1." The app surfaces solo-friendly recipes — chicken shawarma, a good stir-fry, pan-seared fish. No lasagnas, no roasts. She picks something she hasn't had in a while. Portions are already set to 1.

### Scenario 2: Intentional Batch Cook
> Claire sees a lasagna she fancies. The app shows "Serves 4 — plan for leftovers?" She confirms, and the planner fills Tuesday with "Lasagna" and Wednesday-Thursday with "Lasagna (leftovers)." Three dinners sorted from one cook.

### Scenario 3: Couple's Dinner
> Claire is cooking for 2. She selects "Serves 2" — the app shows recipes that work at 2 portions (most of them). Ingredient quantities are halved with sensible rounding on sauces and spices.

### Scenario 4: Family (brother's household)
> They're cooking for 4-5. Default portions, no scaling needed. This feature is invisible to them.

---

## Implementation Priority

### Phase 1 (MVP)
- Portion selector on recipe card (1 / 2 / 4+)
- `soloFriendly` and `minimumServings` fields in recipe data model
- Basic linear scaling for ingredients
- Manual tagging of solo-friendly recipes during initial recipe entry

### Phase 2
- AI-assisted classification on recipe upload
- Ingredient-level scaling rules (linear / threshold / fixed)
- "Plan for leftovers" auto-fill in weekly planner
- Smart minimum amounts for sauces and spices

### Phase 3
- Solo cook discovery/recommendation engine ("inspire me for tonight")
- Recently cooked avoidance ("you've had this twice this week")
- Complexity-aware suggestions (quick & simple on weeknights)
- Cook Forward integration for intentional multi-day meal chains

---

## Data Model Addition

```javascript
// Addition to recipe object
{
  // ... existing recipe fields ...
  
  portionControl: {
    defaultServings: 4,
    minimumServings: 1,        // 1, 2, or 4
    soloFriendly: true,
    complexity: 'simple',      // simple | moderate | involved
    scalingNotes: null,        // optional string
    ingredients: [
      {
        ingredientId: 'soy-sauce',
        amount: 2,
        unit: 'tbsp',
        scalingType: 'threshold',  // linear | threshold | fixed
        minimumAmount: 1,
        minimumUnit: 'tbsp'
      },
      {
        ingredientId: 'chicken-breast',
        amount: 4,
        unit: 'pieces',
        scalingType: 'linear',
        minimumAmount: null,
        minimumUnit: null
      }
    ]
  }
}
```

---

## Open Questions

1. **Should the "solo-friendly" tag influence the Sort My Week guided flow?** — e.g., if it's just you this week, the flow could auto-prioritise solo recipes
2. **How prominent should the portion selector be?** — always visible on the card, or details-on-demand?
3. **Leftover tracking granularity** — does the planner just show "leftovers" or does it track remaining portions?
4. **Recipe entry UX** — when manually adding a recipe, how much of this metadata do we ask for upfront vs. infer later?

---

*Feature originated from: Weekly Planner discussions, solo cook use case*  
*Related features: Cook Forward, Sort My Week, Weekly Planner, Recipe Cards*  
*File location: Save to `C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\docs\features\`*
