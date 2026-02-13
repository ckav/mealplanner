// batch-data.js — 16 full-detail recipes from batches 01 (sample) and 02 (Nadia Lim)

// --- Patch existing v3 recipes with new fields ---
recipes.forEach(r => {
    if (!r.description) r.description = '';
    if (!r.dietary) r.dietary = [];
    if (r.soloFriendly === undefined) r.soloFriendly = r.servings <= 2;
    if (r.familyFriendly === undefined) r.familyFriendly = r.servings >= 4;
    if (!r.mainProtein) r.mainProtein = '';
    if (!r.prepTime) r.prepTime = Math.round(r.cookTime * 0.3 / 5) * 5 || 5;
    if (!r.tips) r.tips = '';
});

// --- Batch 01: Sample recipes (5, full detail) ---
// --- Batch 02: Nadia Lim recipes (11, full detail) ---
recipes.push(

    // =============================================
    // BATCH 01 — Sample recipes (5 recipes)
    // =============================================

    // 1. Cajun Chicken Traybake with Rice
    {
        id: 'cajun-chicken-traybake',
        name: 'Cajun Chicken Traybake with Rice',
        image: '',
        cookTime: 55,
        prepTime: 10,
        calories: 663,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'American',
        mainProtein: 'Chicken',
        tags: ['one-pan', 'family-friendly', 'traybake', 'budget-friendly'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Full of colour and flavour, this one-pan wonder cooks the rice right in the tray with the chicken. Minimal effort, maximum reward.',
        source: { name: 'Jamie Oliver', url: 'https://www.jamieoliver.com/recipes/chicken/cajun-chicken-traybake/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            { name: 'chicken thighs, skin on, bone in', amount: 4, unit: 'pieces', category: 'protein' },
            { name: 'onions', amount: 2, unit: 'pieces', category: 'vegetables' },
            { name: 'mixed peppers', amount: 2, unit: 'pieces', category: 'vegetables' },
            { name: 'Cajun seasoning', amount: 2, unit: 'tbsp', category: 'pantry' },
            { name: 'garlic cloves, unpeeled', amount: 4, unit: 'pieces', category: 'pantry' },
            { name: 'olive oil', amount: 1, unit: 'tbsp', category: 'pantry' },
            { name: 'red wine vinegar', amount: 1, unit: 'tbsp', category: 'sauce' },
            { name: 'rice', amount: 300, unit: 'g', category: 'carbs' },
            { name: 'boiling water', amount: 600, unit: 'ml', category: 'pantry' },
            { name: 'black pepper', amount: 1, unit: 'pinch', category: 'pantry' }
        ],
        steps: [
            { text: 'Preheat the oven to 200\u00b0C/400\u00b0F/gas 6.' },
            { text: 'Peel and halve the onions. Tear up the peppers into big chunks, discarding the seeds and stalks.' },
            { text: 'Place it all in a 35cm x 25cm roasting tray with the chicken, Cajun seasoning and whole unpeeled garlic cloves.' },
            { text: 'Drizzle with olive oil and red wine vinegar, season with black pepper and toss well, turning the chicken skin side up.' },
            { text: 'Roast for 40 minutes.' },
            { text: 'Boil the kettle. Remove the tray from the oven and mash the soft garlic cloves into the tray juices, discarding the skins.' },
            { text: 'Around the chicken, pour in the rice and boiling water. Cover tightly with foil and return to the oven for 15 minutes until the rice is cooked.' },
            { text: 'Remove foil, fluff the rice and serve.' }
        ],
        tips: 'Go veggie: Replace the chicken with scrubbed butternut squash or aubergine, cut into big chunks and cooked the same way.'
    },

    // 2. Creamy Mushroom & Spinach Orzo
    {
        id: 'one-pot-mushroom-orzo',
        name: 'Creamy Mushroom & Spinach Orzo',
        image: '',
        cookTime: 25,
        prepTime: 5,
        calories: 420,
        servings: 2,
        difficulty: 'Easy',
        cuisine: 'Italian',
        mainProtein: 'None',
        tags: ['one-pot', 'quick', 'vegetarian', 'solo-friendly', 'budget-friendly'],
        dietary: ['vegetarian'],
        soloFriendly: true,
        familyFriendly: false,
        description: 'A risotto-style orzo that cooks in one pot with mushrooms and spinach. Rich, creamy, and ready in under 30 minutes \u2014 perfect for a solo weeknight dinner.',
        source: { name: 'BBC Good Food', url: 'https://www.bbcgoodfood.com/recipes/creamy-mushroom-spinach-orzo' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            { name: 'olive oil', amount: 1, unit: 'tbsp', category: 'pantry' },
            { name: 'chestnut mushrooms, sliced', amount: 250, unit: 'g', category: 'vegetables' },
            { name: 'garlic cloves, crushed', amount: 2, unit: 'pieces', category: 'pantry' },
            { name: 'orzo pasta', amount: 200, unit: 'g', category: 'carbs' },
            { name: 'vegetable stock', amount: 500, unit: 'ml', category: 'sauce' },
            { name: 'baby spinach', amount: 100, unit: 'g', category: 'vegetables' },
            { name: 'parmesan, grated', amount: 30, unit: 'g', category: 'dairy' },
            { name: 'lemon juice', amount: 1, unit: 'tbsp', category: 'pantry' },
            { name: 'salt and pepper', amount: 1, unit: 'pinch', category: 'pantry' }
        ],
        steps: [
            { text: 'Heat olive oil in a deep pan over medium-high heat. Add the mushrooms and cook for 5 minutes until golden.' },
            { text: 'Add the garlic and cook for 1 minute until fragrant.' },
            { text: 'Stir in the orzo and pour over the vegetable stock. Bring to a simmer.' },
            { text: 'Cook for 10-12 minutes, stirring occasionally, until the orzo is tender and the liquid has been mostly absorbed.' },
            { text: 'Stir through the spinach until wilted, then remove from heat.' },
            { text: 'Add the parmesan and lemon juice, season to taste and serve immediately.' }
        ],
        tips: 'Make it vegan: skip the parmesan and add a tablespoon of nutritional yeast instead. For extra protein, stir in a drained tin of white beans with the spinach.'
    },

    // 3. Quick Prawn & Coconut Noodles
    {
        id: 'prawn-coconut-noodles',
        name: 'Quick Prawn & Coconut Noodles',
        image: '',
        cookTime: 15,
        prepTime: 5,
        calories: 480,
        servings: 1,
        difficulty: 'Easy',
        cuisine: 'Thai',
        mainProtein: 'Prawns',
        tags: ['quick', 'solo-friendly', 'pescatarian', 'one-pot', 'under-20-min'],
        dietary: ['pescatarian', 'dairy-free'],
        soloFriendly: true,
        familyFriendly: false,
        description: 'A single-serving noodle bowl that comes together in 15 minutes. Sweet, spicy, coconutty \u2014 the kind of solo dinner that makes you glad nobody else is eating it.',
        source: { name: 'Mob Kitchen', url: 'https://www.mob.co.uk/recipes' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            { name: 'rice noodles', amount: 100, unit: 'g', category: 'carbs' },
            { name: 'raw king prawns', amount: 150, unit: 'g', category: 'protein' },
            { name: 'coconut milk', amount: 200, unit: 'ml', category: 'sauce' },
            { name: 'red curry paste', amount: 1, unit: 'tbsp', category: 'sauce' },
            { name: 'soy sauce', amount: 1, unit: 'tbsp', category: 'sauce' },
            { name: 'lime', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'sugar snap peas or mangetout', amount: 80, unit: 'g', category: 'vegetables' },
            { name: 'fresh coriander', amount: 1, unit: 'handful', category: 'herbs' },
            { name: 'vegetable oil', amount: 1, unit: 'tsp', category: 'pantry' }
        ],
        steps: [
            { text: 'Cook the rice noodles according to packet instructions, drain and set aside.' },
            { text: 'Heat oil in a wok or frying pan over high heat. Add the curry paste and fry for 30 seconds.' },
            { text: 'Add the prawns and cook for 2 minutes until pink.' },
            { text: 'Pour in the coconut milk and soy sauce. Bring to a simmer.' },
            { text: 'Add the sugar snap peas and cook for 2 minutes until just tender.' },
            { text: 'Toss in the drained noodles and stir to coat in the sauce.' },
            { text: 'Squeeze over the lime, scatter with coriander and eat straight from the pan.' }
        ],
        tips: 'Make it vegan: swap prawns for firm tofu, cubed and pan-fried until golden before adding to the sauce. The coconut milk and curry paste do all the heavy lifting flavour-wise.'
    },

    // 4. Sweet Potato & Black Bean Chilli
    {
        id: 'black-bean-sweet-potato-chilli',
        name: 'Sweet Potato & Black Bean Chilli',
        image: '',
        cookTime: 40,
        prepTime: 10,
        calories: 350,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'Mexican',
        mainProtein: 'None',
        tags: ['vegan', 'family-friendly', 'one-pot', 'batch-cook', 'budget-friendly', 'freezer-friendly'],
        dietary: ['vegan', 'vegetarian', 'dairy-free', 'gluten-free'],
        soloFriendly: true,
        familyFriendly: true,
        description: 'A hearty, warming chilli that\'s naturally vegan and packed with protein from black beans. Freezes brilliantly \u2014 make a batch and you\'ve got solo dinners sorted for the week.',
        source: { name: 'BBC Good Food', url: 'https://www.bbcgoodfood.com/recipes/sweet-potato-black-bean-chilli' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            { name: 'olive oil', amount: 1, unit: 'tbsp', category: 'pantry' },
            { name: 'onion, diced', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'garlic cloves, crushed', amount: 2, unit: 'pieces', category: 'pantry' },
            { name: 'sweet potatoes, peeled and cubed', amount: 2, unit: 'pieces', category: 'vegetables' },
            { name: 'smoked paprika', amount: 1, unit: 'tsp', category: 'pantry' },
            { name: 'ground cumin', amount: 1, unit: 'tsp', category: 'pantry' },
            { name: 'chilli powder', amount: 0.5, unit: 'tsp', category: 'pantry' },
            { name: 'chopped tomatoes (tin)', amount: 400, unit: 'g', category: 'sauce' },
            { name: 'black beans, drained (tin)', amount: 400, unit: 'g', category: 'pantry' },
            { name: 'vegetable stock', amount: 200, unit: 'ml', category: 'sauce' },
            { name: 'lime', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'fresh coriander', amount: 1, unit: 'handful', category: 'herbs' },
            { name: 'salt and pepper', amount: 1, unit: 'pinch', category: 'pantry' }
        ],
        steps: [
            { text: 'Heat olive oil in a large saucepan over medium heat. Add the onion and cook for 5 minutes until softened.' },
            { text: 'Add the garlic, smoked paprika, cumin, and chilli powder. Stir for 1 minute until fragrant.' },
            { text: 'Add the sweet potato cubes and stir to coat in the spices.' },
            { text: 'Pour in the chopped tomatoes, black beans, and vegetable stock. Stir well.' },
            { text: 'Bring to a boil, then reduce to a simmer. Cover and cook for 25-30 minutes until the sweet potato is tender.' },
            { text: 'Season with salt, pepper, and a squeeze of lime.' },
            { text: 'Serve with rice, in a wrap, or with crusty bread. Top with coriander and a dollop of yoghurt (or coconut yoghurt to keep it vegan).' }
        ],
        tips: 'Batch cook tip: This freezes perfectly in individual portions. Defrost overnight and reheat for an instant solo dinner. Kids love it with rice and a sprinkle of cheese on top.'
    },

    // 5. Halloumi & Mediterranean Veg Traybake
    {
        id: 'halloumi-traybake-veg',
        name: 'Halloumi & Mediterranean Veg Traybake',
        image: '',
        cookTime: 30,
        prepTime: 10,
        calories: 490,
        servings: 2,
        difficulty: 'Easy',
        cuisine: 'Mediterranean',
        mainProtein: 'Halloumi',
        tags: ['vegetarian', 'one-pan', 'traybake', 'solo-friendly', 'quick'],
        dietary: ['vegetarian', 'gluten-free'],
        soloFriendly: true,
        familyFriendly: true,
        description: 'Chunks of salty halloumi roasted with courgette, peppers, and cherry tomatoes. One tray, barely any washing up, and it scales perfectly for one or two.',
        source: { name: 'BBC Good Food', url: 'https://www.bbcgoodfood.com/recipes/halloumi-traybake' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            { name: 'halloumi, cubed', amount: 225, unit: 'g', category: 'dairy' },
            { name: 'courgette, chopped', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'red pepper, deseeded and chopped', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'red onion, cut into wedges', amount: 1, unit: 'pieces', category: 'vegetables' },
            { name: 'cherry tomatoes', amount: 200, unit: 'g', category: 'vegetables' },
            { name: 'olive oil', amount: 2, unit: 'tbsp', category: 'pantry' },
            { name: 'dried oregano', amount: 1, unit: 'tsp', category: 'herbs' },
            { name: 'lemon', amount: 0.5, unit: 'pieces', category: 'vegetables' },
            { name: 'salt and pepper', amount: 1, unit: 'pinch', category: 'pantry' }
        ],
        steps: [
            { text: 'Preheat the oven to 200\u00b0C/180\u00b0C fan/gas 6.' },
            { text: 'Spread the courgette, pepper, onion, and cherry tomatoes on a large baking tray.' },
            { text: 'Drizzle with olive oil, scatter over the oregano, season with salt and pepper and toss to coat.' },
            { text: 'Nestle the halloumi cubes among the vegetables.' },
            { text: 'Roast for 25-30 minutes until the veg is tender and the halloumi is golden at the edges.' },
            { text: 'Squeeze over lemon juice and serve. Great with couscous, flatbreads, or just on its own.' }
        ],
        tips: 'Make it vegan: swap halloumi for a block of firm tofu, pressed and cubed. It won\'t get the same salty squeak but it\'ll crisp up nicely. Add a handful of olives or capers for that salty hit instead.'
    },

    // =============================================
    // BATCH 02 — Nadia Lim recipes (11 recipes)
    // =============================================

    // 6. Coconut Chicken
    {
        id: 'nl-coconut-chicken',
        name: 'Coconut Chicken',
        image: '',
        cookTime: 25,
        prepTime: 15,
        calories: 576,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'Asian-Fusion',
        mainProtein: 'Chicken',
        tags: ['family-friendly', 'curry-spiced', 'with-salad'],
        dietary: ['dairy-free', 'gluten-free'],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Marinating chicken in coconut cream makes for moist, tasty mouthfuls. Served with spiced jasmine rice and a fresh coconut cream salad.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Rice
            { name: 'jasmine rice', amount: 2, unit: 'cups', category: 'rice' },
            { name: 'coconut chicken spice mix', amount: 1.5, unit: 'tbsp', category: 'rice' },
            { name: 'water', amount: 3, unit: 'cups', category: 'rice' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'rice' },
            // Coconut Chicken
            { name: 'boneless, skinless chicken thighs', amount: 600, unit: 'g', category: 'coconut chicken' },
            { name: 'coconut chicken spice mix', amount: 1, unit: 'tbsp', category: 'coconut chicken' },
            { name: 'chilli flakes or chilli powder', amount: 1, unit: 'pinch', category: 'coconut chicken' },
            { name: 'coconut cream', amount: 0.25, unit: 'cup', category: 'coconut chicken' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'coconut chicken' },
            // Spice Mix
            { name: 'curry powder', amount: 2, unit: 'tsp', category: 'spice mix' },
            { name: 'ground cumin', amount: 2, unit: 'tsp', category: 'spice mix' },
            { name: 'ground coriander', amount: 2, unit: 'tsp', category: 'spice mix' },
            { name: 'ground turmeric', amount: 1, unit: 'tsp', category: 'spice mix' },
            { name: 'ground ginger', amount: 0.5, unit: 'tsp', category: 'spice mix' },
            // Salad
            { name: 'carrot', amount: 1, unit: 'pieces', category: 'salad' },
            { name: 'capsicum/pepper', amount: 1, unit: 'pieces', category: 'salad' },
            { name: 'baby spinach leaves', amount: 3, unit: 'handfuls', category: 'salad' },
            { name: 'coconut cream', amount: 0.25, unit: 'cup', category: 'salad' },
            { name: 'mayo', amount: 0.25, unit: 'cup', category: 'salad' },
            { name: 'lemon juice', amount: 1, unit: 'tbsp', category: 'salad' }
        ],
        steps: [
            { text: 'Combine all rice ingredients in a medium-sized lidded pot and bring to the boil. Cover with a tight-fitting lid and reduce to lowest heat for 12 minutes. Turn off heat and steam, still covered, for 8 minutes. Fluff with a fork.' },
            { text: 'Pat chicken dry with paper towels. Place in a bowl with coconut chicken spice mix, chilli, coconut cream and salt. Toss to coat and marinate.' },
            { text: 'Grate carrot; remove core and seeds from capsicum and roughly dice. Place both in a large bowl with baby spinach. Whisk coconut cream, mayo and lemon juice together for dressing.' },
            { text: 'Heat a little oil in a large frying pan on medium-high heat. Cook chicken for 4-5 minutes on each side until golden and cooked through. Rest covered with foil for 2-3 minutes, then slice.' },
            { text: 'Toss half the dressing through the salad. Season with salt and pepper.' },
            { text: 'Spoon rice onto plates, top with sliced coconut chicken. Serve salad on the side with extra dressing.' }
        ],
        tips: 'Can also be cooked on a barbecue grill or hot plate for 4-5 minutes each side.'
    },

    // 7. Greek Lamb Rissoles with Summer Salad
    {
        id: 'nl-greek-lamb-rissoles',
        name: 'Greek Lamb Rissoles with Summer Salad',
        image: '',
        cookTime: 15,
        prepTime: 20,
        calories: 590,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'Greek',
        mainProtein: 'Lamb',
        tags: ['family-friendly', 'high-protein', 'with-salad'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Lamb, cucumber and yoghurt are a classic Greek flavour combo. Spiced lamb rissoles with couscous summer salad and cucumber yoghurt.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Summer Salad
            { name: 'couscous', amount: 1.5, unit: 'cups', category: 'summer salad' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'summer salad' },
            { name: 'summer spice mix', amount: 1.5, unit: 'tbsp', category: 'summer salad' },
            { name: 'boiling water', amount: 1.5, unit: 'cups', category: 'summer salad' },
            { name: 'frozen peas', amount: 250, unit: 'g', category: 'summer salad' },
            { name: 'tomato', amount: 1, unit: 'pieces', category: 'summer salad' },
            { name: 'telegraph cucumber', amount: 0.25, unit: 'pieces', category: 'summer salad' },
            { name: 'capsicum', amount: 1, unit: 'pieces', category: 'summer salad' },
            { name: 'baby spinach leaves', amount: 3, unit: 'handfuls', category: 'summer salad' },
            { name: 'olive oil', amount: 2, unit: 'tbsp', category: 'summer salad' },
            // Greek Lamb Rissoles
            { name: 'lamb mince', amount: 600, unit: 'g', category: 'greek lamb rissoles' },
            { name: 'brown onion, finely diced', amount: 0.5, unit: 'pieces', category: 'greek lamb rissoles' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'greek lamb rissoles' },
            { name: 'summer spice mix', amount: 1, unit: 'tbsp', category: 'greek lamb rissoles' },
            { name: 'fine breadcrumbs', amount: 0.5, unit: 'cup', category: 'greek lamb rissoles' },
            // Cucumber Yoghurt
            { name: 'natural yoghurt', amount: 150, unit: 'g', category: 'cucumber yoghurt' },
            { name: 'telegraph cucumber', amount: 0.25, unit: 'pieces', category: 'cucumber yoghurt' },
            { name: 'sweet chilli sauce', amount: 1, unit: 'tsp', category: 'cucumber yoghurt' },
            // Summer Spice Mix
            { name: 'ground cumin', amount: 2.5, unit: 'tsp', category: 'summer spice mix' },
            { name: 'ground coriander', amount: 2, unit: 'tsp', category: 'summer spice mix' },
            { name: 'dried parsley', amount: 2, unit: 'tsp', category: 'summer spice mix' },
            { name: 'onion powder', amount: 1, unit: 'tsp', category: 'summer spice mix' },
            { name: 'garlic powder', amount: 1, unit: 'tsp', category: 'summer spice mix' },
            { name: 'dried mint', amount: 0.5, unit: 'tsp', category: 'summer spice mix' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C and line a tray with baking paper. Bring a small pot of water and a full kettle to the boil.' },
            { text: 'Combine couscous, salt, first measure of spice mix and boiling water in a heat-proof bowl. Stir, cover and leave to swell for 5 minutes. Fluff with a fork and set aside to cool.' },
            { text: 'Mix all lamb rissole ingredients together well. Shape tablespoon-sized amounts into balls, place on tray and flatten slightly with a fork. Bake for 12-14 minutes until golden.' },
            { text: 'Place peas in boiling water and cook for 1-2 minutes. Refresh under cold water and drain.' },
            { text: 'Dice tomato, cucumber and capsicum. Roughly chop spinach. Place in a large bowl with cooled couscous and peas. Add olive oil, season and mix well.' },
            { text: 'Place yoghurt in a small bowl. Grate cucumber in, add sweet chilli sauce and season.' },
            { text: 'Serve summer salad in bowls, top with rissoles and spoon over cucumber yoghurt.' }
        ],
        tips: 'Dampen your hands before rolling the rissoles to stop the mixture sticking. Can also cook on barbecue hot plate for 12-14 minutes, turning regularly.'
    },

    // 8. Moroccan Meatballs with Couscous Salad
    {
        id: 'nl-moroccan-meatballs',
        name: 'Moroccan Meatballs with Couscous Salad',
        image: '',
        cookTime: 20,
        prepTime: 10,
        calories: 685,
        servings: 5,
        difficulty: 'Easy',
        cuisine: 'Moroccan',
        mainProtein: 'Beef',
        tags: ['family-friendly', 'batch-cook', 'kid-friendly'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Fragrant Moroccan-spiced beef meatballs with a fresh couscous salad and spiced sour cream. The spice mix makes enough for both the meatballs and the garnish.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Moroccan Meatballs
            { name: 'beef mince', amount: 600, unit: 'g', category: 'moroccan meatballs' },
            { name: 'panko breadcrumbs', amount: 0.75, unit: 'cup', category: 'moroccan meatballs' },
            { name: 'Moroccan spice mix', amount: 1.5, unit: 'tbsp', category: 'moroccan meatballs' },
            { name: 'grated cheese', amount: 1, unit: 'cup', category: 'moroccan meatballs' },
            { name: 'soy sauce', amount: 1, unit: 'tbsp', category: 'moroccan meatballs' },
            { name: 'egg', amount: 1, unit: 'pieces', category: 'moroccan meatballs' },
            { name: 'salt', amount: 0.25, unit: 'tsp', category: 'moroccan meatballs' },
            { name: 'tomato sauce', amount: 1, unit: 'tbsp', category: 'moroccan meatballs' },
            // Moroccan Spice Mix
            { name: 'ground coriander', amount: 2, unit: 'tsp', category: 'moroccan spice mix' },
            { name: 'ground cumin', amount: 2, unit: 'tsp', category: 'moroccan spice mix' },
            { name: 'smoked paprika', amount: 2, unit: 'tsp', category: 'moroccan spice mix' },
            { name: 'garlic powder', amount: 1, unit: 'tsp', category: 'moroccan spice mix' },
            { name: 'ground turmeric', amount: 0.5, unit: 'tsp', category: 'moroccan spice mix' },
            // Couscous Salad
            { name: 'boiling water', amount: 1, unit: 'cup', category: 'couscous salad' },
            { name: 'couscous', amount: 1, unit: 'cup', category: 'couscous salad' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'couscous salad' },
            { name: 'broccoli, small florets and diced stem', amount: 1, unit: 'head', category: 'couscous salad' },
            { name: 'telegraph cucumber', amount: 0.5, unit: 'pieces', category: 'couscous salad' },
            { name: 'carrot', amount: 1, unit: 'pieces', category: 'couscous salad' },
            { name: 'vinegar', amount: 1, unit: 'tbsp', category: 'couscous salad' },
            { name: 'olive oil', amount: 2, unit: 'tbsp', category: 'couscous salad' },
            // To Serve
            { name: 'sour cream', amount: 0.5, unit: 'cup', category: 'to serve' },
            { name: 'Moroccan spice mix (optional)', amount: 0.5, unit: 'tsp', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C. Lightly grease a large casserole dish and place in oven to preheat. Bring a small pot of salted water and a full kettle to the boil.' },
            { text: 'Mix all meatball ingredients together. Roll into golf-ball-sized balls. Place in preheated dish and bake for 13-15 minutes until cooked through. Grill for 2-3 minutes to golden.' },
            { text: 'Combine boiling water, couscous and salt in a heat-proof bowl. Stir, cover and leave to swell for 5 minutes. Fluff with a fork.' },
            { text: 'Cook broccoli in boiling water for 3-4 minutes. Drain and cool. Quarter cucumber lengthways, dice into 1cm pieces; grate carrot. Stir all veggies through couscous with vinegar and olive oil. Season.' },
            { text: 'Mix sour cream with remaining Moroccan spice mix.' },
            { text: 'Serve couscous salad topped with meatballs and spiced sour cream.' }
        ],
        tips: 'Turmeric is part of the ginger family. In India, the world\'s largest producer of turmeric, it is known as the Golden Spice.'
    },

    // 9. Lamb Kofta Pita Pockets
    {
        id: 'nl-lamb-kofta-pita',
        name: 'Lamb Kofta Pita Pockets',
        image: '',
        cookTime: 20,
        prepTime: 15,
        calories: 678,
        servings: 4,
        difficulty: 'Easy',
        cuisine: 'Turkish',
        mainProtein: 'Lamb',
        tags: ['family-friendly', 'kid-friendly', 'build-your-own'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Spiced lamb kofta in warm pita pockets with a crunchy apple slaw and homemade tomato sauce. Kids love building their own.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Tomato Sauce
            { name: 'brown onion, finely diced', amount: 0.5, unit: 'pieces', category: 'tomato sauce' },
            { name: 'tomato paste', amount: 1, unit: 'tbsp', category: 'tomato sauce' },
            { name: 'chopped tomatoes (tin)', amount: 400, unit: 'g', category: 'tomato sauce' },
            { name: 'sugar', amount: 2, unit: 'tbsp', category: 'tomato sauce' },
            { name: 'salt', amount: 0.25, unit: 'tsp', category: 'tomato sauce' },
            { name: 'vinegar', amount: 0.5, unit: 'tsp', category: 'tomato sauce' },
            // Lamb Kofta
            { name: 'lamb mince', amount: 600, unit: 'g', category: 'lamb kofta' },
            { name: 'salt', amount: 1, unit: 'tsp', category: 'lamb kofta' },
            { name: 'black pepper', amount: 0.5, unit: 'tsp', category: 'lamb kofta' },
            { name: 'brown onion, finely diced or grated', amount: 0.5, unit: 'pieces', category: 'lamb kofta' },
            { name: 'garlic cloves, minced', amount: 2, unit: 'pieces', category: 'lamb kofta' },
            { name: 'Turkish spice rub', amount: 1, unit: 'tbsp', category: 'lamb kofta' },
            { name: 'cornflour', amount: 1.5, unit: 'tbsp', category: 'lamb kofta' },
            { name: 'egg', amount: 1, unit: 'pieces', category: 'lamb kofta' },
            // Turkish Spice Rub
            { name: 'ground cumin', amount: 1, unit: 'tsp', category: 'turkish spice rub' },
            { name: 'ground coriander', amount: 1, unit: 'tsp', category: 'turkish spice rub' },
            { name: 'ground allspice', amount: 0.5, unit: 'tsp', category: 'turkish spice rub' },
            { name: 'fennel seeds', amount: 0.5, unit: 'tsp', category: 'turkish spice rub' },
            { name: 'ground cinnamon', amount: 0.25, unit: 'tsp', category: 'turkish spice rub' },
            // To Serve
            { name: 'cabbage', amount: 0.25, unit: 'head', category: 'to serve' },
            { name: 'carrot', amount: 1, unit: 'pieces', category: 'to serve' },
            { name: 'apple', amount: 1, unit: 'pieces', category: 'to serve' },
            { name: 'mayo', amount: 0.25, unit: 'cup', category: 'to serve' },
            { name: 'small pita breads', amount: 8, unit: 'pieces', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C. Line two oven trays with baking paper.' },
            { text: 'Heat oil in a pot on low-medium heat. Cook onion for 4-5 minutes. Stir in tomato paste, canned tomatoes, sugar and salt. Simmer for 6-8 minutes until thickened. Stir through vinegar and season.' },
            { text: 'Mix all lamb kofta ingredients until well combined. Roll tablespoon-sized pieces into cigar shapes. Arrange on first tray and bake for about 12 minutes.' },
            { text: 'Thinly slice cabbage, grate carrot and apple. Place in a bowl with mayo and mix to combine. Season.' },
            { text: 'Cut into each pita bread horizontally. Place on second tray and warm in oven for 2-3 minutes.' },
            { text: 'Stuff pita pockets with salad, lamb kofta pieces and tomato sauce. Serve extra salad on the side.' }
        ],
        tips: 'The name kofta comes from the Persian word koftan, meaning \'to pound\' or \'to grind\'.'
    },

    // 10. Lamb 'n' Lentil Burgers with Veggie Chips
    {
        id: 'nl-lamb-lentil-burgers',
        name: "Lamb 'n' Lentil Burgers with Veggie Chips",
        image: '',
        cookTime: 30,
        prepTime: 15,
        calories: 535,
        servings: 6,
        difficulty: 'Easy',
        cuisine: 'Fusion',
        mainProtein: 'Lamb',
        tags: ['family-friendly', 'high-protein', 'hidden-veg', 'with-chips'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Packed with nutritious ingredients and made lighter with pita breads, hummus and lentils. Served with baked parsnip and carrot chips.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Parsnip and Carrot Chips
            { name: 'parsnips, cut into sticks', amount: 2, unit: 'pieces', category: 'parsnip and carrot chips' },
            { name: 'carrots, cut into sticks', amount: 2, unit: 'pieces', category: 'parsnip and carrot chips' },
            // Lamb Patties
            { name: 'brown onion, finely diced', amount: 0.5, unit: 'pieces', category: 'lamb patties' },
            { name: 'lamb mince', amount: 500, unit: 'g', category: 'lamb patties' },
            { name: 'brown lentils (tin), drained and rinsed', amount: 400, unit: 'g', category: 'lamb patties' },
            { name: 'lamb burger spice mix', amount: 2, unit: 'tbsp', category: 'lamb patties' },
            { name: 'soy sauce', amount: 2, unit: 'tbsp', category: 'lamb patties' },
            { name: 'salt', amount: 0.25, unit: 'tsp', category: 'lamb patties' },
            { name: 'egg', amount: 1, unit: 'pieces', category: 'lamb patties' },
            { name: 'fine breadcrumbs', amount: 1, unit: 'cup', category: 'lamb patties' },
            // To Serve
            { name: 'hummus', amount: 100, unit: 'g', category: 'to serve' },
            { name: 'mayo', amount: 2, unit: 'tbsp', category: 'to serve' },
            { name: 'sweet chilli sauce (optional)', amount: 1, unit: 'tbsp', category: 'to serve' },
            { name: 'small pita breads', amount: 8, unit: 'pieces', category: 'to serve' },
            { name: 'tomatoes', amount: 2, unit: 'pieces', category: 'to serve' },
            { name: 'cos lettuce', amount: 1, unit: 'pieces', category: 'to serve' },
            { name: 'butter (optional)', amount: 1, unit: 'knob', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C. Line two oven trays with baking paper.' },
            { text: 'Toss parsnips and carrots with a little oil on first tray. Season and cook for 25-30 minutes, turning once.' },
            { text: 'Mix all lamb patty ingredients. Shape into 8 patties, slightly larger than pita breads, about 1cm thick.' },
            { text: 'Cook patties in a large frying pan on medium-high heat, in batches, for 3-5 minutes each side until browned and cooked through.' },
            { text: 'Mix together hummus, mayo and sweet chilli sauce. Set aside.' },
            { text: 'Cut pita breads in half horizontally and warm in oven for 3-4 minutes.' },
            { text: 'Thinly slice tomatoes and tear up lettuce. Assemble: pita bread, hummus mayo, patty, tomato, lettuce. Serve with veggie chips.' }
        ],
        tips: 'Can also cook patties on barbecue following the same method.'
    },

    // 11. Chicken Soft Tacos
    {
        id: 'nl-chicken-soft-tacos',
        name: 'Chicken Soft Tacos',
        image: '',
        cookTime: 20,
        prepTime: 20,
        calories: 652,
        servings: 6,
        difficulty: 'Easy',
        cuisine: 'Mexican',
        mainProtein: 'Chicken',
        tags: ['family-friendly', 'kid-friendly', 'build-your-own', 'batch-cook'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'Tacos are a fun, family-friendly meal! The kids will love constructing their own and picking the fillings.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Chicken Filling
            { name: 'brown onion, thinly sliced', amount: 1, unit: 'pieces', category: 'chicken filling' },
            { name: 'garlic cloves, minced', amount: 2, unit: 'pieces', category: 'chicken filling' },
            { name: 'chicken mince', amount: 600, unit: 'g', category: 'chicken filling' },
            { name: 'taco spice mix', amount: 2, unit: 'tbsp', category: 'chicken filling' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'chicken filling' },
            { name: 'green capsicum, thinly sliced', amount: 1, unit: 'pieces', category: 'chicken filling' },
            { name: 'tomatoes, diced', amount: 2, unit: 'pieces', category: 'chicken filling' },
            { name: 'red kidney beans (tin), drained', amount: 400, unit: 'g', category: 'chicken filling' },
            { name: 'tomato paste', amount: 4, unit: 'tbsp', category: 'chicken filling' },
            { name: 'stock', amount: 0.5, unit: 'cup', category: 'chicken filling' },
            { name: 'water', amount: 0.25, unit: 'cup', category: 'chicken filling' },
            // Taco Spice Mix
            { name: 'dried coriander', amount: 2, unit: 'tsp', category: 'taco spice mix' },
            { name: 'ground cumin', amount: 2, unit: 'tsp', category: 'taco spice mix' },
            { name: 'paprika', amount: 1, unit: 'tsp', category: 'taco spice mix' },
            { name: 'black pepper', amount: 1, unit: 'tsp', category: 'taco spice mix' },
            { name: 'dried oregano', amount: 1, unit: 'tsp', category: 'taco spice mix' },
            // Avo Sweet Chilli Mayo
            { name: 'avocado', amount: 1, unit: 'pieces', category: 'avo sweet chilli mayo' },
            { name: 'mayo', amount: 2, unit: 'tbsp', category: 'avo sweet chilli mayo' },
            { name: 'sweet chilli sauce', amount: 2, unit: 'tbsp', category: 'avo sweet chilli mayo' },
            // To Serve
            { name: 'small soft tortillas', amount: 12, unit: 'pieces', category: 'to serve' },
            { name: 'lettuce', amount: 1, unit: 'pieces', category: 'to serve' },
            { name: 'tomatoes', amount: 2, unit: 'pieces', category: 'to serve' },
            { name: 'grated cheese', amount: 1, unit: 'cup', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 200\u00b0C (if using to warm tortillas).' },
            { text: 'Heat oil in a large frying pan on medium-high heat. Cook onion and garlic for 2-3 minutes. Add chicken mince, taco spice mix and salt; cook for 4-5 minutes until browned. Add capsicum and cook for 2 minutes.' },
            { text: 'Add tomatoes, beans, tomato paste, stock and water. Simmer, reduce heat to medium, cook for 8-10 minutes until reduced and thickened.' },
            { text: 'Warm tortillas in oven wrapped in foil for 10-15 minutes, or microwave covered for 90 seconds.' },
            { text: 'Mash avocado with mayo and sweet chilli sauce. Season.' },
            { text: 'Thinly slice lettuce and dice tomatoes. Place all ingredients in the centre of the table for everyone to build their own tacos.' }
        ],
        tips: 'Americans consume over 4 billion tacos every year! Great for batch cooking \u2014 the filling freezes well.'
    },

    // 12. Beef Soft Tacos
    {
        id: 'nl-beef-soft-tacos',
        name: 'Beef Soft Tacos',
        image: '',
        cookTime: 20,
        prepTime: 20,
        calories: 718,
        servings: 6,
        difficulty: 'Easy',
        cuisine: 'Mexican',
        mainProtein: 'Beef',
        tags: ['family-friendly', 'kid-friendly', 'build-your-own'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'A little like a Sloppy Joe \u2014 the kids will love the saucy filling in these tasty beef tacos!',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Beef Filling
            { name: 'brown onion, thinly sliced', amount: 1, unit: 'pieces', category: 'beef filling' },
            { name: 'garlic cloves, minced', amount: 2, unit: 'pieces', category: 'beef filling' },
            { name: 'beef mince', amount: 600, unit: 'g', category: 'beef filling' },
            { name: 'taco spice mix', amount: 2, unit: 'tbsp', category: 'beef filling' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'beef filling' },
            { name: 'capsicum, thinly sliced', amount: 1, unit: 'pieces', category: 'beef filling' },
            { name: 'tomatoes, diced', amount: 1.5, unit: 'pieces', category: 'beef filling' },
            { name: 'red kidney beans (tin), drained', amount: 400, unit: 'g', category: 'beef filling' },
            { name: 'tomato paste', amount: 0.5, unit: 'cup', category: 'beef filling' },
            { name: 'stock', amount: 0.5, unit: 'cup', category: 'beef filling' },
            { name: 'water', amount: 0.25, unit: 'cup', category: 'beef filling' },
            // Avo Sweet Chilli Mayo
            { name: 'avocado', amount: 1, unit: 'pieces', category: 'avo sweet chilli mayo' },
            { name: 'mayo', amount: 2, unit: 'tbsp', category: 'avo sweet chilli mayo' },
            { name: 'sweet chilli sauce', amount: 2, unit: 'tbsp', category: 'avo sweet chilli mayo' },
            // To Serve
            { name: 'small soft tortillas', amount: 12, unit: 'pieces', category: 'to serve' },
            { name: 'cos lettuce', amount: 1, unit: 'pieces', category: 'to serve' },
            { name: 'tomatoes', amount: 1.5, unit: 'pieces', category: 'to serve' },
            { name: 'grated cheese', amount: 1, unit: 'cup', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 200\u00b0C (if using to warm tortillas).' },
            { text: 'Heat oil in a large frying pan on medium-high heat. Cook onion and garlic for 2-3 minutes. Add beef mince, taco spice mix and salt; cook for 4-5 minutes until browned. Add capsicum and cook for 2 minutes.' },
            { text: 'Add tomatoes, beans, tomato paste, stock and water. Simmer, reduce heat to medium, cook for 8-10 minutes until reduced and thickened.' },
            { text: 'Warm tortillas in oven wrapped in foil for 10-15 minutes, or microwave for 90 seconds.' },
            { text: 'Mash avocado with mayo and sweet chilli sauce. Season.' },
            { text: 'Thinly slice lettuce and dice tomatoes. Place all ingredients in the centre for everyone to help themselves.' }
        ],
        tips: 'Warm the tortillas in a microwave if you\'re short on time.'
    },

    // 13. Chilli Con Carne
    {
        id: 'nl-chilli-con-carne',
        name: 'Chilli Con Carne',
        image: '',
        cookTime: 30,
        prepTime: 15,
        calories: 740,
        servings: 6,
        difficulty: 'Easy',
        cuisine: 'Mexican',
        mainProtein: 'Beef',
        tags: ['family-friendly', 'batch-cook', 'freezer-friendly', 'one-pot', 'budget-friendly'],
        dietary: [],
        soloFriendly: true,
        familyFriendly: true,
        description: 'This easy chilli con carne will have you cooking authentic Mexican in no time! It also builds flavour after a day or two, so it\'s the perfect dish to make in advance.',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Rice
            { name: 'jasmine rice', amount: 2, unit: 'cups', category: 'rice' },
            { name: 'water', amount: 3, unit: 'cups', category: 'rice' },
            { name: 'salt', amount: 1, unit: 'pinch', category: 'rice' },
            // Chilli Con Carne
            { name: 'beef mince', amount: 600, unit: 'g', category: 'chilli con carne' },
            { name: 'brown onion, finely diced', amount: 1, unit: 'pieces', category: 'chilli con carne' },
            { name: 'chilli spice mix', amount: 2, unit: 'tbsp', category: 'chilli con carne' },
            { name: 'chilli flakes or powder (optional)', amount: 1, unit: 'pinch', category: 'chilli con carne' },
            { name: 'frozen corn kernels', amount: 1, unit: 'cup', category: 'chilli con carne' },
            { name: 'red kidney beans (tin), drained', amount: 400, unit: 'g', category: 'chilli con carne' },
            { name: 'tomato paste', amount: 3, unit: 'tbsp', category: 'chilli con carne' },
            { name: 'chopped tomatoes (tin)', amount: 400, unit: 'g', category: 'chilli con carne' },
            { name: 'carrot, grated', amount: 1, unit: 'pieces', category: 'chilli con carne' },
            { name: 'beef stock', amount: 1, unit: 'cup', category: 'chilli con carne' },
            { name: 'grated cheese', amount: 0.5, unit: 'cup', category: 'chilli con carne' },
            // Chilli Spice Mix
            { name: 'smoked paprika', amount: 2, unit: 'tsp', category: 'chilli spice mix' },
            { name: 'dried oregano', amount: 2, unit: 'tsp', category: 'chilli spice mix' },
            { name: 'onion powder', amount: 2, unit: 'tsp', category: 'chilli spice mix' },
            { name: 'ground cumin', amount: 1, unit: 'tsp', category: 'chilli spice mix' },
            { name: 'ground coriander', amount: 1, unit: 'tsp', category: 'chilli spice mix' },
            // To Serve
            { name: 'sour cream', amount: 0.25, unit: 'cup', category: 'to serve' },
            { name: 'tomato sauce', amount: 2, unit: 'tbsp', category: 'to serve' },
            { name: 'iceberg lettuce', amount: 0.5, unit: 'pieces', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven grill to 200\u00b0C/high. Set aside a large casserole/baking dish.' },
            { text: 'Combine all rice ingredients in a lidded pot. Boil, then reduce to lowest heat for 12 minutes. Turn off heat and steam for 8 minutes. Fluff with a fork.' },
            { text: 'Heat oil in a large frying pan (preferably oven-proof) on high heat. Cook beef mince and onion, breaking up with a spoon, for 7-8 minutes until browned. Add chilli spice mix and chilli flakes; cook for 1 minute.' },
            { text: 'Add corn, beans, tomato paste, canned tomatoes, carrot and stock. Simmer on low for 9-12 minutes, stirring occasionally, until thickened. Season.' },
            { text: 'Combine sour cream and tomato sauce. Thinly slice lettuce.' },
            { text: 'Sprinkle cheese over mince and place under grill for about 6 minutes until cheese is bubbling and golden.' },
            { text: 'Serve chilli con carne with rice, sour cream mixture and lettuce.' }
        ],
        tips: 'To turn into beef nachos, simply serve the chilli con carne mixture with your favourite corn chips instead of rice. Freezes brilliantly in portions.'
    },

    // 14. Baked Beef Meatballs
    {
        id: 'nl-baked-beef-meatballs',
        name: 'Baked Beef Meatballs',
        image: '',
        cookTime: 20,
        prepTime: 20,
        calories: 696,
        servings: 6,
        difficulty: 'Easy',
        cuisine: 'Italian',
        mainProtein: 'Beef',
        tags: ['family-friendly', 'kid-friendly', 'hidden-veg', 'batch-cook', 'freezer-friendly'],
        dietary: [],
        soloFriendly: true,
        familyFriendly: true,
        description: 'With plenty of veggies hidden inside the tasty tomato vegetable sauce, this family fav is nutritious and delicious!',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Meatballs
            { name: 'beef mince', amount: 600, unit: 'g', category: 'meatballs' },
            { name: 'panko breadcrumbs', amount: 0.5, unit: 'cup', category: 'meatballs' },
            { name: 'egg', amount: 1, unit: 'pieces', category: 'meatballs' },
            { name: 'soy sauce', amount: 1, unit: 'tsp', category: 'meatballs' },
            { name: 'meatball spice mix', amount: 2, unit: 'tbsp', category: 'meatballs' },
            { name: 'brown onion, finely diced', amount: 0.5, unit: 'pieces', category: 'meatballs' },
            { name: 'garlic clove, minced (optional)', amount: 1, unit: 'pieces', category: 'meatballs' },
            { name: 'tomato sauce', amount: 1, unit: 'tbsp', category: 'meatballs' },
            { name: 'salt', amount: 0.75, unit: 'tsp', category: 'meatballs' },
            // Meatball Spice Mix
            { name: 'dried rosemary', amount: 1, unit: 'tbsp', category: 'meatball spice mix' },
            { name: 'dried oregano', amount: 1, unit: 'tbsp', category: 'meatball spice mix' },
            // Tomato Vegetable Sauce
            { name: 'brown onion, finely diced', amount: 0.5, unit: 'pieces', category: 'tomato vegetable sauce' },
            { name: 'carrot, grated', amount: 1, unit: 'pieces', category: 'tomato vegetable sauce' },
            { name: 'celery stalks, finely diced', amount: 3, unit: 'pieces', category: 'tomato vegetable sauce' },
            { name: 'salt', amount: 1, unit: 'pinch', category: 'tomato vegetable sauce' },
            { name: 'tomato passata', amount: 680, unit: 'ml', category: 'tomato vegetable sauce' },
            { name: 'beef stock', amount: 1, unit: 'cup', category: 'tomato vegetable sauce' },
            { name: 'sugar', amount: 1, unit: 'tsp', category: 'tomato vegetable sauce' },
            { name: 'baby spinach leaves', amount: 3, unit: 'handfuls', category: 'tomato vegetable sauce' },
            { name: 'grated cheese', amount: 0.75, unit: 'cup', category: 'tomato vegetable sauce' },
            // To Serve
            { name: 'dried spaghetti', amount: 400, unit: 'g', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C and a large casserole dish.' },
            { text: 'Combine all meatball ingredients and mix well. Scoop about 2 tablespoons per meatball, roll into balls. Place in preheated dish and bake for 10 minutes.' },
            { text: 'While meatballs bake, make the sauce. Heat oil in a large frying pan on medium heat. Cook onion, carrot and celery with salt for 5-6 minutes. Add passata, stock and sugar. Simmer on low-medium for 5-6 minutes until slightly thickened. Stir through spinach and season.' },
            { text: 'Remove meatballs from oven, pour sauce over to cover. Sprinkle over cheese. Bake for a further 10 minutes until cheese is melted and golden.' },
            { text: 'Cook spaghetti for 7-8 minutes until just tender. Drain and toss with a little olive oil.' },
            { text: 'Divide spaghetti among plates and top with baked beef meatballs and tomato vegetable sauce.' }
        ],
        tips: 'If your crowd prefers a different shape or style of pasta, simply cook this instead and serve the meatballs on top. Freezes well in portions.'
    },

    // 15. Pea 'n' Pumpkin Risotto with Pesto and Bacon
    {
        id: 'nl-pea-pumpkin-risotto',
        name: "Pea 'n' Pumpkin Risotto with Pesto and Bacon",
        image: '',
        cookTime: 30,
        prepTime: 20,
        calories: 579,
        servings: 5,
        difficulty: 'Medium',
        cuisine: 'Italian',
        mainProtein: 'Bacon',
        tags: ['family-friendly', 'comfort-food', 'weekend-cook'],
        dietary: [],
        soloFriendly: false,
        familyFriendly: true,
        description: 'This easy-to-follow risotto recipe is sure to impress the family. It\'s a delicious, creamy dish topped with crispy bacon \u2014 yum!',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Pea and Pumpkin Risotto
            { name: 'pumpkin, peeled and diced 1.5cm', amount: 400, unit: 'g', category: 'pea and pumpkin risotto' },
            { name: 'butter', amount: 1, unit: 'tbsp', category: 'pea and pumpkin risotto' },
            { name: 'brown onion, finely diced', amount: 1, unit: 'pieces', category: 'pea and pumpkin risotto' },
            { name: 'garlic cloves, minced', amount: 2, unit: 'pieces', category: 'pea and pumpkin risotto' },
            { name: 'dried thyme', amount: 1, unit: 'tsp', category: 'pea and pumpkin risotto' },
            { name: 'salt', amount: 0.5, unit: 'tsp', category: 'pea and pumpkin risotto' },
            { name: 'Arborio rice', amount: 1.5, unit: 'cups', category: 'pea and pumpkin risotto' },
            { name: 'vegetable stock, heated', amount: 3.5, unit: 'cups', category: 'pea and pumpkin risotto' },
            { name: 'frozen peas', amount: 1.5, unit: 'cups', category: 'pea and pumpkin risotto' },
            { name: 'sour cream', amount: 0.33, unit: 'cup', category: 'pea and pumpkin risotto' },
            // Salad
            { name: 'iceberg lettuce', amount: 0.5, unit: 'pieces', category: 'salad' },
            { name: 'tomatoes', amount: 2, unit: 'pieces', category: 'salad' },
            { name: 'telegraph cucumber', amount: 0.5, unit: 'pieces', category: 'salad' },
            { name: 'vinegar', amount: 1, unit: 'tsp', category: 'salad' },
            { name: 'olive oil', amount: 1, unit: 'tbsp', category: 'salad' },
            // To Serve
            { name: 'streaky bacon, thinly sliced', amount: 250, unit: 'g', category: 'to serve' },
            { name: 'basil pesto', amount: 4, unit: 'tbsp', category: 'to serve' },
            { name: 'Parmesan cheese', amount: 0.25, unit: 'cup', category: 'to serve' }
        ],
        steps: [
            { text: 'Preheat oven to 220\u00b0C. Line two oven trays with baking paper.' },
            { text: 'Place bacon on first tray and bake for 15-20 minutes until crispy. Toss pumpkin with olive oil on second tray, season and roast for about 15 minutes until tender.' },
            { text: 'Melt butter and a little oil in a large, heavy-based lidded pot on medium heat. Cook onion, garlic, thyme and salt for about 3 minutes until soft. Add rice and stir for 1 minute.' },
            { text: 'Add 1 cup stock and cook for 2-3 minutes, stirring often, until almost absorbed. Stir in remaining stock. Reduce heat to low-medium, cover and cook for about 15 minutes, stirring often, until rice is tender but grains still intact.' },
            { text: 'While risotto cooks, prepare salad. Shred lettuce, dice tomatoes, thinly slice cucumber. Toss with vinegar and oil, season.' },
            { text: 'Remove lid, add peas and cook for 2-3 minutes until bright green and liquid absorbed. Stir through sour cream and roasted pumpkin. Season.' },
            { text: 'Spoon risotto onto plates, sprinkle with crispy bacon. Top with a dollop of pesto and Parmesan. Serve salad on the side.' }
        ],
        tips: 'The risotto technique here is simplified \u2014 you don\'t need to add stock one ladle at a time. The lid does the work for you.'
    },

    // 16. Beef Lasagne
    {
        id: 'nl-beef-lasagne',
        name: 'Beef Lasagne',
        image: '',
        cookTime: 50,
        prepTime: 20,
        calories: 584,
        servings: 6,
        difficulty: 'Medium',
        cuisine: 'Italian',
        mainProtein: 'Beef',
        tags: ['family-friendly', 'comfort-food', 'batch-cook', 'freezer-friendly', 'weekend-cook', 'hidden-veg'],
        dietary: [],
        soloFriendly: true,
        familyFriendly: true,
        description: 'A family favourite \u2014 this classic lasagne recipe is a favourite with Bargain Box households across NZ. Recommended!',
        source: { name: 'Nadia Lim \u2013 Family Favourites', url: 'https://nadialim.com/product/family-favourites/' },
        favourite: false,
        timesCooked: 0,
        ingredients: [
            // Meat Sauce
            { name: 'brown onion, finely diced', amount: 1, unit: 'pieces', category: 'meat sauce' },
            { name: 'carrot, grated', amount: 1, unit: 'pieces', category: 'meat sauce' },
            { name: 'celery stalks, finely diced', amount: 2, unit: 'pieces', category: 'meat sauce' },
            { name: 'beef mince', amount: 600, unit: 'g', category: 'meat sauce' },
            { name: 'dried Italian herbs mix', amount: 2, unit: 'tbsp', category: 'meat sauce' },
            { name: 'tomato paste', amount: 0.25, unit: 'cup', category: 'meat sauce' },
            { name: 'chopped tomatoes (tin)', amount: 400, unit: 'g', category: 'meat sauce' },
            { name: 'beef stock', amount: 1.5, unit: 'cups', category: 'meat sauce' },
            { name: 'soy sauce', amount: 1.25, unit: 'tbsp', category: 'meat sauce' },
            { name: 'sugar', amount: 1.5, unit: 'tbsp', category: 'meat sauce' },
            // Dried Italian Herbs
            { name: 'dried oregano', amount: 2, unit: 'tsp', category: 'dried italian herbs' },
            { name: 'dried thyme', amount: 2, unit: 'tsp', category: 'dried italian herbs' },
            { name: 'dried marjoram', amount: 2, unit: 'tsp', category: 'dried italian herbs' },
            { name: 'dried basil', amount: 1, unit: 'tsp', category: 'dried italian herbs' },
            { name: 'dried rosemary', amount: 1, unit: 'tsp', category: 'dried italian herbs' },
            // White Sauce
            { name: 'egg', amount: 1, unit: 'pieces', category: 'white sauce' },
            { name: 'cream', amount: 200, unit: 'ml', category: 'white sauce' },
            { name: 'milk', amount: 0.25, unit: 'cup', category: 'white sauce' },
            { name: 'Parmesan cheese, finely grated', amount: 0.5, unit: 'cup', category: 'white sauce' },
            // To Assemble
            { name: 'dried lasagne sheets', amount: 6, unit: 'pieces', category: 'to assemble' },
            { name: 'Parmesan cheese, finely grated', amount: 0.5, unit: 'cup', category: 'to assemble' },
            { name: 'broccoli, small florets', amount: 1, unit: 'head', category: 'to assemble' }
        ],
        steps: [
            { text: 'Preheat oven to 190\u00b0C. Set a medium-sized lasagne dish (about 20cm x 28cm) aside.' },
            { text: 'Heat oil in a large frying pan on high heat. Cook onion, carrot and celery for 3-4 minutes. Add mince and cook for 5 minutes, breaking up with a spoon, until browned.' },
            { text: 'Add dried Italian herbs, tomato paste, canned tomatoes, stock, soy sauce and sugar. Simmer for about 10 minutes until thickened but still saucy. Season.' },
            { text: 'In a medium bowl, lightly whisk egg. Add cream, milk and Parmesan and whisk until combined. Season. The sauce should be runny.' },
            { text: 'Spread about 1 cup of meat sauce over base of lasagne dish. Lay lasagne sheets in a single layer. Spoon over half the remaining meat sauce followed by half the white sauce. Repeat one more layer, finishing with white sauce. Sprinkle over Parmesan.' },
            { text: 'Bake for about 30 minutes until topping is golden. Leave to rest for 5 minutes.' },
            { text: 'When lasagne has about 10 minutes remaining, cook broccoli in boiling water for 3-4 minutes until bright green and tender.' },
            { text: 'Cut lasagne into large squares and serve with broccoli on the side.' }
        ],
        tips: 'You can test if the lasagne sheets are cooked by pushing the pointy end of a knife down through the pasta \u2014 the knife should go through easily. Freezes well in portions.'
    }

);
