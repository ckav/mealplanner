# Feature: Pantry Management

## Description
Users can maintain a virtual pantry of ingredients they already have, which are automatically excluded from shopping lists to avoid buying duplicates.

## Current Implementation (Old Version)

### HTML Structure
```html
<div class="pantry-check">
    <h4>Check your pantry (click items you already have):</h4>
    <div class="pantry-items" id="pantryItems">
        <span class="pantry-item" onclick="togglePantryItem(this)">Olive oil</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Salt</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Black pepper</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Garlic</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Soy sauce</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Rice vinegar</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Sesame oil</span>
        <span class="pantry-item" onclick="togglePantryItem(this)">Honey</span>
    </div>
</div>
```

### JavaScript Implementation
```javascript
function togglePantryItem(item) {
    item.classList.toggle('have');
}

// Called when filtering shopping list
function generateShoppingList() {
    // ... only includes items NOT in pantry with 'have' class
    // Filters out items from pantry
}
```

### CSS Classes
```css
.pantry-item {
    display: inline-block;
    padding: 8px 12px;
    margin: 4px;
    border: 2px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.pantry-item.have {
    background-color: #4CAF50;
    color: white;
    border-color: #45a049;
    text-decoration: line-through;
}
```

## Features & Functionality
✅ Pre-populated common pantry items
✅ Click to toggle "have/don't have" state
✅ Visual feedback (green background when selected)
✅ Excluded items not shown in shopping list
✅ Simple, intuitive UI
✅ Common basics covered

## Pantry Items (Current)
1. Olive oil
2. Salt
3. Black pepper
4. Garlic
5. Soy sauce
6. Rice vinegar
7. Sesame oil
8. Honey

## Data Structure
```javascript
// Implicit state stored in DOM classes
// Could be formalized as:
let pantryItems = {
    'olive-oil': { name: 'Olive oil', have: false },
    'salt': { name: 'Salt', have: false },
    // ...
};

// Or as simple array:
let pantryInventory = ['olive oil', 'salt', 'pepper'];
```

## Integration Requirements for v2

### Root Version Context
The root index.html has an advanced version:
```html
<div id="pantry-container" class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-bold mb-4">My Pantry</h2>
    <form id="add-pantry-item-form" class="flex gap-2 mb-4">
        <input type="text" id="pantry-item-name" placeholder="e.g., olive oil" required>
        <button type="submit" class="bg-blue-600">Add</button>
    </form>
    <div id="pantry-list" class="space-y-2"></div>
</div>
```

### Enhanced Approach Recommended
1. **Editable Pantry** - Add/remove custom items
2. **Quantity Tracking** - Track how much you have
3. **Expiration Dates** - Optional expiry tracking
4. **Usage Tracking** - See what gets used when
5. **Multiple Pantries** - Family vs personal pantries
6. **Sync with Shopping** - Auto-update when you buy items

## TODO for v2 Integration
- [ ] Create pantry management modal/view
- [ ] Add form to add custom pantry items
- [ ] Implement pantry list display with remove button
- [ ] Create data structure for pantry inventory
- [ ] Add localStorage persistence for pantry
- [ ] Integrate with shopping list (filter out pantry items)
- [ ] Add quantity field (optional)
- [ ] Add expiration date tracking (optional)
- [ ] Create pantry search/filter

## Proposed Data Model
```javascript
// Enhanced pantry with quantities
let pantry = [
    {
        id: 1,
        name: "Olive oil",
        quantity: 500,      // ml
        unit: "ml",
        category: "oils",
        expiryDate: "2026-12-31",
        dateAdded: "2025-02-05"
    },
    {
        id: 2,
        name: "Salt",
        quantity: null,     // Bulk items without quantity
        unit: null,
        category: "seasonings",
        expiryDate: null
    }
];
```

## Enhanced Features to Add
1. **Add Item Form**
   - Item name (searchable dropdown of common items)
   - Quantity and unit
   - Optional expiry date
   - Category selection

2. **Pantry List View**
   - Display with quantity/unit
   - Show expiry status (coming up/expired)
   - Quick remove button
   - Edit existing items

3. **Smart Features**
   - Suggestion autocomplete from common ingredients
   - Batch add from shopping list receipt
   - Deduction when recipe is cooked
   - Usage statistics

4. **Shopping List Integration**
   - Auto-hide pantry items from shopping list
   - "Already have, need more" vs "Don't have" distinction
   - Quick "mark as have" after shopping

## UI Layout Recommendation

For v2, create as Settings tab item:
```html
<section class="pantry-section">
    <h3>My Pantry</h3>
    <div class="pantry-input-group">
        <input type="text" id="pantry-item-input" placeholder="Add item...">
        <button id="add-pantry-btn">Add</button>
    </div>
    <div id="pantry-inventory" class="pantry-items">
        <!-- Items rendered here -->
    </div>
</section>
```

## Best Practices
1. **Persistence** - Save to localStorage, sync to backend
2. **Categorization** - Organize pantry by type (oils, spices, proteins, etc.)
3. **Quantity Awareness** - Track amounts, warn when low
4. **Context** - Link items to recipes that use them
5. **Flexibility** - Allow custom items, not just presets
6. **Performance** - Lazy load pantry list if 100+ items

## Performance Considerations
- Pre-populate with top 20 common ingredients
- Offer autocomplete for adding new items
- Lazy-load full ingredient database
- Cache pantry items in localStorage

## Related Features
- Shopping List (03-shopping-list.md)
- Tab Navigation (08-tab-navigation.md)
- Data Persistence (09-persistence.md)

## Migration Path
1. **Phase 1**: Simple toggle pantry for basics (current)
2. **Phase 2**: Add custom items with form
3. **Phase 3**: Add quantities and units
4. **Phase 4**: Expiry dates and category organization
5. **Phase 5**: Usage tracking and deduction
