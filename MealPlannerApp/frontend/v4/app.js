// ===========================================
// MEAL PLANNER v3 — Application Logic
// ===========================================

// --- Allergen System (UK 14 allergens) ---
const ALLERGENS = {
    'Gluten': { icon: '🌾', keywords: ['flour','wheat','barley','rye','bread','pasta','spaghetti','noodles'] },
    'Crustaceans': { icon: '🦐', keywords: ['prawn','crab','lobster','shrimp'] },
    'Eggs': { icon: '🥚', keywords: ['egg'] },
    'Fish': { icon: '🐟', keywords: ['fish','salmon','tuna','cod','haddock','anchovy'] },
    'Peanuts': { icon: '🥜', keywords: ['peanut'] },
    'Soybeans': { icon: '🌱', keywords: ['soy','tofu','edamame','miso'] },
    'Milk': { icon: '🥛', keywords: ['milk','cheese','yogurt','cream','butter','parmesan'] },
    'Nuts': { icon: '🌰', keywords: ['nut','almond','hazelnut','walnut','cashew','pecan','pistachio'] },
    'Celery': { icon: '🌿', keywords: ['celery'] },
    'Mustard': { icon: '🟡', keywords: ['mustard'] },
    'Sesame': { icon: '🫘', keywords: ['sesame'] },
    'Sulphites': { icon: '🧪', keywords: ['sulphite','sulfite','wine'] },
    'Lupin': { icon: '🌸', keywords: ['lupin'] },
    'Molluscs': { icon: '🐚', keywords: ['mussel','oyster','scallop','squid'] },
};

// --- Filter System Constants ---
const CUISINE_OPTIONS = [
    { label: 'American', value: 'american' },
    { label: 'Asian', value: 'asian' },
    { label: 'Asian-Fusion', value: 'asian-fusion' },
    { label: 'British', value: 'british' },
    { label: 'Chinese', value: 'chinese' },
    { label: 'Fusion', value: 'fusion' },
    { label: 'Greek', value: 'greek' },
    { label: 'Indian', value: 'indian' },
    { label: 'Italian', value: 'italian' },
    { label: 'Japanese', value: 'japanese' },
    { label: 'Korean', value: 'korean' },
    { label: 'Mediterranean', value: 'mediterranean' },
    { label: 'Mexican', value: 'mexican' },
    { label: 'Middle Eastern', value: 'middle-eastern' },
    { label: 'Moroccan', value: 'moroccan' },
    { label: 'Thai', value: 'thai' },
    { label: 'Turkish', value: 'turkish' },
];

const COOK_TIME_OPTIONS = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: 'Any', value: null },
];

const EFFORT_OPTIONS = [
    { label: 'Quick & Easy', hint: '≤5 ingredients', maxIngredients: 5 },
    { label: 'Weeknight', hint: '≤8 ingredients', maxIngredients: 8 },
    { label: 'Weekend Project', hint: 'Any complexity', maxIngredients: null },
];

const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Pescatarian', 'Dairy-Free', 'Gluten-Free', 'Nut-Free', 'Egg-Free', 'Soy-Free', 'Healthy'];

const SORT_OPTIONS = [
    { label: 'Recently Added', value: 'recent' },
    { label: 'Favourites First', value: 'favourites' },
    { label: 'Quick & Easy', value: 'quick' },
    { label: 'Solo-Friendly', value: 'solo' },
    { label: 'Never Tried', value: 'never-tried' },
    { label: 'Surprise Me 🎲', value: 'random' },
];

const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="#e5e7eb"/>
                <stop offset="100%" stop-color="#f3f4f6"/>
            </linearGradient>
        </defs>
        <rect width="600" height="400" fill="url(#g)"/>
        <rect x="24" y="24" width="552" height="352" rx="20" fill="#ffffff" opacity="0.6"/>
        <text x="50%" y="52%" text-anchor="middle" font-family="'DM Sans', Arial" font-size="28" fill="#9ca3af">Image unavailable</text>
    </svg>`
)}`;
const IMAGE_FALLBACK_ATTR = `onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';"`;

function detectAllergens(recipe) {
    const text = recipe.ingredients.map(i => `${i.name} ${i.prep||''}`).join(' ').toLowerCase() + ' ' + recipe.name.toLowerCase();
    const found = [];
    for (const [name, data] of Object.entries(ALLERGENS)) {
        if (data.keywords.some(kw => text.includes(kw))) found.push(name);
    }
    return found;
}

// --- State ---
let state = {
    currentView: 'recipes',
    weekOffset: 0,
    mealPlan: {},
    pantryItems: [
        'olive oil','vegetable oil','sesame oil',
        'salt','pepper','chilli powder','ground cumin','paprika','turmeric','cinnamon','dried mixed herbs','garlic powder','ground coriander',
        'soy sauce','honey','tomato puree','worcestershire sauce','mustard','balsamic vinegar',
        'rice','pasta','plain flour','self-raising flour',
        'sugar',
        'chicken stock cubes','vegetable stock cubes',
    ],
    fridgeItems: [],
    fridgeFilterEnabled: false,
    profiles: [],
    activeProfileIds: [],
    favouriteRecipes: ['thai-green-curry','five-bean-chilli','spaghetti-bolognese'],
    showAllRecipes: false,
    recipeSearch: '',
    filterCuisines: [],
    filterCookTime: null,
    filterEffort: null,
    filterDietary: [],
    filterSort: 'recent',
    customRecipes: [],
    defaultPortions: 2,
    onboardingComplete: false,
    pickerDay: null, pickerSlot: null, pickerSelected: null, pickerPortions: 2, pickerMode: 'slot',
    pickerExclusions: [], pickerSwapNote: '',
    cookRecipeId: null, cookStep: 0,
    timerInterval: null, timerSeconds: 0, timerTarget: null, timerRunning: false,
    detailRecipeId: null,
    detailPortions: null,
    recipeNotes: {},
};

// --- Persistence ---
function saveState() {
    const s = {
        mealPlan: state.mealPlan,
        pantryItems: state.pantryItems,
        fridgeItems: state.fridgeItems,
        fridgeFilterEnabled: state.fridgeFilterEnabled,
        profiles: state.profiles,
        activeProfileIds: state.activeProfileIds,
        favouriteRecipes: state.favouriteRecipes,
        showAllRecipes: state.showAllRecipes,
        recipeSearch: state.recipeSearch,
        filterCuisines: state.filterCuisines,
        filterCookTime: state.filterCookTime,
        filterEffort: state.filterEffort,
        filterDietary: state.filterDietary,
        filterSort: state.filterSort,
        customRecipes: state.customRecipes,
        defaultPortions: state.defaultPortions,
        currentView: state.currentView,
        onboardingComplete: state.onboardingComplete,
        recipeNotes: state.recipeNotes,
    };
    localStorage.setItem('mealPlannerV4', JSON.stringify(s));
}
function loadState() {
    try {
        const s = JSON.parse(localStorage.getItem('mealPlannerV4') || localStorage.getItem('mealPlannerV3'));
        if (s) {
            if (s.mealPlan) state.mealPlan = s.mealPlan;
            if (s.pantryItems) state.pantryItems = s.pantryItems;
            if (s.fridgeItems) state.fridgeItems = s.fridgeItems;
            if (typeof s.fridgeFilterEnabled === 'boolean') state.fridgeFilterEnabled = s.fridgeFilterEnabled;
            if (s.profiles) state.profiles = s.profiles;
            if (s.activeProfileIds) state.activeProfileIds = s.activeProfileIds;
            if (s.favouriteRecipes) state.favouriteRecipes = s.favouriteRecipes;
            if (typeof s.showAllRecipes === 'boolean') state.showAllRecipes = s.showAllRecipes;
            if (typeof s.recipeSearch === 'string') state.recipeSearch = s.recipeSearch;
            if (Array.isArray(s.filterCuisines)) state.filterCuisines = s.filterCuisines;
            if (s.filterCookTime !== undefined) state.filterCookTime = s.filterCookTime;
            if (s.filterEffort !== undefined) state.filterEffort = s.filterEffort;
            if (Array.isArray(s.filterDietary)) state.filterDietary = s.filterDietary;
            if (s.filterSort) state.filterSort = s.filterSort;
            if (s.customRecipes) state.customRecipes = s.customRecipes;
            if (s.defaultPortions) state.defaultPortions = s.defaultPortions;
            if (s.currentView) state.currentView = s.currentView;
            if (typeof s.onboardingComplete === 'boolean') state.onboardingComplete = s.onboardingComplete;
            if (s.recipeNotes) state.recipeNotes = s.recipeNotes;
        }
    } catch(e) { console.warn('Failed to load state:', e); }
}

// --- Utility ---
function getWeekDates(offset) {
    const now = new Date();
    const mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7) + (offset * 7));
    return Array.from({length: 7}, (_, i) => { const d = new Date(mon); d.setDate(mon.getDate() + i); return d; });
}
function fmtDate(d) { return d.toISOString().split('T')[0]; }
function dayName(d) { return d.toLocaleDateString('en-GB', { weekday: 'long' }); }
function shortDate(d) { return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); }
function getRecipe(id) { return recipes.find(r => r.id === id); }

function ensureSlots(key) {
    if (!state.mealPlan[key]) {
        state.mealPlan[key] = [
            { slotType: 'main', status: 'empty', recipeId: null, portions: null },
            { slotType: 'extra', status: 'notNeeded', recipeId: null, portions: null },
            { slotType: 'extra', status: 'notNeeded', recipeId: null, portions: null },
        ];
    }
    return state.mealPlan[key];
}

function getDefaultSlot(slotType) {
    return slotType === 'main'
        ? { slotType: 'main', status: 'empty', recipeId: null, portions: null }
        : { slotType: 'extra', status: 'notNeeded', recipeId: null, portions: null };
}

function fmtAmount(n) {
    if (!n && n !== 0) return '';
    if (n === 0.25) return '¼'; if (n === 0.5) return '½'; if (n === 0.75) return '¾';
    if (Number.isInteger(n)) return n.toString();
    return n.toFixed(1);
}
function scaleAmt(amount, portions, base) {
    if (!amount || !base) return amount;
    return Math.round((amount * portions / base) * 100) / 100;
}

function loadCustomRecipes() {
    if (state.customRecipes && Array.isArray(state.customRecipes) && state.customRecipes.length > 0) {
        state.customRecipes.forEach(r => {
            if (!recipes.find(x => x.id === r.id)) recipes.push(r);
        });
    }
    // Normalize all recipes to ensure consistent format
    recipes.forEach(r => {
        if (typeof r.source === 'string') r.source = { name: r.source, url: r.sourceUrl || '#' };
        if (!r.source) r.source = { name: 'Recipe', url: '#' };
        if (!r.ingredients) r.ingredients = [];
        if (!r.steps) r.steps = [];
        if (!r.tags) r.tags = [];
        if (!r.dietary) r.dietary = [];
        if (r.favourite === undefined) r.favourite = false;
        if (r.timesCooked === undefined) r.timesCooked = 0;
    });
}

function parseIngredientLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return null;
    const match = trimmed.match(/^([\d./¼½¾⅓⅔]+)?\s*(g|kg|ml|l|tbsp|tsp|cup|cups)?\s*(.*)$/i);
    if (!match) return { name: trimmed, amount: null, unit: '', category: 'other' };
    const rawAmount = match[1];
    const unit = match[2] || '';
    const name = (match[3] || '').trim() || trimmed;
    let amount = rawAmount ? parseFloat(rawAmount.replace('¼','0.25').replace('½','0.5').replace('¾','0.75').replace('⅓','0.33').replace('⅔','0.66')) : null;
    if (Number.isNaN(amount)) amount = null;
    return { name, amount, unit, category: 'other' };
}


// =========================================
// URL RECIPE IMPORT
// =========================================
function extractSiteName(url) {
    try {
        const domain = new URL(url).hostname.replace(/^www\./, '');
        const sites = {
            'bbc.co.uk': 'BBC Food', 'bbcgoodfood.com': 'BBC Good Food',
            'allrecipes.com': 'AllRecipes', 'jamieoliver.com': 'Jamie Oliver',
            'deliciousmagazine.co.uk': 'Delicious Magazine', 'foodnetwork.com': 'Food Network',
            'epicurious.com': 'Epicurious', 'bonappetit.com': 'Bon Appétit',
            'seriouseats.com': 'Serious Eats', 'tasty.co': 'Tasty',
            'simplyrecipes.com': 'Simply Recipes', 'recipetineats.com': 'RecipeTin Eats',
            'mob.co.uk': 'MOB Kitchen', 'theguardian.com': 'The Guardian',
        };
        return sites[domain] || domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch { return 'Website'; }
}

function parseISO8601Duration(str) {
    if (!str) return null;
    const m = str.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!m) return null;
    return (parseInt(m[1] || 0) * 60) + parseInt(m[2] || 0);
}

async function fetchRecipeFromUrl(url) {
    const status = document.getElementById('urlFetchStatus');
    status.textContent = 'Fetching...';
    status.style.color = 'var(--c-gray-500)';

    try {
        const resp = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
        if (!resp.ok) throw new Error('Network error');
        const data = await resp.json();
        const html = data.contents;
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Try JSON-LD Recipe schema
        let recipe = null;
        doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
            try {
                let json = JSON.parse(script.textContent);
                // Handle @graph arrays
                if (json['@graph']) json = json['@graph'];
                if (Array.isArray(json)) json = json.find(item => item['@type'] === 'Recipe' || (Array.isArray(item['@type']) && item['@type'].includes('Recipe')));
                if (json && (json['@type'] === 'Recipe' || (Array.isArray(json['@type']) && json['@type'].includes('Recipe')))) recipe = json;
            } catch {}
        });

        if (recipe) {
            // Pre-fill form from JSON-LD
            document.getElementById('recipeNameInput').value = recipe.name || '';
            const img = Array.isArray(recipe.image) ? recipe.image[0] : (typeof recipe.image === 'object' ? recipe.image.url : recipe.image || '');
            document.getElementById('recipeImageInput').value = img;
            const cookTime = parseISO8601Duration(recipe.cookTime || recipe.totalTime);
            if (cookTime) document.getElementById('recipeCookTimeInput').value = cookTime;
            const servings = parseInt(recipe.recipeYield);
            if (servings) document.getElementById('recipeServingsInput').value = servings;

            // Ingredients
            if (recipe.recipeIngredient) {
                document.getElementById('recipeIngredientsInput').value = recipe.recipeIngredient.join('\n');
            }

            // Steps
            if (recipe.recipeInstructions) {
                const steps = recipe.recipeInstructions.map(s =>
                    typeof s === 'string' ? s : (s.text || s.name || '')
                ).filter(Boolean);
                document.getElementById('recipeStepsInput').value = steps.join('\n');
            }

            // Source
            document.getElementById('recipeSourceInput').value = extractSiteName(url);
            // Store URL for later
            document.getElementById('recipeUrlInput').dataset.resolvedUrl = url;

            status.textContent = 'Recipe imported — review and save below.';
            status.style.color = 'var(--c-success)';
        } else {
            // Fallback: Open Graph
            const ogTitle = doc.querySelector('meta[property="og:title"]');
            const ogImage = doc.querySelector('meta[property="og:image"]');
            if (ogTitle) document.getElementById('recipeNameInput').value = ogTitle.content;
            if (ogImage) document.getElementById('recipeImageInput').value = ogImage.content;
            document.getElementById('recipeSourceInput').value = extractSiteName(url);
            status.textContent = 'Partial import — no structured recipe data found. Fill in the details manually.';
            status.style.color = 'var(--c-warning)';
        }
    } catch (err) {
        status.textContent = 'Could not fetch recipe. Check the URL and try again.';
        status.style.color = 'var(--c-danger)';
    }
}


// =========================================
// VIEW SWITCHING
// =========================================
function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const view = document.getElementById(viewName + '-view');
    if (view) view.classList.add('active');

    const tab = document.querySelector(`.tab-btn[data-view="${viewName}"]`);
    if (tab) tab.classList.add('active');

    // Refresh view data
    if (viewName === 'planner') renderPlanner();
    if (viewName === 'recipes') renderRecipes();
    if (viewName === 'shopping') { renderShopping(); renderPantry(); }
    if (viewName === 'settings') { renderProfiles(); renderAllergenGrid(); renderPantry(); }

    saveState();
}


// =========================================
// RENDERING: WEEKLY PLANNER
// =========================================
function renderPlanner() {
    const days = getWeekDates(state.weekOffset);
    const grid = document.getElementById('plannerGrid');
    const weekLabel = document.getElementById('weekLabel');
    weekLabel.textContent = `${shortDate(days[0])} — ${shortDate(days[6])}`;

    // Remove old rows, keep header
    grid.querySelectorAll('.planner-row').forEach(r => r.remove());

    let filled = 0, total = 0;
    days.forEach(date => {
        const key = fmtDate(date);
        const slots = ensureSlots(key);
        const row = document.createElement('div');
        row.className = 'planner-row';
        row.dataset.date = key;

        // Day label
        const label = document.createElement('div');
        label.className = 'day-label';
        label.innerHTML = `${dayName(date)}<span class="day-date">${shortDate(date)}</span>`;
        row.appendChild(label);

        // 3 slots per day
        slots.forEach((slot, idx) => {
            const el = document.createElement('div');
            el.className = 'meal-slot';
            el.dataset.date = key;
            el.dataset.slot = idx;

            if (slot.status === 'filled' && slot.recipeId) {
                filled++; total++;
                const r = getRecipe(slot.recipeId);
                if (r) {
                    el.className += ' meal-slot-filled';
                    el.setAttribute('draggable', 'true');
                    const swapFlag = slot.swapNote || (slot.exclusions && slot.exclusions.length > 0)
                        ? `<span class="card-tag" style="background:var(--c-warning-light);color:var(--c-warning);">↔ swap</span>`
                        : '';
                    el.innerHTML = `
                        <button class="slot-menu" title="Move / options" draggable="true" data-date="${key}" data-slot="${idx}">⋮⋮</button>
                        <img class="slot-img" src="${r.image || FALLBACK_IMAGE}" alt="${r.name}" ${IMAGE_FALLBACK_ATTR}>
                        <div class="slot-info">
                            <div class="slot-name">${r.name}</div>
                            <div class="slot-meta"><span>🕒 ${r.cookTime}m</span> ${swapFlag}</div>
                        </div>
                        ${slot.portions ? `<div class="slot-badge">${slot.portions}</div>` : ''}
                        <div class="slot-actions">
                            <button class="btn btn-sm btn-secondary slot-swap">Swap</button>
                            <button class="btn btn-sm btn-danger slot-remove">Remove</button>
                        </div>`;
                }
            } else if (slot.status === 'skipped') {
                if (idx === 0) total++;
                el.className += ' meal-slot-skipped';
                el.innerHTML = `
                    <span class="skipped-text">Skipped</span>
                    <div style="display:flex;gap:4px;margin-top:2px;">
                        <button class="btn btn-sm btn-ghost slot-undo">Undo</button>
                    </div>`;
            } else if (slot.status === 'notNeeded') {
                el.className += ' meal-slot-extra-empty';
                el.innerHTML = `<span>+</span><span>Not needed</span>`;
            } else {
                // empty main slot
                total++;
                el.className += ' meal-slot-empty';
                el.innerHTML = `
                    <span>Click to add</span>
                    <button class="btn btn-sm btn-ghost slot-skip" style="font-size:.7rem;">Skip</button>`;
            }
            row.appendChild(el);
        });
        grid.appendChild(row);
    });

    // Update meal counter
    document.getElementById('mealCountNum').textContent = filled;
    document.getElementById('mealCountTotal').textContent = total;
    document.getElementById('mealCounter').classList.toggle('complete', filled === total && total > 0);

    // Show hint when no meals planned
    const existingHint = grid.querySelector('.planner-hint');
    if (existingHint) existingHint.remove();
    if (filled === 0) {
        const hint = document.createElement('div');
        hint.className = 'planner-hint';
        hint.innerHTML = '💡 Tap an empty slot to add a meal, or browse <strong>Recipes</strong> to get started.';
        grid.appendChild(hint);
    }

    // Cook Forward tips
    renderCookForwardTips(grid.parentElement);
}


// =========================================
// RENDERING: RECIPE CARDS
// =========================================
function renderRecipes() {
    const grid = document.getElementById('recipeGrid');
    // Clean up any previous relax hint
    document.querySelectorAll('.relax-filters-hint').forEach(el => el.remove());

    // Gather blocked allergens from active profiles
    const blocked = new Set();
    state.activeProfileIds.forEach(pid => {
        const p = state.profiles.find(pr => pr.id === pid);
        if (p) p.allergens.forEach(a => blocked.add(a));
    });

    const dislikes = new Set();
    state.activeProfileIds.forEach(pid => {
        const p = state.profiles.find(pr => pr.id === pid);
        if (p) p.dislikes.forEach(d => dislikes.add(d.toLowerCase()));
    });

    // Filter recipes using new filter state
    let list = recipes.filter(r => {
        // Search — match name, tags, cuisine, ingredients
        if (state.recipeSearch) {
            const q = state.recipeSearch.toLowerCase();
            const searchText = [
                r.name,
                r.cuisine,
                ...r.tags,
                ...r.ingredients.map(i => i.name),
            ].join(' ').toLowerCase();
            if (!searchText.includes(q)) return false;
        }
        // Cuisine filter (multi-select)
        if (state.filterCuisines.length > 0 && !state.filterCuisines.includes(r.cuisine)) return false;
        // Cook time filter
        if (state.filterCookTime && r.cookTime > state.filterCookTime) return false;
        // Effort filter
        if (state.filterEffort) {
            const opt = EFFORT_OPTIONS.find(e => e.label === state.filterEffort);
            if (opt && opt.maxIngredients && r.ingredients.length > opt.maxIngredients) return false;
        }
        // Dietary filter (multi-select — recipe must match ALL selected dietary requirements)
        if (state.filterDietary.length > 0) {
            const dietaryArr = (r.dietary || []).map(d => d.toLowerCase());
            const tagArr = (r.tags || []).map(t => t.toLowerCase());
            const match = state.filterDietary.every(d => {
                const dl = d.toLowerCase();
                if (dl === 'vegetarian') return dietaryArr.includes('vegetarian') || dietaryArr.includes('vegan') || tagArr.includes('vegetarian') || tagArr.includes('vegan');
                if (dl === 'vegan') return dietaryArr.includes('vegan') || tagArr.includes('vegan');
                if (dl === 'pescatarian') return dietaryArr.includes('pescatarian') || tagArr.includes('pescatarian') || tagArr.includes('fish');
                if (dl === 'healthy') return tagArr.includes('healthy');
                return dietaryArr.includes(dl) || tagArr.includes(dl);
            });
            if (!match) return false;
        }
        return true;
    });

    // Safety filtering — always from active profiles unless "show all" is toggled on
    if (!state.showAllRecipes) {
        if (blocked.size > 0) list = list.filter(r => !detectAllergens(r).some(a => blocked.has(a)));
        if (dislikes.size > 0) {
            list = list.filter(r => {
                const text = r.ingredients.map(i => `${i.name} ${i.prep || ''}`).join(' ').toLowerCase();
                return !Array.from(dislikes).some(d => text.includes(d));
            });
        }
    }

    // Fridge filter (include recipes that mention any fridge item)
    if (state.fridgeFilterEnabled && state.fridgeItems.length > 0) {
        const fridgeLower = state.fridgeItems.map(i => i.toLowerCase());
        list = list.filter(r => {
            const text = r.ingredients.map(i => `${i.name} ${i.prep || ''}`).join(' ').toLowerCase();
            return fridgeLower.some(item => text.includes(item));
        });
    }

    // Sort
    const sortBy = state.filterSort;
    if (sortBy === 'favourites') list.sort((a,b) => (state.favouriteRecipes.includes(b.id)?1:0) - (state.favouriteRecipes.includes(a.id)?1:0));
    if (sortBy === 'quick') list.sort((a,b) => a.cookTime - b.cookTime);
    if (sortBy === 'solo') list.sort((a,b) => (b.soloFriendly?1:0) - (a.soloFriendly?1:0) || a.servings - b.servings);
    if (sortBy === 'never-tried') list.sort((a,b) => a.timesCooked - b.timesCooked);
    if (sortBy === 'random') list.sort(() => Math.random() - 0.5);

    // Update result count and chip bar
    renderFilterChipBar();
    const resultCount = document.getElementById('filterResultCount');
    const clearAllBtn = document.getElementById('filterClearAll');
    if (resultCount) resultCount.textContent = `Showing ${list.length} of ${recipes.length} recipes`;
    if (clearAllBtn) clearAllBtn.style.display = hasActiveFilters() ? 'inline-flex' : 'none';

    if (list.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;">
            <div style="font-size:2rem;margin-bottom:8px;">🍽️</div>
            <p style="color:var(--c-gray-500);font-size:.9rem;margin-bottom:12px;">No recipes match your current filters.</p>
            <p style="color:var(--c-gray-400);font-size:.8rem;margin-bottom:16px;">Try broadening your search or removing some filters.</p>
            <button class="btn btn-primary btn-sm" onclick="clearAllFilters()">Clear all filters</button>
        </div>`;
        renderActiveFiltersInfo(blocked, dislikes);
        renderUseItUp();
        saveState();
        return;
    }
    if (list.length < 5 && hasActiveFilters()) {
        // "Few results" hint — suggest relaxing filters
        const relaxHint = document.createElement('div');
        relaxHint.className = 'relax-filters-hint';
        relaxHint.innerHTML = `<span>Only ${list.length} result${list.length === 1 ? '' : 's'}. </span><button class="btn btn-ghost btn-sm" onclick="clearAllFilters()">Relax filters?</button>`;
        grid.parentNode.insertBefore(relaxHint, grid);
    }

    grid.innerHTML = list.map(r => {
        const fav = state.favouriteRecipes.includes(r.id);
        const allergens = detectAllergens(r);
        const defaultP = state.defaultPortions;
        const recipeServes = r.servings;
        let portionNote = '';
        if (defaultP < recipeServes) {
            const leftover = recipeServes - defaultP;
            portionNote = `<span class="card-portion-note">🍱 Makes ${recipeServes}, eat ${defaultP} + ${leftover} leftover${leftover > 1 ? 's' : ''}</span>`;
        } else if (defaultP === recipeServes) {
            portionNote = `<span class="card-portion-note exact">👌 Perfect for ${defaultP}</span>`;
        }
        // Fridge match badges
        const fridgeMatches = state.fridgeItems.length > 0
            ? state.fridgeItems.filter(item => {
                const text = r.ingredients.map(i => `${i.name} ${i.prep||''}`).join(' ').toLowerCase();
                return text.includes(item.toLowerCase());
            }) : [];
        const fridgeBadge = fridgeMatches.length > 0
            ? `<span class="card-tag" style="background:var(--c-success-light);color:var(--c-success);">🧊 Uses your ${fridgeMatches[0]}</span>` : '';
        const isMetadataOnly = !r.ingredients || r.ingredients.length === 0;
        const soloTag = r.soloFriendly ? '<span class="card-solo-badge">👤 Solo-friendly</span>' : '';
        return `<div class="recipe-card" data-id="${r.id}">
            <div class="card-img-wrap">
                <img class="card-img" src="${r.image || FALLBACK_IMAGE}" alt="${r.name}" loading="lazy" ${IMAGE_FALLBACK_ATTR}>
                <button class="card-fav ${fav?'active':''}" data-action="fav" data-id="${r.id}">${fav?'♥':'♡'}</button>
                ${r.timesCooked > 0 ? `<span class="card-cooked">Made ${r.timesCooked}×</span>` : ''}
                ${isMetadataOnly ? '<span class="card-metadata-only">Add details</span>' : ''}
            </div>
            <div class="card-body">
                <div class="card-title">${r.name}</div>
                <div class="card-meta">
                    <span>🕒 ${r.cookTime}m</span>
                    ${r.calories ? `<span>🔥 ${r.calories} kcal</span>` : ''}
                    <span>👤 ${r.servings}</span>
                    <span>📊 ${r.difficulty}</span>
                </div>
                ${r.description ? `<div class="card-description">${r.description}</div>` : ''}
                ${portionNote}
                <div class="card-tags">
                    ${soloTag}
                    ${(r.tags || []).slice(0, 4).map(t => `<span class="card-tag">${t}</span>`).join('')}
                    ${allergens.map(a => `<span class="card-tag allergen-tag">${ALLERGENS[a]?.icon||''} ${a}</span>`).join('')}
                    ${fridgeBadge}
                </div>
                <div class="card-source">📖 ${r.source?.name || r.source || 'Recipe'}</div>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-sm" data-action="view" data-id="${r.id}">${isMetadataOnly ? 'Add Details' : 'View Recipe'}</button>
                    <button class="btn btn-primary btn-sm" data-action="add" data-id="${r.id}">+ Add to Plan</button>
                </div>
            </div>
        </div>`;
    }).join('');

    // Add "Add your own recipe" card at end of grid
    grid.innerHTML += `<div class="recipe-card add-recipe-card" id="addRecipeGridBtn">
        <div class="add-recipe-card-inner">
            <div class="add-recipe-icon">+</div>
            <div class="add-recipe-text">Add your own recipe</div>
            <div class="add-recipe-hint">Import from a URL or enter manually</div>
        </div>
    </div>`;

    renderActiveFiltersInfo(blocked, dislikes);
    renderUseItUp();
    saveState();
}


// =========================================
// ACTIVE FILTERS INFO BANNER
// =========================================
function renderActiveFiltersInfo(blocked, dislikes) {
    const el = document.getElementById('activeFiltersInfo');
    if (!el) return;

    const activeProfiles = state.profiles.filter(p => state.activeProfileIds.includes(p.id));
    if (activeProfiles.length === 0) {
        el.innerHTML = '';
        el.style.display = 'none';
        return;
    }

    el.style.display = 'flex';
    if (state.showAllRecipes) {
        const names = activeProfiles.map(p => p.name).join(', ');
        el.innerHTML = `<span>Showing all recipes</span><button class="btn btn-ghost btn-sm" id="reapplyFiltersBtn">Re-apply filters for ${names}</button>`;
    } else {
        const profileInfo = activeProfiles.map(p => {
            const parts = [];
            if (p.allergens.length > 0) parts.push(p.allergens.map(a => (ALLERGENS[a]?.icon || '') + ' ' + a).join(', '));
            if (p.dislikes.length > 0) parts.push('Dislikes: ' + p.dislikes.join(', '));
            return `<strong>${p.name}</strong> (${parts.join(' · ') || 'no restrictions'})`;
        }).join(', ');
        el.innerHTML = `<span>Filtering for: ${profileInfo}</span><button class="btn btn-ghost btn-sm" id="showAllRecipesBtn">Show all recipes</button>`;
    }
}


// =========================================
// FILTER SYSTEM — CHIP BAR + BOTTOM SHEETS
// =========================================
function hasActiveFilters() {
    return state.recipeSearch || state.filterCuisines.length > 0 || state.filterCookTime ||
           state.filterEffort || state.filterDietary.length > 0 || state.filterSort !== 'recent';
}

function clearAllFilters() {
    state.recipeSearch = '';
    state.filterCuisines = [];
    state.filterCookTime = null;
    state.filterEffort = null;
    state.filterDietary = [];
    state.filterSort = 'recent';
    const searchInput = document.getElementById('recipeSearchInput');
    if (searchInput) searchInput.value = '';
    saveState();
    renderRecipes();
}

function renderFilterChipBar() {
    const chipBar = document.getElementById('filterChipBar');
    if (!chipBar) return;
    chipBar.innerHTML = '';

    // Active filter chips (removable)
    if (state.recipeSearch) {
        chipBar.appendChild(makeFilterChip(`🔍 "${state.recipeSearch}"`, () => {
            state.recipeSearch = '';
            const input = document.getElementById('recipeSearchInput');
            if (input) input.value = '';
            saveState(); renderRecipes();
        }, true));
    }
    state.filterCuisines.forEach(c => {
        const opt = CUISINE_OPTIONS.find(o => o.value === c);
        chipBar.appendChild(makeFilterChip(opt ? opt.label : c, () => {
            state.filterCuisines = state.filterCuisines.filter(x => x !== c);
            saveState(); renderRecipes();
        }, true));
    });
    if (state.filterCookTime) {
        chipBar.appendChild(makeFilterChip(`≤${state.filterCookTime} min`, () => {
            state.filterCookTime = null;
            saveState(); renderRecipes();
        }, true));
    }
    if (state.filterEffort) {
        chipBar.appendChild(makeFilterChip(state.filterEffort, () => {
            state.filterEffort = null;
            saveState(); renderRecipes();
        }, true));
    }
    state.filterDietary.forEach(d => {
        chipBar.appendChild(makeFilterChip(d, () => {
            state.filterDietary = state.filterDietary.filter(x => x !== d);
            saveState(); renderRecipes();
        }, true));
    });

    // Trigger chips (open bottom sheets)
    if (state.filterCuisines.length === 0) {
        chipBar.appendChild(makeFilterChip('Cuisine ▾', () => openFilterSheet('cuisine'), false));
    }
    if (!state.filterCookTime) {
        chipBar.appendChild(makeFilterChip('Cook Time ▾', () => openFilterSheet('cookTime'), false));
    }
    if (!state.filterEffort) {
        chipBar.appendChild(makeFilterChip('Effort ▾', () => openFilterSheet('effort'), false));
    }
    if (state.filterDietary.length === 0) {
        chipBar.appendChild(makeFilterChip('Dietary ▾', () => openFilterSheet('dietary'), false));
    }
    // Sort chip — always show, active if not default
    const sortLabel = state.filterSort === 'recent' ? 'Sort ▾' : `Sort: ${SORT_OPTIONS.find(s => s.value === state.filterSort)?.label || state.filterSort}`;
    chipBar.appendChild(makeFilterChip(sortLabel, () => openFilterSheet('sort'), state.filterSort !== 'recent'));
}

function makeFilterChip(label, onClick, active) {
    const chip = document.createElement('button');
    chip.className = 'filter-chip' + (active ? ' active' : '');
    chip.textContent = label;
    chip.addEventListener('click', onClick);
    return chip;
}

function openFilterSheet(type) {
    const sheet = document.getElementById('filterSheet');
    const title = document.getElementById('filterSheetTitle');
    const body = document.getElementById('filterSheetBody');
    const footer = document.getElementById('filterSheetFooter');
    if (!sheet) return;

    body.innerHTML = '';
    footer.innerHTML = '';

    if (type === 'cuisine') {
        title.textContent = 'Cuisine';
        const selected = new Set(state.filterCuisines);
        const wrap = document.createElement('div');
        wrap.className = 'sheet-chips';
        CUISINE_OPTIONS.forEach(opt => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip' + (selected.has(opt.value) ? ' active' : '');
            chip.textContent = opt.label;
            chip.addEventListener('click', () => {
                if (selected.has(opt.value)) selected.delete(opt.value);
                else selected.add(opt.value);
                chip.classList.toggle('active');
                done.textContent = `Done (${selected.size} selected)`;
            });
            wrap.appendChild(chip);
        });
        body.appendChild(wrap);
        const done = document.createElement('button');
        done.className = 'btn btn-primary sheet-done-btn';
        done.textContent = `Done (${selected.size} selected)`;
        done.addEventListener('click', () => {
            state.filterCuisines = Array.from(selected);
            closeFilterSheet();
            saveState(); renderRecipes();
        });
        footer.appendChild(done);
    }

    if (type === 'cookTime') {
        title.textContent = 'Cook Time';
        const wrap = document.createElement('div');
        wrap.className = 'sheet-chips';
        COOK_TIME_OPTIONS.forEach(opt => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip' + (state.filterCookTime === opt.value ? ' active' : '');
            chip.textContent = opt.label;
            chip.addEventListener('click', () => {
                state.filterCookTime = opt.value;
                closeFilterSheet();
                saveState(); renderRecipes();
            });
            wrap.appendChild(chip);
        });
        body.appendChild(wrap);
    }

    if (type === 'effort') {
        title.textContent = 'Effort';
        const wrap = document.createElement('div');
        wrap.className = 'sheet-effort-list';
        EFFORT_OPTIONS.forEach(opt => {
            const card = document.createElement('div');
            card.className = 'sheet-effort-card' + (state.filterEffort === opt.label ? ' active' : '');
            card.innerHTML = `<div class="sheet-effort-title">${opt.label}</div><div class="sheet-effort-hint">${opt.hint}</div>`;
            card.addEventListener('click', () => {
                state.filterEffort = opt.label;
                closeFilterSheet();
                saveState(); renderRecipes();
            });
            wrap.appendChild(card);
        });
        body.appendChild(wrap);
    }

    if (type === 'dietary') {
        title.textContent = 'Dietary';
        const selected = new Set(state.filterDietary);
        const wrap = document.createElement('div');
        wrap.className = 'sheet-chips';
        DIETARY_OPTIONS.forEach(d => {
            const chip = document.createElement('button');
            chip.className = 'filter-chip' + (selected.has(d) ? ' active' : '');
            chip.textContent = d;
            chip.addEventListener('click', () => {
                if (selected.has(d)) selected.delete(d);
                else selected.add(d);
                chip.classList.toggle('active');
                done.textContent = `Done (${selected.size} selected)`;
            });
            wrap.appendChild(chip);
        });
        body.appendChild(wrap);
        const done = document.createElement('button');
        done.className = 'btn btn-primary sheet-done-btn';
        done.textContent = `Done (${selected.size} selected)`;
        done.addEventListener('click', () => {
            state.filterDietary = Array.from(selected);
            closeFilterSheet();
            saveState(); renderRecipes();
        });
        footer.appendChild(done);
    }

    if (type === 'sort') {
        title.textContent = 'Sort by';
        const wrap = document.createElement('div');
        wrap.className = 'sheet-sort-list';
        SORT_OPTIONS.forEach(opt => {
            const row = document.createElement('div');
            row.className = 'sheet-sort-row' + (state.filterSort === opt.value ? ' active' : '');
            row.innerHTML = `<span>${opt.label}</span><span class="sheet-radio"></span>`;
            row.addEventListener('click', () => {
                state.filterSort = opt.value;
                closeFilterSheet();
                saveState(); renderRecipes();
            });
            wrap.appendChild(row);
        });
        body.appendChild(wrap);
    }

    sheet.classList.add('open');
}

function closeFilterSheet() {
    const sheet = document.getElementById('filterSheet');
    if (sheet) sheet.classList.remove('open');
}


// =========================================
// RENDERING: SHOPPING LIST
// =========================================
function renderShopping() {
    const el = document.getElementById('shoppingItems');
    const pantryLower = state.pantryItems.map(p => p.toLowerCase());
    const ingredients = new Map();

    for (const [dateKey, slots] of Object.entries(state.mealPlan)) {
        slots.forEach(slot => {
            if (slot.status !== 'filled' || !slot.recipeId) return;
            const r = getRecipe(slot.recipeId);
            if (!r) return;
            const portions = slot.portions || r.servings;
            const exclusions = (slot.exclusions || []).map(x => x.toLowerCase());
            r.ingredients.forEach(ing => {
                if (exclusions.length > 0 && exclusions.some(ex => ing.name.toLowerCase().includes(ex))) return;
                // Skip pantry staples
                if (pantryLower.some(p => ing.name.toLowerCase().includes(p))) return;
                const key = ing.name.toLowerCase();
                if (ingredients.has(key)) {
                    const ex = ingredients.get(key);
                    if (ing.unit === ex.unit) ex.amount += scaleAmt(ing.amount, portions, r.servings);
                    ex.sources.add(r.name);
                } else {
                    ingredients.set(key, {
                        name: ing.name,
                        amount: scaleAmt(ing.amount, portions, r.servings),
                        unit: ing.unit,
                        category: ing.category || 'other',
                        prep: ing.prep,
                        sources: new Set([r.name])
                    });
                }
            });
        });
    }

    if (ingredients.size === 0) {
        el.innerHTML = '<div class="shopping-empty"><div class="empty-icon">🛒</div><p>Your shopping list is empty.<br>Add meals to your weekly plan first!</p></div>';
        return;
    }

    // Group by category
    const cats = {};
    for (const ing of ingredients.values()) {
        if (!cats[ing.category]) cats[ing.category] = [];
        cats[ing.category].push(ing);
    }
    const labels = {
        protein: '🥩 Protein',
        vegetables: '🥬 Vegetables & Fruit',
        carbs: '🍚 Carbs & Grains',
        sauce: '🫙 Sauces & Seasonings',
        other: '📦 Other'
    };
    const order = ['protein','vegetables','carbs','sauce','other'];

    el.innerHTML = order.filter(c => cats[c]).map(cat => `
        <li class="shopping-category">${labels[cat] || cat}</li>
        ${cats[cat].map(ing => `
            <li class="shopping-item" data-name="${ing.name}">
                <div class="item-check" data-action="check"></div>
                <span class="item-name">${fmtAmount(ing.amount)} ${ing.unit} ${ing.name}${ing.prep ? ' ('+ing.prep+')' : ''}</span>
                <span class="item-source">${[...ing.sources].join(', ')}</span>
            </li>`).join('')}
    `).join('');

    updateShoppingProgress();
    renderShoppingCookForward();
}

function updateShoppingProgress() {
    const el = document.getElementById('shoppingProgress');
    if (!el) return;
    const total = document.querySelectorAll('#shoppingItems .shopping-item').length;
    const got = document.querySelectorAll('#shoppingItems .shopping-item.checked').length;
    if (total === 0) { el.textContent = ''; return; }
    const remaining = total - got;
    if (remaining === 0) {
        el.innerHTML = '<span class="progress-complete">All done! Ready to cook.</span>';
    } else {
        el.textContent = `${got} of ${total} items got — ${remaining} remaining`;
    }
}

function getShoppingListText() {
    const items = document.querySelectorAll('#shoppingItems .shopping-item:not(.checked) .item-name');
    return Array.from(items).map(el => el.textContent.trim()).join('\n');
}

function renderPantry() {
    const pantryMap = new Map(state.pantryItems.map(p => [p.toLowerCase(), p]));
    const requirements = new Map();

    for (const slots of Object.values(state.mealPlan)) {
        slots.forEach(slot => {
            if (slot.status !== 'filled' || !slot.recipeId) return;
            const r = getRecipe(slot.recipeId);
            if (!r) return;
            const portions = slot.portions || r.servings;
            r.ingredients.forEach(ing => {
                const matchKey = Array.from(pantryMap.keys()).find(p => ing.name.toLowerCase().includes(p));
                if (!matchKey) return;
                const original = pantryMap.get(matchKey);
                if (!requirements.has(original)) {
                    requirements.set(original, { amount: 0, unit: ing.unit || '', hasAmount: !!ing.amount });
                }
                const entry = requirements.get(original);
                if (ing.amount && ing.unit === entry.unit) {
                    entry.amount += scaleAmt(ing.amount, portions, r.servings);
                    entry.hasAmount = true;
                } else if (ing.amount && !entry.unit) {
                    entry.amount += scaleAmt(ing.amount, portions, r.servings);
                    entry.unit = ing.unit || '';
                    entry.hasAmount = true;
                }
            });
        });
    }

    const formatPantryQty = (entry) => {
        if (!entry || !entry.hasAmount) return '';
        if (!entry.unit) {
            return entry.amount >= 2 ? ` (${fmtAmount(entry.amount)})` : '';
        }
        const unitLower = entry.unit.toLowerCase();
        if ((unitLower === 'tbsp' || unitLower === 'tsp') && entry.amount <= 2) return '';
        return ` (${fmtAmount(entry.amount)} ${entry.unit})`;
    };

    ['pantryItemsList', 'pantryManagement'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const inner = state.pantryItems.map(item => {
            const req = requirements.get(item);
            const requiredClass = req ? ' required' : '';
            const qty = id === 'pantryItemsList' ? formatPantryQty(req) : '';
            return `<span class="pantry-item${requiredClass}">${item}${qty} <span class="remove-pantry" data-item="${item}">×</span></span>`;
        }).join('');
        el.innerHTML = id === 'pantryManagement'
            ? `<div style="display:flex;flex-wrap:wrap;gap:6px;">${inner}</div>`
            : inner;
    });
}

function addPantryItem(value) {
    const item = value.trim().toLowerCase();
    if (item && !state.pantryItems.includes(item)) {
        state.pantryItems.push(item);
        saveState();
        renderPantry();
        renderShopping();
    }
}

function removePantryItem(item) {
    state.pantryItems = state.pantryItems.filter(p => p !== item);
    saveState();
    renderPantry();
    renderShopping();
}


// =========================================
// RENDERING: SETTINGS (PROFILES)
// =========================================
function renderProfiles() {
    const list = document.getElementById('profileList');
    if (!list) return;
    if (state.profiles.length === 0) {
        list.innerHTML = '<p style="font-size:.85rem;color:var(--c-gray-400);padding:8px 0;">No profiles yet. Add family members below.</p>';
        return;
    }
    list.innerHTML = state.profiles.map(p => {
        const active = state.activeProfileIds.includes(p.id);
        return `<div class="profile-card-item ${active?'active':''}" data-id="${p.id}">
            <div>
                <div class="profile-name">${p.name}</div>
                <div class="profile-detail">
                    ${p.allergens.length > 0 ? '⚠️ ' + p.allergens.map(a => (ALLERGENS[a]?.icon||'')+' '+a).join(', ') : 'No allergens'}
                    ${p.dislikes.length > 0 ? ' · Dislikes: ' + p.dislikes.join(', ') : ''}
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-ghost btn-sm profile-edit-btn" data-id="${p.id}" title="Edit">✏️</button>
                <button class="btn btn-ghost btn-sm profile-delete-btn" data-id="${p.id}" title="Delete" style="color:var(--c-danger);">🗑</button>
                <span class="profile-badge">${active ? 'Active' : 'Inactive'}</span>
            </div>
        </div>`;
    }).join('');
}

function editProfile(id) {
    const profile = state.profiles.find(p => p.id === id);
    if (!profile) return;
    state.editingProfileId = id;

    // Populate form
    document.getElementById('profileNameInput').value = profile.name;
    document.getElementById('profileDislikesInput').value = profile.dislikes.join(', ');

    // Set allergen checkboxes
    renderAllergenGrid();
    profile.allergens.forEach(a => {
        const cb = document.querySelector(`#profileAllergenGrid input[value="${a}"]`);
        if (cb) cb.checked = true;
    });

    // Open the details element and update button text
    const details = document.querySelector('#settings-view details');
    if (details) {
        details.open = true;
        details.querySelector('summary').textContent = `Editing: ${profile.name}`;
    }
    const submitBtn = document.querySelector('#addProfileForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Update Profile';
}

function cancelProfileEdit() {
    state.editingProfileId = null;
    document.getElementById('profileNameInput').value = '';
    document.getElementById('profileDislikesInput').value = '';
    renderAllergenGrid();
    const details = document.querySelector('#settings-view details');
    if (details) {
        details.querySelector('summary').textContent = '+ Add New Profile';
        details.open = false;
    }
    const submitBtn = document.querySelector('#addProfileForm button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Save Profile';
}

function renderAllergenGrid() {
    const grid = document.getElementById('profileAllergenGrid');
    if (!grid) return;
    grid.innerHTML = Object.entries(ALLERGENS).map(([name, data]) =>
        `<label class="allergen-checkbox"><input type="checkbox" value="${name}"> ${data.icon} ${name}</label>`
    ).join('');
}


function renderFridge() {
    const list = document.getElementById('fridgeList');
    const toggle = document.getElementById('fridgeFilterToggle');
    if (toggle) toggle.checked = state.fridgeFilterEnabled;
    if (!list) return;
    if (state.fridgeItems.length === 0) {
        list.innerHTML = '<p style="font-size:.8rem;color:var(--c-gray-400);">No fridge items yet.</p>';
        return;
    }
    list.innerHTML = state.fridgeItems.map(item =>
        `<span class="fridge-item">${item} <span class="remove-fridge" data-item="${item}">×</span></span>`
    ).join('');
}


// =========================================
// ONBOARDING WIZARD
// =========================================
let onboardingStep = 1;

function showOnboarding() {
    onboardingStep = 1;
    renderOnboardingStep(1);
    renderOnboardingAllergenGrid();
    renderOnboardingPantry();
    renderOnboardingFridge();
    document.getElementById('onboardingModal').classList.add('open');
}

function renderOnboardingStep(step) {
    onboardingStep = step;
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('wizard-step-' + step);
    if (el) el.classList.add('active');
    // Update progress dots
    document.querySelectorAll('.wizard-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i < step);
        dot.classList.toggle('current', i === step - 1);
    });
    if (step === 2) renderOnboardingProfiles();
    if (step === 5) renderOnboardingSummary();
}

function renderOnboardingAllergenGrid() {
    const grid = document.getElementById('onboardingAllergenGrid');
    if (!grid) return;
    grid.innerHTML = Object.entries(ALLERGENS).map(([name, data]) =>
        `<label class="allergen-checkbox"><input type="checkbox" value="${name}"> ${data.icon} ${name}</label>`
    ).join('');
}

function renderOnboardingProfiles() {
    const list = document.getElementById('onboardingProfileList');
    if (!list) return;
    if (state.profiles.length === 0) {
        list.innerHTML = '<p style="font-size:.8rem;color:var(--c-gray-400);margin-bottom:8px;">No profiles added yet. Add at least one person.</p>';
        return;
    }
    list.innerHTML = state.profiles.map(p => {
        const allergenIcons = p.allergens.map(a => ALLERGENS[a] ? ALLERGENS[a].icon : '').join(' ');
        return `<div class="profile-card-item active" style="margin-bottom:6px;">
            <div>
                <div class="profile-name">${p.name}</div>
                <div class="profile-detail">
                    ${p.allergens.length ? allergenIcons + ' ' + p.allergens.join(', ') : 'No allergens'}
                    ${p.dislikes.length ? ' · Dislikes: ' + p.dislikes.join(', ') : ''}
                </div>
            </div>
            <button class="btn btn-ghost btn-sm wizard-remove-profile" data-id="${p.id}">×</button>
        </div>`;
    }).join('');
}

function addOnboardingProfile() {
    const nameInput = document.getElementById('onboardingProfileName');
    const dislikesInput = document.getElementById('onboardingProfileDislikes');
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }

    const allergens = Array.from(document.querySelectorAll('#onboardingAllergenGrid input:checked')).map(c => c.value);
    const dislikes = dislikesInput.value.split(',').map(d => d.trim().toLowerCase()).filter(Boolean);

    const profile = { id: 'profile_' + Date.now(), name, allergens, dislikes };
    state.profiles.push(profile);
    state.activeProfileIds.push(profile.id);
    saveState();

    // Reset form
    nameInput.value = '';
    dislikesInput.value = '';
    document.querySelectorAll('#onboardingAllergenGrid input:checked').forEach(c => c.checked = false);

    renderOnboardingProfiles();
}

function renderOnboardingPantry() {
    const container = document.getElementById('onboardingPantryItems');
    if (!container) return;
    container.innerHTML = state.pantryItems.map(item =>
        `<span class="pantry-item">${item} <span class="remove-pantry wizard-pantry-remove" data-item="${item}">×</span></span>`
    ).join('');
}

function renderOnboardingFridge() {
    const container = document.getElementById('onboardingFridgeItems');
    if (!container) return;
    if (state.fridgeItems.length === 0) {
        container.innerHTML = '<p style="font-size:.8rem;color:var(--c-gray-400);">No fridge items yet.</p>';
        return;
    }
    container.innerHTML = state.fridgeItems.map(item =>
        `<span class="fridge-item">${item} <span class="remove-fridge wizard-fridge-remove" data-item="${item}">×</span></span>`
    ).join('');
}

function renderOnboardingSummary() {
    const el = document.getElementById('onboardingSummary');
    if (!el) return;
    const profileCount = state.profiles.length;
    const pantryCount = state.pantryItems.length;
    const fridgeCount = state.fridgeItems.length;
    el.innerHTML = `
        <div style="display:grid;gap:12px;text-align:left;">
            <div class="card" style="padding:12px;">
                <strong>👨‍👩‍👧‍👦 ${profileCount} profile${profileCount !== 1 ? 's' : ''}</strong>
                <div style="font-size:.8rem;color:var(--c-gray-500);margin-top:2px;">
                    ${state.profiles.map(p => p.name).join(', ') || 'None'}
                </div>
            </div>
            <div class="card" style="padding:12px;">
                <strong>🏠 ${pantryCount} cupboard staple${pantryCount !== 1 ? 's' : ''}</strong>
                <div style="font-size:.8rem;color:var(--c-gray-500);margin-top:2px;">Won't appear on your shopping list</div>
            </div>
            ${fridgeCount > 0 ? `<div class="card" style="padding:12px;">
                <strong>🧊 ${fridgeCount} fridge item${fridgeCount !== 1 ? 's' : ''}</strong>
                <div style="font-size:.8rem;color:var(--c-gray-500);margin-top:2px;">${state.fridgeItems.join(', ')}</div>
            </div>` : ''}
        </div>`;
}

function completeOnboarding() {
    state.onboardingComplete = true;
    saveState();
    document.getElementById('onboardingModal').classList.remove('open');
    switchView('recipes');
    renderProfiles();
    renderPantry();
    renderFridge();
}


// =========================================
// USE IT UP — RECIPE RAIL
// =========================================
function renderUseItUp() {
    const section = document.getElementById('useItUpSection');
    const rail = document.getElementById('useItUpRail');
    if (!section || !rail) return;

    if (state.fridgeItems.length === 0) {
        section.style.display = 'none';
        return;
    }

    const fridgeLower = state.fridgeItems.map(i => i.toLowerCase());

    // Gather blocked allergens from active profiles for safety filtering
    const blocked = new Set();
    const dislikes = new Set();
    if (!state.showAllRecipes) {
        state.activeProfileIds.forEach(pid => {
            const p = state.profiles.find(pr => pr.id === pid);
            if (p) {
                p.allergens.forEach(a => blocked.add(a));
                p.dislikes.forEach(d => dislikes.add(d.toLowerCase()));
            }
        });
    }

    const scored = recipes.map(r => {
        // Safety filter
        if (blocked.size > 0 && detectAllergens(r).some(a => blocked.has(a))) return null;
        if (dislikes.size > 0) {
            const text = r.ingredients.map(i => `${i.name} ${i.prep || ''}`).join(' ').toLowerCase();
            if (Array.from(dislikes).some(d => text.includes(d))) return null;
        }
        const text = r.ingredients.map(i => `${i.name} ${i.prep || ''}`).join(' ').toLowerCase();
        const matches = fridgeLower.filter(item => text.includes(item));
        return { recipe: r, matches, score: matches.length };
    }).filter(s => s && s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    if (scored.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    rail.innerHTML = scored.map(s => `
        <div class="use-it-up-card" data-id="${s.recipe.id}">
            <img src="${s.recipe.image || FALLBACK_IMAGE}" alt="${s.recipe.name}" ${IMAGE_FALLBACK_ATTR}>
            <div class="use-it-up-info">
                <div class="use-it-up-name">${s.recipe.name}</div>
                <div class="use-it-up-match">Uses your: ${s.matches.join(', ')}</div>
                <div class="use-it-up-meta">🕒 ${s.recipe.cookTime}m</div>
            </div>
        </div>
    `).join('');
}


// =========================================
// COOK FORWARD TIPS
// =========================================
function detectCookForwardTips() {
    const days = getWeekDates(state.weekOffset);
    const ingredientsByDay = new Map();

    days.forEach(date => {
        const key = fmtDate(date);
        const slots = state.mealPlan[key];
        if (!slots) return;
        slots.forEach(slot => {
            if (slot.status !== 'filled' || !slot.recipeId) return;
            const r = getRecipe(slot.recipeId);
            if (!r) return;
            r.ingredients.forEach(ing => {
                const ingredientKey = ing.name.toLowerCase();
                if (!['carbs', 'protein'].includes(ing.category)) return;
                if (!ingredientsByDay.has(ingredientKey)) ingredientsByDay.set(ingredientKey, []);
                ingredientsByDay.get(ingredientKey).push({
                    day: key, dayName: dayName(date), recipeName: r.name,
                });
            });
        });
    });

    const tips = [];
    for (const [ingredient, usages] of ingredientsByDay) {
        if (usages.length >= 2) {
            usages.sort((a, b) => a.day.localeCompare(b.day));
            const first = usages[0];
            const others = usages.slice(1);
            tips.push({
                ingredient,
                tip: `Cook extra ${ingredient} on ${first.dayName} (${first.recipeName}) — you'll need it again for ${others.map(u => u.dayName + "'s " + u.recipeName).join(' and ')}.`,
                shoppingTip: `${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)} appears in ${usages.length} meals — consider buying a larger pack.`,
            });
        }
    }
    return tips;
}

function renderCookForwardTips(container) {
    const existing = container.querySelector('.cook-forward-tips');
    if (existing) existing.remove();

    const tips = detectCookForwardTips();
    if (tips.length === 0) return;

    const div = document.createElement('div');
    div.className = 'cook-forward-tips';
    div.innerHTML = `
        <h3>🔗 Cook Forward Tips</h3>
        ${tips.map(t => `<div class="cook-forward-tip"><span class="tip-text">${t.tip}</span></div>`).join('')}
    `;
    container.appendChild(div);
}

function renderShoppingCookForward() {
    const existing = document.querySelector('.shopping-cook-forward');
    if (existing) existing.remove();

    const tips = detectCookForwardTips();
    if (tips.length === 0) return;

    const el = document.createElement('div');
    el.className = 'shopping-cook-forward';
    el.innerHTML = `
        <h3>💡 Batch Cooking Tips</h3>
        <ul>${tips.map(t => `<li>${t.shoppingTip}</li>`).join('')}</ul>
    `;
    document.querySelector('#shopping-view .card')?.appendChild(el);
}


// =========================================
// RECIPE PICKER MODAL
// =========================================
function openPicker(dateKey, slotIdx) {
    state.pickerDay = dateKey;
    state.pickerSlot = slotIdx;
    state.pickerSelected = null;
    state.pickerPortions = state.defaultPortions;
    state.pickerMode = 'slot';
    state.pickerExclusions = [];
    state.pickerSwapNote = '';

    const slotType = slotIdx === 0 ? 'Main Meal' : `Extra Meal ${slotIdx}`;
    document.getElementById('pickerTitle').textContent = `Add meal for: ${dayName(new Date(dateKey + 'T12:00:00'))} — ${slotType}`;
    document.getElementById('pickerPortionVal').textContent = state.pickerPortions;
    document.getElementById('pickerAddBtn').disabled = true;
    document.getElementById('pickerSearch').value = '';
    document.getElementById('pickerExcludeInput').value = '';
    document.getElementById('pickerSwapNoteInput').value = '';

    document.getElementById('pickerTarget').classList.remove('show');
    document.getElementById('pickerSelectedInfo').classList.remove('show');

    renderPickerGrid();
    document.getElementById('pickerModal').classList.add('open');
}

function openPickerForRecipe(recipeId) {
    state.pickerMode = 'recipe';
    state.pickerSelected = recipeId;
    state.pickerPortions = state.defaultPortions;
    state.pickerExclusions = [];
    state.pickerSwapNote = '';

    const days = getWeekDates(state.weekOffset);
    const firstDayKey = fmtDate(days[0]);
    state.pickerDay = firstDayKey;
    state.pickerSlot = 0;

    document.getElementById('pickerTitle').textContent = 'Add recipe to plan';
    document.getElementById('pickerPortionVal').textContent = state.pickerPortions;
    document.getElementById('pickerAddBtn').disabled = false;
    document.getElementById('pickerSearch').value = '';
    document.getElementById('pickerExcludeInput').value = '';
    document.getElementById('pickerSwapNoteInput').value = '';

    updatePickerTargetOptions();
    document.getElementById('pickerTarget').classList.add('show');

    const selectedInfo = document.getElementById('pickerSelectedInfo');
    const r = getRecipe(recipeId);
    selectedInfo.textContent = r ? `Selected: ${r.name}` : 'Selected recipe';
    selectedInfo.classList.add('show');

    renderPickerGrid();
    document.getElementById('pickerModal').classList.add('open');
}

function updatePickerTargetOptions() {
    const daySelect = document.getElementById('pickerDaySelect');
    const slotSelect = document.getElementById('pickerSlotSelect');
    const days = getWeekDates(state.weekOffset);
    daySelect.innerHTML = days.map(d => {
        const key = fmtDate(d);
        return `<option value="${key}">${dayName(d)} · ${shortDate(d)}</option>`;
    }).join('');
    daySelect.value = state.pickerDay || fmtDate(days[0]);
    slotSelect.value = String(state.pickerSlot ?? 0);
}

function renderPickerGrid() {
    const grid = document.getElementById('pickerGrid');
    const search = document.getElementById('pickerSearch').value.toLowerCase();
    const filter = document.querySelector('#pickerFilters .pill.active')?.dataset.filter || 'all';

    let list = recipes.filter(r => {
        if (search && !r.name.toLowerCase().includes(search)) return false;
        if (filter === 'quick') return r.cookTime <= 20;
        if (filter === 'favourites') return state.favouriteRecipes.includes(r.id);
        return true;
    });

    grid.innerHTML = list.map(r => `
        <div class="picker-recipe ${state.pickerSelected === r.id ? 'selected' : ''}" data-id="${r.id}">
            <img src="${r.image || FALLBACK_IMAGE}" alt="${r.name}" loading="lazy" ${IMAGE_FALLBACK_ATTR}>
            <div class="picker-info">
                <div class="picker-name">${r.name}</div>
                <div class="picker-time">🕒 ${r.cookTime}m · ${r.difficulty}</div>
            </div>
        </div>`).join('');
}

function closePicker() {
    document.getElementById('pickerModal').classList.remove('open');
}

function addToPlan() {
    if (!state.pickerSelected || !state.pickerDay) return;
    const slots = ensureSlots(state.pickerDay);
    if (state.pickerSlot === null || state.pickerSlot === undefined) state.pickerSlot = 0;
    if (slots[state.pickerSlot].status === 'notNeeded') slots[state.pickerSlot].status = 'empty';
    slots[state.pickerSlot] = {
        slotType: state.pickerSlot === 0 ? 'main' : 'extra',
        status: 'filled',
        recipeId: state.pickerSelected,
        portions: state.pickerPortions,
        exclusions: state.pickerExclusions || [],
        swapNote: state.pickerSwapNote || '',
    };
    saveState();
    closePicker();
    renderPlanner();
}


// =========================================
// RECIPE DETAIL MODAL
// =========================================
function openDetail(recipeId) {
    const r = getRecipe(recipeId);
    if (!r) return;
    state.detailRecipeId = recipeId;
    state.detailPortions = r.servings;

    document.getElementById('detailTitle').textContent = r.name;
    const fav = state.favouriteRecipes.includes(recipeId);
    const favBtn = document.getElementById('detailFav');
    favBtn.textContent = fav ? '♥' : '♡';
    favBtn.style.color = fav ? 'var(--c-favourite)' : '';

    const allergens = detectAllergens(r);
    const hasIngredients = r.ingredients && r.ingredients.length > 0;
    const hasSteps = r.steps && r.steps.length > 0;
    const sourceName = r.source?.name || r.source || 'Recipe';
    const sourceUrl = r.source?.url || '#';

    let html = `
        <img src="${r.image || FALLBACK_IMAGE}" alt="${r.name}" style="width:100%;height:240px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:16px;" ${IMAGE_FALLBACK_ATTR}>
        <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px;">
            <span style="font-size:.85rem;">🕒 ${r.cookTime} min</span>
            ${r.calories ? `<span style="font-size:.85rem;">🔥 ${r.calories} kcal</span>` : ''}
            <span style="font-size:.85rem;">👤 ${r.servings} servings</span>
            <span style="font-size:.85rem;">📊 ${r.difficulty}</span>
            ${r.soloFriendly ? '<span class="card-solo-badge">👤 Solo-friendly</span>' : ''}
        </div>
        ${allergens.length > 0 ? `<div style="margin-bottom:12px;display:flex;flex-wrap:wrap;gap:4px;">${allergens.map(a => `<span class="pill allergen-pill">${ALLERGENS[a]?.icon||''} ${a}</span>`).join('')}</div>` : ''}
        ${r.description ? `<p style="font-size:.85rem;color:var(--c-gray-600);margin-bottom:12px;font-style:italic;">${r.description}</p>` : ''}
        ${r.tips ? `<div class="detail-tips"><strong>💡 Tip:</strong> ${r.tips}</div>` : ''}`;

    if (hasIngredients) {
        html += `
        <div class="detail-portion-selector">
            <h3 style="font-size:.9rem;font-weight:700;margin:0;">Ingredients</h3>
            <div class="portion-buttons" id="detailPortionBtns">
                ${[1,2,4].map(n => `<button class="portion-preset${n === r.servings ? ' active' : ''}" data-portions="${n}">${n}</button>`).join('')}
            </div>
            <span class="portion-label" id="detailPortionLabel">for ${r.servings}</span>
        </div>
        <ul class="detail-ingredients" id="detailIngredientList">
            ${r.ingredients.map(i => {
                const scaled = scaleAmt(i.amount, r.servings, r.servings);
                return `<li>${fmtAmount(scaled)} ${i.unit} <strong>${i.name}</strong>${i.prep ? ' — '+i.prep : ''}</li>`;
            }).join('')}
        </ul>`;
    } else {
        html += `
        <div style="background:var(--c-gray-50);border:1px dashed var(--c-gray-300);border-radius:var(--radius-md);padding:20px;text-align:center;margin-bottom:16px;">
            <p style="font-size:.9rem;color:var(--c-gray-500);margin-bottom:8px;">This recipe needs ingredients and method added.</p>
            <button class="btn btn-primary btn-sm" id="detailAddDetailsBtn">✏️ Add Details</button>
        </div>`;
    }

    html += `
        <div style="margin-bottom:16px;">
            <label class="form-label" style="font-size:.8rem;">Notes & swaps</label>
            <textarea class="form-input detail-notes" id="detailNotes" placeholder="e.g. Use courgette noodles instead of egg noodles" rows="2">${(state.recipeNotes && state.recipeNotes[r.id]) || ''}</textarea>
        </div>`;

    if (hasSteps) {
        html += `
        <h3 style="font-size:.9rem;font-weight:700;margin-bottom:8px;">Method</h3>
        <ol style="padding-left:20px;">
            ${r.steps.map(s => `<li style="padding:6px 0;font-size:.85rem;">${s.text}${s.time ? ` <span style="color:var(--c-success);font-weight:600;">[~${s.time} min]</span>` : ''}</li>`).join('')}
        </ol>`;
    }

    html += `${sourceUrl !== '#' ? `<p style="margin-top:12px;font-size:.75rem;color:var(--c-gray-400);">📖 <a href="${sourceUrl}" target="_blank" rel="noopener">${sourceName}</a></p>` : `<p style="margin-top:12px;font-size:.75rem;color:var(--c-gray-400);">📖 ${sourceName}</p>`}`;

    document.getElementById('detailBody').innerHTML = html;

    // Wire "Add Details" button for metadata-only recipes
    const addDetailsBtn = document.getElementById('detailAddDetailsBtn');
    if (addDetailsBtn) {
        addDetailsBtn.addEventListener('click', () => {
            document.getElementById('detailEdit').click();
        });
    }

    // Show/hide cook button based on whether recipe has steps
    document.getElementById('detailCookBtn').style.display = hasSteps ? '' : 'none';

    document.getElementById('detailModal').classList.add('open');
}

function closeDetail() {
    document.getElementById('detailModal').classList.remove('open');
}


// =========================================
// COOK MODE
// =========================================
function openCookMode(recipeId) {
    const r = getRecipe(recipeId);
    if (!r) return;
    state.cookRecipeId = recipeId;
    state.cookStep = 0;
    resetTimer();

    document.getElementById('cookTitle').textContent = r.name;

    // Render ingredients with checkboxes
    document.getElementById('cookIngredients').innerHTML = `
        <h3>Ingredients</h3>
        ${r.ingredients.map(i => `
            <div class="cook-ingredient">
                <div class="check" data-action="check-ing"></div>
                <span>${fmtAmount(i.amount)} ${i.unit} ${i.name}${i.prep ? ' ('+i.prep+')' : ''}</span>
            </div>`).join('')}`;

    renderCookSteps();
    closeDetail();
    document.getElementById('cookMode').classList.add('open');
}

function renderCookSteps() {
    const r = getRecipe(state.cookRecipeId);
    if (!r) return;

    document.getElementById('cookSteps').innerHTML = r.steps.map((s, i) => `
        <div class="cook-step ${i === state.cookStep ? 'active' : ''}" data-step="${i}">
            <div class="step-num">${i + 1}</div>
            <div>
                <div class="step-text">${s.text}</div>
                ${s.time ? `<div class="step-time" data-time="${s.time * 60}" data-action="set-timer">⏱ Set ${s.time}m timer</div>` : ''}
            </div>
        </div>`).join('');

    // Update nav buttons
    const prevBtn = document.getElementById('cookPrev');
    const nextBtn = document.getElementById('cookNext');
    prevBtn.disabled = state.cookStep === 0;
    nextBtn.textContent = state.cookStep === r.steps.length - 1 ? '✓ Done!' : 'Next →';
}

function closeCookMode() {
    resetTimer();
    document.getElementById('cookMode').classList.remove('open');
}


// =========================================
// TIMER
// =========================================
function updateTimerDisplay() {
    const m = Math.floor(Math.abs(state.timerSeconds) / 60);
    const s = Math.abs(state.timerSeconds) % 60;
    document.getElementById('timerDisplay').textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

    const label = document.getElementById('timerLabel');
    const display = document.getElementById('timerDisplay');

    if (state.timerTarget) {
        const remaining = state.timerTarget - state.timerSeconds;
        if (remaining <= 0) {
            label.textContent = '⏰ Time is up!';
            display.style.color = 'var(--c-danger)';
        } else {
            label.textContent = `${Math.ceil(remaining / 60)}m remaining`;
            display.style.color = 'var(--c-success)';
        }
    } else {
        label.textContent = state.timerRunning ? 'Running...' : 'Timer';
        display.style.color = 'var(--c-success)';
    }
}

function startTimer() {
    if (state.timerRunning) {
        // Pause
        clearInterval(state.timerInterval);
        state.timerRunning = false;
        document.getElementById('timerStartBtn').textContent = '▶ Start';
    } else {
        // Start
        state.timerRunning = true;
        document.getElementById('timerStartBtn').textContent = '⏸ Pause';
        state.timerInterval = setInterval(() => {
            state.timerSeconds++;
            updateTimerDisplay();

            // Alert when countdown reaches target
            if (state.timerTarget && state.timerSeconds === state.timerTarget) {
                // Flash the display
                document.getElementById('timerDisplay').style.color = 'var(--c-danger)';
                document.getElementById('timerLabel').textContent = '⏰ Time is up!';
                // Try notification sound / vibration
                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            }
        }, 1000);
    }
    updateTimerDisplay();
}

function resetTimer() {
    clearInterval(state.timerInterval);
    state.timerSeconds = 0;
    state.timerTarget = null;
    state.timerRunning = false;
    document.getElementById('timerStartBtn').textContent = '▶ Start';
    updateTimerDisplay();
}

function setCountdownTimer(seconds) {
    resetTimer();
    state.timerTarget = seconds;
    state.timerSeconds = 0;
    updateTimerDisplay();
    startTimer(); // Auto-start
}


// =========================================
// EVENT LISTENERS
// =========================================
function setupEvents() {
    const longPress = { timer: null, id: null, triggered: false };
    const startLongPress = (id) => {
        longPress.id = id;
        longPress.triggered = false;
        clearTimeout(longPress.timer);
        longPress.timer = setTimeout(() => {
            longPress.triggered = true;
            openPickerForRecipe(id);
        }, 500);
    };
    const cancelLongPress = () => {
        if (longPress.timer) clearTimeout(longPress.timer);
    };
    // --- Tab switching ---
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    document.getElementById('groceryListBtn').addEventListener('click', () => switchView('shopping'));
    document.getElementById('addRecipeBtn').addEventListener('click', () => document.getElementById('addRecipeModal').classList.add('open'));
    document.getElementById('fridgeBtn').addEventListener('click', () => {
        renderFridge();
        document.getElementById('fridgeModal').classList.add('open');
    });
    // Allergen filter modal removed — handled by profiles

    // --- Week navigation ---
    document.getElementById('prevWeek').addEventListener('click', () => { state.weekOffset--; renderPlanner(); });
    document.getElementById('nextWeek').addEventListener('click', () => { state.weekOffset++; renderPlanner(); });

    // --- Planner grid interactions ---
    document.getElementById('plannerGrid').addEventListener('click', e => {
        const slot = e.target.closest('.meal-slot');
        if (!slot) return;
        const dateKey = slot.dataset.date;
        const slotIdx = parseInt(slot.dataset.slot);

        // Skip button
        if (e.target.closest('.slot-skip')) {
            const slots = ensureSlots(dateKey);
            slots[slotIdx].status = 'skipped';
            slots[slotIdx].recipeId = null;
            saveState(); renderPlanner(); return;
        }
        // Undo skip
        if (e.target.closest('.slot-undo')) {
            const slots = ensureSlots(dateKey);
            slots[slotIdx].status = slotIdx === 0 ? 'empty' : 'notNeeded';
            saveState(); renderPlanner(); return;
        }
        // Remove meal
        if (e.target.closest('.slot-remove')) {
            const slots = ensureSlots(dateKey);
            slots[slotIdx].status = slotIdx === 0 ? 'empty' : 'notNeeded';
            slots[slotIdx].recipeId = null;
            slots[slotIdx].portions = null;
            saveState(); renderPlanner(); return;
        }
        // Swap meal (same as remove + open picker)
        if (e.target.closest('.slot-swap')) {
            openPicker(dateKey, slotIdx); return;
        }
        // Click empty slot or extra empty → open picker
        if (slot.classList.contains('meal-slot-empty') || slot.classList.contains('meal-slot-extra-empty')) {
            // For extra slots, set status to empty first
            if (slot.classList.contains('meal-slot-extra-empty')) {
                const slots = ensureSlots(dateKey);
                slots[slotIdx].status = 'empty';
            }
            openPicker(dateKey, slotIdx); return;
        }
        // Click filled slot → open detail
        if (slot.classList.contains('meal-slot-filled') && !e.target.closest('.slot-actions')) {
            const slots = ensureSlots(dateKey);
            if (slots[slotIdx].recipeId) openDetail(slots[slotIdx].recipeId);
        }
    });

    // Drag & drop move
    document.getElementById('plannerGrid').addEventListener('dragstart', e => {
        const slotEl = e.target.closest('.meal-slot-filled');
        if (!slotEl) return;
        const dateKey = slotEl.dataset.date;
        const slotIdx = parseInt(slotEl.dataset.slot, 10);
        e.dataTransfer.setData('text/plain', JSON.stringify({ dateKey, slotIdx }));
        e.dataTransfer.effectAllowed = 'move';
        slotEl.classList.add('dragging');
    });

    document.getElementById('plannerGrid').addEventListener('dragend', () => {
        document.querySelectorAll('.meal-slot').forEach(s => s.classList.remove('drop-target'));
        document.querySelectorAll('.meal-slot.dragging').forEach(s => s.classList.remove('dragging'));
    });

    document.getElementById('plannerGrid').addEventListener('dragover', e => {
        const target = e.target.closest('.meal-slot');
        if (!target) return;
        e.preventDefault();
        target.classList.add('drop-target');
        e.dataTransfer.dropEffect = 'move';
    });

    document.getElementById('plannerGrid').addEventListener('dragleave', e => {
        const target = e.target.closest('.meal-slot');
        if (target) target.classList.remove('drop-target');
    });

    document.getElementById('plannerGrid').addEventListener('drop', e => {
        const target = e.target.closest('.meal-slot');
        if (!target) return;
        e.preventDefault();
        target.classList.remove('drop-target');

        const data = e.dataTransfer.getData('text/plain');
        if (!data) return;
        const { dateKey: fromDate, slotIdx: fromIdx } = JSON.parse(data);
        const toDate = target.dataset.date;
        const toIdx = parseInt(target.dataset.slot, 10);
        if (!fromDate || fromIdx === undefined || !toDate || toIdx === undefined) return;
        if (fromDate === toDate && fromIdx === toIdx) return;

        const fromSlots = ensureSlots(fromDate);
        const toSlots = ensureSlots(toDate);
        const moving = fromSlots[fromIdx];
        if (!moving || moving.status !== 'filled') return;

        const targetSlot = toSlots[toIdx];
        if (targetSlot && targetSlot.status === 'filled') {
            // Swap
            fromSlots[fromIdx] = targetSlot;
            toSlots[toIdx] = moving;
        } else {
            // Move
            toSlots[toIdx] = moving;
            fromSlots[fromIdx] = getDefaultSlot(moving.slotType);
        }

        saveState();
        renderPlanner();
    });

    // --- Recipe grid interactions ---
    document.getElementById('fabAddRecipe')?.addEventListener('click', () => {
        document.getElementById('addRecipeModal').classList.add('open');
    });

    document.getElementById('recipeGrid').addEventListener('click', e => {
        // "Add your own recipe" card
        if (e.target.closest('.add-recipe-card')) {
            document.getElementById('addRecipeModal').classList.add('open');
            return;
        }

        const action = e.target.dataset.action;
        const id = e.target.dataset.id;

        if (action === 'fav' && id) {
            const idx = state.favouriteRecipes.indexOf(id);
            if (idx > -1) state.favouriteRecipes.splice(idx, 1);
            else state.favouriteRecipes.push(id);
            saveState(); renderRecipes(); return;
        }
        if (action === 'view' && id) { openDetail(id); return; }
        if (action === 'add' && id) {
            if (longPress.triggered && longPress.id === id) {
                longPress.triggered = false;
                return;
            }
            // Quick add: find next empty main slot this week
            const days = getWeekDates(state.weekOffset);
            for (const date of days) {
                const key = fmtDate(date);
                const slots = ensureSlots(key);
                const emptyMain = slots.findIndex(s => s.status === 'empty' && s.slotType === 'main');
                if (emptyMain >= 0) {
                    slots[emptyMain] = { slotType: 'main', status: 'filled', recipeId: id, portions: state.defaultPortions };
                    saveState(); renderPlanner();
                    // Flash feedback
                    e.target.textContent = '✓ Added!';
                    e.target.classList.remove('btn-primary');
                    e.target.classList.add('btn-success');
                    setTimeout(() => { e.target.textContent = '+ Add to Plan'; e.target.classList.remove('btn-success'); e.target.classList.add('btn-primary'); }, 1500);
                    return;
                }
            }
            alert('All main meal slots are full this week! Try swapping an existing meal.');
            return;
        }

        // Click card body → open detail
        const card = e.target.closest('.recipe-card');
        if (card && !e.target.closest('button')) {
            openDetail(card.dataset.id);
        }
    });

    document.getElementById('recipeGrid').addEventListener('mousedown', e => {
        const btn = e.target.closest('button[data-action="add"]');
        if (!btn) return;
        startLongPress(btn.dataset.id);
    });
    document.getElementById('recipeGrid').addEventListener('mouseup', cancelLongPress);
    document.getElementById('recipeGrid').addEventListener('mouseleave', cancelLongPress);
    document.getElementById('recipeGrid').addEventListener('touchstart', e => {
        const btn = e.target.closest('button[data-action="add"]');
        if (!btn) return;
        startLongPress(btn.dataset.id);
    }, { passive: true });
    document.getElementById('recipeGrid').addEventListener('touchend', cancelLongPress);
    document.getElementById('recipeGrid').addEventListener('touchcancel', cancelLongPress);

    // --- Recipe search ---
    document.getElementById('recipeSearchInput')?.addEventListener('input', e => {
        state.recipeSearch = e.target.value.trim();
        renderRecipes();
    });
    document.getElementById('recipeSearchClear')?.addEventListener('click', () => {
        state.recipeSearch = '';
        const input = document.getElementById('recipeSearchInput');
        if (input) input.value = '';
        saveState(); renderRecipes();
    });

    // --- Filter clear all ---
    document.getElementById('filterClearAll')?.addEventListener('click', clearAllFilters);

    // --- Filter bottom sheet backdrop ---
    document.querySelector('#filterSheet .bottom-sheet-backdrop')?.addEventListener('click', closeFilterSheet);

    // --- Recipe Picker Modal ---
    document.getElementById('pickerClose').addEventListener('click', closePicker);
    document.getElementById('pickerModal').addEventListener('click', e => { if (e.target === document.getElementById('pickerModal')) closePicker(); });

    document.getElementById('pickerSearch').addEventListener('input', renderPickerGrid);

    document.getElementById('pickerDaySelect').addEventListener('change', e => {
        state.pickerDay = e.target.value;
    });
    document.getElementById('pickerSlotSelect').addEventListener('change', e => {
        state.pickerSlot = parseInt(e.target.value, 10);
    });

    document.getElementById('pickerFilters').addEventListener('click', e => {
        const pill = e.target.closest('.pill');
        if (!pill) return;
        document.querySelectorAll('#pickerFilters .pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderPickerGrid();
    });

    document.getElementById('pickerGrid').addEventListener('click', e => {
        const recipe = e.target.closest('.picker-recipe');
        if (!recipe) return;
        state.pickerSelected = recipe.dataset.id;
        document.getElementById('pickerAddBtn').disabled = false;
        const selectedInfo = document.getElementById('pickerSelectedInfo');
        const r = getRecipe(state.pickerSelected);
        if (selectedInfo) {
            selectedInfo.textContent = r ? `Selected: ${r.name}` : 'Selected recipe';
            selectedInfo.classList.add('show');
        }
        // Update selected state
        document.querySelectorAll('.picker-recipe').forEach(r => r.classList.remove('selected'));
        recipe.classList.add('selected');
    });

    document.getElementById('pickerPortionMinus').addEventListener('click', () => {
        if (state.pickerPortions > 1) { state.pickerPortions--; document.getElementById('pickerPortionVal').textContent = state.pickerPortions; }
    });
    document.getElementById('pickerPortionPlus').addEventListener('click', () => {
        if (state.pickerPortions < 12) { state.pickerPortions++; document.getElementById('pickerPortionVal').textContent = state.pickerPortions; }
    });
    document.getElementById('pickerAddBtn').addEventListener('click', addToPlan);

    document.getElementById('pickerExcludeInput').addEventListener('input', e => {
        state.pickerExclusions = e.target.value.split(',').map(v => v.trim()).filter(Boolean);
    });
    document.getElementById('pickerSwapNoteInput').addEventListener('input', e => {
        state.pickerSwapNote = e.target.value.trim();
    });

    // --- Add Recipe Modal ---
    document.getElementById('addRecipeClose').addEventListener('click', () => document.getElementById('addRecipeModal').classList.remove('open'));
    document.getElementById('addRecipeCancel').addEventListener('click', () => document.getElementById('addRecipeModal').classList.remove('open'));
    document.getElementById('addRecipeModal').addEventListener('click', e => { if (e.target === document.getElementById('addRecipeModal')) document.getElementById('addRecipeModal').classList.remove('open'); });

    document.getElementById('addRecipeForm').addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('recipeNameInput').value.trim();
        if (!name) return;
        const image = document.getElementById('recipeImageInput').value.trim() || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop';
        const cookTime = parseInt(document.getElementById('recipeCookTimeInput').value, 10) || 25;
        const servings = parseInt(document.getElementById('recipeServingsInput').value, 10) || 2;
        const calories = parseInt(document.getElementById('recipeCaloriesInput').value, 10) || 0;
        const difficulty = document.getElementById('recipeDifficultyInput').value;
        const cuisine = document.getElementById('recipeCuisineInput').value;
        const tags = document.getElementById('recipeTagsInput').value
            .split(',').map(t => t.trim()).filter(Boolean);
        const sourceName = document.getElementById('recipeSourceInput').value.trim();

        const ingredientLines = document.getElementById('recipeIngredientsInput').value
            .split('\n').map(l => l.trim()).filter(Boolean);
        const ingredients = ingredientLines.map(parseIngredientLine).filter(Boolean);

        const stepLines = document.getElementById('recipeStepsInput').value
            .split('\n').map(l => l.trim()).filter(Boolean);
        const steps = stepLines.map(text => ({ text }));

        const editingId = document.getElementById('addRecipeForm').dataset.editingId;

        if (editingId) {
            // Editing existing recipe
            const existing = getRecipe(editingId);
            if (existing) {
                existing.name = name;
                existing.image = image;
                existing.cookTime = cookTime;
                existing.servings = servings;
                existing.calories = calories;
                existing.difficulty = difficulty;
                existing.cuisine = cuisine;
                existing.tags = tags;
                existing.source = { name: sourceName || existing.source?.name || 'User recipe', url: document.getElementById('recipeUrlInput')?.value.trim() || existing.source?.url || '#' };
                existing.ingredients = ingredients;
                existing.steps = steps;
                // Update in custom recipes if it's there
                const cidx = state.customRecipes.findIndex(r => r.id === editingId);
                if (cidx >= 0) state.customRecipes[cidx] = existing;
            }
            delete document.getElementById('addRecipeForm').dataset.editingId;
        } else {
            const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
            const recipe = {
                id, name, image, cookTime, calories, servings, difficulty, tags, cuisine,
                source: { name: sourceName || 'User recipe', url: document.getElementById('recipeUrlInput')?.value.trim() || '#' },
                favourite: false, timesCooked: 0, ingredients, steps,
                description: '', dietary: [], soloFriendly: servings <= 2, familyFriendly: servings >= 4,
                mainProtein: '', prepTime: Math.round(cookTime * 0.3 / 5) * 5, tips: '',
            };
            recipes.push(recipe);
            state.customRecipes.push(recipe);
        }

        saveState();
        renderRecipes();
        document.getElementById('addRecipeForm').reset();
        if (document.getElementById('recipeUrlInput')) document.getElementById('recipeUrlInput').value = '';
        if (document.getElementById('urlFetchStatus')) document.getElementById('urlFetchStatus').textContent = '';
        document.getElementById('addRecipeModal').classList.remove('open');
    });

    // --- Detail Modal ---
    document.getElementById('detailBack').addEventListener('click', closeDetail);
    document.getElementById('detailClose').addEventListener('click', closeDetail);
    document.getElementById('detailModal').addEventListener('click', e => { if (e.target === document.getElementById('detailModal')) closeDetail(); });

    document.getElementById('detailFav').addEventListener('click', () => {
        if (!state.detailRecipeId) return;
        const idx = state.favouriteRecipes.indexOf(state.detailRecipeId);
        if (idx > -1) state.favouriteRecipes.splice(idx, 1);
        else state.favouriteRecipes.push(state.detailRecipeId);
        saveState(); openDetail(state.detailRecipeId); renderRecipes();
    });

    document.getElementById('detailCookBtn').addEventListener('click', () => {
        if (state.detailRecipeId) openCookMode(state.detailRecipeId);
    });

    document.getElementById('detailAddBtn').addEventListener('click', () => {
        if (!state.detailRecipeId) return;
        closeDetail();
        // Find next empty main slot
        const days = getWeekDates(state.weekOffset);
        for (const date of days) {
            const key = fmtDate(date);
            const slots = ensureSlots(key);
            const emptyMain = slots.findIndex(s => s.status === 'empty' && s.slotType === 'main');
            if (emptyMain >= 0) {
                slots[emptyMain] = { slotType: 'main', status: 'filled', recipeId: state.detailRecipeId, portions: state.defaultPortions };
                saveState(); renderPlanner(); switchView('planner'); return;
            }
        }
        alert('All main meal slots are full this week!');
    });

    // --- Detail: Edit button ---
    document.getElementById('detailEdit').addEventListener('click', () => {
        if (!state.detailRecipeId) return;
        const r = getRecipe(state.detailRecipeId);
        if (!r) return;
        closeDetail();
        // Pre-fill the add recipe form
        document.getElementById('recipeNameInput').value = r.name;
        document.getElementById('recipeImageInput').value = r.image || '';
        document.getElementById('recipeCookTimeInput').value = r.cookTime;
        document.getElementById('recipeServingsInput').value = r.servings;
        document.getElementById('recipeCaloriesInput').value = r.calories || '';
        document.getElementById('recipeDifficultyInput').value = r.difficulty;
        document.getElementById('recipeCuisineInput').value = r.cuisine;
        document.getElementById('recipeTagsInput').value = (r.tags || []).join(', ');
        document.getElementById('recipeIngredientsInput').value = r.ingredients.map(i =>
            `${i.amount || ''} ${i.unit || ''} ${i.name}`.trim()
        ).join('\n');
        document.getElementById('recipeStepsInput').value = r.steps.map(s => s.text).join('\n');
        document.getElementById('recipeSourceInput').value = r.source?.name || '';
        // Store editing ID
        document.getElementById('addRecipeForm').dataset.editingId = r.id;
        document.getElementById('addRecipeModal').classList.add('active');
    });

    // --- Detail: Portion buttons ---
    document.getElementById('detailBody').addEventListener('click', (e) => {
        const btn = e.target.closest('.portion-preset');
        if (!btn) return;
        const portions = parseInt(btn.dataset.portions);
        const r = getRecipe(state.detailRecipeId);
        if (!r) return;
        state.detailPortions = portions;
        // Update active state
        document.querySelectorAll('.portion-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('detailPortionLabel').textContent = `for ${portions}`;
        // Re-render ingredients with scaling
        const list = document.getElementById('detailIngredientList');
        if (list) {
            list.innerHTML = r.ingredients.map(i => {
                const scaled = scaleAmt(i.amount, portions, r.servings);
                return `<li>${fmtAmount(scaled)} ${i.unit} <strong>${i.name}</strong>${i.prep ? ' — '+i.prep : ''}</li>`;
            }).join('');
        }
    });

    // --- Detail: Notes auto-save ---
    document.getElementById('detailBody').addEventListener('input', (e) => {
        if (e.target.id === 'detailNotes') {
            if (!state.recipeNotes) state.recipeNotes = {};
            state.recipeNotes[state.detailRecipeId] = e.target.value;
            saveState();
        }
    });

    // --- Cook Mode ---
    document.getElementById('cookExit').addEventListener('click', closeCookMode);

    document.getElementById('cookPrev').addEventListener('click', () => {
        if (state.cookStep > 0) { state.cookStep--; renderCookSteps(); }
    });

    document.getElementById('cookNext').addEventListener('click', () => {
        const r = getRecipe(state.cookRecipeId);
        if (!r) return;
        if (state.cookStep < r.steps.length - 1) {
            state.cookStep++;
            renderCookSteps();
        } else {
            // Done cooking!
            if (confirm('Mark as cooked? 🎉')) {
                r.timesCooked = (r.timesCooked || 0) + 1;
                closeCookMode();
                renderRecipes();
            }
        }
    });

    // Cook step click → jump to step
    document.getElementById('cookSteps').addEventListener('click', e => {
        const step = e.target.closest('.cook-step');
        if (step && !e.target.closest('.step-time')) {
            state.cookStep = parseInt(step.dataset.step);
            renderCookSteps();
        }
        // Set timer from step
        if (e.target.closest('[data-action="set-timer"]')) {
            const seconds = parseInt(e.target.closest('[data-action="set-timer"]').dataset.time);
            if (seconds) setCountdownTimer(seconds);
        }
    });

    // Cook ingredient check
    document.getElementById('cookIngredients').addEventListener('click', e => {
        if (e.target.classList.contains('check')) {
            e.target.classList.toggle('done');
        }
    });

    // Timer controls
    document.getElementById('timerStartBtn').addEventListener('click', startTimer);
    document.getElementById('timerResetBtn').addEventListener('click', resetTimer);

    // --- Shopping List ---
    document.getElementById('shoppingItems').addEventListener('click', e => {
        if (e.target.dataset.action === 'check' || e.target.classList.contains('item-check')) {
            e.target.classList.toggle('checked');
            e.target.innerHTML = e.target.classList.contains('checked') ? '✓' : '';
            e.target.closest('.shopping-item')?.classList.toggle('checked');
            updateShoppingProgress();
        }
    });

    document.getElementById('copyListBtn').addEventListener('click', () => {
        const text = getShoppingListText();
        if (!text) { alert('Nothing to copy!'); return; }
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('copyListBtn');
            btn.textContent = '✓ Copied!';
            setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
        }).catch(() => alert('Failed to copy. Try selecting the text manually.'));
    });

    document.getElementById('clearPlanBtn').addEventListener('click', () => {
        if (confirm('Clear your entire meal plan for this week? This cannot be undone.')) {
            const days = getWeekDates(state.weekOffset);
            days.forEach(d => { delete state.mealPlan[fmtDate(d)]; });
            saveState(); renderPlanner(); renderShopping();
        }
    });

    // --- Tesco / Supermarket Search ---
    document.getElementById('tescoBtn').addEventListener('click', () => {
        document.getElementById('tescoModal').classList.add('open');
    });
    document.getElementById('tescoClose').addEventListener('click', () => {
        document.getElementById('tescoModal').classList.remove('open');
    });
    document.getElementById('tescoModal').addEventListener('click', e => {
        if (e.target === document.getElementById('tescoModal')) document.getElementById('tescoModal').classList.remove('open');
    });
    document.getElementById('storeButtons').addEventListener('click', e => {
        const store = e.target.dataset.store;
        if (!store) return;
        const urls = {
            tesco: 'https://www.tesco.com/groceries/en-GB/search?query=',
            sainsburys: 'https://www.sainsburys.co.uk/gol-ui/SearchResults/',
            asda: 'https://groceries.asda.com/search/',
            ocado: 'https://www.ocado.com/search?entry=',
        };
        const baseUrl = urls[store];
        if (!baseUrl) return;

        const items = document.querySelectorAll('#shoppingItems .shopping-item:not(.checked) .item-name');
        if (items.length === 0) { alert('No items on your shopping list!'); return; }

        // Open first 5 items as separate tabs (browsers may block more)
        const toSearch = Array.from(items).slice(0, 5).map(el => {
            // Extract just the ingredient name (strip amounts/units)
            return el.textContent.trim().replace(/^[\d¼½¾⅓⅔.]+\s*(g|kg|ml|l|tbsp|tsp|tin|large|thumb|)\s*/i, '').trim();
        });

        toSearch.forEach((term, i) => {
            setTimeout(() => window.open(baseUrl + encodeURIComponent(term), '_blank'), i * 300);
        });

        document.getElementById('tescoModal').classList.remove('open');
    });

    // --- Fridge modal ---
    document.getElementById('fridgeClose').addEventListener('click', () => document.getElementById('fridgeModal').classList.remove('open'));
    document.getElementById('fridgeModal').addEventListener('click', e => { if (e.target === document.getElementById('fridgeModal')) document.getElementById('fridgeModal').classList.remove('open'); });

    document.getElementById('fridgeAddBtn').addEventListener('click', () => {
        const input = document.getElementById('fridgeInput');
        const value = input.value.trim().toLowerCase();
        if (value && !state.fridgeItems.includes(value)) {
            state.fridgeItems.push(value);
            saveState();
            renderFridge();
            renderRecipes();
        }
        input.value = '';
    });

    document.getElementById('fridgeInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('fridgeAddBtn').click();
        }
    });

    document.getElementById('fridgeList').addEventListener('click', e => {
        if (e.target.classList.contains('remove-fridge')) {
            const item = e.target.dataset.item;
            state.fridgeItems = state.fridgeItems.filter(i => i !== item);
            saveState();
            renderFridge();
            renderRecipes();
        }
    });

    document.getElementById('fridgeFilterToggle').addEventListener('change', e => {
        state.fridgeFilterEnabled = e.target.checked;
        saveState();
        renderRecipes();
    });

    // Fridge quick-add chips
    document.getElementById('fridgeQuickChips')?.addEventListener('click', e => {
        const chip = e.target.closest('.pill');
        if (!chip) return;
        const item = chip.dataset.item;
        if (item && !state.fridgeItems.includes(item)) {
            state.fridgeItems.push(item);
            saveState();
            renderFridge();
            renderRecipes();
        }
    });

    // Use It Up rail — click to open detail
    document.getElementById('useItUpRail')?.addEventListener('click', e => {
        const card = e.target.closest('.use-it-up-card');
        if (card) openDetail(card.dataset.id);
    });

    // --- Show all / re-apply filters toggle (delegated on activeFiltersInfo) ---
    document.getElementById('activeFiltersInfo')?.addEventListener('click', e => {
        if (e.target.id === 'showAllRecipesBtn') {
            state.showAllRecipes = true;
            saveState();
            renderRecipes();
        } else if (e.target.id === 'reapplyFiltersBtn') {
            state.showAllRecipes = false;
            saveState();
            renderRecipes();
        }
    });

    // --- Header portions / cooking-for ---
    const cookingForSelect = document.getElementById('cookingForSelect');
    const defaultPortionVal = document.getElementById('defaultPortionVal');

    function updateDefaultPortions(val, syncSelect = true) {
        state.defaultPortions = val;
        defaultPortionVal.textContent = val;
        if (syncSelect) {
            if (['1','2','4'].includes(String(val))) cookingForSelect.value = String(val);
            else cookingForSelect.value = 'custom';
        }
        saveState();
    }

    cookingForSelect.addEventListener('change', () => {
        if (cookingForSelect.value === 'custom') {
            cookingForSelect.value = 'custom';
            return;
        }
        updateDefaultPortions(parseInt(cookingForSelect.value, 10), false);
        cookingForSelect.value = String(state.defaultPortions);
    });

    document.getElementById('defaultPortionMinus').addEventListener('click', () => {
        if (state.defaultPortions > 1) updateDefaultPortions(state.defaultPortions - 1);
    });
    document.getElementById('defaultPortionPlus').addEventListener('click', () => {
        if (state.defaultPortions < 12) updateDefaultPortions(state.defaultPortions + 1);
    });

    // --- Pantry management ---
    function handlePantryAdd(inputId) {
        const input = document.getElementById(inputId);
        if (input && input.value.trim()) {
            addPantryItem(input.value);
            input.value = '';
        }
    }

    document.getElementById('addPantryBtn')?.addEventListener('click', () => handlePantryAdd('newPantryInput'));
    document.getElementById('settingsAddPantryBtn')?.addEventListener('click', () => handlePantryAdd('settingsPantryInput'));

    // Enter key for pantry inputs
    ['newPantryInput', 'settingsPantryInput'].forEach(id => {
        document.getElementById(id)?.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); handlePantryAdd(id); }
        });
    });

    // Remove pantry items (delegated)
    document.addEventListener('click', e => {
        if (e.target.classList.contains('remove-pantry')) {
            removePantryItem(e.target.dataset.item);
        }
    });

    // --- Profile management ---
    document.getElementById('addProfileForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('profileNameInput').value.trim();
        if (!name) return;

        const allergens = Array.from(document.querySelectorAll('#profileAllergenGrid input:checked')).map(cb => cb.value);
        const dislikesStr = document.getElementById('profileDislikesInput').value;
        const dislikes = dislikesStr ? dislikesStr.split(',').map(d => d.trim()).filter(Boolean) : [];

        if (state.editingProfileId) {
            // Update existing profile
            const existing = state.profiles.find(p => p.id === state.editingProfileId);
            if (existing) {
                existing.name = name;
                existing.allergens = allergens;
                existing.dislikes = dislikes;
            }
        } else {
            // Create new profile
            const profile = { id: 'profile_' + Date.now(), name, allergens, dislikes };
            state.profiles.push(profile);
            state.activeProfileIds.push(profile.id);
        }
        saveState();
        cancelProfileEdit(); // Reset form + editing state
        renderProfiles();
        renderRecipes();
    });

    // Profile list: edit, delete, toggle active/inactive
    document.getElementById('profileList')?.addEventListener('click', e => {
        // Edit button
        if (e.target.closest('.profile-edit-btn')) {
            e.stopPropagation();
            editProfile(e.target.closest('.profile-edit-btn').dataset.id);
            return;
        }
        // Delete button
        if (e.target.closest('.profile-delete-btn')) {
            e.stopPropagation();
            const id = e.target.closest('.profile-delete-btn').dataset.id;
            const profile = state.profiles.find(p => p.id === id);
            if (profile && confirm(`Remove ${profile.name}?`)) {
                state.profiles = state.profiles.filter(p => p.id !== id);
                state.activeProfileIds = state.activeProfileIds.filter(a => a !== id);
                saveState();
                renderProfiles();
                renderRecipes();
            }
            return;
        }
        // Toggle active/inactive
        const card = e.target.closest('.profile-card-item');
        if (!card) return;
        const id = card.dataset.id;
        const idx = state.activeProfileIds.indexOf(id);
        if (idx > -1) state.activeProfileIds.splice(idx, 1);
        else state.activeProfileIds.push(id);
        saveState();
        renderProfiles();
        renderRecipes();
    });

    // --- Onboarding wizard ---
    const onboardingModal = document.getElementById('onboardingModal');
    if (onboardingModal) {
        onboardingModal.addEventListener('click', e => {
            const action = e.target.dataset.wizardAction;
            if (action === 'next') renderOnboardingStep(onboardingStep + 1);
            if (action === 'back') renderOnboardingStep(onboardingStep - 1);
            if (action === 'skip') renderOnboardingStep(onboardingStep + 1);
            if (action === 'start') renderOnboardingStep(2);
            if (action === 'complete') completeOnboarding();
            if (action === 'add-profile') addOnboardingProfile();

            // Remove profile from wizard
            if (e.target.classList.contains('wizard-remove-profile')) {
                const id = e.target.dataset.id;
                state.profiles = state.profiles.filter(p => p.id !== id);
                state.activeProfileIds = state.activeProfileIds.filter(a => a !== id);
                saveState();
                renderOnboardingProfiles();
            }
            // Remove pantry item from wizard
            if (e.target.classList.contains('wizard-pantry-remove')) {
                removePantryItem(e.target.dataset.item);
                renderOnboardingPantry();
            }
            // Remove fridge item from wizard
            if (e.target.classList.contains('wizard-fridge-remove')) {
                const item = e.target.dataset.item;
                state.fridgeItems = state.fridgeItems.filter(i => i !== item);
                saveState();
                renderOnboardingFridge();
            }
        });

        // Onboarding pantry add
        const wizPantryBtn = document.getElementById('onboardingPantryAdd');
        const wizPantryInput = document.getElementById('onboardingPantryInput');
        if (wizPantryBtn && wizPantryInput) {
            wizPantryBtn.addEventListener('click', () => {
                if (wizPantryInput.value.trim()) {
                    addPantryItem(wizPantryInput.value);
                    wizPantryInput.value = '';
                    renderOnboardingPantry();
                }
            });
            wizPantryInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); wizPantryBtn.click(); }
            });
        }

        // Onboarding fridge add
        const wizFridgeBtn = document.getElementById('onboardingFridgeAdd');
        const wizFridgeInput = document.getElementById('onboardingFridgeInput');
        if (wizFridgeBtn && wizFridgeInput) {
            wizFridgeBtn.addEventListener('click', () => {
                const items = wizFridgeInput.value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
                items.forEach(item => {
                    if (!state.fridgeItems.includes(item)) state.fridgeItems.push(item);
                });
                saveState();
                wizFridgeInput.value = '';
                renderOnboardingFridge();
            });
            wizFridgeInput.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); wizFridgeBtn.click(); }
            });
        }

        // Onboarding profile name Enter key
        document.getElementById('onboardingProfileName')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); addOnboardingProfile(); }
        });
    }

    // --- URL recipe import ---
    document.getElementById('fetchRecipeBtn')?.addEventListener('click', () => {
        const url = document.getElementById('recipeUrlInput').value.trim();
        if (!url) return;
        try { new URL(url); } catch { document.getElementById('urlFetchStatus').textContent = 'Please enter a valid URL.'; return; }
        fetchRecipeFromUrl(url);
    });
    document.getElementById('recipeUrlInput')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); document.getElementById('fetchRecipeBtn').click(); }
    });

    // --- Reset all data ---
    document.getElementById('resetAllDataBtn')?.addEventListener('click', () => {
        if (confirm('This will remove all your profiles, meal plans, and settings. Are you sure?')) {
            localStorage.removeItem('mealPlannerV4');
            localStorage.removeItem('mealPlannerV3');
            location.reload();
        }
    });
}


// =========================================
// INITIALISATION
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    loadCustomRecipes();
    const cookingForSelect = document.getElementById('cookingForSelect');
    const defaultPortionVal = document.getElementById('defaultPortionVal');
    if (defaultPortionVal) defaultPortionVal.textContent = state.defaultPortions;
    if (cookingForSelect) {
        const v = String(state.defaultPortions);
        cookingForSelect.value = ['1','2','4'].includes(v) ? v : 'custom';
    }
    renderAllergenGrid();
    // Sync search input with persisted state
    const searchInput = document.getElementById('recipeSearchInput');
    if (searchInput && state.recipeSearch) searchInput.value = state.recipeSearch;
    switchView(state.currentView || 'recipes');
    renderPantry();
    renderProfiles();
    renderFridge();
    setupEvents();
    updateTimerDisplay();
    if (!state.onboardingComplete) showOnboarding();
});
