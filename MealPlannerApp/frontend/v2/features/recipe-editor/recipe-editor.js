// ===========================================
// RECIPE EDITOR - Feature Module
// Add/Edit Recipe Functionality
// ===========================================

const RecipeEditor = (function() {
    'use strict';

    // ===========================================
    // PRIVATE STATE
    // ===========================================
    let editingRecipeId = null;
    let modal = null;
    let onSaveCallback = null;
    let onDeleteCallback = null;

    // ===========================================
    // DOM REFERENCES
    // ===========================================
    const getElements = () => ({
        modal: document.getElementById('recipeEditorModal'),
        form: document.getElementById('recipeEditorForm'),
        title: document.getElementById('recipeEditorTitle'),
        closeBtn: document.getElementById('recipeEditorClose'),
        cancelBtn: document.getElementById('recipeEditorCancel'),
        saveBtn: document.getElementById('recipeEditorSave'),
        deleteBtn: document.getElementById('recipeEditorDelete'),
        addStepBtn: document.getElementById('addStepBtn'),
        stepsEditor: document.getElementById('stepsEditor'),
        // Form fields
        name: document.getElementById('recipeName'),
        image: document.getElementById('recipeImage'),
        cookTime: document.getElementById('recipeCookTime'),
        servings: document.getElementById('recipeServings'),
        calories: document.getElementById('recipeCalories'),
        difficulty: document.getElementById('recipeDifficulty'),
        cuisine: document.getElementById('recipeCuisine'),
        tags: document.getElementById('recipeTags'),
        sourceName: document.getElementById('recipeSourceName'),
        sourceUrl: document.getElementById('recipeSourceUrl'),
        notes: document.getElementById('recipeNotes')
    });

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================
    function generateRecipeId(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();
    }

    // ===========================================
    // INGREDIENT MANAGEMENT
    // ===========================================
    function addIngredientRow(category, ingredient = null) {
        const container = document.getElementById(`${category}Ingredients`);
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'ingredient-row';
        row.innerHTML = `
            <input type="text" class="form-input ingredient-name" placeholder="Ingredient name" value="${ingredient?.name || ''}">
            <input type="number" class="form-input ingredient-amount" placeholder="Amount" min="0" step="0.1" value="${ingredient?.amount || ''}">
            <input type="text" class="form-input ingredient-unit" placeholder="Unit" value="${ingredient?.unit || ''}">
            <button type="button" class="btn-icon remove-ingredient-btn" title="Remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        container.appendChild(row);

        row.querySelector('.remove-ingredient-btn').addEventListener('click', () => row.remove());
    }

    function collectIngredients() {
        const ingredients = {};
        const categories = ['protein', 'vegetables', 'carbs', 'sauce', 'pantry'];

        categories.forEach(category => {
            const rows = document.querySelectorAll(`#${category}Ingredients .ingredient-row`);
            const items = [];

            rows.forEach(row => {
                const name = row.querySelector('.ingredient-name').value.trim();
                const amount = parseFloat(row.querySelector('.ingredient-amount').value) || 0;
                const unit = row.querySelector('.ingredient-unit').value.trim();

                if (name) {
                    items.push({
                        name,
                        amount,
                        unit,
                        scalable: true
                    });
                }
            });

            if (items.length > 0) {
                ingredients[category] = items;
            }
        });

        return ingredients;
    }

    // ===========================================
    // STEP MANAGEMENT
    // ===========================================
    function addStepRow(step = null) {
        const container = document.getElementById('stepsEditor');
        if (!container) return;

        const stepNum = container.children.length + 1;
        const row = document.createElement('div');
        row.className = 'step-row';
        row.innerHTML = `
            <span class="step-number">${stepNum}</span>
            <textarea class="form-input step-instruction" placeholder="Describe this step..." rows="2">${step?.instruction || ''}</textarea>
            <input type="number" class="form-input step-time" placeholder="Time (min)" min="0" value="${step?.time || ''}">
            <button type="button" class="btn-icon remove-step-btn" title="Remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        container.appendChild(row);

        row.querySelector('.remove-step-btn').addEventListener('click', () => {
            row.remove();
            updateStepNumbers();
        });
    }

    function updateStepNumbers() {
        const steps = document.querySelectorAll('.step-row');
        steps.forEach((row, index) => {
            row.querySelector('.step-number').textContent = index + 1;
        });
    }

    function collectSteps() {
        const steps = [];
        const rows = document.querySelectorAll('.step-row');

        rows.forEach(row => {
            const instruction = row.querySelector('.step-instruction').value.trim();
            const time = parseInt(row.querySelector('.step-time').value) || null;

            if (instruction) {
                steps.push({ instruction, time });
            }
        });

        return steps;
    }

    // ===========================================
    // FORM MANAGEMENT
    // ===========================================
    function resetForm() {
        const els = getElements();
        els.form.reset();

        // Clear dynamic fields
        ['protein', 'vegetables', 'carbs', 'sauce', 'pantry'].forEach(cat => {
            const container = document.getElementById(`${cat}Ingredients`);
            if (container) container.innerHTML = '';
        });
        els.stepsEditor.innerHTML = '';
    }

    function populateForm(recipe) {
        const els = getElements();

        els.name.value = recipe.name || '';
        els.image.value = recipe.image || '';
        els.cookTime.value = recipe.cookTime || '';
        els.servings.value = recipe.servings || 4;
        els.calories.value = recipe.calories || '';
        els.difficulty.value = recipe.difficulty || 'Easy';
        els.cuisine.value = recipe.cuisine || '';
        els.tags.value = recipe.tags ? recipe.tags.join(', ') : '';
        els.sourceName.value = recipe.source?.name || '';
        els.sourceUrl.value = recipe.source?.url || '';
        els.notes.value = recipe.personalNote || '';

        // Populate ingredients
        if (recipe.ingredients) {
            Object.entries(recipe.ingredients).forEach(([category, items]) => {
                items.forEach(ing => addIngredientRow(category, ing));
            });
        }

        // Populate steps
        if (recipe.steps) {
            recipe.steps.forEach(step => addStepRow(step));
        }
    }

    function validateForm() {
        const els = getElements();
        const name = els.name.value.trim();
        const cookTime = parseInt(els.cookTime.value);
        const servings = parseInt(els.servings.value);

        if (!name) {
            alert('Please enter a recipe name.');
            els.name.focus();
            return false;
        }
        if (!cookTime || cookTime < 1) {
            alert('Please enter a valid cook time.');
            els.cookTime.focus();
            return false;
        }
        if (!servings || servings < 1) {
            alert('Please enter a valid number of servings.');
            els.servings.focus();
            return false;
        }

        return true;
    }

    function collectFormData() {
        const els = getElements();

        const tags = els.tags.value
            .split(',')
            .map(t => t.trim())
            .filter(t => t);

        return {
            id: editingRecipeId || generateRecipeId(els.name.value.trim()),
            name: els.name.value.trim(),
            image: els.image.value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
            cookTime: parseInt(els.cookTime.value),
            servings: parseInt(els.servings.value),
            calories: parseInt(els.calories.value) || 0,
            difficulty: els.difficulty.value,
            cuisine: els.cuisine.value,
            tags,
            source: {
                name: els.sourceName.value.trim() || 'Personal Recipe',
                url: els.sourceUrl.value.trim() || null
            },
            ingredients: collectIngredients(),
            steps: collectSteps(),
            personalNote: els.notes.value.trim() || null,
            favourite: false,
            timesCooked: 0,
            lastCooked: null,
            dateAdded: new Date().toISOString().split('T')[0]
        };
    }

    // ===========================================
    // MODAL MANAGEMENT
    // ===========================================
    function open(recipe = null) {
        const els = getElements();
        modal = els.modal;

        editingRecipeId = recipe ? recipe.id : null;

        // Update modal title
        els.title.textContent = recipe ? 'Edit Recipe' : 'Add New Recipe';

        // Show/hide delete button
        els.deleteBtn.style.display = recipe ? 'inline-flex' : 'none';

        // Reset and populate form
        resetForm();

        if (recipe) {
            populateForm(recipe);
        } else {
            // Add one empty ingredient row for each category
            ['protein', 'vegetables', 'carbs', 'sauce', 'pantry'].forEach(cat => {
                addIngredientRow(cat);
            });
            // Add one empty step
            addStepRow();
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        editingRecipeId = null;
    }

    function save() {
        if (!validateForm()) return;

        const recipeData = collectFormData();

        if (onSaveCallback) {
            onSaveCallback(recipeData, editingRecipeId);
        }

        close();
    }

    function deleteRecipe() {
        if (!editingRecipeId) return;

        if (confirm('Are you sure you want to delete this recipe? This cannot be undone.')) {
            if (onDeleteCallback) {
                onDeleteCallback(editingRecipeId);
            }
            close();
        }
    }

    // ===========================================
    // EVENT BINDING
    // ===========================================
    function bindEvents() {
        const els = getElements();

        // Close buttons
        els.closeBtn?.addEventListener('click', close);
        els.cancelBtn?.addEventListener('click', close);

        // Save button
        els.saveBtn?.addEventListener('click', save);

        // Delete button
        els.deleteBtn?.addEventListener('click', deleteRecipe);

        // Add step button
        els.addStepBtn?.addEventListener('click', () => addStepRow());

        // Add ingredient buttons
        document.querySelectorAll('.add-ingredient-btn').forEach(btn => {
            btn.addEventListener('click', () => addIngredientRow(btn.dataset.category));
        });

        // Close on overlay click
        els.modal?.addEventListener('click', (e) => {
            if (e.target === els.modal) close();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('active')) {
                close();
            }
        });
    }

    // ===========================================
    // PUBLIC API
    // ===========================================
    function init(options = {}) {
        onSaveCallback = options.onSave || null;
        onDeleteCallback = options.onDelete || null;

        bindEvents();

        console.log('RecipeEditor initialized');
    }

    // Return public methods
    return {
        init,
        open,
        close,
        isEditing: () => editingRecipeId !== null,
        getEditingId: () => editingRecipeId
    };
})();

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecipeEditor;
}
