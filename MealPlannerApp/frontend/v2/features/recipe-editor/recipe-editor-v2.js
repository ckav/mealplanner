// ===========================================
// RECIPE EDITOR v2 - Feature Module
// Supports: URL Import, Photo/Cookbook, Manual Entry
// ===========================================

const RecipeEditor = (function() {
    'use strict';

    // ===========================================
    // PRIVATE STATE
    // ===========================================
    let editingRecipeId = null;
    let currentInputMethod = null;
    let sourceData = null;
    let uploadedPhoto = null;
    let onSaveCallback = null;
    let onDeleteCallback = null;

    // ===========================================
    // DOM ELEMENT GETTERS
    // ===========================================
    const getElements = () => ({
        // Modal
        modal: document.getElementById('recipeEditorModal'),
        title: document.getElementById('recipeEditorTitle'),
        closeBtn: document.getElementById('recipeEditorClose'),
        cancelBtn: document.getElementById('recipeEditorCancel'),
        saveBtn: document.getElementById('recipeEditorSave'),
        deleteBtn: document.getElementById('recipeEditorDelete'),
        
        // Input Method Selector
        methodSelector: document.getElementById('inputMethodSelector'),
        methodCards: document.querySelectorAll('.input-method-card'),
        
        // Panels
        urlPanel: document.getElementById('urlImportPanel'),
        cookbookPanel: document.getElementById('cookbookPanel'),
        form: document.getElementById('recipeEditorForm'),
        
        // URL Import
        recipeUrl: document.getElementById('recipeUrl'),
        fetchUrlBtn: document.getElementById('fetchUrlBtn'),
        urlLoading: document.getElementById('urlLoading'),
        urlError: document.getElementById('urlError'),
        urlErrorMessage: document.getElementById('urlErrorMessage'),
        urlBackBtn: document.getElementById('urlBackBtn'),
        urlRetryBtn: document.getElementById('urlRetryBtn'),
        urlManualBtn: document.getElementById('urlManualBtn'),
        
        // Cookbook
        cookbookTitle: document.getElementById('cookbookTitle'),
        cookbookAuthor: document.getElementById('cookbookAuthor'),
        cookbookPage: document.getElementById('cookbookPage'),
        cookbookPhoto: document.getElementById('cookbookPhoto'),
        photoUploadArea: document.getElementById('photoUploadArea'),
        photoPlaceholder: document.getElementById('photoPlaceholder'),
        photoPreview: document.getElementById('photoPreview'),
        photoPreviewImg: document.getElementById('photoPreviewImg'),
        photoRemove: document.getElementById('photoRemove'),
        cookbookBackBtn: document.getElementById('cookbookBackBtn'),
        cookbookContinueBtn: document.getElementById('cookbookContinueBtn'),
        
        // Source Attribution
        sourceAttribution: document.getElementById('sourceAttribution'),
        sourceIcon: document.getElementById('sourceIcon'),
        sourceLabel: document.getElementById('sourceLabel'),
        sourceLink: document.getElementById('sourceLink'),
        editSourceBtn: document.getElementById('editSourceBtn'),
        sourceDetailsSection: document.getElementById('sourceDetailsSection'),
        
        // Form Fields
        name: document.getElementById('recipeName'),
        image: document.getElementById('recipeImage'),
        imagePreviewContainer: document.getElementById('imagePreviewContainer'),
        imagePreview: document.getElementById('recipeImagePreview'),
        imageRemove: document.getElementById('imageRemove'),
        imageCredit: document.getElementById('imageCredit'),
        prepTime: document.getElementById('recipePrepTime'),
        cookTime: document.getElementById('recipeCookTime'),
        servings: document.getElementById('recipeServings'),
        difficulty: document.getElementById('recipeDifficulty'),
        cuisine: document.getElementById('recipeCuisine'),
        calories: document.getElementById('recipeCalories'),
        tags: document.getElementById('recipeTags'),
        description: document.getElementById('recipeDescription'),
        sourceName: document.getElementById('recipeSourceName'),
        sourceUrl: document.getElementById('recipeSourceUrl'),
        notes: document.getElementById('recipeNotes'),
        
        // Dynamic editors
        stepsEditor: document.getElementById('stepsEditor'),
        addStepBtn: document.getElementById('addStepBtn')
    });

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================
    function generateRecipeId(name) {
        return name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') + '-' + Date.now();
    }

    function showElement(el) {
        if (el) el.style.display = '';
    }

    function hideElement(el) {
        if (el) el.style.display = 'none';
    }

    // ===========================================
    // INPUT METHOD HANDLING
    // ===========================================
    function showMethodSelector() {
        const els = getElements();
        showElement(els.methodSelector);
        hideElement(els.urlPanel);
        hideElement(els.cookbookPanel);
        hideElement(els.form);
        hideElement(els.saveBtn);
        currentInputMethod = null;
    }

    function selectInputMethod(method) {
        const els = getElements();
        currentInputMethod = method;
        
        hideElement(els.methodSelector);
        hideElement(els.urlPanel);
        hideElement(els.cookbookPanel);
        hideElement(els.form);
        
        switch (method) {
            case 'url':
                showElement(els.urlPanel);
                els.recipeUrl.focus();
                break;
            case 'cookbook':
                showElement(els.cookbookPanel);
                els.cookbookTitle.focus();
                break;
            case 'manual':
                showRecipeForm();
                break;
        }
    }

    function showRecipeForm(withSource = false) {
        const els = getElements();
        hideElement(els.methodSelector);
        hideElement(els.urlPanel);
        hideElement(els.cookbookPanel);
        showElement(els.form);
        showElement(els.saveBtn);
        
        // Show/hide source attribution based on how recipe was added
        if (sourceData && (sourceData.type === 'url' || sourceData.type === 'cookbook')) {
            showElement(els.sourceAttribution);
            updateSourceAttribution();
        } else {
            hideElement(els.sourceAttribution);
        }
    }

    // ===========================================
    // URL IMPORT
    // ===========================================
    async function fetchRecipeFromUrl() {
        const els = getElements();
        const url = els.recipeUrl.value.trim();
        
        if (!url) {
            alert('Please enter a URL');
            return;
        }
        
        // Validate URL
        try {
            new URL(url);
        } catch (e) {
            alert('Please enter a valid URL');
            return;
        }
        
        // Show loading
        hideElement(els.urlError);
        showElement(els.urlLoading);
        
        try {
            // For now, we'll extract basic info from the URL
            // In production, this would call a backend API or use a CORS proxy
            const recipeData = await parseRecipeUrl(url);
            
            if (recipeData) {
                // Store source data
                sourceData = {
                    type: 'url',
                    url: url,
                    siteName: recipeData.siteName || extractSiteName(url),
                    dateAccessed: new Date().toISOString().split('T')[0]
                };
                
                // Populate form
                populateFormFromUrlData(recipeData);
                showRecipeForm(true);
            } else {
                throw new Error('Could not parse recipe from this URL');
            }
        } catch (error) {
            console.error('URL fetch error:', error);
            hideElement(els.urlLoading);
            showElement(els.urlError);
            els.urlErrorMessage.textContent = error.message || 'Could not fetch recipe from this URL.';
        } finally {
            hideElement(els.urlLoading);
        }
    }

    async function parseRecipeUrl(url) {
        // Extract site name from URL
        const siteName = extractSiteName(url);
        
        // For demo purposes, return mock data
        // In production, this would:
        // 1. Call a backend API that fetches and parses the page
        // 2. Use schema.org/Recipe structured data
        // 3. Use site-specific parsers
        
        // Demo: Just populate source info - user fills in the rest
        return {
            siteName: siteName,
            url: url,
            // These would be populated by actual parsing:
            name: '',
            image: '',
            prepTime: null,
            cookTime: null,
            servings: null,
            ingredients: [],
            steps: []
        };
    }

    function extractSiteName(url) {
        try {
            const hostname = new URL(url).hostname;
            // Remove www. prefix and extract domain name
            const domain = hostname.replace(/^www\./, '');
            
            // Known site mappings
            const siteNames = {
                'bbc.co.uk': 'BBC Food',
                'bbcgoodfood.com': 'BBC Good Food',
                'allrecipes.com': 'AllRecipes',
                'jamieoliver.com': 'Jamie Oliver',
                'deliciousmagazine.co.uk': 'Delicious Magazine',
                'foodnetwork.com': 'Food Network',
                'epicurious.com': 'Epicurious',
                'bonappetit.com': 'Bon Appétit',
                'seriouseats.com': 'Serious Eats',
                'tasty.co': 'Tasty',
                'simplyrecipes.com': 'Simply Recipes'
            };
            
            return siteNames[domain] || domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
        } catch (e) {
            return 'Website';
        }
    }

    function populateFormFromUrlData(data) {
        const els = getElements();
        
        if (data.name) els.name.value = data.name;
        if (data.image) {
            els.image.value = data.image;
            updateImagePreview(data.image);
        }
        if (data.prepTime) els.prepTime.value = data.prepTime;
        if (data.cookTime) els.cookTime.value = data.cookTime;
        if (data.servings) els.servings.value = data.servings;
        if (data.description) els.description.value = data.description;
        
        // Set source fields
        els.sourceName.value = sourceData?.siteName || '';
        els.sourceUrl.value = sourceData?.url || '';
        els.imageCredit.value = sourceData?.siteName || '';
        
        // Add ingredients and steps would go here
    }

    // ===========================================
    // COOKBOOK/PHOTO HANDLING
    // ===========================================
    function setupPhotoUpload() {
        const els = getElements();
        
        els.photoUploadArea?.addEventListener('click', (e) => {
            if (e.target !== els.photoRemove && !els.photoRemove?.contains(e.target)) {
                els.cookbookPhoto?.click();
            }
        });
        
        els.cookbookPhoto?.addEventListener('change', handlePhotoSelect);
        els.photoRemove?.addEventListener('click', removePhoto);
    }

    function handlePhotoSelect(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedPhoto = e.target.result;
            showPhotoPreview(uploadedPhoto);
        };
        reader.readAsDataURL(file);
    }

    function showPhotoPreview(src) {
        const els = getElements();
        els.photoPreviewImg.src = src;
        hideElement(els.photoPlaceholder);
        showElement(els.photoPreview);
    }

    function removePhoto() {
        const els = getElements();
        uploadedPhoto = null;
        els.cookbookPhoto.value = '';
        els.photoPreviewImg.src = '';
        hideElement(els.photoPreview);
        showElement(els.photoPlaceholder);
    }

    function continueToCookbookForm() {
        const els = getElements();
        const bookTitle = els.cookbookTitle.value.trim();
        
        if (!bookTitle) {
            alert('Please enter the cookbook title');
            els.cookbookTitle.focus();
            return;
        }
        
        // Store source data
        sourceData = {
            type: 'cookbook',
            bookTitle: bookTitle,
            author: els.cookbookAuthor.value.trim() || null,
            pageNumber: els.cookbookPage.value ? parseInt(els.cookbookPage.value) : null,
            photoRef: uploadedPhoto
        };
        
        // Pre-fill source name
        getElements().sourceName.value = bookTitle + (sourceData.author ? ` by ${sourceData.author}` : '');
        
        showRecipeForm(true);
    }

    // ===========================================
    // SOURCE ATTRIBUTION
    // ===========================================
    function updateSourceAttribution() {
        const els = getElements();
        
        if (!sourceData) {
            hideElement(els.sourceAttribution);
            return;
        }
        
        showElement(els.sourceAttribution);
        
        if (sourceData.type === 'url') {
            els.sourceIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>`;
            els.sourceLabel.textContent = 'Imported from';
            els.sourceLink.textContent = sourceData.siteName;
            els.sourceLink.href = sourceData.url;
            showElement(els.sourceLink);
        } else if (sourceData.type === 'cookbook') {
            els.sourceIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>`;
            els.sourceLabel.textContent = 'From cookbook';
            els.sourceLink.textContent = sourceData.bookTitle;
            els.sourceLink.removeAttribute('href');
        }
    }

    // ===========================================
    // IMAGE PREVIEW
    // ===========================================
    function setupImagePreview() {
        const els = getElements();
        
        els.image?.addEventListener('input', debounce(() => {
            updateImagePreview(els.image.value);
        }, 500));
        
        els.imageRemove?.addEventListener('click', () => {
            els.image.value = '';
            hideElement(els.imagePreviewContainer);
        });
    }

    function updateImagePreview(url) {
        const els = getElements();
        
        if (!url) {
            hideElement(els.imagePreviewContainer);
            return;
        }
        
        // Test if image loads
        const img = new Image();
        img.onload = () => {
            els.imagePreview.src = url;
            showElement(els.imagePreviewContainer);
        };
        img.onerror = () => {
            hideElement(els.imagePreviewContainer);
        };
        img.src = url;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
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
            <input type="number" class="form-input ingredient-amount" placeholder="Amt" min="0" step="0.1" value="${ingredient?.amount || ''}">
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
            <input type="number" class="form-input step-time" placeholder="Min" min="0" value="${step?.time || ''}">
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
        els.form?.reset();

        // Clear dynamic fields
        ['protein', 'vegetables', 'carbs', 'sauce', 'pantry'].forEach(cat => {
            const container = document.getElementById(`${cat}Ingredients`);
            if (container) container.innerHTML = '';
        });
        
        if (els.stepsEditor) els.stepsEditor.innerHTML = '';
        
        // Reset state
        sourceData = null;
        uploadedPhoto = null;
        currentInputMethod = null;
        
        // Hide previews
        hideElement(els.imagePreviewContainer);
        hideElement(els.sourceAttribution);
        
        // Reset photo upload
        removePhoto();
        
        // Reset URL panel
        if (els.recipeUrl) els.recipeUrl.value = '';
        hideElement(els.urlLoading);
        hideElement(els.urlError);
        
        // Reset cookbook panel
        if (els.cookbookTitle) els.cookbookTitle.value = '';
        if (els.cookbookAuthor) els.cookbookAuthor.value = '';
        if (els.cookbookPage) els.cookbookPage.value = '';
    }

    function populateForm(recipe) {
        const els = getElements();

        els.name.value = recipe.name || '';
        els.image.value = recipe.image?.url || recipe.image || '';
        if (els.image.value) updateImagePreview(els.image.value);
        els.imageCredit.value = recipe.image?.credit || recipe.imageCredit || '';
        els.prepTime.value = recipe.prepTime || '';
        els.cookTime.value = recipe.cookTime || '';
        els.servings.value = recipe.servings || 4;
        els.difficulty.value = recipe.difficulty || 'Easy';
        els.cuisine.value = recipe.cuisine || '';
        els.calories.value = recipe.calories || '';
        els.tags.value = recipe.tags ? recipe.tags.join(', ') : '';
        els.description.value = recipe.description || '';
        els.sourceName.value = recipe.source?.name || '';
        els.sourceUrl.value = recipe.source?.url || '';
        els.notes.value = recipe.notes?.personal || recipe.personalNote || '';

        // Restore source data
        if (recipe.source) {
            sourceData = recipe.source;
            updateSourceAttribution();
        }

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

        const imageUrl = els.image.value.trim();
        
        return {
            id: editingRecipeId || generateRecipeId(els.name.value.trim()),
            name: els.name.value.trim(),
            description: els.description?.value.trim() || null,
            image: imageUrl ? {
                url: imageUrl,
                credit: els.imageCredit?.value.trim() || null
            } : null,
            prepTime: parseInt(els.prepTime?.value) || null,
            cookTime: parseInt(els.cookTime.value),
            servings: parseInt(els.servings.value),
            calories: parseInt(els.calories.value) || 0,
            difficulty: els.difficulty.value,
            cuisine: els.cuisine.value,
            tags,
            source: sourceData || {
                type: 'personal',
                name: els.sourceName.value.trim() || 'Personal Recipe',
                url: els.sourceUrl.value.trim() || null
            },
            ingredients: collectIngredients(),
            steps: collectSteps(),
            notes: {
                personal: els.notes.value.trim() || null
            },
            // Legacy field support
            personalNote: els.notes.value.trim() || null,
            favourite: false,
            timesCooked: 0,
            lastCooked: null,
            dateAdded: new Date().toISOString().split('T')[0],
            importMethod: currentInputMethod || 'manual'
        };
    }

    // ===========================================
    // MODAL MANAGEMENT
    // ===========================================
    function open(recipe = null) {
        const els = getElements();
        const modal = els.modal;

        editingRecipeId = recipe ? recipe.id : null;

        // Update modal title
        els.title.textContent = recipe ? 'Edit Recipe' : 'Add New Recipe';

        // Show/hide delete button
        if (els.deleteBtn) {
            els.deleteBtn.style.display = recipe ? 'inline-flex' : 'none';
        }

        // Reset form
        resetForm();

        if (recipe) {
            // Editing existing recipe - go straight to form
            populateForm(recipe);
            showRecipeForm();
        } else {
            // New recipe - show method selector
            showMethodSelector();
            
            // Add default ingredient rows
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
        const modal = getElements().modal;
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        editingRecipeId = null;
        sourceData = null;
        uploadedPhoto = null;
        currentInputMethod = null;
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

        // Save/Delete
        els.saveBtn?.addEventListener('click', save);
        els.deleteBtn?.addEventListener('click', deleteRecipe);

        // Input method cards
        els.methodCards?.forEach(card => {
            card.addEventListener('click', () => {
                selectInputMethod(card.dataset.method);
            });
        });

        // URL panel
        els.fetchUrlBtn?.addEventListener('click', fetchRecipeFromUrl);
        els.urlBackBtn?.addEventListener('click', showMethodSelector);
        els.urlRetryBtn?.addEventListener('click', fetchRecipeFromUrl);
        els.urlManualBtn?.addEventListener('click', () => selectInputMethod('manual'));
        els.recipeUrl?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                fetchRecipeFromUrl();
            }
        });

        // Cookbook panel
        els.cookbookBackBtn?.addEventListener('click', showMethodSelector);
        els.cookbookContinueBtn?.addEventListener('click', continueToCookbookForm);
        setupPhotoUpload();

        // Image preview
        setupImagePreview();

        // Add step button
        els.addStepBtn?.addEventListener('click', () => addStepRow());

        // Add ingredient buttons
        document.querySelectorAll('.add-ingredient-btn').forEach(btn => {
            btn.addEventListener('click', () => addIngredientRow(btn.dataset.category));
        });

        // Edit source button
        els.editSourceBtn?.addEventListener('click', () => {
            hideElement(els.sourceAttribution);
            if (els.sourceDetailsSection) {
                els.sourceDetailsSection.open = true;
            }
        });

        // Close on overlay click
        els.modal?.addEventListener('click', (e) => {
            if (e.target === els.modal) close();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && els.modal?.classList.contains('active')) {
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

        console.log('RecipeEditor v2 initialized');
    }

    return {
        init,
        open,
        close,
        isEditing: () => editingRecipeId !== null,
        getEditingId: () => editingRecipeId,
        getCurrentMethod: () => currentInputMethod
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecipeEditor;
}
