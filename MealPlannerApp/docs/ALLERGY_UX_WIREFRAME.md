# Allergy & Preferences UX — Wireframe Doc (MVP)

> **Purpose**: Screen map + wireframe notes for allergy/preference flow in v3
> **Scope**: MVP-level UX (safe-by-default + clear override path)
> **Date**: Feb 2026

---

## 0) Flow Overview (Map)

```
First-run → Profile setup → Recipes (safe-only) → Filters → Recipe detail → Picker → Planner
                     ↘ Settings → Profiles → Allergies ↗
```

---

## 1) First‑Run Prompt

```
┌──────────────────────────────────────┐
│  Welcome 👋                         │
│  Set dietary & allergy preferences   │
│  so we only show safe recipes.       │
│                                      │
│  [Set preferences]   [Skip for now]  │
└──────────────────────────────────────┘
```

**Notes**
- Defaults to safe-only after setup.
- Skipping still allows later setup in Settings.

---

## 2) Profile Setup — Allergies & Dislikes

```
┌──────────────────────────────────────┐
│ Profile: Claire                       │
│ Allergies & preferences               │
│                                      │
│ Allergens (multi-select)             │
│ [Dairy] [Egg] [Fish] [Gluten] ...    │
│                                      │
│ Dislikes (text/quick list)           │
│ + Add dislike: [cauliflower]         │
│                                      │
│ Safe-only default:  [ON]             │
│ (Hide unsafe recipes by default)     │
│                                      │
│ [Save]                               │
└──────────────────────────────────────┘
```

**Notes**
- MVP: strict avoid only.
- Future: severity + “may contain” + baked tolerance.

---

## 3) Recipes Tab (Safe‑only Default)

```
┌──────────────────────────────────────┐
│ Safe-only for: Claire   [Change]     │
│ Active: No dairy · No fish · No nut  │
│                                      │
│ [Cuisine ▾] [Cook time ▾] [Sort ▾]   │
│                                      │
│ Showing 12 of 48 recipes             │
│                                      │
│  (cards...)                          │
└──────────────────────────────────────┘
```

**Notes**
- Banner shows active safety scope.
- “Change” jumps to Profile settings.

---

## 4) Filter Panel (Safety Toggle)

```
┌──────────────────────────────────────┐
│ Filters                               │
│                                      │
│ Dietary & Allergens                  │
│ [Dairy] [Egg] [Fish] [Gluten] ...    │
│                                      │
│ Show unsafe recipes:  [OFF]          │
│ (unsafe items hidden by default)     │
│                                      │
│ [Done]                               │
└──────────────────────────────────────┘
```

**Notes**
- “Show unsafe” is a deliberate opt‑in.

---

## 5) Recipe Detail (Safe Badge)

```
┌──────────────────────────────────────┐
│ Thai Green Curry                      │
│ ✅ Safe for Claire                    │
│                                      │
│ [View allergens]                      │
│ (collapsed by default)                │
│                                      │
│ Ingredients...                        │
└──────────────────────────────────────┘
```

**Notes**
- Allergens are hidden unless requested.

---

## 6) Recipe Picker (Planner Context)

```
┌──────────────────────────────────────┐
│ Add meal for Tuesday — Main          │
│ Safe-only: Claire                    │
│                                      │
│ (safe list only)                      │
│                                      │
│ Show unsafe recipes [OFF]            │
└──────────────────────────────────────┘
```

**Notes**
- Inherits profile/group selection.

---

## 7) Planner Add Override (Unsafe)

```
┌──────────────────────────────────────┐
│ This recipe contains: Dairy          │
│ Unsafe for Claire                    │
│                                      │
│ [Cancel]   [Add anyway]              │
└──────────────────────────────────────┘
```

**Notes**
- Explicit confirmation required to override.

---

## 8) Empty State (Too Strict)

```
┌──────────────────────────────────────┐
│ 😕 No safe recipes found              │
│ Try relaxing preferences              │
│                                      │
│ [Relax filters]                       │
│                                      │
│ You might like (safe picks):          │
│  • Recipe A                           │
│  • Recipe B                           │
└──────────────────────────────────────┘
```

---

## MVP Acceptance Checklist

- Safe-only default on setup
- Clear banner indicating safety scope
- Active chips for excluded allergens/dislikes
- “Show unsafe” toggle available but off by default
- Recipe detail shows safety badge; allergens hidden by default
- Planner picker inherits safety scope
- Override requires confirmation
- Empty state provides “Relax filters” + safe suggestions

---

## Future Enhancements (Post‑MVP)

- Severity levels (strict / trace ok)
- “May contain” handling
- Baked/cooked tolerance
- Substitution suggestions
- Personal notes per allergen
