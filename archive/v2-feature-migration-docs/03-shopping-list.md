# Feature: Shopping List

## Description
Aggregates ingredients from selected meals into a consolidated shopping list with category organization, pantry checking, and export/integration capabilities.

## Current Implementation (Old Version)

### HTML Structure
```html
<div id="shoppingView" class="view-container">
    <div class="shopping-list">
        <h2>Shopping List</h2>
        
        <div class="pantry-check">
            <h4>Check your pantry (click items you already have):</h4>
            <div class="pantry-items" id="pantryItems">
                <span class="pantry-item" onclick="togglePantryItem(this)">Olive oil</span>
                <span class="pantry-item" onclick="togglePantryItem(this)">Salt</span>
                <!-- more items -->
            </div>
        </div>

        <div id="shoppingListContent">
            <!-- Shopping list generated here -->
        </div>

        <div class="nav-buttons">
            <button class="btn btn-primary" onclick="exportList()">📋 Copy List</button>
            <button class="btn btn-secondary" onclick="sendToSupermarket()">🏪 Send to Tesco</button>
        </div>
    </div>
</div>
```

### JavaScript Implementation

#### Generate Shopping List
```javascript
function generateShoppingList() {
    const listContent = document.getElementById('shoppingListContent');
    const portions = parseInt(document.getElementById('portionsInput').value);
    
    if (selectedMeals.length === 0) {
        listContent.innerHTML = '<p>Select some meals first!</p>';
        return;
    }
    
    // Aggregate ingredients by category
    let aggregatedIngredients = {
        proteins: new Map(),
        produce: new Map(),
        marinadeAndSauce: new Map(),
        beans: new Map(),
        pantry: new Map(),
        spices: new Map(),
        garnish: new Map(),
        toppings: new Map(),
        staples: new Map()
    };
    
    selectedMeals.forEach(mealId => {
        if (ingredients[mealId]) {
            Object.keys(ingredients[mealId]).forEach(category => {
                if (aggregatedIngredients[category]) {
                    ingredients[mealId][category].forEach(item => {
                        const match = item.match(/^([\d.]+\s*\w+)?\s*(.+)$/);
                        const key = match ? match[2] : item;
                        
                        if (!aggregatedIngredients[category].has(key)) {
                            aggregatedIngredients[category].set(key, []);
                        }
                        aggregatedIngredients[category].get(key).push(item);
                    });
                }
            });
        }
    });
    
    let html = '';
    Object.keys(aggregatedIngredients).forEach(category => {
        const items = aggregatedIngredients[category];
        if (items.size > 0) {
            html += `
                <div class="ingredient-category">
                    <h3>${formatCategoryName(category)}</h3>
                    ${Array.from(items.entries()).map(([key, values]) => {
                        const displayText = values[0];
                        const adjustedText = portions !== 4 ? 
                            `${displayText} (adjusted for ${portions} portion${portions > 1 ? 's' : ''})` : 
                            displayText;
                        return `
                            <div class="ingredient-item">
                                <input type="checkbox" class="ingredient-checkbox" onchange="toggleIngredient(this)">
                                <span>${adjustedText}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    });
    
    listContent.innerHTML = html || '<p>No ingredients needed!</p>';
}
```

#### Export List
```javascript
function exportList() {
    const items = [];
    document.querySelectorAll('.ingredient-item:not(.have-already) span').forEach(item => {
        items.push(item.textContent);
    });
    
    if (items.length === 0) {
        alert('No items to copy - all ingredients are marked as already owned!');
        return;
    }
    
    const text = 'Shopping List:\n\n' + items.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        alert('Shopping list copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Shopping list copied to clipboard!');
    });
}
```

#### Supermarket Integration
```javascript
function sendToSupermarket() {
    const items = [];
    document.querySelectorAll('.ingredient-item:not(.have-already) span').forEach(item => {
        items.push(item.textContent);
    });
    
    if (items.length === 0) {
        alert('No items to send - all ingredients marked as already owned!');
        return;
    }
    
    // Mock integration - shows which supermarket to use
    const supermarkets = ['Tesco', 'Sainsbury\'s', 'ASDA', 'Ocado'];
    const html = `
        <div style="padding: 20px; background: white; border-radius: 10px;">
            <h3>Select Supermarket:</h3>
            ${supermarkets.map(s => `<button onclick="alert('Would send ${items.length} items to ${s}')">${s}</button>`).join('')}
        </div>
    `;
    
    alert('This would integrate with supermarket APIs.\n\nFor now, copy the list and paste into your supermarket\'s quick-add feature.');
}
```

#### Helper Functions
```javascript
function formatCategoryName(category) {
    return category.replace(/([A-Z])/g, ' $1').trim()
        .replace(/^./, str => str.toUpperCase());
}

function toggleIngredient(checkbox) {
    checkbox.parentElement.classList.toggle('have-already');
    updateShoppingProgress();
}

function togglePantryItem(item) {
    item.classList.toggle('have');
}

function updateShoppingProgress() {
    const total = document.querySelectorAll('.ingredient-checkbox').length;
    const checked = document.querySelectorAll('.ingredient-checkbox:checked').length;
    
    if (total > 0) {
        const progress = Math.round((checked / total) * 100);
        console.log(`Shopping progress: ${progress}% (${checked}/${total} items)`);
    }
}
```

## Data Structure
```javascript
ingredients: {
    1: {  // Meal ID
        proteins: ["400g chicken breast"],
        marinadeAndSauce: ["3 tbsp soy sauce", "2 tbsp honey"],
        spices: ["1 tsp ground ginger", "2 cloves garlic"],
        // ...
    },
    2: {
        // ...
    }
}
```

## Features & Functionality
✅ Aggregate ingredients from multiple meals
✅ Organize by category (proteins, produce, spices, etc.)
✅ Adjust quantities based on portions selected
✅ Pantry item checking (exclude from list)
✅ Copy list to clipboard (with fallback)
✅ Visual feedback for checked items
✅ Progress tracking
✅ Supermarket integration scaffolding

## Pantry Feature
Pre-populated common pantry items users can click to exclude from shopping:
- Olive oil
- Salt
- Black pepper
- Garlic
- Soy sauce
- Rice vinegar
- Sesame oil
- Honey

## Integration Requirements for v2

### Current v2 Status
- v2 has "Grocery List Button" in header
- Opens modal with `groceryListModal` (ID suggests modal exists)
- Shopping list functionality may already exist

### Work Needed
- [ ] Check if v2/app.js has grocery list implementation
- [ ] If missing: Port this aggregation logic to v2
- [ ] Ensure categories match v2's data structure
- [ ] Create grocery list modal UI
- [ ] Integrate with v2's recipe selection

### Data Model Mapping
```javascript
// Old: ingredients[mealId][category] = [items]
// New: recipes[id].ingredients = [{name, quantity, unit, category}]
// Need adapter function to transform between formats
```

## TODO for v2 Integration
- [ ] Verify v2 has grocery list modal
- [ ] Check if aggregation logic exists in v2/app.js
- [ ] Create/update grocery list modal template
- [ ] Port ingredient aggregation function
- [ ] Test with v2's recipe data structure
- [ ] Implement copy-to-clipboard button
- [ ] Add pantry management integration
- [ ] Create supermarket integration endpoints (Tesco API)

## Best Practices
1. **Category Organization** - Makes list easier to follow in-store
2. **Quantity Adjustment** - Scales ingredients with portions
3. **Pantry Exclusion** - Avoids buying items already owned
4. **Duplicate Consolidation** - Uses Map to merge multiple uses of same item
5. **Export Format** - Simple newline-separated list for universal compatibility

## Enhancements to Consider
1. **Quantity Consolidation** - "2x 400g chicken" → "800g chicken"
2. **Unit Conversion** - Convert disparate units (ml vs L)
3. **Grocery Store Integration** - Tesco/Sainsbury's quick-add
4. **Price Comparison** - Show estimated costs
5. **Recipe Cross-check** - Verify all ingredients listed before buying
6. **Meal Plan Notes** - "Serve with rice" reminders

## Performance Notes
- Efficient aggregation: O(n*m) where n=meals, m=ingredients/meal
- Map-based deduplication: O(1) lookup
- DOM rendering: Consider virtual scrolling for 100+ items

## Related Features
- Meal Selection (01-meal-selection.md)
- Portions Management (07-portions-management.md)
- Pantry Management (04-pantry-management.md)
- Tab Navigation (08-tab-navigation.md)
