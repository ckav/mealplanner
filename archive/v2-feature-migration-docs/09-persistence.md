# Feature: Data Persistence

## Description
Automatic saving and restoration of user data (selected meals, preferences, state) using browser localStorage for session continuity.

## Current Implementation (Old Version)

### JavaScript Implementation

#### Save Selected Meals
```javascript
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
    
    // PERSISTENCE: Save to localStorage
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
}
```

#### Load Saved Data
```javascript
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
```

## Features & Functionality
✅ Saves selected meals to localStorage
✅ Restores on page reload
✅ Error handling (try/catch for JSON)
✅ Graceful fallback (default empty if load fails)
✅ Automatic save on selection change
✅ JSON serialization format

## Data Stored
```javascript
// localStorage key: 'selectedMeals'
// Value: JSON array of meal IDs
["1", "3", "5"]
```

## Storage API Overview
```javascript
// Set item
localStorage.setItem(key, value);

// Get item
const value = localStorage.getItem(key);

// Remove item
localStorage.removeItem(key);

// Clear all
localStorage.clear();

// Storage limits: ~5-10MB per domain
```

## Integration Requirements for v2

### Current v2 Status
- v2 has state object: `let state = { recipes, mealPlan, ... }`
- May already have persistence (check app.js)
- Need to verify what's being persisted

### Work Needed
- [ ] Check v2/app.js for existing persistence
- [ ] If missing: Implement localStorage for state
- [ ] Verify meal plan persists
- [ ] Test with favorites, filter preferences
- [ ] Add error handling

## Enhanced Data to Persist

### Core Data to Save
```javascript
let persistedState = {
    selectedMeals: [],        // Current selection
    mealPlan: [],            // Weekly meal plan
    favorites: [],           // Favorite recipes
    filters: {               // User's last filter selection
        activeFilter: 'all',
        sortBy: 'recent'
    },
    userPreferences: {       // Settings
        portions: 4,
        darkMode: false,
        theme: 'light'
    },
    pantry: [],              // User's pantry items
    profiles: []             // Family profiles
};

// Save to localStorage
function savePersistentState() {
    localStorage.setItem('mealPlannerState', JSON.stringify(persistedState));
}

// Load from localStorage
function loadPersistentState() {
    const saved = localStorage.getItem('mealPlannerState');
    if (saved) {
        try {
            persistedState = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load state:', e);
            // Use defaults
        }
    }
}
```

## TODO for v2 Integration
- [ ] Create persistence module (persistence.js)
- [ ] Define what data to persist
- [ ] Implement auto-save on state changes
- [ ] Add load on app initialization
- [ ] Create data migration function (for schema changes)
- [ ] Add error handling and recovery
- [ ] Test localStorage quota warnings
- [ ] Implement cloud sync (optional, future)

## Advanced Persistence Features

### 1. IndexedDB for Larger Data
```javascript
// For when localStorage (5-10MB) isn't enough
const dbRequest = indexedDB.open('MealPlannerDB', 1);

dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore('state', { keyPath: 'id' });
    store.createIndex('timestamp', 'timestamp', { unique: false });
};

function saveToIndexedDB(data) {
    const transaction = db.transaction(['state'], 'readwrite');
    const store = transaction.objectStore('state');
    store.put({ id: 'appState', data, timestamp: Date.now() });
}
```

### 2. Cloud Sync (Future)
```javascript
// Save to backend for multi-device sync
async function syncStateToCloud() {
    const response = await fetch('/api/user/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(persistedState)
    });
    return response.json();
}

// Load from cloud
async function syncStateFromCloud() {
    const response = await fetch('/api/user/state');
    const data = await response.json();
    persistedState = data;
    return data;
}
```

### 3. Versioning & Migration
```javascript
const STORAGE_VERSION = 1;

function migrateData(oldData, fromVersion, toVersion) {
    let data = oldData;
    
    // Migration from v0 to v1
    if (fromVersion < 1) {
        // Add new fields
        data.mealPlan = data.mealPlan || [];
        data.favorites = data.favorites || [];
    }
    
    // Future migrations...
    
    return data;
}

function loadWithMigration() {
    const saved = localStorage.getItem('mealPlannerState');
    if (!saved) return;
    
    const data = JSON.parse(saved);
    const version = localStorage.getItem('storageVersion') || 0;
    
    if (version !== STORAGE_VERSION) {
        const migrated = migrateData(data, version, STORAGE_VERSION);
        localStorage.setItem('mealPlannerState', JSON.stringify(migrated));
        localStorage.setItem('storageVersion', STORAGE_VERSION);
    }
    
    return data;
}
```

### 4. Conflict Resolution
```javascript
// Handle conflicts if syncing across devices
function resolveConflict(localState, cloudState) {
    // Strategy 1: Last write wins
    if (localState.timestamp > cloudState.timestamp) {
        return localState;
    }
    
    // Strategy 2: Merge (deep merge for arrays)
    return {
        ...cloudState,
        mealPlan: [...new Set([...cloudState.mealPlan, ...localState.mealPlan])],
        // ... other arrays
    };
}
```

## Proposed Persistence Module

```javascript
// persistence.js
const PersistenceManager = {
    VERSION: 1,
    STORAGE_KEY: 'mealPlannerState',
    
    save: function(data) {
        try {
            const serialized = JSON.stringify({
                version: this.VERSION,
                timestamp: Date.now(),
                data: data
            });
            localStorage.setItem(this.STORAGE_KEY, serialized);
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    },
    
    load: function() {
        try {
            const serialized = localStorage.getItem(this.STORAGE_KEY);
            if (!serialized) return null;
            
            const saved = JSON.parse(serialized);
            
            // Handle versioning
            if (saved.version < this.VERSION) {
                return this.migrate(saved.data, saved.version);
            }
            
            return saved.data;
        } catch (e) {
            console.error('Load failed:', e);
            return null;
        }
    },
    
    clear: function() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    migrate: function(data, fromVersion) {
        // Implement migrations as needed
        return data;
    }
};

// Usage:
PersistenceManager.save(state);
const loadedState = PersistenceManager.load();
```

## Best Practices
1. **Version Your Data** - Include schema version for migrations
2. **Error Handling** - Gracefully handle corrupt data
3. **Default Values** - Provide sensible defaults if load fails
4. **Async Considerations** - Don't block UI on save
5. **Storage Limits** - Monitor quota, offer cleanup
6. **Selective Persistence** - Don't save everything (no secrets)
7. **User Control** - Allow users to clear data

## Security Considerations
❌ Do NOT store:
- Passwords
- API keys
- Personal health info
- Payment information

✅ Safe to store:
- Selected recipes
- Meal plans
- User preferences
- Pantry items
- Favorite recipes

## Storage Limits
- localStorage: ~5-10MB per origin
- Current app data: ~100KB (small)
- Room for 100+ meals, plans, preferences
- Consider IndexedDB for images

## Testing & Debugging

```javascript
// View saved data
console.log(JSON.parse(localStorage.getItem('mealPlannerState')));

// Clear saved data
localStorage.removeItem('mealPlannerState');

// Simulate load failure
localStorage.clear();
// Reload page - should use defaults

// Check storage quota
navigator.storage.estimate().then(estimate => {
    console.log(`Storage: ${estimate.usage} / ${estimate.quota} bytes`);
});
```

## Related Features
- Meal Selection (01-meal-selection.md)
- Pantry Management (04-pantry-management.md)
- Tab Navigation (08-tab-navigation.md)

## Future Enhancements
1. **CloudSync** - Multi-device synchronization
2. **Export/Import** - Download meal plans as JSON
3. **Undo/Redo** - Version history in localStorage
4. **Quota Management** - Handle full storage gracefully
5. **Encryption** - Sensitive data encryption (future)
