# Feature: Tab Navigation

## Description
Primary navigation between main application views (Meals, Shopping, Recipe) with keyboard shortcut support and active state tracking.

## Current Implementation (Old Version)

### HTML Structure
```html
<div class="tab-nav">
    <button class="tab-btn active" onclick="switchView('meals')">🍽️ Select Meals</button>
    <button class="tab-btn" onclick="switchView('shopping')">🛒 Shopping List</button>
    <button class="tab-btn" onclick="switchView('recipe')">👨‍🍳 Cook</button>
</div>

<!-- Main Views -->
<div id="mealsView" class="view-container active"><!-- Meal selection --></div>
<div id="shoppingView" class="view-container"><!-- Shopping list --></div>
<div id="recipeView" class="view-container"><!-- Recipe view --></div>
```

### JavaScript Implementation
```javascript
function switchView(view) {
    // Hide all views
    const views = document.querySelectorAll('.view-container');
    views.forEach(v => v.classList.remove('active'));
    
    // Deactivate all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    // Show selected view
    document.getElementById(view + 'View').classList.add('active');
    
    // Activate corresponding tab
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(view)) {
            tab.classList.add('active');
        }
    });
    
    // Perform view-specific actions
    if (view === 'shopping') {
        generateShoppingList();
    }
}

function handleKeyPress(e) {
    // Keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                switchView('meals');
                break;
            case '2':
                e.preventDefault();
                switchView('shopping');
                break;
            case '3':
                e.preventDefault();
                switchView('recipe');
                break;
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    document.addEventListener('keydown', handleKeyPress);
}
```

### CSS Classes
```css
.tab-nav {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    border-bottom: 2px solid #eee;
}

.tab-btn {
    padding: 12px 20px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #999;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
}

.tab-btn.active {
    color: #4CAF50;
    border-bottom-color: #4CAF50;
}

.view-container {
    display: none;
}

.view-container.active {
    display: block;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## Features & Functionality
✅ Three main tabs: Meals, Shopping, Recipe
✅ One view active at a time
✅ Click to switch views
✅ Keyboard shortcuts (Ctrl/Cmd + 1/2/3)
✅ Visual active state (color + underline)
✅ Smooth fade-in animation
✅ View-specific initialization (shopping list regenerates)
✅ Emoji icons for visual recognition

## Views
1. **Meals Selection** (🍽️) - Browse and select recipes
2. **Shopping List** (🛒) - View aggregated ingredients
3. **Recipe/Cook** (👨‍🍳) - Step-by-step cooking instructions

## Integration Requirements for v2

### Current v2 Status
- v2 already has tab navigation
- Uses filter bar instead of tabs (search at top)
- Modal-based navigation instead of separate views
- No dedicated "Shopping" or "Cook" tabs

### Work Needed - Context Switch
v2 has fundamentally different navigation architecture:
- v2: Recipe grid + modals (card-based)
- Old: Tab views (view-based)

**Decision**: Keep v2's modern approach, but add missing functionality:
- [ ] Ensure grocery list modal is accessible
- [ ] Implement shopping list modal with aggregation
- [ ] Add "Cook" mode to recipe modal (or separate view)

### Alternative: Hybrid Approach
```html
<!-- Keep v2's header structure -->
<header class="app-header">
    <!-- Existing buttons: Add Recipe, Grocery List, Fridge, Allergens, Settings -->
</header>

<!-- Optional: Add quick-access view buttons -->
<div class="view-switcher">
    <button data-view="grid">Grid View</button>
    <button data-view="list">List View</button>
    <button data-view="plan">Weekly Plan</button>
</div>

<!-- v2's main grid + modals -->
<main class="recipe-grid"></main>
<div class="modal-overlay" id="recipeModal"></div>
<div class="modal-overlay" id="groceryListModal"></div>
```

## TODO for v2 Integration
- [ ] Verify all modals are properly accessible
- [ ] Check header button layout and order
- [ ] Test modal switching workflow
- [ ] Ensure keyboard navigation (Tab key, Escape)
- [ ] Add keyboard shortcuts if missing
- [ ] Test on mobile (modal opening/closing)

## Keyboard Shortcut Enhancements

### Current (Old)
- Ctrl/Cmd + 1: Meals
- Ctrl/Cmd + 2: Shopping
- Ctrl/Cmd + 3: Recipe

### Enhanced (Recommended for v2)
- `G` - Go to Grocery List
- `P` - Go to Meal Plan
- `R` - Go to Recipes Grid
- `S` - Settings
- `F` - Fridge (What's in my fridge)
- `A` - Allergens filter
- `Escape` - Close modal
- `?` - Help/keyboard shortcuts overlay

## v2 Header Navigation vs Old Tab Navigation

### Old Version
```
┌────────────────────────┐
│ 🍳 Meal Planner        │ 0 selected | Portions: [1]
├────────────────────────┤
│ [🍽️ Select] [🛒 Shop] [👨‍🍳 Cook] │
├────────────────────────┤
│ Active View Content    │
│ (Grid, List, or Steps) │
└────────────────────────┘
```

### v2 Version
```
┌─────────────────────────────┐
│ Meal Planner [+][🛒][❓][⚙️]   │
│ 0 meals planned             │
├─────────────────────────────┤
│ Filters & Sort              │
├─────────────────────────────┤
│ Recipe Grid (Cards)         │
│ + Modal overlays on click    │
└─────────────────────────────┘
```

## Comparison

| Feature | Old | v2 | Recommendation |
|---------|-----|----|----|
| Tab Navigation | ✅ | ❌ (Modal-based) | Keep v2 modals |
| Keyboard Shortcuts | ✅ (Ctrl+1/2/3) | ? | Add if missing |
| Multiple Views | ✅ | ❌ (Grid primary) | Modal system |
| View Animations | ✅ (fadeIn) | ✓ (Modal fade) | v2 |
| Active State | ✅ (Visual) | ✓ (Modal open) | v2 |
| One View Active | ✅ | ✓ | v2 |

## Enhanced Navigation Features

### 1. Breadcrumb Navigation
```
Home > Recipes > Soy Chicken > Cook Mode
```

### 2. Recent Views
```
Recently Viewed:
- Thai Green Curry
- Spaghetti Carbonara
- Five-Bean Chilli
```

### 3. Navigation Menu
```
┌─────────────────┐
│ ≡ Menu          │
├─────────────────┤
│ 🏠 Home         │
│ 📋 Meal Plan    │
│ 🍲 Recipes      │
│ 🛒 Grocery List │
│ ❓ What's New?  │
│ ⚙️ Settings     │
└─────────────────┘
```

### 4. Floating Action Button (FAB)
- Primary action: Add to meal plan
- Secondary: Share, Favorite, etc.

## Mobile Navigation Considerations
- Use hamburger menu on small screens
- Bottom tab bar (iOS style) or top nav (Android style)
- Touchable targets: 44px minimum
- Minimize scrolling between tabs
- Preserve scroll position when switching views

## Performance Notes
- Views hidden with `display: none` (not removed)
- Re-initialization only when switching to view
- Cache rendered views if possible
- Lazy-load heavy views (Shopping list with 100+ items)

## Accessibility Considerations
- Use semantic `<nav>` element
- ARIA roles: `tablist`, `tab`, `tabpanel`
- Keyboard navigation: Tab key, Arrow keys
- Active tab indicated with `aria-current="page"`
- Focus management when switching tabs

```html
<nav class="tab-nav" role="tablist">
    <button class="tab-btn" role="tab" aria-selected="true" aria-controls="mealsView">
        🍽️ Meals
    </button>
    <!-- ... -->
</nav>

<div id="mealsView" role="tabpanel" aria-labelledby="meals-tab">
    <!-- Content -->
</div>
```

## Related Features
- Meal Selection (01-meal-selection.md)
- Shopping List (03-shopping-list.md)
- Recipe View (05-recipe-view-cooking.md)

## Migration Strategy

### Phase 1: Keep v2 Modal System
- Use modals for detailed views
- Keep recipe grid as primary interface
- Add grocery list modal if missing

### Phase 2: Add Missing Navigation
- Implement weekly meal planner view
- Add settings/preferences modal
- Create fridge inventory modal

### Phase 3: Enhance Navigation
- Add keyboard shortcuts
- Implement breadcrumbs
- Add view history/recent

### Phase 4: Mobile Optimization
- Responsive navigation (hamburger on mobile)
- Bottom tab bar option
- Swipe gesture support
