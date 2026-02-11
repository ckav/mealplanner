document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const recipeList = document.getElementById('recipe-list');
    const generateListBtn = document.getElementById('generate-list-btn');
    const shoppingListContainer = document.getElementById('shopping-list-container');
    const shoppingList = document.getElementById('shopping-list');
    const copyListBtn = document.getElementById('copy-list-btn');
    const mealPlan = document.getElementById('meal-plan');
    const mealPlanSummary = document.getElementById('meal-plan-summary');
    const recipeUrlInput = document.getElementById('recipe-url-input');
    const fetchRecipeBtn = document.getElementById('fetch-recipe-btn');
    const addRecipeForm = document.getElementById('add-recipe-form');
    const pantryList = document.getElementById('pantry-list');
    const addPantryItemForm = document.getElementById('add-pantry-item-form');
    const pantryItemNameInput = document.getElementById('pantry-item-name-input');
    const filterCuisine = document.getElementById('filter-cuisine');
    const filterTime = document.getElementById('filter-time');
    const filterFavourites = document.getElementById('filter-favourites');
    const filterResetBtn = document.getElementById('filter-reset-btn');
    const profileList = document.getElementById('profile-list');
    const addProfileForm = document.getElementById('add-profile-form');
    const activeProfilesList = document.getElementById('active-profiles-list');
    const dietaryFilters = document.getElementById('dietary-filters');
    const shoppingListItemsEl = document.getElementById('shopping-list-items');
    const copyShoppingListBtn = document.getElementById('copy-shopping-list');
    const clearShoppingListBtn = document.getElementById('clear-shopping-list');

    // Tab View Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const views = document.querySelectorAll('.view');

    // Modal elements
    const recipeModal = document.getElementById('recipe-modal');
    const modalRecipeName = document.getElementById('modal-recipe-name');
    const modalRecipeIngredients = document.getElementById('modal-recipe-ingredients');
    const modalRecipeInstructions = document.getElementById('modal-recipe-instructions');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalPortionPlus = document.getElementById('modal-portion-plus');
    const modalPortionMinus = document.getElementById('modal-portion-minus');
    const modalPortionDisplay = document.getElementById('modal-portion-display');
    const modalStatsBar = document.getElementById('modal-stats-bar');
    const modalAllergenIcons = document.getElementById('modal-allergen-icons');
    const modalSourceInfo = document.getElementById('modal-source-info');
    let modalCurrentRecipeId = null;

    // Initial Data
    let recipes = [
        {
            id: 1,
            name: 'Five-Bean Chilli',
            image: 'https://images.unsplash.com/photo-1586511925558-a4c6376fe658?q=80&w=2580&auto=format&fit=crop',
            cuisine: 'Mexican',
            time: 30,
            servings: 4,
            tags: ['Vegan', 'Vegetarian', 'Dairy-Free'],
            difficulty: 'Easy',
            calories: 450,
            protein: 15,
            source: 'BBC Good Food',
            sourceUrl: 'https://www.bbcgoodfood.com/recipes/five-bean-chilli',
            ingredients: ['1 tbsp olive oil', '1 onion, chopped', '2 garlic cloves, crushed', '1 red pepper, deseeded and diced', '1 yellow pepper, deseeded and diced', '400g can chopped tomatoes', '400g can kidney beans, drained', '400g can cannellini beans, drained', '400g can black beans, drained', '400g can pinto beans, drained', '400g can adzuki beans, drained', '1 tsp chilli powder', '1 tsp ground cumin', 'soured cream and grated cheese, to serve'],
            instructions: [
                { step: 1, text: 'Heat the oil in a large pan and cook the onion until soft.', time: 5 },
                { step: 2, text: 'Add the garlic and peppers and cook for 5 mins more.', time: 5 },
                { step: 3, text: 'Tip in the tomatoes and 200ml water. Add the beans, chilli powder and cumin, then bring to a simmer.' },
                { step: 4, text: 'Cook until the sauce has thickened.', time: 20 },
                { step: 5, text: 'Serve with soured cream and grated cheese.' }
            ]
        },
        {
            id: 2,
            name: 'Chicken and Apricot Curry',
            image: 'https://images.unsplash.com/photo-1625944022826-229a1a8376b3?q=80&w=2592&auto=format&fit=crop',
            cuisine: 'Indian',
            time: 35,
            servings: 2,
            tags: ['Gluten-Free', 'Dairy-Free'],
            difficulty: 'Medium',
            calories: 600,
            protein: 40,
            source: 'BBC Food',
            sourceUrl: 'https://www.bbc.co.uk/food/recipes/chicken_and_apricot_97224',
            ingredients: ['1 tbsp sunflower oil', '1 onion, chopped', '2 chicken breasts, skinned and cut into chunks', '2 tbsp medium curry paste', '400g can chopped tomatoes', '100g dried apricots, halved', '50g sultanas', '500ml chicken stock', 'cooked rice, to serve', 'fresh coriander, to garnish'],
            instructions: [
                { step: 1, text: 'Heat the oil in a large pan, add the onion and cook gently until softened.', time: 6 },
                { step: 2, text: 'Add the chicken and cook for a further 2-3 minutes, until sealed.', time: 3 },
                { step: 3, text: 'Stir in the curry paste and cook for 1 minute, then add the tomatoes, apricots, sultanas and stock.', time: 1 },
                { step: 4, text: 'Bring to the boil, then reduce the heat and simmer until the chicken is tender and the sauce has thickened.', time: 25 },
                { step: 5, text: 'Serve with cooked rice and garnish with fresh coriander.' }
            ]
        },
        {
            id: 3,
            name: 'Beer Battered Fish & Chips',
            image: 'https://images.unsplash.com/photo-1579887829622-f49a44327c2c?q=80&w=2574&auto=format&fit=crop',
            cuisine: 'British',
            time: 25,
            servings: 2,
            tags: ['Gluten-Free', 'Dairy-Free', 'Fish'],
            difficulty: 'Medium',
            calories: 850,
            protein: 35,
            source: 'Gluten Free Cuppa Tea',
            sourceUrl: 'https://glutenfreecuppatea.co.uk/2018/03/20/gluten-free-beer-battered-fish-and-chips-recipe-dairy-free-low-fodmap/',
            ingredients: ['175g gluten-free self-raising flour', '1 tsp salt', '275ml gluten-free beer', '4 large cod or haddock fillets', '2 tbsp gluten-free plain flour, for dusting', 'Vegetable oil, for frying', 'Chips, to serve', 'Mushy peas, to serve', 'Lemon wedges, to serve'],
            instructions: [
                { step: 1, text: 'For the batter, mix the gluten-free self-raising flour and salt in a bowl. Gradually pour in the beer, whisking until you have a smooth, thick batter.' },
                { step: 2, text: 'Pat the fish fillets dry with kitchen paper. Dust them lightly with the plain flour.' },
                { step: 3, text: 'Heat the oil in a deep-fat fryer or large saucepan to 180°C/350°F.' },
                { step: 4, text: 'Dip a fillet into the batter, coating it completely, and carefully place it into the hot oil.' },
                { step: 5, text: 'Fry until the batter is golden and crisp and the fish is cooked through. Cook in batches.', time: 8 },
                { step: 6, text: 'Remove from the oil and drain on kitchen paper. Serve immediately with chips, mushy peas, and a wedge of lemon.' }
            ]
        }
    ];

    // State Variables
    let recipeState = {};
    let pantryItems = ['olive oil', 'salt', 'sunflower oil', 'vegetable oil'];
    let favouriteRecipes = [];
    let mealPlanState = {};
    let profiles = [];
    let activeProfileIds = [];
    let selectedRecipes = []; 

    const allergenKeywords = {
        'Gluten': ['flour', 'wheat', 'barley', 'rye', 'bread', 'pasta'],
        'Crustaceans': ['prawn', 'crab', 'lobster', 'shrimp'],
        'Eggs': ['egg'],
        'Fish': ['fish', 'salmon', 'tuna', 'cod', 'haddock', 'anchovy'],
        'Peanuts': ['peanut'],
        'Soybeans': ['soy', 'tofu', 'edamame'],
        'Milk': ['milk', 'cheese', 'yogurt', 'cream', 'butter'],
        'Nuts': ['nut', 'almond', 'hazelnut', 'walnut', 'cashew', 'pecan', 'brazil', 'pistachio', 'macadamia'],
        'Celery': ['celery'],
        'Mustard': ['mustard'],
        'Sesame': ['sesame'],
        'Sulphites': ['sulphite', 'sulfite'],
        'Lupin': ['lupin'],
        'Molluscs': ['mollusc', 'mussel', 'oyster', 'scallop', 'squid']
    };

    const allergenIcons = {
        'Gluten': '🌾',
        'Crustaceans': '🦐',
        'Eggs': '🥚',
        'Fish': '🐟',
        'Peanuts': '🥜',
        'Soybeans': '🌱',
        'Milk': '🥛',
        'Nuts': '🌰',
        'Celery': '🌿',
        'Mustard': '🌭',
        'Sesame': ' sesame',
        'Sulphites': '🧪',
        'Lupin': '🌸',
        'Molluscs': '🐚'
    };

    // --- State Management ---

    const saveRecipeState = () => localStorage.setItem('recipeState', JSON.stringify(recipeState));
    const savePantryItems = () => localStorage.setItem('pantryItems', JSON.stringify(pantryItems));
    const saveFavouriteRecipes = () => localStorage.setItem('favouriteRecipes', JSON.stringify(favouriteRecipes));
    const saveMealPlanState = () => localStorage.setItem('mealPlanState', JSON.stringify(mealPlanState));
    const saveProfiles = () => localStorage.setItem('profiles', JSON.stringify(profiles));
    const saveActiveProfileIds = () => localStorage.setItem('activeProfileIds', JSON.stringify(activeProfileIds));

    const saveState = () => {
        saveRecipeState();
        savePantryItems();
        saveFavouriteRecipes();
        saveMealPlanState();
        saveProfiles();
        saveActiveProfileIds();
    };

    const loadState = () => {
        const loadedRecipes = JSON.parse(localStorage.getItem('recipes'));
        if (loadedRecipes) recipes = loadedRecipes;
        
        recipeState = JSON.parse(localStorage.getItem('recipeState')) || {};
        recipes.forEach(r => {
            if (!recipeState[r.id]) {
                recipeState[r.id] = { portions: r.servings };
            }
            if (!r.tags) r.tags = [];
            if (!r.difficulty) r.difficulty = 'N/A';
            if (!r.calories) r.calories = 0;
            if (!r.protein) r.protein = 0;
            if (r.isSimple === undefined) r.isSimple = false;
        });

        pantryItems = JSON.parse(localStorage.getItem('pantryItems')) || ['olive oil', 'salt', 'sunflower oil', 'vegetable oil'];
        favouriteRecipes = JSON.parse(localStorage.getItem('favouriteRecipes')) || [];
        mealPlanState = JSON.parse(localStorage.getItem('mealPlanState')) || {};
        profiles = JSON.parse(localStorage.getItem('profiles')) || [];
        activeProfileIds = JSON.parse(localStorage.getItem('activeProfileIds')) || [];
    };

    const initializeMealPlanState = () => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let needsUpdate = false;
        days.forEach(day => {
            if (!mealPlanState[day]) {
                mealPlanState[day] = [];
            }
            // Ensure 3 slots per day
            for (let i = 0; i < 3; i++) {
                if (!mealPlanState[day][i]) {
                    mealPlanState[day][i] = {
                        groupId: `slot_${day}_${i}_${Date.now()}`,
                        profileIds: [],
                        recipeId: null,
                        status: i === 0 ? 'empty' : 'skipped' // Main meal empty, extras skipped by default
                    };
                    needsUpdate = true;
                } else if (!mealPlanState[day][i].status) {
                    // Migration for existing data
                    mealPlanState[day][i].status = mealPlanState[day][i].recipeId ? 'active' : (i === 0 ? 'empty' : 'skipped');
                    needsUpdate = true;
                }
            }
            // Force length to 3 in case of weird sparse arrays
            if (mealPlanState[day].length < 3) {
                 mealPlanState[day].length = 3;
                 // Fill any undefined holes created by length extension
                 for (let i = 0; i < 3; i++) {
                     if (!mealPlanState[day][i]) {
                        mealPlanState[day][i] = {
                            groupId: `slot_${day}_${i}_${Date.now()}`,
                            profileIds: [],
                            recipeId: null,
                            status: i === 0 ? 'empty' : 'skipped'
                        };
                        needsUpdate = true;
                     }
                 }
            }
        });
        if (needsUpdate) saveMealPlanState();
    };

    // --- Helper Functions ---

    const getRecipeAllergens = (recipe) => {
        const allergens = new Set();
        const recipeText = `${recipe.name.toLowerCase()} ${recipe.ingredients.join(', ').toLowerCase()}`;
        for (const allergen in allergenKeywords) {
            if (allergenKeywords[allergen].some(keyword => recipeText.includes(keyword))) {
                allergens.add(allergen);
            }
        }
        recipe.tags.forEach(tag => {
            const matchedAllergen = Object.keys(allergenKeywords).find(a => a.toLowerCase() === tag.toLowerCase());
            if (matchedAllergen) {
                allergens.add(matchedAllergen);
            }
        });
        return Array.from(allergens);
    };

    const getRecipeAllergenIcons = (recipe) => {
        const allergens = getRecipeAllergens(recipe);
        if (allergens.length === 0) return '<span class="text-xs text-slate-400">No major allergens</span>';
        return allergens.map(allergen => {
            const icon = allergenIcons[allergen] || '❓';
            return `<span title="${allergen}" class="allergen-icon text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full flex items-center gap-1">${icon} ${allergen}</span>`;
        }).join('');
    };

    const scaleIngredient = (ingredient, portions, originalServings) => {
        if (portions === originalServings) return ingredient;
        const scaleFactor = portions / originalServings;
        
        return ingredient.replace(/(\d+\.?\d*)/g, (match) => {
            const num = parseFloat(match);
            const scaledNum = num * scaleFactor;
            if (scaledNum < 1 && scaledNum > 0) return scaledNum.toFixed(2);
            if (scaledNum % 1 !== 0) return scaledNum.toFixed(1);
            return Math.round(scaledNum);
        });
    };

    const parseIngredient = (ingredient) => {
        const regex = /^(\d+\.?\d*)\s*([a-zA-Z]+)?\s*(.*)/;
        const match = ingredient.match(regex);
        if (match) {
            const [, quantity, unit, name] = match;
            return [parseFloat(quantity), unit || '', name.trim()];
        }
        return [null, '', ingredient.trim()];
    };

    const formatIngredient = ({ quantity, unit, name }) => {
        let str = '';
        if (quantity) {
            if (quantity === 0.25) str += '1/4 ';
            else if (quantity === 0.5) str += '1/2 ';
            else if (quantity === 0.75) str += '3/4 ';
            else if (quantity === 0.33) str += '1/3 ';
            else if (quantity === 0.66) str += '2/3 ';
            else str += `${parseFloat(quantity.toFixed(2))} `;
        }
        if (unit) {
            str += `${unit} `;
        }
        str += name;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // --- Rendering Functions ---

    const renderRecipes = (recipesToRender) => {
        recipeList.innerHTML = '';
        if (recipesToRender.length === 0) {
            recipeList.innerHTML = `<p class="text-slate-400 col-span-full">No recipes match your filters.</p>`;
            return;
        }
        recipesToRender.forEach(recipe => {
            const isFavourite = favouriteRecipes.includes(recipe.id);
            const allergens = getRecipeAllergenIcons(recipe);

            const recipeCard = document.createElement('div');
            recipeCard.className = `recipe-card rounded-lg cursor-pointer border-2 overflow-hidden bg-slate-50 hover:shadow-lg transition-shadow relative flex flex-col`;
            recipeCard.dataset.id = recipe.id;
            recipeCard.draggable = true;
            
            recipeCard.innerHTML = `
                <div class="relative">
                    <img src="${recipe.image}" alt="${recipe.name}" class="w-full h-32 object-cover pointer-events-none">
                    <button class="favourite-btn absolute top-2 right-2 text-2xl ${isFavourite ? 'text-red-500' : 'text-slate-300 bg-white/50 rounded-full hover:text-red-400'} transition-colors">♥</button>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="font-bold text-base mb-2">${recipe.name}</h3>
                    
                    <div class="text-xs text-slate-600 grid grid-cols-3 gap-2 mb-3">
                        <div class="flex items-center gap-1"><span>🕒</span> ${recipe.time} min</div>
                        <div class="flex items-center gap-1"><span>🔥</span> ${recipe.calories} kcal</div>
                        <div class="flex items-center gap-1"><span>💪</span> ${recipe.protein}g</div>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-3">
                        ${allergens}
                    </div>

                    <div class="flex-grow"></div>
                    <div class="flex justify-between items-center mt-auto">
                        <button class="view-recipe-btn text-sm text-blue-600 hover:underline">View Details</button>
                        <button class="add-to-plan-btn bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg text-sm">+ Add</button>
                    </div>
                </div>
                <div class="day-picker-overlay hidden absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex justify-around items-center">
                    ${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `<button class="day-picker-btn text-white font-bold text-xs" data-day="${day}">${day.substring(0,3)}</button>`).join('')}
                </div>
            `;
            recipeList.appendChild(recipeCard);
        });
    };

    const createMealPlanCard = (recipe, personCount) => {
        const card = document.createElement('div');
        card.className = 'meal-plan-card text-sm bg-white rounded-md cursor-pointer relative p-2 border shadow-sm h-full flex flex-col justify-center';
        card.dataset.recipeId = recipe.id;
        
        let personCountHTML = '';
        if (personCount > 0) {
            personCountHTML = `<div class="absolute top-1 right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">${personCount}</div>`;
        }

        card.innerHTML = `
            <div class="font-semibold line-clamp-2">${recipe.name}</div>
            ${!recipe.isSimple ? `<div class="text-slate-500 text-xs">${recipe.cookTime || recipe.time} min</div>` : ''}
            ${personCountHTML}
        `;
        return card;
    };

    const renderMealPlan = () => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        mealPlan.innerHTML = ''; 
        
        // Header Row
        const headerRow = document.createElement('div');
        headerRow.className = 'grid grid-cols-[100px_1fr_1fr_1fr] gap-4 mb-4 px-3 font-bold text-slate-600 text-center';
        headerRow.innerHTML = `
            <div></div>
            <div>Main Meal</div>
            <div>Extra Meal</div>
            <div>Extra Meal</div>
        `;
        mealPlan.appendChild(headerRow);

        let totalSelected = 0;
        let totalRequired = 0;

        days.forEach(day => {
            const dayRow = document.createElement('div');
            dayRow.className = 'day-row bg-white rounded-lg p-3 shadow grid grid-cols-[100px_1fr_1fr_1fr] gap-4 items-center mb-2';
            dayRow.dataset.day = day;
            
            // Day Name
            const dayNameEl = document.createElement('div');
            dayNameEl.className = 'font-bold text-lg text-slate-600';
            dayNameEl.textContent = day;
            dayRow.appendChild(dayNameEl);

            // Slots
            const slots = mealPlanState[day];
            slots.forEach((slot, index) => {
                const slotEl = document.createElement('div');
                slotEl.className = 'meal-slot relative min-h-[80px] rounded-md transition-all';
                slotEl.dataset.index = index;
                
                if (slot.status === 'skipped') {
                    slotEl.className += ' bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 text-xs';
                    slotEl.innerHTML = `
                        <span>Not needed</span>
                        <button class="restore-slot-btn absolute top-1 right-1 text-slate-400 hover:text-blue-500 font-bold px-2" title="Add meal">+</button>
                    `;
                } else if (slot.recipeId) {
                    totalSelected++;
                    totalRequired++;
                    const recipe = recipes.find(r => r.id === slot.recipeId);
                    if (recipe) {
                        slotEl.innerHTML = createMealPlanCard(recipe, slot.profileIds.length).outerHTML;
                        // Add remove button overlay
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'remove-meal-btn absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600 z-10';
                        removeBtn.innerHTML = '✕';
                        removeBtn.title = "Remove meal";
                        
                        // Wrap content to handle hover for button visibility
                        slotEl.classList.add('group');
                        slotEl.appendChild(removeBtn);
                    }
                } else {
                    // Empty
                    totalRequired++;
                    slotEl.className += ' bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs cursor-pointer hover:bg-slate-100 hover:border-slate-400';
                    slotEl.innerHTML = `
                        <span class="pointer-events-none">Click to add</span>
                        <div class="flex gap-2 mt-2">
                            <button class="skip-slot-btn text-[10px] bg-slate-200 px-2 py-1 rounded hover:bg-slate-300" title="Not needed">Skip</button>
                        </div>
                    `;
                }
                
                dayRow.appendChild(slotEl);
            });

            mealPlan.appendChild(dayRow);
        });

        mealPlanSummary.textContent = `${totalSelected} of ${totalRequired} meals selected`;
    };

    const renderFamilyProfiles = () => {
        if (!profileList) return;
        profileList.innerHTML = '';
        profiles.forEach(profile => {
            const isActive = activeProfileIds.includes(profile.id);
            const profileCard = document.createElement('div');
            profileCard.className = `profile-card p-3 rounded-lg cursor-pointer border-2 ${isActive ? 'bg-blue-100 border-blue-400' : 'bg-white'}`;
            profileCard.dataset.profileId = profile.id;
            profileCard.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="font-bold">${profile.name}</div>
                    <div class="flex items-center gap-2">
                        <button class="edit-profile-btn text-sm text-slate-500 hover:text-slate-800">✏️</button>
                        <div class="text-xs ${isActive ? 'text-blue-800' : 'text-slate-500'}">${isActive ? 'Active' : 'Inactive'}</div>
                    </div>
                </div>
                <div class="text-xs mt-2">
                    <p><strong>Allergies:</strong> ${profile.allergies.join(', ') || 'None'}</p>
                    <p><strong>Dislikes:</strong> ${profile.dislikes.join(', ') || 'None'}</p>
                </div>
            `;
            profileList.appendChild(profileCard);
        });
    };

    const initializeProfileAllergenCheckboxes = () => {
        const checkboxContainer = document.getElementById('profile-allergens-checkboxes');
        if (!checkboxContainer) return;

        checkboxContainer.innerHTML = '';
        
        Object.keys(allergenKeywords).forEach(allergen => {
            const label = document.createElement('label');
            label.className = 'flex items-center gap-2 cursor-pointer text-sm';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'w-4 h-4 text-red-600 rounded';
            checkbox.value = allergen;
            checkbox.dataset.allergen = allergen;
            
            const icon = allergenIcons[allergen] || '❓';
            const labelText = document.createTextNode(`${icon} ${allergen}`);
            
            label.appendChild(checkbox);
            label.appendChild(labelText);
            checkboxContainer.appendChild(label);
        });
    };

    const renderShoppingList = () => {
        if (!shoppingListItemsEl) return;

        const allIngredients = new Map();
        const recipesInPlan = Object.values(mealPlanState).flat().map(group => group.recipeId).filter(Boolean);

        recipesInPlan.forEach(recipeId => {
            const recipe = recipes.find(r => r.id === recipeId);
            if (!recipe) return;

            const portions = recipeState[recipeId] ? recipeState[recipeId].portions : recipe.servings;
            const originalServings = recipe.servings;

            recipe.ingredients.forEach(ingredient => {
                const scaledIngredient = scaleIngredient(ingredient, portions, originalServings);
                const [quantity, unit, name] = parseIngredient(scaledIngredient);
                
                if (!name) return; 

                const key = name.toLowerCase();
                if (allIngredients.has(key)) {
                    const existing = allIngredients.get(key);
                    if (existing.unit === unit && typeof existing.quantity === 'number' && typeof quantity === 'number') {
                        existing.quantity += quantity;
                    } else {
                        allIngredients.set(key + Math.random(), { quantity, unit, name });
                    }
                } else {
                    allIngredients.set(key, { quantity, unit, name });
                }
            });
        });

        const pantryItemsLower = pantryItems.map(item => item.toLowerCase());
        const ingredientsToBuy = [...allIngredients.values()].filter(ing => {
            return !pantryItemsLower.some(pantryItem => ing.name.toLowerCase().includes(pantryItem));
        });

        shoppingListItemsEl.innerHTML = '';
        if (ingredientsToBuy.length === 0) {
            shoppingListItemsEl.innerHTML = '<li class="text-slate-500">Your shopping list is empty. Add some meals to your plan!</li>';
        } else {
            ingredientsToBuy.forEach(ing => {
                const li = document.createElement('li');
                li.className = 'p-3 bg-slate-50 rounded-md flex items-center justify-between';
                li.innerHTML = `
                    <span>${formatIngredient(ing)}</span>
                    <button class="text-slate-400 hover:text-red-500 remove-item-btn">✖</button>
                `;
                li.dataset.itemName = ing.name;
                shoppingListItemsEl.appendChild(li);
            });
        }
    };

    const applyFiltersAndRender = () => {
        const activeAllergens = Array.from(document.querySelectorAll('#allergen-filters button.active')).map(btn => btn.dataset.allergen);
        const searchTerm = document.getElementById('recipe-search') ? document.getElementById('recipe-search').value.toLowerCase() : '';
        const cookTimeFilter = document.getElementById('cook-time-filter') ? document.getElementById('cook-time-filter').value : 'all';

        const filteredRecipes = recipes.filter(recipe => {
            if (recipe.isSimple) return false; 

            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
            
            const recipeAllergens = getRecipeAllergens(recipe);
            const matchesAllergens = activeAllergens.every(allergen => !recipeAllergens.includes(allergen));
            
            let matchesCookTime = true;
            if (cookTimeFilter && cookTimeFilter !== 'all') {
                const time = parseInt(recipe.cookTime || recipe.time, 10);
                matchesCookTime = time <= parseInt(cookTimeFilter, 10);
            }

            return matchesSearch && matchesAllergens && matchesCookTime;
        });

        renderRecipes(filteredRecipes);
    };

    // --- Interaction Handlers ---

    const handleSlotSearch = (day, index, container) => {
        // Prevent multiple inputs
        if (container.querySelector('input')) return;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'quick-add-input w-full h-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none';
        input.placeholder = 'Search or type new meal...';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown hidden';
        
        // Save current content to restore if cancelled
        container.innerHTML = '';
        container.className = 'meal-slot relative min-h-[80px] rounded-md'; // Reset classes
        container.appendChild(input);
        container.appendChild(dropdown);
        input.focus();

        let isSaving = false;

        const saveQuickMeal = (name) => {
            if (isSaving) return;
            isSaving = true;

            const mealName = name || input.value.trim();
            if (mealName) {
                // Create simple recipe
                const simpleRecipe = {
                    id: `simple_${Date.now()}`,
                    name: mealName,
                    isSimple: true,
                    cookTime: 'N/A',
                    servings: 'N/A',
                    ingredients: [{ name: mealName, quantity: '1' }],
                    instructions: 'N/A',
                    allergens: []
                };
                
                recipes.push(simpleRecipe);
                addRecipeToMealPlan(simpleRecipe.id, day, index);
            } else {
                renderMealPlan();
            }
        };

        const updateDropdown = () => {
            const query = input.value.toLowerCase().trim();
            dropdown.innerHTML = '';
            
            if (!query) {
                dropdown.classList.add('hidden');
                return;
            }

            const matches = recipes.filter(r => r.name.toLowerCase().includes(query)).slice(0, 5);
            
            matches.forEach(recipe => {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.textContent = recipe.name;
                item.addEventListener('mousedown', (e) => {
                    e.preventDefault(); // Prevent blur
                    addRecipeToMealPlan(recipe.id, day, index);
                });
                dropdown.appendChild(item);
            });

            // Quick Add Option
            const quickAddItem = document.createElement('div');
            quickAddItem.className = 'search-result-item quick-add-option';
            quickAddItem.textContent = `+ Quick add "${input.value}"`;
            quickAddItem.addEventListener('mousedown', (e) => {
                e.preventDefault();
                saveQuickMeal();
            });
            dropdown.appendChild(quickAddItem);

            dropdown.classList.remove('hidden');
        };

        input.addEventListener('input', updateDropdown);

        input.addEventListener('blur', () => {
            // Delay to allow click events on dropdown to fire
            setTimeout(() => {
                if (!isSaving) renderMealPlan();
            }, 200);
        });
        
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveQuickMeal();
            } else if (e.key === 'Escape') {
                renderMealPlan();
            }
        });
    };

    const addRecipeToMealPlan = (recipeId, day, index) => {
        if (!mealPlanState[day]) mealPlanState[day] = [];
        
        if (!mealPlanState[day][index]) {
            mealPlanState[day][index] = { groupId: `slot_${day}_${index}_${Date.now()}`, profileIds: [], recipeId: null, status: 'empty' };
        }

        mealPlanState[day][index].recipeId = recipeId;
        mealPlanState[day][index].status = 'active';

        saveMealPlanState();
        renderMealPlan();
    };

    const toggleSlotState = (day, index, newState) => {
        if (!mealPlanState[day]) mealPlanState[day] = [];
        if (!mealPlanState[day][index]) {
            mealPlanState[day][index] = { groupId: `slot_${day}_${index}_${Date.now()}`, profileIds: [], recipeId: null, status: 'empty' };
        }
        
        mealPlanState[day][index].status = newState;
        if (newState === 'empty' || newState === 'skipped') {
            mealPlanState[day][index].recipeId = null;
        }
        
        saveMealPlanState();
        renderMealPlan();
    };

    const toggleFavourite = (recipeId) => {
        const index = favouriteRecipes.indexOf(recipeId);
        if (index > -1) {
            favouriteRecipes.splice(index, 1);
        } else {
            favouriteRecipes.push(recipeId);
        }
        saveFavouriteRecipes();
        applyFiltersAndRender();
    };

    const updatePortions = (recipeId, change) => {
        const state = recipeState[recipeId];
        const newPortions = Math.max(1, state.portions + change);
        if (state.portions !== newPortions) {
            state.portions = newPortions;
            saveRecipeState();
            applyFiltersAndRender();
            if (modalCurrentRecipeId === recipeId) {
                updateModalPortions(recipeId);
            }
        }
    };

    const openRecipeModal = (id) => {
        const recipeId = parseInt(id);
        const recipe = recipes.find(r => r.id == recipeId);
        if (!recipe) {
            console.error(`Recipe with ID ${recipeId} not found.`);
            return;
        }

        modalCurrentRecipeId = recipeId;
        modalRecipeName.textContent = recipe.name;
        updateModalPortions(recipeId);
        
        recipeModal.classList.remove('hidden');
        recipeModal.classList.add('flex');
    };

    const updateModalPortions = (recipeId) => {
        const recipe = recipes.find(r => r.id == recipeId);
        const portions = recipeState[recipeId].portions;
        const originalServings = recipe.servings;

        modalPortionDisplay.textContent = portions;
        
        modalStatsBar.innerHTML = `
            <div><span class="font-bold">🕒 ${recipe.time}</span> min</div>
            <div><span class="font-bold">🔥 ${Math.round(recipe.calories * (portions / originalServings))}</span> kcal</div>
            <div><span class="font-bold">💪 ${Math.round(recipe.protein * (portions / originalServings))}</span>g protein</div>
            <div><span class="font-bold">📊</span> ${recipe.difficulty}</div>
        `;

        modalAllergenIcons.innerHTML = getRecipeAllergenIcons(recipe);

        const scaledIngredients = recipe.ingredients.map(ing => scaleIngredient(ing, portions, originalServings));
        modalRecipeIngredients.innerHTML = scaledIngredients.map(ing => `<li>${ing}</li>`).join('');
        
        modalRecipeInstructions.innerHTML = recipe.instructions.map(instr => {
            const timeHtml = instr.time ? `<span class="text-sm font-bold text-green-600 ml-2">[~${instr.time} min]</span>` : '';
            return `<div class="flex items-start gap-4"><div class="bg-green-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold flex-shrink-0">${instr.step}</div><p>${instr.text}${timeHtml}</p></div>`;
        }).join('');

        if (recipe.source && recipe.sourceUrl) {
            modalSourceInfo.innerHTML = `
                Recipe source: ${recipe.source}
                <a href="${recipe.sourceUrl}" target="_blank" class="text-blue-600 hover:underline ml-2">View original recipe →</a>
            `;
        } else {
            modalSourceInfo.innerHTML = '';
        }
    };

    const closeRecipeModal = () => {
        recipeModal.classList.add('hidden');
        recipeModal.classList.remove('flex');
        modalCurrentRecipeId = null;
    };

    const switchView = (viewName) => {
        views.forEach(view => {
            const isActive = view.id === `${viewName}-view`;
            view.classList.toggle('active', isActive);
            // Explicitly toggle hidden class for Tailwind compatibility
            if (isActive) {
                view.classList.remove('hidden');
            } else {
                view.classList.add('hidden');
            }
        });
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.view === viewName);
        });

        if (viewName === 'shopping') {
            renderShoppingList();
        }
    };

    // --- Event Listeners ---

    const setupEventListeners = () => {
        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                switchView(button.dataset.view);
            });
        });

        // Recipe search and filters
        const recipeSearch = document.getElementById('recipe-search');
        const cookTimeFilter = document.getElementById('cook-time-filter');
        const allergenFilters = document.getElementById('allergen-filters');

        if(recipeSearch) recipeSearch.addEventListener('input', applyFiltersAndRender);
        if(cookTimeFilter) cookTimeFilter.addEventListener('change', applyFiltersAndRender);
        
        if (allergenFilters) {
            allergenFilters.addEventListener('click', e => {
                if (e.target.tagName === 'BUTTON') {
                    e.target.classList.toggle('active');
                    e.target.classList.toggle('bg-red-500');
                    e.target.classList.toggle('text-white');
                    applyFiltersAndRender();
                }
            });
        }

        // Recipe List Interactions
        recipeList.addEventListener('click', (e) => {
            const card = e.target.closest('.recipe-card');
            if (!card) return;
    
            const recipeId = parseInt(card.dataset.id);
    
            if (e.target.classList.contains('view-recipe-btn')) {
                openRecipeModal(recipeId);
                return; 
            }
            
            if (e.target.classList.contains('favourite-btn')) {
                toggleFavourite(recipeId);
                return;
            }
            
            if (e.target.classList.contains('add-to-plan-btn')) {
                const overlay = card.querySelector('.day-picker-overlay');
                document.querySelectorAll('.day-picker-overlay').forEach(o => {
                    if (o !== overlay) o.classList.add('hidden');
                });
                overlay.classList.toggle('hidden');
                return;
            }
            
            if (e.target.classList.contains('day-picker-btn')) {
                const day = e.target.dataset.day;
                // Default to first slot for "Add" button from recipe list
                addRecipeToMealPlan(recipeId, day, 0);
    
                const addBtn = card.querySelector('.add-to-plan-btn');
                addBtn.textContent = '✓ Added';
                addBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                addBtn.classList.add('bg-blue-500');
                setTimeout(() => {
                    addBtn.textContent = '+ Add';
                    addBtn.classList.remove('bg-blue-500');
                    addBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                }, 1500);
                
                e.target.closest('.day-picker-overlay').classList.add('hidden');
                return;
            }
    
            if (!e.target.closest('button')) {
                openRecipeModal(recipeId);
            }
        });

        // Hide day picker if clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.recipe-card')) {
                document.querySelectorAll('.day-picker-overlay').forEach(o => o.classList.add('hidden'));
            }
        });

        // Modal Interactions
        modalPortionPlus.addEventListener('click', () => {
            if (modalCurrentRecipeId) updatePortions(modalCurrentRecipeId, 1);
        });
        modalPortionMinus.addEventListener('click', () => {
            if (modalCurrentRecipeId) updatePortions(modalCurrentRecipeId, -1);
        });
        closeModalBtn.addEventListener('click', closeRecipeModal);
        recipeModal.addEventListener('click', (e) => {
            if (e.target === recipeModal) {
                closeRecipeModal();
            }
        });

        // Add Recipe Form
        addRecipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('recipe-name').value;
            const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
            const instructions = document.getElementById('recipe-instructions').value;
            const servings = parseInt(document.getElementById('recipe-servings').value) || 2;
    
            if (name && ingredients.length > 0 && instructions) {
                const newRecipe = {
                    id: recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1,
                    name,
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop', 
                    cuisine: 'Uncategorized',
                    time: 30,
                    servings,
                    tags: [], 
                    ingredients,
                    instructions: instructions.split('\n').map((text, i) => ({ step: i + 1, text }))
                };
                
                const recipeText = `${name.toLowerCase()} ${ingredients.join(' ').toLowerCase()}`;
                if (recipeText.includes('chicken') || recipeText.includes('beef') || recipeText.includes('pork') || recipeText.includes('lamb')) {
                    // Not vegetarian
                } else if (recipeText.includes('fish') || recipeText.includes('prawns') || recipeText.includes('shrimp')) {
                    newRecipe.tags.push('Fish');
                } else {
                    newRecipe.tags.push('Vegetarian');
                    if (!recipeText.includes('cheese') && !recipeText.includes('milk') && !recipeText.includes('egg') && !recipeText.includes('honey')) {
                        newRecipe.tags.push('Vegan');
                    }
                }
                if (!recipeText.includes('gluten') && !recipeText.includes('flour') && !recipeText.includes('bread') && !recipeText.includes('pasta')) {
                     newRecipe.tags.push('Gluten-Free');
                }
    
                recipes.push(newRecipe);
                if (!recipeState[newRecipe.id]) {
                    recipeState[newRecipe.id] = { portions: newRecipe.servings };
                }
                saveRecipeState();
                applyFiltersAndRender();
                addRecipeForm.reset();
            }
        });

        // Fetch Recipe Button
        fetchRecipeBtn.addEventListener('click', async () => {
            const url = recipeUrlInput.value.trim();
            if (!url) {
                alert('Please enter a URL.');
                return;
            }
    
            fetchRecipeBtn.textContent = 'Fetching...';
            fetchRecipeBtn.disabled = true;
    
            try {
                alert("This is a demo of the fetch feature. In a real app, this would scrape the website. For now, I'll add the 'Soy and Chilli Chicken' recipe for you.");
                
                const exampleRecipe = {
                    name: 'Soy and Chilli Chicken',
                    servings: 4,
                    ingredients: '600g chicken thighs, 2 tbsp dark soy sauce, 2 tbsp sweet chilli sauce, 1 lime, 2 garlic cloves, 1 red chilli, 2cm piece of ginger, rice to serve',
                    instructions: '1. Mix soy and chilli sauce.\n2. Add chicken and marinate.\n3. Cook in a hot pan until cooked through.'
                };
    
                document.getElementById('recipe-name').value = exampleRecipe.name;
                document.getElementById('recipe-servings').value = exampleRecipe.servings;
                document.getElementById('recipe-ingredients').value = exampleRecipe.ingredients;
                document.getElementById('recipe-instructions').value = exampleRecipe.instructions;
    
            } catch (error) {
                console.error('Error fetching recipe:', error);
                alert('Failed to fetch recipe. This is a demo feature.');
            } finally {
                fetchRecipeBtn.textContent = 'Fetch Recipe';
                fetchRecipeBtn.disabled = false;
                recipeUrlInput.value = '';
            }
        });
        
        // Meal Plan Interactions (Quick Add, Skip, Restore, Remove)
        mealPlan.addEventListener('click', e => {
            const slotEl = e.target.closest('.meal-slot');
            if (!slotEl) return;

            const dayRow = slotEl.closest('.day-row');
            const day = dayRow.dataset.day;
            const index = parseInt(slotEl.dataset.index);

            // Handle Buttons
            if (e.target.closest('.skip-slot-btn')) {
                e.stopPropagation();
                toggleSlotState(day, index, 'skipped');
                return;
            }
            if (e.target.closest('.restore-slot-btn')) {
                e.stopPropagation();
                toggleSlotState(day, index, 'empty');
                return;
            }
            if (e.target.closest('.remove-meal-btn')) {
                e.stopPropagation();
                toggleSlotState(day, index, 'empty');
                return;
            }

            // Handle Slot Click (Quick Add)
            // Only if it's an empty slot and not clicking a button
            if (slotEl.classList.contains('cursor-pointer') && !e.target.closest('button')) {
                handleSlotSearch(day, index, slotEl);
            }
        });

        // Shopping List listeners
        if (copyShoppingListBtn) {
            copyShoppingListBtn.addEventListener('click', () => {
                const listItems = Array.from(shoppingListItemsEl.querySelectorAll('li span'));
                const textToCopy = listItems.map(item => item.textContent).join('\n');
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('Shopping list copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        }

        if (clearShoppingListBtn) {
            clearShoppingListBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your entire meal plan? This cannot be undone.')) {
                    mealPlanState = {};
                    saveMealPlanState();
                    renderMealPlan();
                    renderShoppingList();
                }
            });
        }
        
        if (shoppingListItemsEl) {
            shoppingListItemsEl.addEventListener('click', e => {
                if (e.target.classList.contains('remove-item-btn')) {
                    const itemEl = e.target.closest('li');
                    const itemName = itemEl.dataset.itemName;
                    itemEl.remove();
                    if (itemName && !pantryItems.includes(itemName)) {
                        pantryItems.push(itemName);
                        savePantryItems();
                    }
                }
            });
        }

        // Drag and Drop
        recipeList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('recipe-card')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.classList.add('opacity-50');
            }
        });
    
        recipeList.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('recipe-card')) {
                e.target.classList.remove('opacity-50');
            }
        });
    
        mealPlan.addEventListener('dragover', (e) => {
            e.preventDefault();
            const slotEl = e.target.closest('.meal-slot');
            if (slotEl) {
                slotEl.classList.add('bg-green-100');
            }
        });
    
        mealPlan.addEventListener('dragleave', (e) => {
            const slotEl = e.target.closest('.meal-slot');
            if (slotEl) {
                slotEl.classList.remove('bg-green-100');
            }
        });
    
        mealPlan.addEventListener('drop', (e) => {
            e.preventDefault();
            const slotEl = e.target.closest('.meal-slot');
            const dayRow = e.target.closest('.day-row');
            
            if (dayRow && slotEl) {
                slotEl.classList.remove('bg-green-100');
                
                const recipeId = e.dataTransfer.getData('text/plain');
                const day = dayRow.dataset.day;
                const index = parseInt(slotEl.dataset.index);
                
                addRecipeToMealPlan(recipeId, day, index);
            }
        });

        // Profile Form Handler
        if (addProfileForm) {
            addProfileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('profile-name-input').value.trim();
                const dislikes = document.getElementById('profile-dislikes-input').value.split(',').map(d => d.trim()).filter(Boolean);
                
                // Get selected allergens from checkboxes
                const allergenCheckboxes = document.querySelectorAll('#profile-allergens-checkboxes input[type="checkbox"]:checked');
                const allergies = Array.from(allergenCheckboxes).map(cb => cb.dataset.allergen);
                
                if (name) {
                    const newProfile = {
                        id: `profile_${Date.now()}`,
                        name,
                        allergies,
                        dislikes
                    };
                    
                    profiles.push(newProfile);
                    activeProfileIds.push(newProfile.id);
                    
                    saveProfiles();
                    saveActiveProfileIds();
                    renderFamilyProfiles();
                    
                    // Reset form and checkboxes
                    addProfileForm.reset();
                    initializeProfileAllergenCheckboxes();
                }
            });
        }

        // Profile Card Click Handler (Toggle active/inactive)
        profileList.addEventListener('click', (e) => {
            const card = e.target.closest('.profile-card');
            if (!card) return;
            
            const profileId = card.dataset.profileId;
            const index = activeProfileIds.indexOf(profileId);
            
            if (index > -1) {
                activeProfileIds.splice(index, 1);
            } else {
                activeProfileIds.push(profileId);
            }
            
            saveActiveProfileIds();
            renderFamilyProfiles();
        });
    };

    const initializeAllergenFilters = () => {
        const allergenFiltersContainer = document.getElementById('allergen-filters');
        if (!allergenFiltersContainer) return;

        allergenFiltersContainer.innerHTML = '';
        
        Object.keys(allergenKeywords).forEach(allergen => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.dataset.allergen = allergen;
            btn.className = 'allergen-filter-btn px-3 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-800 border-2 border-slate-200 hover:border-slate-400 transition-all';
            btn.title = `Click to avoid ${allergen}`;
            
            const icon = allergenIcons[allergen] || '❓';
            btn.innerHTML = `${icon} ${allergen}`;
            
            allergenFiltersContainer.appendChild(btn);
        });
    };

    const init = () => {
        initializeAllergenFilters();
        initializeProfileAllergenCheckboxes();
        loadState();
        initializeMealPlanState();
        renderFamilyProfiles();
        renderMealPlan();
        applyFiltersAndRender(); 
        setupEventListeners();
        switchView('planner');
    };

    init();
});
