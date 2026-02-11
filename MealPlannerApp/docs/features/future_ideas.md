# Future Ideas for Meal Mate

This file captures long-term feature ideas and architectural considerations for the Meal Mate app.

## 1. AI Agent for Recipe Processing (LLM Integration)

**Concept:** Use a Large Language Model (LLM) via an automation platform like n8n or a custom backend to create a consistent, high-quality "recipe card" format from any recipe URL.

**User Story:** "As a user, I want to paste any recipe link, and have the app automatically extract, format, and tag it so it's consistent with all other recipes in my collection."

### Agent's Responsibilities:

-   **Intelligent Extraction:** Parse the HTML of a recipe blog/site to identify and separate ingredients, instruction steps, servings, and prep/cook times.
-   **Instruction Formatting:** Re-write instructions into a clear, numbered, step-by-step format.
-   **Timing Detection:** Identify timing cues within the text (e.g., "simmer for 20 minutes", "bake for 1 hour", "let it rest for 5 mins") and structure them as data alongside the instruction step.
-   **Allergen Assessment:** Scan the ingredient list for the 14 major allergens and automatically apply the correct allergen tags and icons.
-   **Image Sourcing:** If the original recipe lacks a usable image, find a high-quality, royalty-free representative image for the dish.
-   **Nutrition Estimation:** (Advanced) Estimate nutritional information like calories and protein based on the ingredients and quantities.
-   **Source Attribution:** Capture the original URL, website name, and image source for proper credit.

### Example Prompt for the Agent:

```
"You are a recipe formatting agent. Given the following text from a recipe website, transform it into a structured JSON object.

**JSON Schema:**
{
  "name": "string",
  "servings": "number",
  "time": "number (total minutes)",
  "ingredients": ["string"],
  "instructions": [
    { "step": "number", "text": "string", "time_minutes": "number | null" }
  ],
  "allergens": ["string"],
  "tags": ["string"],
  "source_url": "string",
  "image_url": "string"
}

**Rules:**
1. Rewrite instructions to be clear and concise.
2. If an instruction contains a duration (e.g., 'cook for 10 minutes'), extract that number into the 'time_minutes' field.
3. Scan ingredients for the 14 UK major allergens and list them.
4. Add relevant tags like 'Vegetarian', 'Vegan', 'Gluten-Free'.
5. The source URL is [User provides URL].

**Recipe Text:**
[Pasted HTML/text content from the scraped recipe page]
"
```

## 2. Advanced Portion Scaling

**Concept:** Develop a smarter scaling algorithm that understands the practicalities of grocery shopping and cooking.

**User Story:** "When I scale a recipe for 4 down to 1, I don't want it to tell me to buy '1/4 of a can of tomatoes'. It should tell me to use the whole can and suggest how to use the leftover portion, or adjust the recipe accordingly."

### Logic Considerations:

-   **Pantry-Aware Scaling:** If a recipe needs 1/4 can of tomatoes, the shopping list should add "1 can of tomatoes" and the pantry logic should know that 3/4 of a can is now available.
-   **"Use Leftovers" Suggestions:** The app could suggest another recipe for later in the week that uses the remaining ingredients.
-   **Minimum Quantities:** For certain ingredients (like spices or a clove of garlic), there should be a minimum threshold that doesn't get scaled down linearly.
-   **Liquid Scaling:** Liquids (especially for sauces and boiling) don't always scale linearly. The logic would need special rules for this.
-   **User Overrides:** Allow the user to manually adjust the shopping list. If the recipe calls for 100g of chicken for one person, the user might want to buy a 250g pack anyway. The app should accommodate this.

This feature would likely require custom logic and a more sophisticated data model for ingredients, moving beyond simple text strings.
