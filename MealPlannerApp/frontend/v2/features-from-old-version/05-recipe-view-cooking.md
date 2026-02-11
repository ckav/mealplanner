# Feature: Recipe View & Cooking Interface

## Description
Dedicated view for displaying selected recipe details including ingredients, step-by-step cooking instructions with timing, and interactive cooking controls.

## Current Implementation (Old Version)

### HTML Structure
```html
<div id="recipeView" class="view-container">
    <div class="recipe-view">
        <div class="recipe-header">
            <div class="recipe-title">
                <h2 id="recipeName">Select a meal to start cooking</h2>
                <div class="recipe-meta" id="recipeMeta"></div>
            </div>
            <select id="recipeSelector" class="recipe-selector" onchange="loadRecipe(this.value)">
                <option value="">Choose a meal to cook...</option>
            </select>
        </div>
        
        <div class="recipe-content">
            <div class="ingredients-panel" id="ingredientsPanel" style="display: none;">
                <h3>Ingredients</h3>
                <div id="ingredientsList"></div>
            </div>
            
            <div class="steps-panel">
                <div class="recipe-steps" id="recipeSteps">
                    <!-- Recipe steps loaded here -->
                </div>
                
                <div class="timer-controls" id="timerControls" style="display: none;">
                    <button class="btn btn-primary" onclick="startTimer()">Start Timer</button>
                    <button class="btn btn-secondary" onclick="resetTimer()">Reset</button>
                    <div class="timer-display" id="timerDisplay">00:00</div>
                </div>
            </div>
        </div>

        <div class="recipe-source" id="recipeSource" style="display: none;">
            <!-- Source attribution -->
        </div>
    </div>
</div>
```

### JavaScript Implementation

#### Main Recipe Loading
```javascript
function loadRecipe(mealId) {
    if (!mealId) {
        document.getElementById('recipeName').textContent = 'Select a meal to start cooking';
        document.getElementById('recipeMeta').innerHTML = '';
        document.getElementById('recipeSteps').innerHTML = '';
        document.getElementById('ingredientsPanel').style.display = 'none';
        document.getElementById('timerControls').style.display = 'none';
        document.getElementById('recipeSource').style.display = 'none';
        return;
    }
    
    const meal = meals.find(m => m.id == mealId);
    const recipe = recipes[mealId];
    const mealIngredients = ingredients[mealId];
    const portions = parseInt(document.getElementById('portionsInput').value);
    
    // Display recipe name and metadata
    document.getElementById('recipeName').textContent = recipe.name;
    document.getElementById('recipeMeta').innerHTML = `
        ⏱️ Prep: ${recipe.prepTime || '10 mins'} | 
        🔥 Cook: ${recipe.cookTime || meal.time + ' mins'} | 
        👥 Serves: ${recipe.servings || 4}
        ${portions !== (recipe.servings || 4) ? ` | <strong>Adjusted for ${portions} portions</strong>` : ''}
    `;
    
    // Display ingredients section
    if (mealIngredients) {
        document.getElementById('ingredientsPanel').style.display = 'block';
        let ingredientsHtml = '';
        
        Object.keys(mealIngredients).forEach(category => {
            if (mealIngredients[category] && mealIngredients[category].length > 0) {
                ingredientsHtml += `
                    <div class="ingredient-group">
                        <h4>${formatCategoryName(category)}</h4>
                        <ul class="ingredient-list">
                            ${mealIngredients[category].map(item => {
                                let adjustedItem = item;
                                if (portions !== (recipe.servings || 4)) {
                                    adjustedItem = `${item} <em>(for ${portions} portions)</em>`;
                                }
                                return `<li>${adjustedItem}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        
        document.getElementById('ingredientsList').innerHTML = ingredientsHtml;
    } else {
        document.getElementById('ingredientsPanel').style.display = 'none';
    }
    
    // Display recipe steps
    currentStep = 0;
    document.getElementById('recipeSteps').innerHTML = recipe.steps.map((step, index) => `
        <div class="step-card ${index === 0 ? 'active' : ''}" onclick="setActiveStep(${index})">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <div>${step.step}</div>
                <div class="step-time">⏱️ ${step.time}</div>
            </div>
        </div>
    `).join('');
    
    // Show timer controls
    document.getElementById('timerControls').style.display = 'flex';
    
    // Show source attribution
    if (recipe.source) {
        document.getElementById('recipeSource').style.display = 'block';
        document.getElementById('recipeSource').innerHTML = `
            <strong>Recipe source:</strong> ${recipe.source}
            ${recipe.sourceUrl ? `<br><a href="${recipe.sourceUrl}" target="_blank">View original recipe →</a>` : ''}
            ${recipe.imageNote ? `<br><em>${recipe.imageNote}</em>` : ''}
        `;
    } else {
        document.getElementById('recipeSource').style.display = 'none';
    }
}

function setActiveStep(stepIndex) {
    currentStep = stepIndex;
    const steps = document.querySelectorAll('.step-card');
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            step.classList.add('active');
            step.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            step.classList.remove('active');
        }
    });
}

function updateRecipeSelector() {
    const selector = document.getElementById('recipeSelector');
    selector.innerHTML = '<option value="">Choose a meal to cook...</option>';
    
    selectedMeals.forEach(mealId => {
        const meal = meals.find(m => m.id === mealId);
        if (meal) {
            selector.innerHTML += `<option value="${mealId}">${meal.name}</option>`;
        }
    });
}
```

## Data Structure

### Recipe Format
```javascript
const recipes = {
    1: {
        name: "Soy & Chilli Chicken Wings",
        servings: 4,
        prepTime: "10 mins",
        cookTime: "25 mins",
        source: "Inspired by BBC Good Food",
        sourceUrl: "https://www.bbc.co.uk/food/recipes/",
        steps: [
            { 
                step: "Preheat your oven to 200°C...", 
                time: "2 mins" 
            },
            { 
                step: "In a large bowl, mix together...", 
                time: "3 mins" 
            },
            // ... more steps
        ]
    },
    // ... more recipes
};

const ingredients = {
    1: {
        proteins: ["400g chicken breast"],
        marinadeAndSauce: ["3 tbsp soy sauce", "2 tbsp honey"],
        spices: ["1 tsp ground ginger"],
        garnish: ["2 spring onions, sliced"]
    }
};
```

## Features & Functionality
✅ Dropdown selector for chosen meals
✅ Display recipe name with metadata
✅ Show ingredients organized by category
✅ Display step-by-step cooking instructions
✅ Click steps to highlight active step
✅ Auto-scroll to active step
✅ Timing info for each step
✅ Source attribution with external links
✅ Portions adjustment display
✅ Timer controls integration

## CSS Classes (Key)
```css
.step-card {
    cursor: pointer;
    padding: 12px;
    border-left: 4px solid #ddd;
    transition: all 0.3s ease;
}

.step-card.active {
    border-left-color: #4CAF50;
    background-color: #f0f8f0;
}

.step-number {
    font-weight: bold;
    font-size: 20px;
    color: #4CAF50;
}

.ingredient-group {
    margin-bottom: 16px;
}

.recipe-meta {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
}
```

## Integration Requirements for v2

### Current v2 Status
- v2 has recipe modal system
- Modal footer has "Edit" button
- Recipe detail modal exists but focused on cards

### Work Needed
- [ ] Check v2 recipe modal content (modalBody)
- [ ] Verify ingredients are displayed
- [ ] Check if steps are shown
- [ ] Implement step-by-step view
- [ ] Add step highlighting/navigation
- [ ] Ensure source attribution is shown

### Data Model Mapping
```javascript
// Old: recipes[id] with steps array
// New: recipes[id] with instructions (likely string or HTML)
// Need to parse/structure instructions into steps
// Format: numbered list, or line breaks, or array

// Ingredient mapping:
// Old: ingredients[mealId][category][]
// New: recipes[id].ingredients[] (might be flat or structured)
```

## TODO for v2 Integration
- [ ] Update recipe modal to show full instructions
- [ ] Parse instructions into step-by-step view
- [ ] Add step navigation (clickable steps)
- [ ] Display ingredient list with categories
- [ ] Show source attribution
- [ ] Add portions adjustment notice
- [ ] Integrate timer controls
- [ ] Test with recipe modal opening

## Enhanced Features to Add
1. **Step Timers** - Auto-start timers for each step
2. **Voice Instructions** - Read steps aloud
3. **Checkable Steps** - Mark steps as completed
4. **Equipment List** - Show what's needed upfront
5. **Substitutions** - Show ingredient alternatives
6. **Difficulty Level** - Beginner/Intermediate/Advanced
7. **Video Link** - Link to video tutorials
8. **Scaling Info** - Clearly show portion scaling
9. **Dietary Tags** - Vegan, Gluten-free, etc.
10. **Reviews/Ratings** - User feedback on recipe

## UI Recommendations for v2

### Current Modal Should Include:
```
┌─────────────────────────────────────┐
│ Recipe Name (with portions)         │
├─────────────────────────────────────┤
│ [←] Back   [❤] Favorite [↗] Share   │
├─────────────────────────────────────┤
│ ⏱️ Prep: 10m | 🔥 Cook: 20m | 👥 4  │
├─────────────────────────────────────┤
│ INGREDIENTS          │ INSTRUCTIONS  │
│ ✓ item 1            │ 1. Step one   │
│ □ item 2            │ 2. Step two   │
│ □ item 3            │ 3. Step three │
├─────────────────────────────────────┤
│ [Edit] [+ Add to Plan]              │
└─────────────────────────────────────┘
```

## Best Practices
1. **Clear Hierarchy** - Ingredients then instructions
2. **Timing Info** - Help users plan
3. **Step Navigation** - Easy to follow progress
4. **Visual Feedback** - Know which step you're on
5. **Source Attribution** - Credit recipe creators
6. **Portion Visibility** - Show adjustments clearly
7. **Mobile Friendly** - One-column on mobile for easy reading

## Performance Considerations
- Lazy load full recipe details in modal
- Cache parsed recipes locally
- Pre-render most common recipes
- Optimize step rendering for long recipes (100+ steps)

## Related Features
- Timer Controls (06-timer-controls.md)
- Portions Management (07-portions-management.md)
- Tab Navigation (08-tab-navigation.md)
