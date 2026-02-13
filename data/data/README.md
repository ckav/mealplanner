# Recipe Repository — Seed Data

> **Purpose**: Default recipe collection for UX testing and app launch  
> **Target**: 150+ recipes across dietary categories  
> **Status**: In progress — 46 of 150 recipes captured  
> **Last Updated**: February 2026  
> **Path**: data/data/recipes

---

## What This Is

This folder contains the **seed recipe data** that populates the app for user testing with friends and family. These are not feature specs (those live in `MealPlannerApp/docs/`) — this is the actual content that users will browse, filter, and add to their meal plans.

The data is structured to match the Firebase/Firestore schema and includes metadata required by app features like portion scaling, dietary filtering, and solo-friendly curation.

---

## Folder Structure

```
data/data/recipes/
├── README.md                      ← You are here
├── RECIPE_SCHEMA.md               ← Data structure spec for all recipe fields
├── COVERAGE_TRACKER.md            ← Progress toward 150 target, gaps identified
├── batches/
│   ├── 01_sample_recipes.json     ← 5 recipes — mixed categories (BBC Good Food, Jamie Oliver, Mob)
│   ├── 02_nadia_lim.json          ← 11 recipes — Nadia Lim cookbook extraction
│   ├── 03_solo_meals.json         ← 30 recipes — solo/single-serving focus
│   ├── 04_vegetarian.json         ← (planned)
│   ├── 05_family_friendly.json    ← (planned)
│   ├── 06_pescatarian.json        ← (planned)
│   └── 07_vegan.json              ← (planned)
└── combined/
    └── all_recipes.json           ← (generated) merged file for Firebase import
```

---

## How to Use This Data

### For UX Testing
Open the spreadsheet versions (`.xlsx`) to browse, filter, and validate recipe coverage with testers. Use `COVERAGE_TRACKER.md` to confirm category coverage against testing requirements.

### For Firebase Import
Use the JSON files in `batches/` or the combined `all_recipes.json` to seed Firestore. Each recipe object matches the schema in `RECIPE_SCHEMA.md`.

### For Claude Code
When building screens that display recipe data, reference `RECIPE_SCHEMA.md` for the data model. The JSON files provide realistic test data for widget development.

---

## Recipe Sources

| Source | Type | Count | Notes |
|--------|------|-------|-------|
| BBC Good Food | URL import | ~20 | UK-focused, reliable nutrition data |
| Mob Kitchen | URL import | ~8 | Solo-friendly, quick meals |
| Jamie Oliver | URL import | ~5 | Family-friendly, traybakes |
| Olive Magazine | URL import | ~3 | Mid-week dinners |
| Nadia Lim — Family Favourites | Cookbook photo | 11 | Demonstrates "add from cookbook" UX flow |
| Delicious Magazine | URL import | ~3 | (planned) |

### Copyright Notes
- Cookbook recipes (Nadia Lim) are from a personally owned book — acceptable for private UX testing
- URL-sourced recipes include attribution and source links
- For public launch: recipes must be user-added content, original, or properly licensed

---

## Current Progress

| Category | Target | Current | Status |
|----------|--------|---------|--------|
| Solo / single-serving | 25-30 | 30 | ✅ Complete |
| Family-friendly (4+ servings) | 50-55 | 11 | 🔧 In progress |
| Vegetarian | 35-40 | 2 | ⬜ Planned |
| Pescatarian | 20-25 | 1 | ⬜ Planned |
| Vegan | 15-20 | 1 | ⬜ Planned |
| **Total** | **150+** | **46** | **31%** |

*Note: Some recipes count in multiple categories (e.g., a solo vegan recipe counts in both solo and vegan).*

---

## Data Quality Levels

Recipes are captured at different detail levels. The schema supports progressive enrichment.

| Level | What's Included | When to Use |
|-------|----------------|-------------|
| **Full** | Name, source, image, servings, times, nutrition, ingredients (with scaling types), method steps, tips | Batch 01 (samples) + Batch 02 (Nadia Lim) |
| **Medium** | Name, source URL, servings, times, cuisine, protein, calories, dietary tags, description | Batch 03 (solo meals) |
| **Light** | Name, source URL, servings, times, cuisine, tags only | Future batches (enrich later) |

All recipes can be enriched to Full level by visiting the source URL and extracting ingredients + method.
