# Feature: Portions Management

## Description
Allow users to adjust the number of servings for recipes, which scales ingredient quantities and affects shopping list generation.

## Current Implementation (Old Version)

### HTML Structure
```html
<div class="header-stats">
    <div class="basket-count">
        <span id="mealCount">0</span> meals selected
    </div>
    <div class="portions-selector">
        <label>Portions:</label>
        <input type="number" id="portionsInput" value="1" min="1" max="10">
    </div>
</div>
```

### JavaScript Implementation

#### Reading Portions
```javascript
const portions = parseInt(document.getElementById('portionsInput').value);
```

#### Using Portions in Recipe Display
```javascript
function loadRecipe(mealId) {
    // ... other code ...
    const portions = parseInt(document.getElementById('portionsInput').value);
    
    // Display adjustment notice
    document.getElementById('recipeMeta').innerHTML = `
        ⏱️ Prep: ${recipe.prepTime || '10 mins'} | 
        🔥 Cook: ${recipe.cookTime || meal.time + ' mins'} | 
        👥 Serves: ${recipe.servings || 4}
        ${portions !== (recipe.servings || 4) ? ` | <strong>Adjusted for ${portions} portions</strong>` : ''}
    `;
    
    // Show portions adjustment in ingredients
    ingredients[mealId][category].forEach(item => {
        let adjustedItem = item;
        if (portions !== (recipe.servings || 4)) {
            adjustedItem = `${item} <em>(for ${portions} portions)</em>`;
        }
        return `<li>${adjustedItem}</li>`;
    });
}
```

#### Using Portions in Shopping List
```javascript
function generateShoppingList() {
    const portions = parseInt(document.getElementById('portionsInput').value);
    
    // ... aggregation code ...
    
    Array.from(items.entries()).map(([key, values]) => {
        const displayText = values[0];
        const adjustedText = portions !== 4 ? 
            `${displayText} (adjusted for ${portions} portion${portions > 1 ? 's' : ''})` : 
            displayText;
        return `
            <div class="ingredient-item">
                <input type="checkbox" class="ingredient-checkbox">
                <span>${adjustedText}</span>
            </div>
        `;
    });
}
```

## Current Implementation Details
- **Default Value**: 1 portion
- **Min Value**: 1
- **Max Value**: 10
- **Input Type**: number (HTML5)
- **Applied to**:
  - Recipe display (metadata note)
  - Ingredient quantities
  - Shopping list quantities
- **Not auto-calculating** - Just displays note about adjustment

## Limitations
❌ No automatic quantity scaling (manual note only)
❌ Limited to 1-10 portions
❌ No fractional portions (0.5x)
❌ No preset buttons (2, 4, 6 servings)
❌ Not stored/persisted
❌ Affects all recipes equally

## Data Structure
```javascript
// Simple numeric value, no structured data
portions = 1;  // integer 1-10
```

## Integration Requirements for v2

### Current v2 Status
- v2 has "Cooking for:" dropdown in filter bar
- Options: Everyone Home (4), Just Me (1), Couple Night (2), Custom
- May affect portions indirectly

### Work Needed
- [ ] Check if v2 uses "Cooking for" for portions
- [ ] If not, implement portions selector
- [ ] Link portions to recipe display
- [ ] Apply portions to shopping list
- [ ] Test scaling logic

## Enhanced Data Model

### Proposed Structure
```javascript
// Current recipe data
recipes[id] = {
    name: "Soy & Chilli Chicken Wings",
    servings: 4,        // Base serving size
    ingredients: [...]
};

// Add portions tracking
let portions = {
    baseServings: 4,    // From recipe
    requestedServings: 4,
    scaleFactor: 1.0    // 1.0 = 1x, 0.5 = half, 2.0 = double
};

// Calculated property
function getScaleFactor() {
    return portions.requestedServings / portions.baseServings;
}
```

## Enhanced Features to Add

### 1. Preset Servings Buttons
```javascript
// Quick buttons for common serving sizes
<div class="portions-presets">
    <button onclick="setPortions(1)">Just Me</button>
    <button onclick="setPortions(2)">Couple</button>
    <button onclick="setPortions(4)">Family</button>
    <button onclick="setPortions(6)">Party</button>
</div>
```

### 2. Fractional Portions
```javascript
// Support 0.5x, 1.5x, 2x, etc.
<input type="number" id="portionsInput" value="1" step="0.5" min="0.5" max="10">
```

### 3. Automatic Quantity Scaling
```javascript
// Parse quantities and scale them
function scaleIngredient(ingredient, scaleFactor) {
    // Example: "400g chicken" with factor 0.5 = "200g chicken"
    const match = ingredient.match(/^([\d.]+)\s*([a-z]+)?\s*(.+)$/i);
    
    if (match) {
        const quantity = parseFloat(match[1]) * scaleFactor;
        const unit = match[2] || '';
        const item = match[3];
        return `${quantity}${unit} ${item}`;
    }
    return ingredient;
}
```

### 4. Per-Meal Portions
```javascript
// Different portion sizes for different meals
let mealPortions = {
    1: 2,  // Meal 1: 2 portions
    2: 4,  // Meal 2: 4 portions
    3: 1   // Meal 3: 1 portion
};
```

## UI Recommendations

### Simple (Current)
```
Portions: [1] (input field)
```

### Enhanced (Recommended)
```
┌──────────────────────────┐
│ Cooking for:             │
│ [Me] [Couple] [Family]   │
│ or Custom: [2]           │
│ (shows 2x recipe)        │
└──────────────────────────┘
```

### Shopping List Indication
```
✓ 2x 400g chicken breast
✓ 1x 2 tbsp honey (unchanged)
✓ 0.5x 1 tsp salt (reduced)
```

## Algorithm for Quantity Scaling

```javascript
function parseQuantity(ingredient) {
    // Patterns: "400g chicken", "2 tbsp honey", "1 tsp salt", "3 cloves garlic"
    const patterns = [
        /^([\d.]+)\s*(g|kg|ml|l|cup|tbsp|tsp|clove|slice|pinch|dash)\s*(.+)$/i,
        /^([\d.]+)\s*(.+)$/  // Fallback: just number and item
    ];
    
    for (let pattern of patterns) {
        const match = ingredient.match(pattern);
        if (match) {
            return {
                quantity: parseFloat(match[1]),
                unit: match[2] || '',
                item: match[3] || match[2]
            };
        }
    }
    
    return { quantity: 1, unit: '', item: ingredient };
}

function scaleQuantity(parsed, scaleFactor) {
    const scaledQuantity = parsed.quantity * scaleFactor;
    
    // Format nicely: 0.5, 1.5, 2, etc.
    let displayQuantity = scaledQuantity;
    if (Math.abs(scaledQuantity - Math.round(scaledQuantity)) < 0.01) {
        displayQuantity = Math.round(scaledQuantity);
    } else if (scaledQuantity % 0.5 === 0) {
        // Nice fractions like 0.5, 1.5, 2.5
        displayQuantity = scaledQuantity;
    }
    
    return {
        quantity: displayQuantity,
        unit: parsed.unit,
        item: parsed.item
    };
}

function formatScaledIngredient(scaled) {
    return `${scaled.quantity}${scaled.unit ? ' ' + scaled.unit : ''} ${scaled.item}`;
}
```

## Example Scaling

```
Recipe Base: 4 servings

User selects: 2 servings (scaleFactor = 0.5)

Ingredient: "400g chicken breast"
Scaled: "200g chicken breast"

Ingredient: "2 tbsp soy sauce"
Scaled: "1 tbsp soy sauce"

Ingredient: "1 tsp salt" (if not excluding)
Scaled: "0.5 tsp salt"

Ingredient: "3 cloves garlic"
Scaled: "1.5 cloves garlic" (or "1-2 cloves")
```

## TODO for v2 Integration
- [ ] Link "Cooking for" selector to portions logic
- [ ] Implement quantity parsing function
- [ ] Add scaling calculation
- [ ] Test with various quantity formats
- [ ] Display scaled quantities in recipe modal
- [ ] Update shopping list aggregation to use scaled amounts
- [ ] Add preset buttons for quick selection
- [ ] Test fractional portions
- [ ] Ensure mobile-friendly portion controls

## Best Practices
1. **Preserve Original** - Always show base recipe servings
2. **Clear Indication** - Show "×0.5" or "÷2" notation
3. **Smart Rounding** - Convert "0.75" to "¾" for readability
4. **Unit Conversion** - "1.5 tbsp" → "1 tbsp + 1 tsp"
5. **Fractional Support** - Allow 0.5x to 10x
6. **Persist Selection** - Remember portions for session

## Edge Cases
- What to do with "pinch" amounts at 0.5x? (remains "pinch")
- "3 cloves garlic" at 0.5x = "1.5 cloves" or "1-2 cloves"?
- Very small quantities (less than 0.5 unit)
- Ingredients without quantities (e.g., "fresh herbs")

## Related Features
- Recipe View & Cooking (05-recipe-view-cooking.md)
- Shopping List (03-shopping-list.md)
- Tab Navigation (08-tab-navigation.md)

## Storage & Persistence
```javascript
// Save user's typical serving preference
localStorage.setItem('defaultPortions', portions);
```

## Performance Considerations
- Cache parsed ingredients
- Debounce portion input changes
- Avoid re-rendering entire list on small changes
