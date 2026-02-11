# Recipe Editor Feature

A modular feature for adding and editing recipes in the Meal Planner application.

## Files

- `recipe-editor.html` - Modal template markup
- `recipe-editor.css` - Styles for the editor modal and form
- `recipe-editor.js` - JavaScript module with all editor functionality

## Usage

### 1. Include the files in your HTML

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="features/recipe-editor/recipe-editor.css">

<!-- Before closing </body> tag, after your main app.js -->
<script src="features/recipe-editor/recipe-editor.js"></script>
```

### 2. Include the modal HTML

Either copy the contents of `recipe-editor.html` into your main HTML file, or load it dynamically.

### 3. Initialize the module

```javascript
// In your main app initialization
RecipeEditor.init({
    onSave: (recipeData, existingId) => {
        if (existingId) {
            // Update existing recipe
            const index = recipes.findIndex(r => r.id === existingId);
            if (index !== -1) {
                recipes[index] = { ...recipes[index], ...recipeData };
            }
        } else {
            // Add new recipe
            recipes.unshift(recipeData);
        }
        renderRecipeGrid();
    },
    onDelete: (recipeId) => {
        recipes = recipes.filter(r => r.id !== recipeId);
        renderRecipeGrid();
    }
});
```

### 4. Open the editor

```javascript
// Open for new recipe
document.getElementById('addRecipeBtn').addEventListener('click', () => {
    RecipeEditor.open();
});

// Open for editing existing recipe
function editRecipe(recipe) {
    RecipeEditor.open(recipe);
}
```

## API

### `RecipeEditor.init(options)`

Initialize the module with callbacks.

**Options:**
- `onSave(recipeData, existingId)` - Called when a recipe is saved
- `onDelete(recipeId)` - Called when a recipe is deleted

### `RecipeEditor.open(recipe?)`

Open the editor modal. Pass a recipe object to edit, or nothing for a new recipe.

### `RecipeEditor.close()`

Close the editor modal.

### `RecipeEditor.isEditing()`

Returns `true` if currently editing an existing recipe.

### `RecipeEditor.getEditingId()`

Returns the ID of the recipe being edited, or `null` if creating new.

## Recipe Data Structure

```javascript
{
    id: 'recipe-id-123',
    name: 'Recipe Name',
    image: 'https://...',
    cookTime: 25,           // minutes
    servings: 4,
    calories: 350,
    difficulty: 'Easy',     // Easy, Medium, Hard
    cuisine: 'italian',
    tags: ['Quick', 'Healthy'],
    source: {
        name: 'Source Name',
        url: 'https://...'
    },
    ingredients: {
        protein: [
            { name: 'Chicken', amount: 400, unit: 'g', scalable: true }
        ],
        vegetables: [...],
        carbs: [...],
        sauce: [...],
        pantry: [...]
    },
    steps: [
        { instruction: 'Step description...', time: 5 }
    ],
    personalNote: 'Optional notes...',
    favourite: false,
    timesCooked: 0,
    lastCooked: null,
    dateAdded: '2026-01-06'
}
```

## Future Improvements

- [ ] Image upload support
- [ ] Drag-and-drop reordering for steps
- [ ] Ingredient auto-suggestions
- [ ] Recipe import from URL
- [ ] Recipe templates
- [ ] Nutritional information calculator
- [ ] Print-friendly recipe view
