# Meal Planner App

A HelloFresh-style meal planning application that helps with recipe selection, shopping list generation, and cooking guidance.

## Project Structure

```
MealPlannerApp/
│
├── frontend/               # Frontend web application
│   ├── index.html         # Main HTML file
│   ├── css/              # Stylesheets
│   │   └── styles.css    # Main styles
│   ├── js/               # JavaScript files
│   │   ├── app.js        # Main application logic
│   │   ├── meals.js      # Meal data and management
│   │   ├── recipes.js    # Recipe handling
│   │   └── shopping.js   # Shopping list logic
│   ├── images/           # Recipe images and icons
│   └── v2/               # Version 2 - Enhanced UI
│       ├── index.html    # Main app with modals
│       ├── app.js        # Application logic
│       ├── recipes.js    # Recipe data
│       ├── styles.css    # Core styles
│       └── features/     # Modular feature components
│           └── recipe-editor/  # Recipe editor module
│
├── backend/              # Backend services
│   ├── api/             # API endpoints
│   ├── n8n_workflows/   # n8n automation workflows
│   └── scrapers/        # Web scraping scripts
│
├── database/            # Database files and schemas
│   ├── airtable/       # Airtable configurations
│   │   └── schema.json # Database schema
│   └── sample_data/    # Sample recipe data
│
├── design/             # Design assets
│   ├── wireframes/     # Initial wireframes
│   ├── mockups/        # Visual mockups
│   └── user_flows/     # User journey maps
│
├── docs/               # Documentation
│   ├── requirements.md # Project requirements
│   ├── features.md     # Feature specifications
│   └── api.md         # API documentation
│
└── tests/             # Test files

```

## Features

### Current Features (v2)
- **Recipe Cards** - Visual recipe selection with images and metadata
- **Portion Control** - Scale servings for 1-10 people
- **Grocery List Generator** - Auto-generates shopping list from meal plan
- **Recipe Editor** - Full add/edit recipe functionality
  - Import from URL (BBC Food, Jamie Oliver, etc.)
  - Add from cookbook with photo upload
  - Manual entry
  - Source attribution for copyright compliance
  - Personal notes (private)
- **Filter & Sort** - By cuisine, cook time, tags
- **Meal Planning** - Add recipes to weekly plan

### Planned Features
- Backend URL scraping service
- Airtable integration
- Smart portion scaling
- Nutritional tracking
- Meal planning calendar
- Supermarket API integration
- Recipe sharing (with public/private notes)

## Tech Stack

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript (ES6+ modules)
- IIFE pattern for feature encapsulation

### Backend (Planned)
- n8n for workflow automation
- Node.js for API
- Web scraping tools

### Database
- Airtable for recipe storage (planned)
- JSON for initial data

## Getting Started

### Version 2 (Current)
1. Open `frontend/v2/index.html` in your browser
2. Browse recipe cards and click to view details
3. Use "Add Recipe" to add new recipes via URL, cookbook, or manual entry
4. Add recipes to your meal plan
5. Click "Grocery List" to generate shopping list

### Legacy Version
1. Open `frontend/index.html` for the original prototype

## Recipe Data Model

```javascript
{
    id: 'recipe-id',
    name: 'Recipe Name',
    image: { url: '...', credit: 'Source' },
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'italian',
    tags: ['Quick', 'Healthy'],
    source: {
        type: 'url',  // 'url', 'cookbook', or 'personal'
        name: 'BBC Food',
        url: 'https://...'
    },
    ingredients: {
        protein: [...],
        vegetables: [...],
        carbs: [...],
        sauce: [...],
        pantry: [...]
    },
    steps: [{ instruction: '...', time: 5 }],
    notes: { personal: 'Private notes' }
}
```

## Recipe Sources

Recipes are sourced from:
- BBC Good Food
- BBC Food
- Jamie Oliver
- Delicious Magazine
- Personal collection
- User submissions

All recipes include proper attribution and source links.

## Copyright & Attribution

- Recipe content includes source attribution
- Images include credit information
- Source tracking for all imported recipes
- Personal notes kept separate for sharing compliance

## Development Status

- [x] Basic prototype
- [x] Recipe selection interface
- [x] Shopping list generation
- [x] Recipe view with ingredients
- [x] Add/Edit recipe functionality
- [x] Multi-input recipe entry (URL, cookbook, manual)
- [x] Source attribution system
- [x] Personal notes system
- [x] Modular feature architecture
- [ ] Backend URL scraping service
- [ ] Airtable integration
- [ ] Web scraping setup
- [ ] Supermarket API integration
- [ ] User accounts
- [ ] Meal planning calendar
- [ ] Recipe sharing

## Contact

Project by: Claire
Created: 2024
Updated: January 2026
