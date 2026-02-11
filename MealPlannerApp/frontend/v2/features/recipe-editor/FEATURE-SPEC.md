# Recipe Editor - Feature Specification

## Overview

The Recipe Editor allows users to add recipes from multiple sources while maintaining proper attribution and copyright compliance. Users can input recipes via URL, photo/image upload, or manual text entry.

---

## Input Methods

### 1. URL Import (Web Recipes)
**Use Case:** User finds a recipe on a website like BBC Good Food, AllRecipes, etc.

**Features:**
- Paste URL into input field
- Auto-fetch and parse recipe data:
  - Recipe title
  - Ingredients list
  - Instructions/steps
  - Cook time, prep time, servings
  - Recipe image
  - Nutritional info (if available)
- Auto-capture source attribution:
  - Source URL (clickable link to original)
  - Source website name
  - Image source/credit
  - Date imported

**Supported Sites (Initial):**
- BBC Good Food / BBC Food
- AllRecipes
- Delicious Magazine
- Jamie Oliver
- Generic schema.org/Recipe structured data

**UI Flow:**
1. Click "Import from URL"
2. Paste URL
3. Click "Fetch Recipe"
4. Review auto-populated fields
5. Edit/correct as needed
6. Save

---

### 2. Photo/Image Upload (Cookbook Recipes)
**Use Case:** User has a physical cookbook or printed recipe they want to digitize.

**Features:**
- Upload photo or take photo (mobile)
- OCR text extraction (future enhancement)
- Manual entry with source attribution

**Required Fields:**
- Book Title (required) - "What cookbook is this from?"
- Photo of recipe page (required)

**Optional Fields:**
- Author name
- Page number
- ISBN (for future linking)
- Edition/Year published

**UI Flow:**
1. Click "Add from Cookbook/Photo"
2. Upload or capture photo
3. Enter cookbook details (title required)
4. Manually enter recipe details (or use OCR - future)
5. Save

**Copyright Compliance:**
- Store reference to original source
- Personal use only disclaimer
- Photo stored for personal reference

---

### 3. Manual/Text Entry (Shared Recipes)
**Use Case:** Recipe received via email, message, or family recipe.

**Features:**
- Paste text block for parsing (future: smart parse)
- Manual field entry
- Flexible source attribution

**Source Types:**
- Family Recipe (Grandma's recipe, etc.)
- Friend/Shared (who shared it)
- Magazine/Newspaper (publication name, date)
- Other (free text source)

**UI Flow:**
1. Click "Enter Manually" or "Paste Text"
2. Option to paste text block OR fill fields manually
3. Select source type
4. Enter source details
5. Save

---

## Source Attribution System

### Web Sources
```
{
  type: "url",
  url: "https://www.bbc.co.uk/food/recipes/...",
  siteName: "BBC Food",
  author: "Mary Berry",  // if available
  dateAccessed: "2026-01-06",
  imageSource: "BBC Food",
  imageUrl: "https://..."
}
```

### Cookbook Sources
```
{
  type: "cookbook",
  bookTitle: "Deliciously Ella",  // REQUIRED
  author: "Ella Mills",           // optional
  pageNumber: 42,                 // optional
  isbn: "978-...",                // optional
  publisher: "Yellow Kite",       // optional
  year: 2015,                     // optional
  photoRef: "local-image-id"      // reference to uploaded photo
}
```

### Shared/Family Sources
```
{
  type: "personal",
  sourceType: "family" | "friend" | "magazine" | "other",
  sourceName: "Grandma Rose",     // or publication name
  dateReceived: "2025-12-25",
  notes: "Handed down recipe"
}
```

---

## Notes System

### Personal Notes
- Private by default
- Attached to each recipe
- Use cases:
  - "Can be halved, reduce chicken but keep same liquid"
  - "Son doesn't like this - don't make for family dinner"
  - "Add extra garlic next time"
  - "Freezes well - make double batch"

### Note Types (Future)
```
{
  notes: [
    {
      id: "note-1",
      text: "Recipe can be halved easily",
      type: "tip",
      visibility: "public",    // for sharing
      createdAt: "2026-01-06"
    },
    {
      id: "note-2", 
      text: "Kids don't like the spice level",
      type: "personal",
      visibility: "private",   // never shared
      createdAt: "2026-01-06"
    }
  ]
}
```

---

## Edit Recipe

### Editable Fields
- All recipe details (name, times, servings, etc.)
- Ingredients (add, remove, modify)
- Instructions (add, remove, reorder, modify)
- Source information
- Personal notes
- Tags/categories
- Image (replace, remove)

### Edit History (Future)
- Track changes
- "Last edited" timestamp
- Revert capability

---

## Data Model

### Recipe Object (Updated)
```javascript
{
  id: "recipe-uuid",
  
  // Basic Info
  name: "Spanish Baked Risotto",
  description: "A simple oven-baked risotto...",
  
  // Media
  image: {
    url: "https://...",
    localPath: null,           // for uploaded images
    source: "BBC Food",
    credit: "BBC Food"
  },
  
  // Timing
  prepTime: 15,                // minutes
  cookTime: 45,
  totalTime: 60,
  
  // Servings
  servings: 4,
  
  // Difficulty
  difficulty: "Easy",
  
  // Nutritional (optional)
  nutrition: {
    calories: 450,
    protein: 25,
    carbs: 55,
    fat: 12,
    fiber: 3
  },
  
  // Categorization
  cuisine: "spanish",
  tags: ["Oven", "Rice", "One-pot"],
  dietary: ["Gluten-free"],
  
  // Ingredients (grouped)
  ingredients: {
    main: [
      { name: "Arborio rice", amount: 300, unit: "g", notes: "" }
    ],
    // ... other groups
  },
  
  // Instructions
  steps: [
    { 
      number: 1,
      instruction: "Preheat oven to 200°C...",
      time: 5,
      image: null
    }
  ],
  
  // Source Attribution
  source: {
    type: "url" | "cookbook" | "personal",
    // ... type-specific fields
  },
  
  // Notes
  notes: {
    personal: "Can halve this recipe...",
    public: null,               // for sharing (future)
  },
  
  // Metadata
  createdAt: "2026-01-06T10:30:00Z",
  updatedAt: "2026-01-06T10:30:00Z",
  importedFrom: "url",
  
  // User data
  favourite: false,
  timesCooked: 0,
  lastCooked: null,
  rating: null,
  
  // Sharing (future)
  visibility: "private",        // private | public | unlisted
  sharedBy: null,               // if imported from shared recipe
}
```

---

## Future Features

### Phase 2: Smart Import
- [ ] OCR for cookbook photos
- [ ] Smart text parsing for pasted recipes
- [ ] AI-assisted ingredient/step extraction
- [ ] Duplicate detection

### Phase 3: Sharing
- [ ] Public/private recipe toggle
- [ ] Share recipe link
- [ ] Import from shared link
- [ ] Public notes vs private notes
- [ ] Recipe discovery (like MyFitnessPal)
- [ ] Follow users/collections

### Phase 4: Enhanced Attribution
- [ ] Cookbook database integration
- [ ] Automatic ISBN lookup
- [ ] Link to purchase cookbooks
- [ ] Author profiles

### Phase 5: Community
- [ ] Recipe ratings/reviews
- [ ] Comments on shared recipes
- [ ] Recipe collections/cookbooks
- [ ] Weekly meal plan sharing

---

## UI Components Needed

### 1. Import Method Selector
Modal or tab interface to choose:
- 🔗 Import from URL
- 📷 Add from Cookbook/Photo  
- ✏️ Enter Manually

### 2. URL Import Panel
- URL input field
- "Fetch" button
- Loading state
- Preview of fetched data
- Edit fields before save

### 3. Cookbook/Photo Panel
- Photo upload/capture
- Cookbook details form
- Manual recipe entry

### 4. Source Attribution Card
- Displays source info on recipe
- Clickable link to original
- "View original" button

### 5. Notes Editor
- Text area for personal notes
- Future: rich text, multiple notes
- Future: public/private toggle

---

## Implementation Priority

### MVP (Phase 1)
1. ✅ Manual recipe entry (existing)
2. 🔲 URL import with auto-populate
3. 🔲 Source attribution display
4. 🔲 Personal notes field
5. 🔲 Cookbook source entry (without OCR)
6. 🔲 Photo upload for cookbook pages

### Next (Phase 2)
7. 🔲 Improved URL parsing
8. 🔲 Text paste & parse
9. 🔲 Edit history
10. 🔲 Multiple notes per recipe

### Future (Phase 3+)
11. 🔲 OCR for photos
12. 🔲 Recipe sharing
13. 🔲 Public/private visibility
14. 🔲 Community features
