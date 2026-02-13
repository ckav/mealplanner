# Recipe Data Schema

> **Purpose**: Defines the data structure for every recipe in the repository  
> **Used by**: Firebase/Firestore, Flutter models, JSON seed files  
> **Version**: 1.0  
> **Last Updated**: February 2026

---

## Core Fields

Every recipe MUST have these fields, regardless of data quality level.

```typescript
{
  // === IDENTITY ===
  id: string,              // Kebab-case slug, e.g. "thai-green-curry"
  name: string,            // Display name, e.g. "Thai Green Curry"
  
  // === SOURCE ===
  source: string,          // Source name, e.g. "BBC Good Food", "Nadia Lim"
  sourceUrl: string,       // Full URL or "" for cookbook recipes
  sourceType: string,      // "url" | "cookbook-photo" | "user-created"
  imageUrl: string,        // Recipe photo URL (or "" if none)
  
  // === SERVINGS & TIME ===
  servings: number,        // Default serving count (what the recipe is written for)
  cookTime: number,        // Active cooking time in minutes
  prepTime: number,        // Prep time in minutes
  readyIn: number,         // Total time (prep + cook + any resting)
  difficulty: string,      // "Easy" | "Medium" | "Hard"
  
  // === CLASSIFICATION ===
  cuisine: string,         // Primary cuisine, e.g. "Italian", "Indian", "British"
  mainProtein: string,     // "Chicken" | "Beef" | "Salmon" | "None" | etc.
  
  // === NUTRITION (optional but recommended) ===
  calories: number | null, // Per serving
  carbs: number | null,    // Grams per serving
  protein: number | null,  // Grams per serving
  fat: number | null,      // Grams per serving
  
  // === TAGS & DIETARY ===
  tags: string[],          // Descriptive tags (see Tag Vocabulary below)
  dietary: string[],       // Dietary classifications (see Dietary Vocabulary below)
  
  // === SOLO/FAMILY FLAGS ===
  soloFriendly: boolean,   // True if designed for 1-2 servings OR scales down well
  familyFriendly: boolean, // True if serves 4+ and suitable for kids
  
  // === DESCRIPTION ===
  description: string,     // 1-2 sentence description for browsing
}
```

---

## Extended Fields (Full Detail Level)

Recipes at "Full" data quality level also include:

```typescript
{
  // === INGREDIENTS ===
  ingredients: [
    {
      section: string,      // Grouping header, e.g. "Meat Sauce", "For the Salad"
      items: [
        {
          name: string,       // Ingredient name, e.g. "chicken breast"
          amount: number,     // Quantity for the recipe's default servings
          unit: string,       // "g" | "ml" | "tbsp" | "tsp" | "cloves" | "whole" | etc.
          scalingType: string, // "linear" | "threshold" | "fixed"
          minimumAmount: number | null,  // For threshold items only
          notes: string,      // "finely diced", "optional", etc.
        }
      ]
    }
  ],

  // === METHOD ===
  method: [
    {
      step: number,
      instruction: string,
      timeMinutes: number | null,  // If this step has a specific timing
    }
  ],

  // === EXTRAS ===
  tips: string,             // Cook's notes, variations, storage advice
  
  // === CUSTOM SPICE MIXES (Nadia Lim pattern) ===
  customMixes: [
    {
      name: string,          // e.g. "Moroccan Spice Mix"
      ingredients: string[], // List of spice names
    }
  ] | null,
}
```

---

## Scaling Type Definitions

These control how ingredients adjust when the user changes portion count.

| Type | Behaviour | Examples |
|------|-----------|---------|
| `linear` | Scales proportionally with servings | Chicken breast, pasta, rice, vegetables, cream |
| `threshold` | Scales but has a minimum viable amount | Soy sauce (min 1 tbsp), curry paste (min 1 tsp), oil for frying |
| `fixed` | Doesn't scale (or scales in discrete units) | 1 tin of tomatoes, 1 egg, 1 lemon, garlic cloves |

**Why this matters**: When scaling a 4-person recipe to 1 person, linear scaling would reduce "2 tbsp soy sauce" to "½ tbsp" — which isn't enough to flavour anything. The threshold system prevents this by enforcing minimums.

---

## Tag Vocabulary

Use these consistently across all recipes. Tags are kebab-case.

### Cooking Style
`one-pot` · `one-pan` · `traybake` · `slow-cook` · `no-cook` · `air-fryer` · `bbq` · `stir-fry`

### Time / Effort
`quick` · `under-20-min` · `under-30-min` · `weekend-cook` · `3-ingredients` · `5-ingredients`

### Lifestyle
`solo-friendly` · `family-friendly` · `kid-friendly` · `date-night` · `batch-cook` · `freezer-friendly` · `meal-prep` · `budget-friendly` · `treat-yourself`

### Eating Occasion
`fakeaway` · `comfort-food` · `light-lunch` · `packed-lunch` · `brunch` · `side-dish`

### Special
`build-your-own` · `hidden-veg` · `high-protein` · `low-carb` · `healthy` · `use-up-leftovers`

---

## Dietary Vocabulary

These determine filtering behaviour. A recipe can have multiple dietary tags.

| Tag | Meaning |
|-----|---------|
| `vegan` | No animal products at all |
| `vegetarian` | No meat/fish, may include dairy/eggs |
| `pescatarian` | No meat, may include fish/seafood |
| `dairy-free` | No milk, cheese, cream, butter, yoghurt |
| `gluten-free` | No wheat, barley, rye, oats (unless GF oats) |
| `nut-free` | No tree nuts or peanuts |
| `egg-free` | No eggs |
| `soy-free` | No soy sauce, tofu, edamame |
| `nightshade-free` | No tomatoes, peppers, potatoes, aubergine, chilli |
| `allium-free` | No onion, garlic, leeks, shallots |

**Note**: The app's allergy system goes beyond these tags — it includes "may contain" handling, tolerance levels (e.g., "can tolerate baked milk"), and household profiles. Those are managed at the app level, not in the recipe data. See `MealPlannerApp/docs/FEATURE_INVENTORY.md` for the full allergy system spec.

---

## Example: Full Detail Recipe

```json
{
  "id": "creamy-mushroom-spinach-orzo",
  "name": "Creamy Mushroom & Spinach Orzo",
  "source": "BBC Good Food",
  "sourceUrl": "https://www.bbcgoodfood.com/recipes/creamy-mushroom-spinach-orzo",
  "sourceType": "url",
  "imageUrl": "",
  "servings": 2,
  "cookTime": 20,
  "prepTime": 5,
  "readyIn": 25,
  "difficulty": "Easy",
  "cuisine": "Italian",
  "mainProtein": "None",
  "calories": 420,
  "carbs": 52,
  "protein": 14,
  "fat": 18,
  "tags": ["solo-friendly", "one-pot", "vegetarian", "quick", "under-30-min", "comfort-food"],
  "dietary": ["vegetarian"],
  "soloFriendly": true,
  "familyFriendly": false,
  "description": "A creamy one-pot orzo with mushrooms, spinach and Parmesan. Comfort food in 25 minutes.",
  "ingredients": [
    {
      "section": "Main",
      "items": [
        { "name": "orzo pasta", "amount": 200, "unit": "g", "scalingType": "linear", "minimumAmount": null, "notes": "" },
        { "name": "chestnut mushrooms", "amount": 200, "unit": "g", "scalingType": "linear", "minimumAmount": null, "notes": "sliced" },
        { "name": "baby spinach", "amount": 100, "unit": "g", "scalingType": "linear", "minimumAmount": null, "notes": "" },
        { "name": "vegetable stock", "amount": 500, "unit": "ml", "scalingType": "linear", "minimumAmount": null, "notes": "" },
        { "name": "cream cheese", "amount": 2, "unit": "tbsp", "scalingType": "threshold", "minimumAmount": 1, "notes": "" },
        { "name": "Parmesan", "amount": 30, "unit": "g", "scalingType": "threshold", "minimumAmount": 15, "notes": "grated" },
        { "name": "garlic cloves", "amount": 2, "unit": "cloves", "scalingType": "fixed", "minimumAmount": null, "notes": "minced" },
        { "name": "olive oil", "amount": 1, "unit": "tbsp", "scalingType": "fixed", "minimumAmount": null, "notes": "" },
        { "name": "salt and pepper", "amount": 1, "unit": "pinch", "scalingType": "fixed", "minimumAmount": null, "notes": "to taste" }
      ]
    }
  ],
  "method": [
    { "step": 1, "instruction": "Heat olive oil in a large pan over medium heat. Add garlic and cook for 30 seconds.", "timeMinutes": 1 },
    { "step": 2, "instruction": "Add sliced mushrooms and cook until golden, about 5 minutes.", "timeMinutes": 5 },
    { "step": 3, "instruction": "Add orzo and vegetable stock. Bring to a simmer and cook for 10 minutes, stirring occasionally.", "timeMinutes": 10 },
    { "step": 4, "instruction": "Stir in spinach, cream cheese and Parmesan. Season with salt and pepper. Serve immediately.", "timeMinutes": 2 }
  ],
  "tips": "Works well with any mushroom variety. Add a squeeze of lemon at the end for brightness. Leftovers thicken — add a splash of water when reheating."
}
```

---

## Example: Medium Detail Recipe

```json
{
  "id": "solo-teriyaki-chicken",
  "name": "Teriyaki Chicken with Rice",
  "source": "Mob Kitchen",
  "sourceUrl": "https://www.mob.co.uk/recipes/teriyaki-chicken",
  "sourceType": "url",
  "imageUrl": "",
  "servings": 1,
  "cookTime": 20,
  "prepTime": 10,
  "difficulty": "Easy",
  "cuisine": "Japanese",
  "mainProtein": "Chicken",
  "calories": 520,
  "carbs": null,
  "protein": null,
  "fat": null,
  "tags": ["solo-friendly", "quick", "fakeaway"],
  "dietary": ["dairy-free"],
  "soloFriendly": true,
  "familyFriendly": false,
  "description": "Sticky teriyaki chicken thighs with steamed rice and quick pickled cucumber. Better than takeaway."
}
```

*Medium detail recipes omit `ingredients`, `method`, `tips`, and `customMixes`. These can be enriched later by visiting the source URL.*
