# Allergen Filter Feature

**Location:** `MealPlannerApp/docs/features/allergen-filter/`

A comprehensive allergen filtering system that helps users avoid recipes containing the **16 European Allergens**.

## Documentation Files

This feature documentation includes:
- 📖 **[USER_GUIDE.md](./USER_GUIDE.md)** - User-facing guide with features and how-to instructions
- 👨‍💻 **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Technical documentation for developers

## Overview

This feature provides:
1. **Quick Filter Panel** - Instant allergen filtering in the Recipes view
2. **Profile-Based Preferences** - Create family member allergen profiles
3. **Intelligent Detection** - Automatic allergen scanning in recipes

## Quick Start

### For Users
1. Go to the Recipes view
2. Find the "⚠️ Avoid Allergens" section
3. Click allergen buttons to filter recipes
4. Create profiles in Settings for saved preferences

### For Developers
See [IMPLEMENTATION.md](./IMPLEMENTATION.md) for:
- Code changes and integration points
- Data structures and state management
- Event handlers and filtering logic
- Testing checklist

## Status
✅ Fully implemented and tested

## Supported Allergens (16 EU Allergens)
- Gluten, Crustaceans, Eggs, Fish, Peanuts, Soybeans, Milk, Nuts
- Celery, Mustard, Sesame, Sulphites, Lupin, Molluscs

## Implementation Details

**Files Modified:**
- `MealPlannerApp/frontend/index.html` - Added filter UI and profile checkboxes
- `MealPlannerApp/frontend/script.js` - Added filtering logic and profile handlers
- `MealPlannerApp/frontend/v2/index.html` - Added allergen filter button to navigation

**Browser Compatibility:** All modern browsers (Chrome, Firefox, Safari, Edge)

**Data Storage:** localStorage (browser-based, ~1KB per profile)
