# Feature: Meal Selection View

## Description
Grid-based meal card selection interface where users can browse and select meals to prepare.

## Current Implementation (Old Version)

### HTML Structure
```html
<div id="mealsView" class="view-container active">
    <div class="filters">
        <button class="filter-btn active" onclick="filterMeals('all')">All</button>
        <!-- filter buttons -->
    </div>
    <div class="meal-grid" id="mealGrid">
        <!-- Meals rendered here -->
    </div>
</div>
```

### JavaScript Implementation
```javascript
function initializeMeals() {
    const grid = document.getElementById('mealGrid');
    grid.innerHTML = meals.map(meal => `
        <div class="meal-card" onclick="toggleMeal(${meal.id})" data-id="${meal.id}" data-types="${meal.type.join(' ')}">
            <div class="meal-image">${meal.icon || '🍽️'}</div>
            <div class="meal-info">
                <div class="meal-name">${meal.name}</div>
                <div class="meal-meta">
                    <span>⏱️ ${meal.time} mins</span>
                    <span>🔥 ${meal.calories} cal</span>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleMeal(mealId) {
    const card = document.querySelector(`[data-id="${mealId}"]`);
    const index = selectedMeals.indexOf(mealId);
    
    if (index > -1) {
        selectedMeals.splice(index, 1);
        card.classList.remove('selected');
    } else {
        selectedMeals.push(mealId);
        card.classList.add('selected');
    }
    
    updateMealCount();
    updateRecipeSelector();
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
}
```

### CSS Classes
```css
.meal-card {
    cursor: pointer;
    border-radius: 8px;
    padding: 12px;
    transition: all 0.3s ease;
}

.meal-card.selected {
    border: 2px solid #4CAF50;
    background-color: #f0f8f0;
    transform: scale(1.05);
}

.meal-image {
    font-size: 48px;
    margin-bottom: 8px;
}

.meal-meta span {
    font-size: 12px;
    color: #666;
}
```

## Data Structure
```javascript
meals: [
    {
        id: 1,
        name: "Soy & Chilli Chicken Wings",
        icon: "🍗",
        time: 25,          // cooking time in minutes
        calories: 450,
        type: ["quick", "asian"]
    },
    // ...
]
```

## Features & Functionality
✅ Display meals in responsive grid
✅ Show emoji icon, name, cooking time, calories
✅ Toggle meal selection with visual feedback
✅ Track selected meals count
✅ Persist selection to localStorage
✅ Update recipe selector with selected meals

## Integration Requirements for v2

### New Approach Needed:
- Replace with v2's modern card design (use `createRecipeCard` function)
- Keep selection functionality but enhance styling
- Maintain toggle/select state management
- Link to v2's modal system instead of inline recipe selector
- Integrate with v2's filter pill system (already exists)

### Data Model Mapping:
```javascript
// Old: meals[] with icon
// New: recipes[] with full data structure
// Need adapter: icon → image asset path
```

## Best Practices
1. Use data attributes for filtering (already done)
2. Update visual feedback on selection
3. Persist state immediately with localStorage
4. Keyboard navigation support (could enhance)
5. Responsive grid layout (CSS Grid or Flexbox)

## TODO for v2 Integration
- [ ] Update card design to match v2 aesthetics
- [ ] Connect selection to modal system
- [ ] Maintain localStorage persistence
- [ ] Add keyboard navigation (arrow keys, enter)
- [ ] Ensure responsive design on mobile
- [ ] Show selection count in header (already exists)

## Related Features
- Filtering & Sorting (01-filtering-sorting.md)
- Tab Navigation (08-tab-navigation.md)
- Data Persistence (09-persistence.md)

## Performance Considerations
- Grid rendering: ~100 cards without issues
- Use lazyload for images if >50 cards
- Event delegation possible for meal selection
