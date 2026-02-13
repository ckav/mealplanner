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
│   └── images/           # Recipe images and icons
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

### MVP Features
- Recipe card selection
- Portion control (1-10 servings)
- Shopping list generation
- Clean recipe steps view
- Pantry checking

### Planned Features
- Web scraping for recipes
- Airtable integration
- Smart portion scaling
- Nutritional tracking
- Meal planning calendar
- Supermarket API integration

## Tech Stack

### Frontend
- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- Future: React/Vue for enhanced interactivity

### Backend
- n8n for workflow automation
- Node.js for API
- Web scraping tools

### Database
- Airtable for recipe storage
- JSON for initial data

## Getting Started

1. Open `frontend/index.html` in your browser for the prototype
2. Set up Airtable with the schema in `database/airtable/`
3. Configure n8n workflows from `backend/n8n_workflows/`

## Recipe Sources

Recipes are sourced from:
- BBC Good Food
- Personal collection
- User submissions

All recipes include proper attribution and source links.

## Copyright & Attribution

- Recipe content includes source attribution
- Images are either original or properly attributed
- No copyrighted content is reproduced without permission

## Development Status

- [x] Basic prototype
- [x] Recipe selection interface
- [x] Shopping list generation
- [x] Recipe view with ingredients
- [ ] Airtable integration
- [ ] Web scraping setup
- [ ] Supermarket API integration
- [ ] User accounts
- [ ] Meal planning calendar

## Contact

Project by: Claire
Created: 2024
