# Recipe Editor Feature (v2)

A comprehensive modular recipe editor for adding and editing recipes with multiple input methods and source attribution.

## Version 2.0 Features

### 🔗 Multiple Input Methods
1. **URL Import** - Paste a recipe URL to auto-populate details
2. **📚 Cookbook** - Add recipes from physical cookbooks with photo support
3. **✏️ Manual Entry** - Type recipe details by hand

### 📍 Source Attribution
- Tracks where recipes come from (URL, cookbook, or personal)
- Displays source banner when recipe was imported
- Supports image credits for copyright compliance
- Future: enables recipe sharing with proper attribution

### 📝 Personal Notes
- Private notes field for your own tips and modifications
- Marked as "Private" - prepared for future sharing features

---

## Files

| File | Purpose |
|------|---------|
| `recipe-editor-v2.js` | Main module with IIFE pattern |
| `recipe-editor-v2.css` | Styles for v2 features (input methods, source attribution) |
| `recipe-editor.css` | Base form and modal styles |
| `recipe-editor-v2.html` | Template reference (embedded in index.html) |
| `FEATURE-SPEC.md` | Detailed feature specification |
| `README.md` | This documentation |

### Legacy Files (v1)
- `recipe-editor.js` - Original editor module
- `recipe-editor.html` - Original template

---

## Usage

### Initialization
```javascript
RecipeEditor.init({
    onSave: (recipe, editingId) => { 
        // Handle save - editingId is null for new recipes
    },
    onDelete: (id) => { 
        // Handle delete 
    }
});
```

### Open for New Recipe
```javascript
RecipeEditor.open(); // Shows input method selector
```

### Edit Existing Recipe
```javascript
RecipeEditor.open(existingRecipe); // Goes straight to form
```

### Public API

| Method | Description |
|--------|-------------|
| `init(options)` | Initialize with onSave/onDelete callbacks |
| `open(recipe?)` | Open modal (new or edit mode) |
| `close()` | Close modal |
| `isEditing()` | Returns true if editing existing recipe |
| `getEditingId()` | Returns ID of recipe being edited |
| `getCurrentMethod()` | Returns current input method ('url', 'cookbook', 'manual') |

---

## Data Model

### Full Recipe Object
```javascript
{
    id: 'recipe-id-12345',
    name: 'Recipe Name',
    description: 'Brief description',
    image: {
        url: 'https://example.com/image.jpg',
        credit: 'BBC Food'
    },
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    calories: 350,
    difficulty: 'Easy',
    cuisine: 'italian',
    tags: ['Quick', 'Healthy'],
    source: {
        type: 'url', // 'url', 'cookbook', or 'personal'
        name: 'BBC Food',
        url: 'https://bbc.co.uk/food/...',
        dateAccessed: '2025-01-15'
    },
    ingredients: {
        protein: [
            { name: 'Chicken breast', amount: 500, unit: 'g', scalable: true }
        ],
        vegetables: [...],
        carbs: [...],
        sauce: [...],
        pantry: [...]
    },
    steps: [
        { instruction: 'Preheat oven to 180°C', time: 5 },
        { instruction: 'Chop vegetables', time: 10 }
    ],
    notes: {
        personal: 'My private notes and modifications'
    },
    importMethod: 'url',
    dateAdded: '2025-01-15',
    favourite: false,
    timesCooked: 0,
    lastCooked: null
}
```

### Source Types

#### URL Import
```javascript
source: {
    type: 'url',
    name: 'BBC Food',
    url: 'https://www.bbc.co.uk/food/recipes/...',
    dateAccessed: '2025-01-15'
}
```

#### Cookbook
```javascript
source: {
    type: 'cookbook',
    bookTitle: "Jamie's 30-Minute Meals",
    author: 'Jamie Oliver',
    pageNumber: 42,
    photoRef: 'data:image/jpeg...' // Optional photo of page
}
```

#### Personal/Manual
```javascript
source: {
    type: 'personal',
    name: 'Family Recipe'
}
```

---

## Integration

### Include in HTML `<head>`
```html
<!-- Base styles -->
<link rel="stylesheet" href="features/recipe-editor/recipe-editor.css">
<!-- v2 feature styles -->
<link rel="stylesheet" href="features/recipe-editor/recipe-editor-v2.css">
```

### Include before `</body>`
```html
<script src="features/recipe-editor/recipe-editor-v2.js"></script>
```

### Modal HTML
The modal template is embedded in `index.html`. See `recipe-editor-v2.html` for the template reference.

---

## Architecture

### Module Pattern
Uses an IIFE (Immediately Invoked Function Expression) for encapsulation:

```javascript
const RecipeEditor = (function() {
    'use strict';
    
    // Private state
    let editingRecipeId = null;
    let currentInputMethod = null;
    let sourceData = null;
    
    // Private functions
    function showMethodSelector() { ... }
    function selectInputMethod(method) { ... }
    function fetchRecipeFromUrl() { ... }
    
    // Public API
    return {
        init,
        open,
        close,
        isEditing: () => editingRecipeId !== null,
        getEditingId: () => editingRecipeId,
        getCurrentMethod: () => currentInputMethod
    };
})();
```

### State Management
- `editingRecipeId` - ID of recipe being edited (null for new)
- `currentInputMethod` - 'url', 'cookbook', or 'manual'
- `sourceData` - Attribution information from import
- `uploadedPhoto` - Base64 photo data from cookbook import

---

## Future Enhancements

See `FEATURE-SPEC.md` for detailed roadmap including:
- [ ] Backend URL scraping service
- [ ] OCR for cookbook photos
- [ ] Recipe sharing with public/private notes
- [ ] Multiple images per recipe
- [ ] Nutrition data integration
