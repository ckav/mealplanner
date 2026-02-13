# Meal Planner App - Requirements Document

## Project Overview
A web-based meal planning application that provides a HelloFresh-style experience for recipe selection, shopping list generation, and cooking guidance, while allowing users to shop from their preferred supermarkets.

## Core Problem Statement
- HelloFresh and similar services are expensive for single-person households
- Meal kit portions often lead to food waste
- Limited flexibility in ingredient sourcing
- Vegetables expire quickly when buying for multiple meals
- Lack of meal diversity when cooking for one

## Target User
- Primary: Single-person households or couples
- Secondary: Small families wanting better meal planning
- Tech-savvy individuals comfortable with web apps
- People who want to eat better and reduce food waste

## Functional Requirements

### 1. Recipe Management
- **Browse Recipes**: Visual card-based interface showing recipe names, images, cooking time, and calories
- **Filter Options**: 
  - By cuisine type (Asian, Italian, etc.)
  - By dietary requirements (Vegetarian, Vegan, Gluten-free)
  - By cooking time (Under 20 mins, Under 30 mins)
  - By main protein
  - By calories/nutrition goals
- **Recipe Details**:
  - Clear ingredient lists organized by category
  - Step-by-step instructions without blog content
  - Cooking and prep time
  - Nutritional information
  - Source attribution for recipes

### 2. Meal Planning
- **Meal Selection**: Select multiple recipes for the week
- **Portion Control**: Adjust servings from 1-10 people
- **Smart Scaling**: Intelligent portion adjustment (not just dividing by 4)
- **Meal Calendar**: Visual weekly planner (future feature)

### 3. Shopping List Generation
- **Automatic List Creation**: Generate shopping list from selected recipes
- **Ingredient Aggregation**: Combine same ingredients from multiple recipes
- **Pantry Management**:
  - Mark items already in pantry
  - Track commonly used items
  - Avoid duplicate purchases
- **List Export Options**:
  - Copy to clipboard
  - Send to supermarket apps (Tesco, Sainsbury's, etc.)
  - Print-friendly format

### 4. Cooking Experience
- **Clean Recipe View**:
  - Ingredients panel alongside instructions
  - Step-by-step guidance
  - Active step highlighting
  - No scrolling through stories
- **Timer Functionality**: Built-in cooking timer
- **Progress Tracking**: Mark completed steps

### 5. Data Management
- **Recipe Storage**: Airtable database for recipes
- **Web Scraping**: Import recipes from food blogs
- **User Data**: Save meal selections and preferences
- **Attribution**: Proper source crediting for all recipes

## Non-Functional Requirements

### Performance
- Page load time < 3 seconds
- Smooth transitions and animations
- Responsive design for mobile/tablet/desktop
- Works offline for saved recipes

### Usability
- Intuitive navigation
- Minimal clicks to accomplish tasks
- Clear visual hierarchy
- Accessibility compliant (WCAG 2.1 Level AA)

### Security & Privacy
- No personal data collection initially
- Secure API connections
- Respect recipe copyright
- Proper attribution for all content

### Technical
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Progressive Web App capabilities (future)
- API integration ready

## MVP Features (Phase 1)
1. ✅ Recipe browsing with filters
2. ✅ Meal selection (multiple recipes)
3. ✅ Portion adjustment (1-10 servings)
4. ✅ Shopping list generation
5. ✅ Pantry checking
6. ✅ Recipe view with ingredients and steps
7. ✅ Basic timer functionality
8. ✅ Copy shopping list to clipboard

## Phase 2 Features
1. Airtable integration for dynamic recipes
2. Web scraping for recipe import
3. User accounts and saved preferences
4. Meal planning calendar
5. Nutritional tracking
6. Smart portion scaling with AI
7. Shopping list history
8. Recipe ratings and notes

## Phase 3 Features
1. Supermarket API integration
2. Price comparison
3. Automated meal suggestions
4. Social features (share meal plans)
5. Mobile app (iOS/Android)
6. Barcode scanning for pantry
7. Recipe recommendations based on history
8. Waste tracking and reporting

## Technical Architecture

### Frontend
- HTML5/CSS3/JavaScript
- Responsive design framework
- Future: React or Vue.js for enhanced interactivity

### Backend
- Node.js for API server
- n8n for workflow automation
- Web scraping tools (Puppeteer/Cheerio)

### Database
- Airtable for recipe storage
- Local storage for user preferences
- Future: PostgreSQL for user data

### Integrations
- Supermarket APIs (Tesco, Sainsbury's, ASDA)
- Recipe website scrapers
- Nutrition databases
- Payment processing (if monetized)

## Success Metrics
- User can plan a week's meals in < 5 minutes
- Shopping list generation accuracy > 95%
- Recipe completion rate > 80%
- Food waste reduction of 30%
- User satisfaction score > 4.5/5

## Constraints
- No copyright infringement on recipes
- Must work on low-bandwidth connections
- Should be usable without creating an account
- Must respect user privacy
- Budget-conscious development approach

## Future Monetization Options
- Premium features (unlimited recipes, meal plans)
- Affiliate links to supermarkets
- Sponsored recipes from brands
- White-label for supermarkets
- Subscription model for advanced features

## Development Timeline
- **Month 1**: MVP development and testing
- **Month 2**: Airtable integration and web scraping
- **Month 3**: User testing and refinement
- **Month 4**: API integrations
- **Month 5**: Launch beta version
- **Month 6**: Full launch with core features