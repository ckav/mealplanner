# Recipe Add/Edit UX — Notes & Scaling Rules (MVP)

> **Purpose**: Define how we handle incomplete recipes, ingredient verification, and scaling tips.
> **Scope**: v3 HTML prototype UX guidance.
> **Date**: Feb 2026

---

## 1) Missing Elements (Photos, Cuisine, Tags)

### Missing Photo
- **Default behavior**: auto-assign a neutral placeholder image.
- **UI**: show “Add photo (optional)” with a preview tile.
- **If blank**: display “No photo yet” badge on card until user adds one.

### Missing Cuisine / Tags
- **Default behavior**: optional fields; if empty, use a neutral “Uncategorised” label internally.
- **UI**: show suggested cuisines based on keywords in title/ingredients.
- **Don’t block save**: allow saving with minimal metadata.

### Missing Cook Time / Servings
- **Default**: if blank, set cook time = 25 min, servings = 2.
- **UI**: prompt “Estimate later” as a quick option.

---

## 2) Ingredient Import + Verification

### Flow
1. User pastes or scans ingredients list.
2. App parses each line into **amount / unit / ingredient name**.
3. **Review step**: inline table lets user correct each item.

### Parsed List UI
- Column: Amount | Unit | Ingredient | Category | Notes
- Inline edit per row
- Quick fix buttons: “Remove”, “Mark as pantry”, “Merge duplicates”

### Validation Rules
- If amount is missing: allow save with amount = null.
- If unit is unknown: keep unit as free text.
- Auto-normalise common units: tsp/tbsp/g/ml.

---

## 3) Scaling & Portion Notes (Key Problem)

### Principle
Not all ingredients scale linearly. Protein and bulk should scale; seasonings/condiments often **don’t** scale below a threshold.

### Suggested MVP Rules
**A) Linear scale for:**
- Protein (meat, fish, tofu, beans)
- Vegetables
- Grains / carbs
- Liquids (stocks, milk, water)

**B) Soft-scale (minimums):**
- Salt, pepper, spices, soy sauce, vinegars
- Oils used “to cook”

**Rule**: If scaled amount < 0.25 tsp / 1 ml, show tip: “Use a pinch” and round to minimum.

**C) Rounding rules**
- tsp/tbsp: round to nearest 0.25
- grams: round to nearest 5g
- ml: round to nearest 5ml
- eggs: 0.5 = “1 small egg” suggestion

### UI Tips
When user changes portions:
- Show a callout: “Seasoning doesn’t scale perfectly. Start small and adjust to taste.”
- Highlight ingredients flagged as **soft‑scale** with a dotted underline.

---

## 4) Minimum Viable Add/Edit UX

### Add Recipe (MVP)
- Required: Name
- Optional: Image, Cuisine, Tags, Source
- Ingredients: text area + “Review parsed list” step
- Steps: text area (one per line)

### Edit Recipe
- Same form as Add
- Pre-filled values
- “Missing info” banner if key fields absent (image, cuisine, cook time)

---

## 5) Open Questions for Later
- Do we auto‑suggest cuisine by keywords?
- Should ingredient parsing support OCR uploads?
- Do we store a “scaling overrides” field per ingredient?

---

## MVP Acceptance Checklist
- Save recipes with missing image/cuisine/tags
- Review screen for parsed ingredients
- Scaling tips show for seasoning/condiments
- Portion change UI warns about non‑linear scaling
