# Allergen Filter Feature - User Guide

## Overview
The Meal Planner app now includes a comprehensive allergen filtering system that helps users avoid recipes containing the **16 European Allergens**. This feature provides two main interfaces:

1. **Quick Filter Panel** - In the Recipes view for instant filtering
2. **Profile-Based Preferences** - In Settings to create personal allergy profiles

---

## Features Implemented

### 1. Recipe View Allergen Filter
Located in the "🍲 Recipes" tab, the allergen filter section allows you to instantly exclude recipes containing specific allergens.

**How to use:**
- Scroll to the **"⚠️ Avoid Allergens"** section in the filter panel
- Click on any allergen button to activate it (e.g., 🥛 Milk, 🌰 Nuts)
- Active allergens turn **red** and **white**
- Recipes containing the selected allergens are automatically hidden
- Click again to deactivate the filter

**Allergens available (16 European allergens):**
- 🌾 Gluten (wheat, flour, bread, pasta, barley, rye)
- 🦐 Crustaceans (prawn, crab, lobster, shrimp)
- 🥚 Eggs
- 🐟 Fish (salmon, tuna, cod, haddock, anchovy)
- 🥜 Peanuts
- 🌱 Soybeans (soy, tofu, edamame)
- 🥛 Milk (cheese, yogurt, cream, butter)
- 🌰 Nuts (almond, hazelnut, walnut, cashew, pecan, brazil, pistachio, macadamia)
- 🌿 Celery
- 🌭 Mustard
- Sesame
- 🧪 Sulphites (sulfite)
- 🌸 Lupin
- 🐚 Molluscs (mussel, oyster, scallop, squid)

### 2. Family Profile Allergen Preferences
Create allergen profiles for different family members in the **⚙️ Settings** tab.

**How to use:**
1. Go to the **Settings** tab
2. Scroll to **"Family Profiles"** section
3. Enter the person's name
4. Check the allergens they need to avoid (uses the same 16 European allergens)
5. Add any dietary dislikes (optional, comma-separated)
6. Click **"Add Profile"**

**Profile Features:**
- ✅ Profiles are saved automatically to browser storage
- ✅ Toggle profiles active/inactive by clicking on them
- 🎯 Allergen information is stored per-profile for reference

### 3. Intelligent Recipe Detection
The app automatically scans recipes for allergens by:
- **Ingredient scanning**: Detects allergen keywords in ingredient lists
- **Tag-based detection**: Recognizes allergen tags manually added to recipes
- **Visual indicators**: Recipes display allergen icons in recipe cards and modal details

---

## How Allergen Filtering Works

### Automatic Detection
When you add recipes to the app, the system automatically identifies which of the 16 European allergens are present:

**Example:**
- Recipe: "Chocolate Peanut Butter Cookies"
- Detected allergens: Peanuts, Milk (if butter/chocolate used), Eggs, Gluten

### Filtering Logic
- When you select an allergen to avoid, **all recipes containing that allergen are hidden**
- Multiple filters work together (AND logic) - a recipe must match ALL filters to appear
- Recipes with "No major allergens" still appear as they're safe for allergen-avoiding diets
- Simple/quick-added meals bypass allergen filtering

### Recipe Modal Display
When viewing recipe details, allergen icons appear at the top showing:
- ✓ Which allergens are in the recipe
- ✓ Clear visual indicators for safety awareness

---

## User Experience Design Principles

This implementation follows the **"Invisible Safety"** principle outlined in the project:
- ⚠️ **Allergens are filtered, not flagged** - Unsafe recipes simply don't appear rather than showing warning badges
- 🎯 **Respects user dignity** - No constant reminders of what you can't eat
- ✨ **Seamless filtering** - Switch filters with a single click

---

## Technical Details

### Allergen Keywords Database
The app includes comprehensive keyword matching for each allergen:

```javascript
{
  'Gluten': ['flour', 'wheat', 'barley', 'rye', 'bread', 'pasta'],
  'Milk': ['milk', 'cheese', 'yogurt', 'cream', 'butter'],
  'Nuts': ['nut', 'almond', 'hazelnut', 'walnut', 'cashew', 'pecan', 'brazil', 'pistachio', 'macadamia'],
  'Crustaceans': ['prawn', 'crab', 'lobster', 'shrimp'],
  'Fish': ['fish', 'salmon', 'tuna', 'cod', 'haddock', 'anchovy'],
  // ... (14 total allergens)
}
```

### Files Modified
- **index.html** - Added allergen filter UI section and profile allergen checkboxes
- **script.js** - Added:
  - `initializeAllergenFilters()` - Populates filter buttons
  - `initializeProfileAllergenCheckboxes()` - Populates checkbox interface
  - `applyFiltersAndRender()` - Enhanced with allergen filtering logic
  - Profile form handlers for allergen selection

### State Management
- Allergen selections are part of profile data (stored in localStorage)
- Filter selections are temporary (not persisted) and reset on page reload
- Profiles are permanently saved with their allergen preferences

---

## Future Enhancements

Potential improvements for future versions:
- [ ] Allow users to override detected allergens (manual editing)
- [ ] Import allergen data from recipe source APIs
- [ ] Create family-wide shopping lists that respect all profile allergies
- [ ] Integration with supermarket APIs to verify allergen-free products
- [ ] Allergen severity levels (avoid vs. limit)
- [ ] Cross-contamination warnings for shared kitchens
- [ ] Export allergen reports for medical/allergy specialists

---

## Support & Troubleshooting

**Q: Why is a recipe still showing even though I selected its allergen?**
A: The recipe detection might have missed the allergen. You can manually edit the recipe tags to include the allergen.

**Q: Can I filter by multiple allergens at once?**
A: Yes! Click multiple allergen buttons. Recipes must match ALL filters to be hidden.

**Q: Are my allergen preferences saved?**
A: Yes, family profiles with allergen preferences are saved to your browser's storage.

**Q: Can I use this without creating profiles?**
A: Yes! Use the quick filter in the Recipes view to instantly avoid allergens without setting up profiles.

---

## Allergen Information Sources
- EU Regulation 1169/2011 (14 major allergens)
- UK Food Standards Agency (16 major allergens including Lupin and Molluscs)
- Cross-reference with major allergen databases used by food retailers

