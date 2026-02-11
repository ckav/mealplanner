// ===========================================
// MEAL PLANNER APP - Main Application Logic
// ===========================================

// State
let state = {
    recipes: recipes || [],
    mealPlan: [],
    activeFilter: 'all',
    sortBy: 'recent',
    cookingFor: 'everyone',
    portions: 4,
    selectedRecipe: null
};

let fridgePhotoFile = null;

// DOM Elements
const recipeGrid = document.getElementById('recipeGrid');
const recipeModal = document.getElementById('recipeModal');
const addToPlanModal = document.getElementById('addToPlanModal');
const groceryListModal = document.getElementById('groceryListModal');
const fridgeModal = document.getElementById('fridgeModal');
const planCount = document.getElementById('planCount');

// ===========================================
// RECIPE CARD RENDERING
// ===========================================

function createRecipeCard(recipe) {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.id = recipe.id;

    const isInPlan = state.mealPlan.some(item => item.id === recipe.id);

    card.innerHTML = `
        <div class="card-image-container">
            <img src="${recipe.image}" alt="${recipe.name}" class="card-image" loading="lazy">
            <button class="card-favourite ${recipe.favourite ? 'active' : ''}"
                    data-action="favourite"
                    title="${recipe.favourite ? 'Remove from favourites' : 'Add to favourites'}">
                <svg viewBox="0 0 24 24" fill="${recipe.favourite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            ${recipe.timesCooked > 0 ? `
                <div class="card-cooked-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                    Made ${recipe.timesCooked}×
                </div>
            ` : ''}
        </div>

        <div class="card-body">
            <h3 class="card-title">${recipe.name}</h3>

            <div class="card-info">
                <span class="card-info-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${recipe.cookTime}m
                </span>
                <span class="card-info-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                    </svg>
                    ${recipe.calories} cal
                </span>
                <span class="card-info-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    ${recipe.servings}
                </span>
                <span class="card-info-item">
                    ${recipe.difficulty}
                </span>
            </div>

            <div class="card-tags">
                ${recipe.tags.map(tag => `<span class="card-tag" data-tag="${tag.toLowerCase()}">${tag}</span>`).join('')}
            </div>

            <div class="card-source">
                ${recipe.source.url ? `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                ` : ''}
                ${recipe.source.name}
            </div>

            <div class="card-actions">
                <button class="btn btn-secondary" data-action="view">
                    View Recipe
                </button>
                <button class="btn btn-primary" data-action="add">
                    ${isInPlan ? '✓ Added' : '+ Add'}
                </button>
            </div>
        </div>
    `;

    return card;
}

function renderRecipeGrid() {
    const filteredRecipes = filterAndSortRecipes();
    recipeGrid.innerHTML = '';

    if (filteredRecipes.length === 0) {
        recipeGrid.innerHTML = `
            <div class="empty-state text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <p style="color: var(--color-gray-500);">No recipes match your filters.</p>
            </div>
        `;
        return;
    }

    filteredRecipes.forEach(recipe => {
        recipeGrid.appendChild(createRecipeCard(recipe));
    });
}

// ===========================================
// FILTERING & SORTING
// ===========================================

function filterAndSortRecipes() {
    let filtered = [...state.recipes];

    // Apply filter
    if (state.activeFilter !== 'all') {
        filtered = filtered.filter(recipe => {
            switch (state.activeFilter) {
                case 'quick':
                    return recipe.cookTime <= 20;
                case 'vegetarian':
                    return recipe.cuisine === 'vegetarian' || recipe.tags.some(t => t.toLowerCase() === 'vegetarian');
                case 'fish':
                    return recipe.cuisine === 'fish' || recipe.tags.some(t => t.toLowerCase() === 'fish');
                case 'asian':
                    return recipe.cuisine === 'asian' || recipe.tags.some(t => t.toLowerCase() === 'asian');
                case 'italian':
                    return recipe.cuisine === 'italian' || recipe.tags.some(t => t.toLowerCase() === 'italian');
                case 'healthy':
                    return recipe.calories < 400 || recipe.tags.some(t => t.toLowerCase() === 'healthy');
                default:
                    return true;
            }
        });
    }

    // Apply sort
    switch (state.sortBy) {
        case 'recent':
            filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'favourites':
            filtered.sort((a, b) => (b.favourite ? 1 : 0) - (a.favourite ? 1 : 0) || b.timesCooked - a.timesCooked);
            break;
        case 'never-tried':
            filtered.sort((a, b) => a.timesCooked - b.timesCooked);
            break;
        case 'recently-cooked':
            filtered.sort((a, b) => {
                if (!a.lastCooked) return 1;
                if (!b.lastCooked) return -1;
                return new Date(b.lastCooked) - new Date(a.lastCooked);
            });
            break;
        case 'quick':
            filtered.sort((a, b) => a.cookTime - b.cookTime);
            break;
        case 'random':
            filtered.sort(() => Math.random() - 0.5);
            break;
    }

    return filtered;
}

// ===========================================
// RECIPE DETAIL VIEW
// ===========================================

function renderRecipeDetail(recipe) {
    const modalBody = document.getElementById('modalBody');
    const portions = state.portions;
    const scaleFactor = portions / recipe.servings;

    function scaleAmount(ingredient) {
        if (!ingredient.scalable || ingredient.scalable === false) {
            return `${ingredient.amount} ${ingredient.unit}`;
        }

        let scaled = ingredient.amount;
        if (ingredient.scalable === true) {
            scaled = Math.round(ingredient.amount * scaleFactor * 10) / 10;
        } else if (ingredient.scalable === 'partial') {
            // Partial scaling - less aggressive
            scaled = Math.round(ingredient.amount * (1 + (scaleFactor - 1) * 0.5) * 10) / 10;
        }

        const original = ingredient.amount !== scaled ?
            `<span class="ingredient-scaled">(from ${ingredient.amount}${ingredient.unit})</span>` : '';

        return `<span class="ingredient-amount">${scaled}${ingredient.unit}</span> ${original}`;
    }

    const ingredientGroups = Object.entries(recipe.ingredients).map(([group, items]) => `
        <div class="ingredient-group">
            <h4 class="ingredient-group-title">${group}</h4>
            <ul class="ingredient-list">
                ${items.map(ing => `
                    <li class="ingredient-item">
                        <input type="checkbox" class="ingredient-checkbox">
                        <span class="ingredient-text">
                            ${scaleAmount(ing)} ${ing.name}${ing.prep ? `, ${ing.prep}` : ''}
                        </span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div class="detail-hero">
            <img src="${recipe.image}" alt="${recipe.name}">
        </div>

        <h1 class="detail-title">${recipe.name}</h1>

        <div class="detail-info">
            <span class="detail-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${recipe.cookTime} mins
            </span>
            <span class="detail-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                </svg>
                ${recipe.calories} cal
            </span>
            <span class="detail-info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                </svg>
                Serves ${recipe.servings}
            </span>
            <span class="detail-info-item">
                ${recipe.difficulty}
            </span>
        </div>

        <div class="detail-tags">
            ${recipe.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
        </div>

        <div class="detail-source">
            Source: ${recipe.source.url ?
                `<a href="${recipe.source.url}" target="_blank" rel="noopener">${recipe.source.name}</a>` :
                recipe.source.name
            }
        </div>

        <section class="detail-section">
            <div class="detail-section-header">
                <h2 class="detail-section-title">Ingredients</h2>
                <div class="portion-control">
                    <span class="portion-control-label">Portions:</span>
                    <button class="btn-icon" id="detailPortionMinus">−</button>
                    <span class="portion-control-value" id="detailPortionValue">${portions}</span>
                    <button class="btn-icon" id="detailPortionPlus">+</button>
                </div>
            </div>
            ${ingredientGroups}
        </section>

        <section class="detail-section">
            <h2 class="detail-section-title">Method</h2>
            <ol class="method-list">
                ${recipe.steps.map((step, index) => `
                    <li class="method-step">
                        <span class="step-number">${index + 1}</span>
                        <div class="step-content">
                            <p class="step-instruction">${step.instruction}</p>
                            ${step.time ? `
                                <span class="step-time">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    ${step.time} min
                                </span>
                            ` : ''}
                        </div>
                    </li>
                `).join('')}
            </ol>
        </section>

        ${recipe.tips.length > 0 || recipe.personalNote ? `
            <section class="detail-section">
                <h2 class="detail-section-title">Tips & Notes</h2>
                <ul class="tips-list">
                    ${recipe.tips.map(tip => `
                        <li class="tip-item">
                            <span class="tip-icon">💡</span>
                            <span>${tip}</span>
                        </li>
                    `).join('')}
                </ul>
                ${recipe.personalNote ? `
                    <div class="personal-note">
                        <div class="personal-note-label">Your Note</div>
                        <p class="personal-note-text">"${recipe.personalNote}"</p>
                    </div>
                ` : ''}
            </section>
        ` : ''}
    `;

    // Add portion control listeners
    document.getElementById('detailPortionMinus')?.addEventListener('click', () => {
        if (state.portions > 1) {
            state.portions--;
            renderRecipeDetail(recipe);
        }
    });

    document.getElementById('detailPortionPlus')?.addEventListener('click', () => {
        if (state.portions < 12) {
            state.portions++;
            renderRecipeDetail(recipe);
        }
    });
}

function openRecipeModal(recipe) {
    state.selectedRecipe = recipe;
    state.portions = getPortionsForGroup(state.cookingFor);

    renderRecipeDetail(recipe);
    recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Update favourite button state
    const favBtn = document.getElementById('modalFavourite');
    if (recipe.favourite) {
        favBtn.querySelector('svg').setAttribute('fill', 'currentColor');
        favBtn.style.color = 'var(--color-favourite)';
    } else {
        favBtn.querySelector('svg').setAttribute('fill', 'none');
        favBtn.style.color = '';
    }
}

function closeRecipeModal() {
    recipeModal.classList.remove('active');
    document.body.style.overflow = '';
    state.selectedRecipe = null;
}

// ===========================================
// ADD TO PLAN MODAL
// ===========================================

function openAddToPlanModal(recipe) {
    state.selectedRecipe = recipe;
    state.portions = getPortionsForGroup(state.cookingFor);

    document.getElementById('addToPlanTitle').textContent = recipe.name;
    document.getElementById('portionInput').value = state.portions;

    // Update radio selection
    document.querySelector(`input[name="whosEating"][value="${state.cookingFor}"]`).checked = true;

    addToPlanModal.classList.add('active');
}

function closeAddToPlanModal() {
    addToPlanModal.classList.remove('active');
}

function getPortionsForGroup(group) {
    switch (group) {
        case 'me': return 1;
        case 'couple': return 2;
        case 'everyone': return 4;
        default: return 4;
    }
}

function addToMealPlan(recipe, portions) {
    const existing = state.mealPlan.find(item => item.id === recipe.id);

    if (existing) {
        existing.portions = portions;
    } else {
        state.mealPlan.push({
            id: recipe.id,
            name: recipe.name,
            portions: portions,
            addedAt: new Date().toISOString()
        });
    }

    updatePlanCount();
    renderRecipeGrid();
    closeAddToPlanModal();
    closeRecipeModal();
}

function updatePlanCount() {
    planCount.textContent = state.mealPlan.length;
}

// ===========================================
// EVENT HANDLERS
// ===========================================

function handleCardClick(e) {
    const card = e.target.closest('.recipe-card');
    if (!card) return;

    const recipeId = card.dataset.id;
    const recipe = state.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const action = e.target.closest('[data-action]')?.dataset.action;

    switch (action) {
        case 'favourite':
            e.stopPropagation();
            toggleFavourite(recipe);
            break;
        case 'view':
            openRecipeModal(recipe);
            break;
        case 'add':
            e.stopPropagation();
            openAddToPlanModal(recipe);
            break;
        default:
            // Clicking card opens detail view
            if (!e.target.closest('.card-actions') && !e.target.closest('.card-favourite')) {
                openRecipeModal(recipe);
            }
    }
}

function handleTagClick(e) {
    const tag = e.target.closest('.card-tag');
    if (!tag) return;

    e.stopPropagation();
    const tagValue = tag.dataset.tag;

    // Find matching filter
    const filterBtn = document.querySelector(`.filter-pill[data-filter="${tagValue}"]`);
    if (filterBtn) {
        setActiveFilter(tagValue);
    }
}

function toggleFavourite(recipe) {
    recipe.favourite = !recipe.favourite;
    renderRecipeGrid();
}

function setActiveFilter(filter) {
    state.activeFilter = filter;

    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    renderRecipeGrid();
}

// ===========================================
// GROCERY LIST
// ===========================================

function generateGroceryList() {
    const groceryMap = new Map();

    state.mealPlan.forEach(planItem => {
        const recipe = state.recipes.find(r => r.id === planItem.id);
        if (!recipe || !recipe.ingredients) return;

        const scale = planItem.portions / recipe.servings;

        // Process all ingredient categories
        Object.entries(recipe.ingredients).forEach(([category, ingredients]) => {
            ingredients.forEach(ing => {
                const key = ing.name.toLowerCase();
                const scaledAmount = ing.scalable ? ing.amount * scale : ing.amount;

                if (groceryMap.has(key)) {
                    const existing = groceryMap.get(key);
                    existing.amount += scaledAmount;
                    existing.recipes.add(recipe.name);
                } else {
                    groceryMap.set(key, {
                        name: ing.name,
                        amount: scaledAmount,
                        unit: ing.unit,
                        category: category,
                        recipes: new Set([recipe.name])
                    });
                }
            });
        });
    });

    return groceryMap;
}

function renderGroceryList() {
    const groceryListBody = document.getElementById('groceryListBody');
    const groceryMap = generateGroceryList();

    if (state.mealPlan.length === 0) {
        groceryListBody.innerHTML = `
            <div class="empty-state">
                <svg width="48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"var(--color-gray-400)\" stroke-width=\"2\">
                    <path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path>
                    <line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line>
                    <path d=\"M16 10a4 4 0 0 1-8 0\"></path>
                </svg>
                <p>No meals planned yet.</p>
                <p class=\"text-small\">Add recipes to your meal plan to generate a grocery list.</p>
            </div>
        `;
        return;
    }

    // Group by category
    const categories = {};
    groceryMap.forEach((item, key) => {
        const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
    });

    let html = `
        <div class="grocery-meals">
            <h4>Meals Planned (${state.mealPlan.length})</h4>
            <ul class="meal-list">
                ${state.mealPlan.map(item => `
                    <li class="meal-item">
                        <span>${item.name}</span>
                        <span class="meal-portions">${item.portions} portions</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        <div class="grocery-items">
            <h4>Shopping List</h4>
    `;

    Object.entries(categories).forEach(([category, items]) => {
        html += `
            <div class="grocery-category">
                <h5 class="grocery-category-title">${category}</h5>
                <ul class="grocery-list">
                    ${items.map(item => `
                        <li class="grocery-item">
                            <label class="grocery-checkbox">
                                <input type="checkbox">
                                <span class="grocery-name">${item.name}</span>
                            </label>
                            <span class="grocery-amount">${formatAmount(item.amount)} ${item.unit}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    html += '</div>';
    groceryListBody.innerHTML = html;
}

function formatAmount(amount) {
    if (amount === 0) return '';
    if (Number.isInteger(amount)) return amount.toString();
    return amount.toFixed(1).replace(/\.0$/, '');
}

function openGroceryListModal() {
    renderGroceryList();
    groceryListModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGroceryListModal() {
    groceryListModal.classList.remove('active');
    document.body.style.overflow = '';
}

function copyGroceryListToClipboard() {
    const groceryMap = generateGroceryList();
    
    if (groceryMap.size === 0) {
        alert('No items in grocery list.');
        return;
    }

    let text = 'GROCERY LIST\n============\n\n';
    text += `Meals: ${state.mealPlan.map(m => m.name).join(', ')}\n\n`;

    // Group by category
    const categories = {};
    groceryMap.forEach((item) => {
        const cat = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(item);
    });

    Object.entries(categories).forEach(([category, items]) => {
        text += `${category}:\n`;
        items.forEach(item => {
            text += `  □ ${item.name} - ${formatAmount(item.amount)} ${item.unit}\n`;
        });
        text += '\n';
    });

    navigator.clipboard.writeText(text).then(() => {
        alert('Grocery list copied to clipboard!');
    }).catch(() => {
        alert('Failed to copy. Please try again.');
    });
}

function clearMealPlan() {
    if (confirm('Are you sure you want to clear all planned meals?')) {
        state.mealPlan = [];
        updatePlanCount();
        renderRecipeGrid();
        renderGroceryList();
    }
}

// ===========================================
// "WHAT'S IN MY FRIDGE" (lightweight stub)
// ===========================================

function switchFridgeTab(tab) {
    const listPanel = document.getElementById('fridgeTabList');
    const scanPanel = document.getElementById('fridgeTabScan');

    document.querySelectorAll('.fridge-tab').forEach(btn => {
        const isActive = btn.dataset.tab === tab;
        btn.classList.toggle('active', isActive);
        btn.style.border = `1px solid ${isActive ? 'var(--color-primary, #4f46e5)' : 'var(--color-gray-300)'}`;
        btn.style.backgroundColor = isActive ? 'var(--color-primary-50, #eef2ff)' : 'white';
        btn.style.color = isActive ? 'var(--color-primary, #4f46e5)' : '';
        btn.style.borderRadius = '999px';
        btn.style.padding = '0.5rem 0.75rem';
        btn.style.cursor = 'pointer';
    });

    listPanel.style.display = tab === 'list' ? 'block' : 'none';
    scanPanel.style.display = tab === 'scan' ? 'block' : 'none';
}

function parseFridgeItems(text) {
    return text
        .split(',')
        .map(item => item.trim().toLowerCase())
        .filter(Boolean);
}

function findFridgeMatches(items) {
    if (items.length === 0) return [];

    return state.recipes
        .map(recipe => {
            const ingredientNames = Object.values(recipe.ingredients || {})
                .flatMap(group => group.map(ing => (ing.name || '').toLowerCase()));

            const matched = items.filter(item =>
                ingredientNames.some(name => name.includes(item))
            );

            const coverage = matched.length / items.length;
            return { recipe, matched, coverage };
        })
        .filter(result => result.matched.length > 0)
        .sort((a, b) => b.coverage - a.coverage || b.matched.length - a.matched.length);
}

function renderFridgeResults(matches, items) {
    const results = document.getElementById('fridgeResults');

    if (items.length === 0) {
        results.innerHTML = '<p class="text-small">Add at least one item to start matching.</p>';
        return;
    }

    if (matches.length === 0) {
        results.innerHTML = '<p class="text-small">No quick matches yet. Try broader item names or add more items.</p>';
        return;
    }

    const visible = matches.slice(0, 5);
    results.innerHTML = `
        <div class="text-small" style="color: var(--color-gray-600); margin-bottom: 0.5rem;">
            Top matches (${visible.length}${matches.length > visible.length ? ` of ${matches.length}` : ''})
        </div>
        <div class="fridge-match-list" style="display: grid; gap: 0.75rem;">
            ${visible.map(match => `
                <div class="fridge-match-item" style="padding: 0.75rem; border: 1px solid var(--color-gray-200); border-radius: 8px;">
                    <div class="fridge-match-title" style="font-weight: 600; margin-bottom: 0.25rem;">${match.recipe.name}</div>
                    <div class="text-small" style="color: var(--color-gray-600);">Matches: ${match.matched.join(', ')}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function handleFridgeFileChange(file) {
    if (!file) return;

    fridgePhotoFile = file;
    const preview = document.getElementById('fridgePhotoPreview');
    const img = document.getElementById('fridgePhotoImg');
    const name = document.getElementById('fridgePhotoName');

    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        preview.style.display = 'flex';
    };
    reader.readAsDataURL(file);

    name.textContent = file.name;
}

function clearFridgePhoto() {
    fridgePhotoFile = null;
    document.getElementById('fridgePhotoPreview').style.display = 'none';
    document.getElementById('fridgePhotoImg').removeAttribute('src');
    document.getElementById('fridgePhotoName').textContent = '';
    document.getElementById('fridgeFile').value = '';
}

function openFridgeModal() {
    document.getElementById('fridgeResults').innerHTML = '<p class="text-small">Add items you have to see quick matches.</p>';
    document.getElementById('fridgeDropzone').style.borderColor = 'var(--color-gray-300)';
    switchFridgeTab('list');
    fridgeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFridgeModal() {
    fridgeModal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleFridgeFind() {
    const items = parseFridgeItems(document.getElementById('fridgeInput').value);
    const matches = findFridgeMatches(items);
    renderFridgeResults(matches, items);
}

function loadFridgePreset() {
    const sample = 'eggs, spinach, feta, tortillas';
    document.getElementById('fridgeInput').value = sample;
    document.getElementById('fridgeDetectedInput').value = sample;
    handleFridgeFind();
}

function loadFridgeDetectSample() {
    const sample = 'milk, yogurt, berries, orange juice';
    document.getElementById('fridgeDetectedInput').value = sample;
    document.getElementById('fridgeInput').value = sample;
    switchFridgeTab('list');
    handleFridgeFind();
}

function handleFridgeDetectRun() {
    const detected = document.getElementById('fridgeDetectedInput').value.trim();

    if (!detected && !fridgePhotoFile) {
        alert('Add a photo or some detected items first.');
        return;
    }

    const text = detected || 'mixed greens, chicken, cherry tomatoes';
    document.getElementById('fridgeInput').value = text;
    switchFridgeTab('list');
    handleFridgeFind();
}

// ===========================================
// RECIPE EDITOR INTEGRATION
// Uses the RecipeEditor module from features/recipe-editor/
// ===========================================

function handleRecipeSave(recipeData, existingId) {
    if (existingId) {
        // Update existing recipe
        const index = state.recipes.findIndex(r => r.id === existingId);
        if (index !== -1) {
            // Preserve some fields from original recipe
            recipeData.favourite = state.recipes[index].favourite;
            recipeData.timesCooked = state.recipes[index].timesCooked;
            recipeData.lastCooked = state.recipes[index].lastCooked;
            recipeData.dateAdded = state.recipes[index].dateAdded;
            state.recipes[index] = recipeData;
        }
        alert('Recipe updated successfully!');
    } else {
        // Add new recipe
        state.recipes.unshift(recipeData);
        alert('Recipe added successfully!');
    }
    renderRecipeGrid();
}

function handleRecipeDelete(recipeId) {
    state.recipes = state.recipes.filter(r => r.id !== recipeId);
    
    // Also remove from meal plan if present
    state.mealPlan = state.mealPlan.filter(m => m.id !== recipeId);
    updatePlanCount();
    
    renderRecipeGrid();
    closeRecipeModal();
    
    alert('Recipe deleted.');
}

function editRecipe(recipe) {
    closeRecipeModal();
    RecipeEditor.open(recipe);
}

// ===========================================
// INITIALIZATION
// ===========================================

function init() {
    // Render initial grid
    renderRecipeGrid();

    // Card clicks
    recipeGrid.addEventListener('click', handleCardClick);
    recipeGrid.addEventListener('click', handleTagClick);

    // Filter pills
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => setActiveFilter(btn.dataset.filter));
    });

    // Sort select
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderRecipeGrid();
    });

    // Cooking for select
    document.getElementById('cookingForSelect').addEventListener('change', (e) => {
        state.cookingFor = e.target.value;
        state.portions = getPortionsForGroup(state.cookingFor);
    });

    // Recipe modal
    document.getElementById('modalClose').addEventListener('click', closeRecipeModal);
    document.getElementById('modalAddToPlan').addEventListener('click', () => {
        if (state.selectedRecipe) {
            openAddToPlanModal(state.selectedRecipe);
        }
    });
    document.getElementById('modalFavourite').addEventListener('click', () => {
        if (state.selectedRecipe) {
            toggleFavourite(state.selectedRecipe);
            openRecipeModal(state.selectedRecipe); // Re-render
        }
    });
    document.getElementById('modalEditRecipe').addEventListener('click', () => {
        if (state.selectedRecipe) {
            editRecipe(state.selectedRecipe);
        }
    });

    // Add to plan modal
    document.getElementById('addToPlanClose').addEventListener('click', closeAddToPlanModal);
    document.getElementById('addToPlanCancel').addEventListener('click', closeAddToPlanModal);
    document.getElementById('addToPlanConfirm').addEventListener('click', () => {
        if (state.selectedRecipe) {
            const portions = parseInt(document.getElementById('portionInput').value);
            addToMealPlan(state.selectedRecipe, portions);
        }
    });

    // Portion controls in add modal
    document.getElementById('portionMinus').addEventListener('click', () => {
        const input = document.getElementById('portionInput');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    });
    document.getElementById('portionPlus').addEventListener('click', () => {
        const input = document.getElementById('portionInput');
        if (parseInt(input.value) < 12) {
            input.value = parseInt(input.value) + 1;
        }
    });

    // Who's eating radio buttons
    document.querySelectorAll('input[name="whosEating"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.cookingFor = e.target.value;
            document.getElementById('portionInput').value = getPortionsForGroup(state.cookingFor);
        });
    });

    // Close modals on overlay click
    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) closeRecipeModal();
    });
    addToPlanModal.addEventListener('click', (e) => {
        if (e.target === addToPlanModal) closeAddToPlanModal();
    });
    groceryListModal.addEventListener('click', (e) => {
        if (e.target === groceryListModal) closeGroceryListModal();
    });
    fridgeModal.addEventListener('click', (e) => {
        if (e.target === fridgeModal) closeFridgeModal();
    });

    // Grocery list modal
    document.getElementById('groceryListBtn').addEventListener('click', openGroceryListModal);
    document.getElementById('groceryListClose').addEventListener('click', closeGroceryListModal);
    document.getElementById('groceryListCopy').addEventListener('click', copyGroceryListToClipboard);
    document.getElementById('groceryListClear').addEventListener('click', clearMealPlan);

    // Fridge quick matcher (stub)
    document.getElementById('fridgeBtn').addEventListener('click', openFridgeModal);
    document.getElementById('fridgeClose').addEventListener('click', closeFridgeModal);
    document.getElementById('fridgeFindBtn').addEventListener('click', handleFridgeFind);
    document.getElementById('fridgePresetBtn').addEventListener('click', loadFridgePreset);
    document.getElementById('fridgeDetectRunBtn').addEventListener('click', handleFridgeDetectRun);
    document.getElementById('fridgeDetectSampleBtn').addEventListener('click', loadFridgeDetectSample);
    document.querySelectorAll('.fridge-tab').forEach(btn => {
        btn.addEventListener('click', () => switchFridgeTab(btn.dataset.tab));
    });

    const fridgeDropzone = document.getElementById('fridgeDropzone');
    const fridgeFileInput = document.getElementById('fridgeFile');

    fridgeDropzone.addEventListener('click', () => fridgeFileInput.click());
    fridgeDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fridgeDropzone.style.borderColor = 'var(--color-primary, #4f46e5)';
    });
    fridgeDropzone.addEventListener('dragleave', () => {
        fridgeDropzone.style.borderColor = 'var(--color-gray-300)';
    });
    fridgeDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fridgeDropzone.style.borderColor = 'var(--color-gray-300)';
        const file = e.dataTransfer.files?.[0];
        if (file) handleFridgeFileChange(file);
    });

    fridgeFileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) handleFridgeFileChange(file);
    });

    document.getElementById('fridgeRemovePhoto').addEventListener('click', clearFridgePhoto);

    // Recipe editor - Initialize the modular feature
    RecipeEditor.init({
        onSave: handleRecipeSave,
        onDelete: handleRecipeDelete
    });
    
    // Add Recipe button
    document.getElementById('addRecipeBtn').addEventListener('click', () => RecipeEditor.open());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeRecipeModal();
            closeAddToPlanModal();
            closeGroceryListModal();
            closeFridgeModal();
        }
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
