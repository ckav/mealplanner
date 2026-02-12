# Getting Started Guide

## Quick Start

### 1. View the Prototype
Simply open `frontend/index.html` in your web browser to see the working prototype.

```
C:\Users\clair\ClaudeProjects\MealPlannerApp\frontend\index.html
```

### 2. Test the Features
- Browse recipes and use filters
- Select multiple meals
- Adjust portion sizes
- Generate shopping lists
- View cooking instructions

## Project Structure Overview

```
MealPlannerApp/
├── frontend/          # The web application
├── backend/           # Server and automation
├── database/          # Data storage configs
├── design/            # Design assets
├── docs/              # Documentation
└── tests/             # Test files
```

## Next Steps

### Setting Up Airtable

1. Create an Airtable account at [airtable.com](https://airtable.com)
2. Create a new base called "Meal Planner"
3. Import the schema from `database/airtable/schema.json`
4. Add your recipes to the database

### Setting Up n8n (Optional)

1. Install n8n locally or use n8n.cloud
2. Import the workflow from `backend/n8n_workflows/recipe_scraper.json`
3. Configure your Airtable credentials
4. Test with a recipe URL

### Customizing the App

#### Adding New Recipes
Edit `frontend/js/meals.js` and `frontend/js/recipes.js` to add recipes manually.

#### Changing Styles
Modify `frontend/css/styles.css` to customize colors, fonts, and layout.

#### Adding Features
The main application logic is in `frontend/js/app.js`.

## Development Workflow

### For Quick Changes
1. Edit the files directly in the `frontend` folder
2. Refresh your browser to see changes
3. Use browser developer tools for debugging

### For Database Integration
1. Set up Airtable with the provided schema
2. Get your Airtable API key
3. Create a simple backend to fetch data
4. Update the frontend to use dynamic data

### For Web Scraping
1. Use the n8n workflow template
2. Customize selectors for different recipe sites
3. Map scraped data to your database schema
4. Test with various recipe URLs

## Common Tasks

### Adding a Recipe Manually
```javascript
// In frontend/js/meals.js
const meals = [
  // ... existing meals
  {
    id: 12,
    name: "Your Recipe Name",
    time: 30,
    type: ["cuisine", "dietary"],
    calories: 400,
    icon: "🍴",
    description: "Brief description"
  }
];

// In frontend/js/recipes.js
const recipes = {
  // ... existing recipes
  12: {
    name: "Your Recipe Name",
    servings: 4,
    prepTime: "10 mins",
    cookTime: "20 mins",
    steps: [
      { step: "First step", time: "5 mins" },
      // ... more steps
    ]
  }
};
```

### Testing Shopping List Export
1. Select several meals
2. Go to Shopping List tab
3. Mark items you have
4. Click "Copy List"
5. Paste into a text editor or notes app

### Connecting to Supermarkets (Future)
The app is designed to integrate with:
- Tesco API
- Sainsbury's API
- ASDA API
- Ocado API

Currently, these show placeholder alerts but the structure is ready for real integration.

## Troubleshooting

### Images Not Showing
- Check image URLs in `meals.js`
- Ensure proper attribution is included
- Consider using local images in `frontend/images/`

### JavaScript Errors
- Open browser console (F12)
- Check for error messages
- Ensure all script files are loaded
- Check file paths are correct

### Styling Issues
- Clear browser cache
- Check CSS file is linked correctly
- Use browser inspector to debug styles

## Resources

### Useful Tools
- [Airtable](https://airtable.com) - Database
- [n8n](https://n8n.io) - Automation
- [VS Code](https://code.visualstudio.com) - Code editor
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org) - Web development
- [Airtable API Docs](https://airtable.com/developers/web/api/introduction)
- [n8n Documentation](https://docs.n8n.io)

## Contact & Support

Project created by Claire
For questions or suggestions, refer to the requirements document in `docs/requirements.md`