// Main application logic

let selectedMeals = [];
let currentFilter = 'all';
let timerInterval = null;
let timerSeconds = 0;
let currentStep = 0;

// Initialize the application
function init() {
    initializeMeals();
    setupEventListeners();
}

function setupEventListeners() {
    // Add any global event listeners here
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    // Add keyboard shortcuts
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
    
    // Save to localStorage for persistence
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
}

function updateMealCount() {
    document.getElementById('mealCount').textContent = selectedMeals.length;
}

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

function switchView(view) {
    const views = document.querySelectorAll('.view-container');
    views.forEach(v => v.classList.remove('active'));
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    document.getElementById(view + 'View').classList.add('active');
    
    // Find and activate the corresponding tab
    tabs.forEach(tab => {
        if (tab.textContent.toLowerCase().includes(view)) {
            tab.classList.add('active');
        }
    });
    
    if (view === 'shopping') {
        generateShoppingList();
    }
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
    
    if (!recipe) {
        document.getElementById('recipeName').textContent = meal.name;
        document.getElementById('recipeMeta').innerHTML = `⏱️ ${meal.time} mins | 🔥 ${meal.calories} cal`;
        document.getElementById('recipeSteps').innerHTML = `
            <div class="step-card">
                <div class="step-number">!</div>
                <div class="step-content">
                    <div>Recipe coming soon! This is where detailed cooking instructions would appear.</div>
                </div>
            </div>
        `;
        document.getElementById('ingredientsPanel').style.display = 'none';
        return;
    }
    
    // Display recipe name and metadata
    document.getElementById('recipeName').textContent = recipe.name;
    document.getElementById('recipeMeta').innerHTML = `
        ⏱️ Prep: ${recipe.prepTime || '10 mins'} | 
        🔥 Cook: ${recipe.cookTime || meal.time + ' mins'} | 
        👥 Serves: ${recipe.servings || 4}
        ${portions !== (recipe.servings || 4) ? ` | <strong>Adjusted for ${portions} portions</strong>` : ''}
    `;
    
    // Display ingredients
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
                                // Adjust quantities if portions differ from recipe servings
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
    
    // Show timer controls for recipes with steps
    document.getElementById('timerControls').style.display = 'flex';
    
    // Show source attribution if available
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

// Timer functions
function startTimer() {
    const btn = event.target;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.textContent = 'Start Timer';
    } else {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
        btn.textContent = 'Pause Timer';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerSeconds = 0;
    updateTimerDisplay();
    const startBtn = document.querySelector('.timer-controls .btn-primary');
    if (startBtn) {
        startBtn.textContent = 'Start Timer';
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Load saved data on startup
function loadSavedData() {
    const saved = localStorage.getItem('selectedMeals');
    if (saved) {
        try {
            selectedMeals = JSON.parse(saved);
            selectedMeals.forEach(mealId => {
                const card = document.querySelector(`[data-id="${mealId}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            updateMealCount();
            updateRecipeSelector();
        } catch (e) {
            console.error('Failed to load saved meals:', e);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    init();
    loadSavedData();
});
