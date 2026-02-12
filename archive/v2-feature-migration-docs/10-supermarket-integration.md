# Feature: Supermarket Integration

## Description
Optional integration with online supermarket services (Tesco, Sainsbury's, ASDA, Ocado) to send shopping lists and add items to online baskets.

## Current Implementation (Old Version)

### HTML Structure
```html
<button class="btn btn-secondary" onclick="sendToSupermarket()">🏪 Send to Tesco</button>
```

### JavaScript Implementation
```javascript
function sendToSupermarket() {
    const items = [];
    document.querySelectorAll('.ingredient-item:not(.have-already) span').forEach(item => {
        items.push(item.textContent);
    });
    
    if (items.length === 0) {
        alert('No items to send - all ingredients marked as already owned!');
        return;
    }
    
    // Show mock integration message
    const supermarkets = ['Tesco', 'Sainsbury\'s', 'ASDA', 'Ocado'];
    const html = `
        <div style="padding: 20px; background: white; border-radius: 10px;">
            <h3>Select Supermarket:</h3>
            ${supermarkets.map(s => `<button onclick="alert('Would send ${items.length} items to ${s}')">${s}</button>`).join('')}
        </div>
    `;
    
    alert('This would integrate with supermarket APIs.\n\nFor now, copy the list and paste into your supermarket\'s quick-add feature.');
}
```

## Current State
- **Status**: Scaffolding only (no real implementation)
- **Mock UI**: Shows which supermarket could be used
- **Fallback**: Instructions to manually copy/paste list
- **Effort**: ~40% scaffolded, 60% work remaining

## Supermarket APIs Available

### 1. Tesco
- **Platform**: Tesco API (requires registration)
- **Endpoints**: Product search, shopping basket
- **Authentication**: API key + OAuth
- **Rate Limits**: Yes (check docs)
- **Status**: Documented, moderate complexity

### 2. Sainsbury's
- **Platform**: Sainsbury's Groceries API
- **Status**: Limited public API
- **Alternative**: Web scraping + automation

### 3. ASDA
- **Platform**: Asda.com API
- **Status**: Limited documentation
- **Alternative**: Web scraping

### 4. Ocado
- **Platform**: Ocado API
- **Status**: Very limited public documentation
- **Alternative**: Manual or partnership required

## Integration Architecture

### Phase 1: MVP (Current)
```javascript
function shareShoppingList() {
    const items = getUncheckedItems();
    const text = items.join('\n');
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // User manually pastes into supermarket app
    });
}
```

### Phase 2: Direct Integration (Tesco Example)
```javascript
async function sendToTesco() {
    const items = getUncheckedItems();
    
    // Map items to Tesco product IDs
    const tescoItems = await Promise.all(items.map(item => 
        searchTescoProduct(item)
    ));
    
    // Add to basket
    const response = await fetch('https://api.tesco.com/basket/add', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tescoApiToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: tescoItems })
    });
    
    return response.json();
}

async function searchTescoProduct(ingredient) {
    const response = await fetch(
        `https://api.tesco.com/products/search?q=${encodeURIComponent(ingredient)}`,
        {
            headers: { 'Authorization': 'Bearer ' + tescoApiToken }
        }
    );
    const data = await response.json();
    return data.products[0]; // Return first match
}
```

### Phase 3: OAuth Login
```javascript
// Tesco login flow
async function loginToTesco() {
    const clientId = 'YOUR_TESCO_CLIENT_ID';
    const redirectUri = 'https://yourapp.com/tesco-callback';
    
    // Redirect to Tesco login
    window.location.href = 
        `https://www.tesco.com/oauth/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=basket`;
}

// Handle callback
function handleTescoCallback(code) {
    // Exchange code for access token
    fetch('/api/auth/tesco', {
        method: 'POST',
        body: JSON.stringify({ code })
    });
}
```

## Implementation Options

### Option A: Copy-to-Clipboard (Current, 0 effort)
```javascript
function copyList() {
    const items = getUncheckedItems();
    navigator.clipboard.writeText(items.join('\n'));
    // User manually goes to supermarket and pastes
}
```
**Effort**: None | **UX**: Poor | **Setup**: None

### Option B: Web Links
```javascript
function sendToSupermarket(supermarket) {
    const items = getUncheckedItems().join('+');
    
    const links = {
        tesco: `https://www.tesco.com/groceries/search?q=${items}`,
        sainsburys: `https://www.sainsburys.co.uk/search?query=${items}`,
        asda: `https://www.asda.com/search?query=${items}`,
        ocado: `https://www.ocado.com/search?search=${items}`
    };
    
    window.open(links[supermarket], '_blank');
}
```
**Effort**: Low | **UX**: Fair | **Setup**: None

### Option C: API Integration (Full)
**Requires**:
- API credentials/keys from each supermarket
- Backend service to handle OAuth
- Product mapping (ingredient → product ID)
- Basket management code
- Error handling for API failures

**Effort**: High | **UX**: Excellent | **Setup**: Complex

## Recommended Approach

### Short-term (v2.1)
Use Option B (Web Links):
- Opens supermarket search for each ingredient
- No backend needed
- Better UX than copy/paste
- Works for price comparison

### Medium-term (v2.2)
Implement Tesco (most popular UK supermarket):
- Partner with Tesco for API access
- OAuth-based authentication
- Direct basket integration
- Price lookup

### Long-term (v3.0)
Multi-supermarket support:
- All major UK supermarkets
- Price comparison
- Delivery time estimates
- Substitution suggestions

## Implementation for v2

### Step 1: Add Supermarket Buttons
```html
<div class="supermarket-options">
    <button onclick="openSupermarketSearch('tesco')">
        🛒 Tesco
    </button>
    <button onclick="openSupermarketSearch('sainsburys')">
        🛒 Sainsbury's
    </button>
    <button onclick="openSupermarketSearch('asda')">
        🛒 ASDA
    </button>
    <button onclick="openSupermarketSearch('ocado')">
        🛒 Ocado
    </button>
</div>
```

### Step 2: Search Integration
```javascript
function openSupermarketSearch(supermarket) {
    const items = getShoppingListItems();
    
    const searchTerms = {
        tesco: `https://www.tesco.com/groceries/search?q=`,
        sainsburys: `https://www.sainsburys.co.uk/search?query=`,
        asda: `https://www.asda.com/search?query=`,
        ocado: `https://www.ocado.com/search?search=`
    };
    
    const baseUrl = searchTerms[supermarket];
    const query = items.join(' ').substring(0, 100); // Limit length
    
    window.open(baseUrl + encodeURIComponent(query), '_blank');
}
```

### Step 3: Future API Integration Point
```javascript
// Later: Add real basket integration
async function addToTescoBasket(items) {
    // TODO: Implement when Tesco API access obtained
    if (!window.tescoAuthed) {
        console.log('Need to authenticate with Tesco first');
        return;
    }
    
    // Real implementation will go here
}
```

## TODO for v2 Integration
- [ ] Add supermarket search buttons to shopping list
- [ ] Implement URL-based search (Option B)
- [ ] Test with various shopping list contents
- [ ] Add supermarket logos (optional)
- [ ] Document Tesco API integration (for future)
- [ ] Create backend service template (for future)
- [ ] Add error handling for malformed searches

## Configuration

```javascript
const SUPERMARKETS = {
    tesco: {
        name: 'Tesco',
        logo: '🛒',
        url: 'https://www.tesco.com/groceries/search?q=',
        apiUrl: 'https://api.tesco.com',
        requiresAuth: true,
        supported: 'UK'
    },
    sainsburys: {
        name: 'Sainsbury\'s',
        logo: '🛒',
        url: 'https://www.sainsburys.co.uk/search?query=',
        apiUrl: null,
        requiresAuth: false,
        supported: 'UK'
    },
    asda: {
        name: 'ASDA',
        logo: '🛒',
        url: 'https://www.asda.com/search?query=',
        apiUrl: null,
        requiresAuth: false,
        supported: 'UK'
    },
    ocado: {
        name: 'Ocado',
        logo: '🛒',
        url: 'https://www.ocado.com/search?search=',
        apiUrl: null,
        requiresAuth: false,
        supported: 'UK'
    }
};
```

## Best Practices
1. **Open in New Tab** - Don't navigate away from app
2. **Fallback** - Always offer copy-to-clipboard option
3. **Error Handling** - Handle API failures gracefully
4. **User Control** - Let users choose supermarket
5. **Privacy** - Don't expose API keys client-side
6. **Caching** - Cache product search results
7. **Analytics** - Track which supermarkets users prefer

## Related Features
- Shopping List (03-shopping-list.md)
- Pantry Management (04-pantry-management.md)

## Future Enhancements
1. **Price Comparison** - Show prices across supermarkets
2. **Delivery Estimates** - Show delivery times
3. **Product Substitutions** - Suggest alternatives
4. **Loyalty Programs** - Apply Clubcard/Nectar points
5. **Dietary Filters** - Filter by organic, vegan, etc.
6. **Location-based** - Nearest store suggestions

## Resources
- [Tesco Developer Portal](https://developer.tesco.com/)
- [Sainsbury's Developer Docs](https://sainsburys.co.uk/developers)
- [ASDA API Info](https://www.asda.com/info/developers)
- Alternative: [Supermarket Aggregator APIs](https://www.instacart.com/api)

## Priority
- **v2.1**: Low (MVP works without this)
- **v2.2**: Medium (nice-to-have enhancement)
- **v3.0**: Medium (value-add feature)
