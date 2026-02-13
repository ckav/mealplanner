// Shopping list generation and management

function generateShoppingList() {
    const listContent = document.getElementById('shoppingListContent');
    const portions = parseInt(document.getElementById('portionsInput').value);
    
    if (selectedMeals.length === 0) {
        listContent.innerHTML = '<p>Select some meals first!</p>';
        return;
    }
    
    // Aggregate ingredients by category
    let aggregatedIngredients = {
        proteins: new Map(),
        produce: new Map(),
        marinadeAndSauce: new Map(),
        beans: new Map(),
        pantry: new Map(),
        spices: new Map(),
        garnish: new Map(),
        toppings: new Map(),
        staples: new Map()
    };
    
    selectedMeals.forEach(mealId => {
        if (ingredients[mealId]) {
            Object.keys(ingredients[mealId]).forEach(category => {
                if (aggregatedIngredients[category]) {
                    ingredients[mealId][category].forEach(item => {
                        // Parse quantity if present
                        const match = item.match(/^([\d.]+\s*\w+)?\s*(.+)$/);
                        const key = match ? match[2] : item;
                        
                        if (!aggregatedIngredients[category].has(key)) {
                            aggregatedIngredients[category].set(key, []);
                        }
                        aggregatedIngredients[category].get(key).push(item);
                    });
                }
            });
        }
    });
    
    let html = '';
    Object.keys(aggregatedIngredients).forEach(category => {
        const items = aggregatedIngredients[category];
        if (items.size > 0) {
            html += `
                <div class="ingredient-category">
                    <h3>${formatCategoryName(category)}</h3>
                    ${Array.from(items.entries()).map(([key, values]) => {
                        const displayText = values[0]; // Use the first occurrence with quantities
                        const adjustedText = portions !== 4 ? 
                            `${displayText} (adjusted for ${portions} portion${portions > 1 ? 's' : ''})` : 
                            displayText;
                        return `
                            <div class="ingredient-item">
                                <input type="checkbox" class="ingredient-checkbox" onchange="toggleIngredient(this)">
                                <span>${adjustedText}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    });
    
    listContent.innerHTML = html || '<p>No ingredients needed!</p>';
}

function formatCategoryName(category) {
    // Convert camelCase to Title Case
    return category.replace(/([A-Z])/g, ' $1').trim()
        .replace(/^./, str => str.toUpperCase());
}

function toggleIngredient(checkbox) {
    checkbox.parentElement.classList.toggle('have-already');
    updateShoppingProgress();
}

function togglePantryItem(item) {
    item.classList.toggle('have');
}

function updateShoppingProgress() {
    const total = document.querySelectorAll('.ingredient-checkbox').length;
    const checked = document.querySelectorAll('.ingredient-checkbox:checked').length;
    
    if (total > 0) {
        const progress = Math.round((checked / total) * 100);
        console.log(`Shopping progress: ${progress}% (${checked}/${total} items)`);
    }
}

function exportList() {
    const items = [];
    document.querySelectorAll('.ingredient-item:not(.have-already) span').forEach(item => {
        items.push(item.textContent);
    });
    
    if (items.length === 0) {
        alert('No items to copy - all ingredients are marked as already owned!');
        return;
    }
    
    const text = 'Shopping List:\n\n' + items.join('\n');
    navigator.clipboard.writeText(text).then(() => {
        alert('Shopping list copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Shopping list copied to clipboard!');
    });
}

function sendToSupermarket() {
    // This would integrate with supermarket APIs
    const items = [];
    document.querySelectorAll('.ingredient-item:not(.have-already) span').forEach(item => {
        items.push(item.textContent);
    });
    
    if (items.length === 0) {
        alert('No items to send - all ingredients are marked as already owned!');
        return;
    }
    
    // Show mock integration message
    const supermarkets = ['Tesco', 'Sainsbury\'s', 'ASDA', 'Ocado'];
    const html = `
        <div style="padding: 20px; background: white; border-radius: 10px;">
            <h3>Select Supermarket:</h3>
            ${supermarkets.map(s => `<button onclick="alert('Would send ${items.length} items to ${s}')" style="margin: 5px; padding: 10px;">${s}</button>`).join('')}
        </div>
    `;
    
    alert('This would integrate with Tesco/Sainsbury\'s API to add items to your online basket.\n\nFor now, you can copy the list and paste it into your supermarket\'s quick-add feature.');
}
