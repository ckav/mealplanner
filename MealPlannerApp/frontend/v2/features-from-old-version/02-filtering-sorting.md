# Feature: Filtering & Sorting

## Description
Allow users to filter meals by type/cuisine and sort by various criteria to find recipes they want to prepare.

## Current Implementation (Old Version)

### HTML Structure
```html
<div class="filters">
    <button class="filter-btn active" onclick="filterMeals('all')">All</button>
    <button class="filter-btn" onclick="filterMeals('quick')">⚡ Under 20 mins</button>
    <button class="filter-btn" onclick="filterMeals('vegetarian')">🥗 Vegetarian</button>
    <button class="filter-btn" onclick="filterMeals('fish')">🐟 Fish</button>
    <button class="filter-btn" onclick="filterMeals('asian')">🥢 Asian</button>
    <button class="filter-btn" onclick="filterMeals('italian')">🍝 Italian</button>
    <button class="filter-btn" onclick="filterMeals('healthy')">💪 Low Cal</button>
</div>
```

### JavaScript Implementation
```javascript
let currentFilter = 'all';

function filterMeals(filter) {
    currentFilter = filter;
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const cards = document.querySelectorAll('.meal-card');
    cards.forEach(card => {
        if (filter === 'all' || card.dataset.types.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
```

### CSS Classes
```css
.filter-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background: #f0f0f0;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.filter-btn.active {
    background-color: #4CAF50;
    color: white;
}

.filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}
```

## Data Structure
```javascript
// Meal cards have data-types attribute:
<div class="meal-card" data-types="quick asian vegetarian">

// Filter values:
- 'all'        // Show all meals
- 'quick'      // Cook time < 20 mins
- 'vegetarian' // No meat
- 'fish'       // Contains fish
- 'asian'      // Asian cuisine
- 'italian'    // Italian cuisine
- 'healthy'    // Low calorie (<350 cal)
```

## Features & Functionality
✅ Button-based filtering interface
✅ Single active filter at a time
✅ Visual feedback (active state)
✅ Client-side filtering (instant)
✅ Multiple tags per meal supported
✅ Emoji icons for visual recognition

## v2 Current State
- v2 already has filtering! See `filter-bar` in v2/index.html
- Uses filter pills: All, Under 20m, Vegetarian, Asian, Italian, Healthy, Fish
- Has additional sort options: Recently Added, Family Favourites, etc.
- v2 implementation is BETTER - use it as base

## Integration Strategy

### Best Practice: Use v2's Approach
v2 already has a modern filter system. The old version's approach is simpler but less featured.

### v2 Filter Bar Structure (EXISTING):
```html
<div class="filter-bar">
    <div class="filter-section">
        <div class="filter-pills" id="filterPills">
            <button class="filter-pill active" data-filter="all">All</button>
            <button class="filter-pill" data-filter="quick">Under 20m</button>
            <!-- more pills -->
        </div>
    </div>
    <div class="sort-section">
        <label class="filter-label">Sort:</label>
        <select class="filter-select" id="sortSelect">
            <option value="recent">Recently Added</option>
            <!-- more options -->
        </select>
    </div>
</div>
```

### v2 JavaScript (EXISTING):
```javascript
// In v2/app.js, likely around line 100+
// Search for filter handling and event listeners
// Pattern: querySelector('#filterPills').addEventListener('click', ...)
```

## TODO for v2 Enhancement
- [ ] Verify filter pill click handlers are functional
- [ ] Test sort select functionality
- [ ] Add "Cooking for" selector integration (already in HTML)
- [ ] Ensure filters apply to recipe grid rendering
- [ ] Add visual feedback for active filters
- [ ] Test mobile responsiveness of filter bar
- [ ] Consider adding "Quick Filters" for allergen removal

## Comparison Table

| Feature | Old | v2 | Recommended |
|---------|-----|----|----|
| Filter Buttons | ✅ | ✅ (Pills) | v2 Pills |
| Sort Options | ❌ | ✅ | v2 |
| Cooking For | ❌ | ✅ | v2 |
| Allergen Filter | ❌ | ✅ | v2 |
| Quick Filters | ✅ (7) | ✅ (7) | v2 |
| Single Active | ✅ | ? | Check v2 |

## Enhancements to Consider
1. **Multi-select filters** - Allow AND operation (quick + vegetarian)
2. **Filter persistence** - Remember last filter on reload
3. **Saved filter sets** - "My Weeknight Meals" preset
4. **Allergen quick filters** - Based on family profiles
5. **Difficulty level filter** - Easy, Medium, Hard

## Performance Notes
- Client-side filtering: O(n) for display: none
- Better approach: Filter array in JS, render once
- With 100+ recipes: Consider debouncing sort operations

## Related Features
- Meal Selection (01-meal-selection.md)
- Tab Navigation (08-tab-navigation.md)
- Family Profiles Integration (future)
