// ===========================================
// RECIPE DATA
// ===========================================

const recipes = [
    {
        id: 'thai-green-curry',
        name: 'Thai Green Curry',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop',
        cookTime: 25,
        calories: 380,
        servings: 4,
        difficulty: 'Easy',
        tags: ['Asian', 'Curry', 'Healthy'],
        cuisine: 'asian',
        source: {
            name: 'BBC Good Food',
            url: 'https://www.bbcgoodfood.com/recipes/thai-green-curry'
        },
        favourite: true,
        timesCooked: 5,
        lastCooked: '2024-11-15',
        dateAdded: '2024-01-10',
        personalNote: 'Kids loved it - use less chilli next time',
        ingredients: {
            protein: [
                { name: 'Chicken breast', amount: 400, unit: 'g', scalable: true }
            ],
            vegetables: [
                { name: 'Red pepper', amount: 1, unit: '', scalable: true, prep: 'sliced' },
                { name: 'Baby corn', amount: 100, unit: 'g', scalable: true },
                { name: 'Thai basil', amount: 1, unit: 'handful', scalable: false }
            ],
            sauce: [
                { name: 'Coconut milk', amount: 400, unit: 'ml', scalable: true },
                { name: 'Thai green curry paste', amount: 2, unit: 'tbsp', scalable: 'partial' },
                { name: 'Fish sauce', amount: 1, unit: 'tbsp', scalable: 'partial' }
            ],
            pantry: [
                { name: 'Vegetable oil', amount: 1, unit: 'tbsp', scalable: false },
                { name: 'Salt', amount: 0, unit: 'to taste', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Cut the chicken into bite-sized pieces. Slice the pepper into strips.', time: null },
            { instruction: 'Heat oil in a wok over high heat. Add the curry paste and fry until fragrant.', time: 2 },
            { instruction: 'Add the chicken pieces and stir-fry until sealed on all sides.', time: 5 },
            { instruction: 'Pour in the coconut milk and bring to a simmer. Add the vegetables and cook until tender.', time: 10 },
            { instruction: 'Season with fish sauce. Scatter with Thai basil and serve with jasmine rice.', time: null }
        ],
        tips: [
            'Use chicken thigh for more flavour',
            'Add more paste if you like it spicy',
            'Swap fish sauce for soy sauce for vegetarian'
        ]
    },
    {
        id: 'spaghetti-carbonara',
        name: 'Spaghetti Carbonara',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop',
        cookTime: 20,
        calories: 520,
        servings: 4,
        difficulty: 'Medium',
        tags: ['Italian', 'Pasta', 'Quick'],
        cuisine: 'italian',
        source: {
            name: 'Family Recipe',
            url: null
        },
        favourite: true,
        timesCooked: 12,
        lastCooked: '2024-11-20',
        dateAdded: '2023-06-15',
        personalNote: null,
        ingredients: {
            protein: [
                { name: 'Guanciale or pancetta', amount: 200, unit: 'g', scalable: true }
            ],
            carbs: [
                { name: 'Spaghetti', amount: 400, unit: 'g', scalable: true }
            ],
            dairy: [
                { name: 'Egg yolks', amount: 4, unit: '', scalable: true },
                { name: 'Pecorino Romano', amount: 100, unit: 'g', scalable: true, prep: 'finely grated' },
                { name: 'Parmesan', amount: 50, unit: 'g', scalable: true, prep: 'finely grated' }
            ],
            pantry: [
                { name: 'Black pepper', amount: 0, unit: 'generous amount', scalable: false },
                { name: 'Salt', amount: 0, unit: 'for pasta water', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Bring a large pot of salted water to boil. Cook spaghetti according to packet instructions.', time: 10 },
            { instruction: 'Meanwhile, cut guanciale into small cubes. Fry in a cold pan over medium heat until crispy.', time: 8 },
            { instruction: 'In a bowl, whisk together egg yolks, grated cheeses, and plenty of black pepper.', time: null },
            { instruction: 'Reserve a cup of pasta water, then drain the spaghetti.', time: null },
            { instruction: 'Remove pan from heat. Add hot pasta to the guanciale, then quickly stir in the egg mixture, adding pasta water to loosen. Serve immediately.', time: null }
        ],
        tips: [
            'Never add cream - authentic carbonara uses only eggs and cheese',
            'Remove from heat before adding eggs to avoid scrambling',
            'Work quickly while pasta is hot'
        ]
    },
    {
        id: 'five-bean-chilli',
        name: 'Five-Bean Chilli',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop',
        cookTime: 45,
        calories: 310,
        servings: 6,
        difficulty: 'Easy',
        tags: ['Vegetarian', 'Healthy', 'Batch Cook'],
        cuisine: 'vegetarian',
        source: {
            name: 'BBC Good Food',
            url: 'https://www.bbcgoodfood.com/recipes/five-bean-chilli'
        },
        favourite: false,
        timesCooked: 3,
        lastCooked: '2024-10-28',
        dateAdded: '2024-02-20',
        personalNote: 'Great for meal prep - freezes well',
        ingredients: {
            vegetables: [
                { name: 'Onion', amount: 2, unit: 'large', scalable: true, prep: 'diced' },
                { name: 'Red pepper', amount: 2, unit: '', scalable: true, prep: 'diced' },
                { name: 'Garlic cloves', amount: 3, unit: '', scalable: 'partial', prep: 'minced' }
            ],
            canned: [
                { name: 'Chopped tomatoes', amount: 2, unit: 'x 400g cans', scalable: true },
                { name: 'Mixed beans', amount: 2, unit: 'x 400g cans', scalable: true, prep: 'drained' },
                { name: 'Kidney beans', amount: 1, unit: 'x 400g can', scalable: true, prep: 'drained' }
            ],
            spices: [
                { name: 'Cumin', amount: 2, unit: 'tsp', scalable: 'partial' },
                { name: 'Smoked paprika', amount: 1, unit: 'tsp', scalable: 'partial' },
                { name: 'Chilli powder', amount: 1, unit: 'tsp', scalable: 'partial' }
            ],
            pantry: [
                { name: 'Olive oil', amount: 2, unit: 'tbsp', scalable: false },
                { name: 'Vegetable stock', amount: 300, unit: 'ml', scalable: true }
            ]
        },
        steps: [
            { instruction: 'Heat oil in a large pot. Sauté onion and pepper until softened.', time: 8 },
            { instruction: 'Add garlic and spices, cook for 1 minute until fragrant.', time: 1 },
            { instruction: 'Add chopped tomatoes, stock, and all beans. Stir well.', time: null },
            { instruction: 'Bring to a boil, then reduce heat and simmer until thickened.', time: 30 },
            { instruction: 'Season to taste and serve with rice, nachos, or baked potato.', time: null }
        ],
        tips: [
            'Add a square of dark chocolate for depth',
            'Top with sour cream, cheese, and fresh coriander',
            'Freezes brilliantly for up to 3 months'
        ]
    },
    {
        id: 'grilled-salmon',
        name: 'Grilled Salmon with Lemon & Herbs',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
        cookTime: 15,
        calories: 320,
        servings: 2,
        difficulty: 'Easy',
        tags: ['Fish', 'Healthy', 'Quick'],
        cuisine: 'fish',
        source: {
            name: 'Personal Collection',
            url: null
        },
        favourite: false,
        timesCooked: 0,
        lastCooked: null,
        dateAdded: '2024-11-25',
        personalNote: null,
        ingredients: {
            protein: [
                { name: 'Salmon fillets', amount: 2, unit: 'x 150g', scalable: true }
            ],
            vegetables: [
                { name: 'Lemon', amount: 1, unit: '', scalable: false },
                { name: 'Asparagus', amount: 200, unit: 'g', scalable: true, prep: 'trimmed' }
            ],
            herbs: [
                { name: 'Fresh dill', amount: 1, unit: 'small bunch', scalable: false },
                { name: 'Fresh parsley', amount: 1, unit: 'small bunch', scalable: false }
            ],
            pantry: [
                { name: 'Olive oil', amount: 2, unit: 'tbsp', scalable: false },
                { name: 'Salt & pepper', amount: 0, unit: 'to taste', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Preheat grill to high. Season salmon with salt, pepper, and a drizzle of oil.', time: null },
            { instruction: 'Place salmon skin-side down on a baking tray. Grill until just cooked through.', time: 10 },
            { instruction: 'Meanwhile, blanch asparagus in boiling water, then drain.', time: 3 },
            { instruction: 'Chop herbs finely. Serve salmon on asparagus, topped with herbs and lemon wedges.', time: null }
        ],
        tips: [
            'Salmon should be slightly pink in the centre',
            'Add capers for extra flavour',
            'Serve with new potatoes for a complete meal'
        ]
    },
    {
        id: 'mushroom-risotto',
        name: 'Creamy Mushroom Risotto',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
        cookTime: 35,
        calories: 420,
        servings: 4,
        difficulty: 'Medium',
        tags: ['Italian', 'Vegetarian', 'Comfort'],
        cuisine: 'italian',
        source: {
            name: 'BBC Good Food',
            url: 'https://www.bbcgoodfood.com/recipes/mushroom-risotto'
        },
        favourite: true,
        timesCooked: 7,
        lastCooked: '2024-11-10',
        dateAdded: '2023-09-05',
        personalNote: 'Use a mix of wild mushrooms when in season',
        ingredients: {
            vegetables: [
                { name: 'Mixed mushrooms', amount: 300, unit: 'g', scalable: true, prep: 'sliced' },
                { name: 'Onion', amount: 1, unit: 'medium', scalable: true, prep: 'finely diced' },
                { name: 'Garlic cloves', amount: 2, unit: '', scalable: 'partial', prep: 'minced' }
            ],
            carbs: [
                { name: 'Arborio rice', amount: 300, unit: 'g', scalable: true }
            ],
            dairy: [
                { name: 'Parmesan', amount: 60, unit: 'g', scalable: true, prep: 'grated' },
                { name: 'Butter', amount: 30, unit: 'g', scalable: true }
            ],
            liquid: [
                { name: 'Vegetable stock', amount: 1, unit: 'litre', scalable: true, prep: 'kept warm' },
                { name: 'White wine', amount: 150, unit: 'ml', scalable: true }
            ],
            pantry: [
                { name: 'Olive oil', amount: 2, unit: 'tbsp', scalable: false },
                { name: 'Fresh thyme', amount: 1, unit: 'few sprigs', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Heat oil and half the butter in a wide pan. Fry mushrooms until golden, set aside.', time: 8 },
            { instruction: 'In the same pan, sauté onion until soft. Add garlic and rice, stir for 1 minute.', time: 5 },
            { instruction: 'Pour in wine and stir until absorbed.', time: 2 },
            { instruction: 'Add stock a ladleful at a time, stirring constantly and waiting until absorbed before adding more.', time: 18 },
            { instruction: 'Stir in mushrooms, remaining butter, and parmesan. Season and serve immediately.', time: null }
        ],
        tips: [
            'Keep stirring for creamy results',
            'Stock should be warm when adding',
            'Add a splash of truffle oil for luxury'
        ]
    },
    {
        id: 'fish-tacos',
        name: 'Crispy Fish Tacos',
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop',
        cookTime: 25,
        calories: 350,
        servings: 4,
        difficulty: 'Easy',
        tags: ['Fish', 'Mexican', 'Quick'],
        cuisine: 'fish',
        source: {
            name: 'Family Recipe',
            url: null
        },
        favourite: false,
        timesCooked: 2,
        lastCooked: '2024-09-15',
        dateAdded: '2024-03-10',
        personalNote: null,
        ingredients: {
            protein: [
                { name: 'White fish fillets', amount: 400, unit: 'g', scalable: true, prep: 'cod or haddock' }
            ],
            vegetables: [
                { name: 'Red cabbage', amount: 150, unit: 'g', scalable: true, prep: 'finely shredded' },
                { name: 'Lime', amount: 2, unit: '', scalable: false },
                { name: 'Fresh coriander', amount: 1, unit: 'bunch', scalable: false }
            ],
            carbs: [
                { name: 'Small flour tortillas', amount: 8, unit: '', scalable: true }
            ],
            sauce: [
                { name: 'Mayonnaise', amount: 100, unit: 'g', scalable: true },
                { name: 'Chipotle paste', amount: 1, unit: 'tbsp', scalable: 'partial' }
            ],
            pantry: [
                { name: 'Plain flour', amount: 50, unit: 'g', scalable: true },
                { name: 'Paprika', amount: 1, unit: 'tsp', scalable: false },
                { name: 'Vegetable oil', amount: 0, unit: 'for frying', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Mix flour with paprika and seasoning. Coat fish pieces in the mixture.', time: null },
            { instruction: 'Shallow fry fish until golden and cooked through. Drain on kitchen paper.', time: 8 },
            { instruction: 'Mix mayo with chipotle paste and lime juice to make the sauce.', time: null },
            { instruction: 'Warm tortillas in a dry pan.', time: 2 },
            { instruction: 'Assemble tacos with fish, cabbage slaw, chipotle mayo, and fresh coriander.', time: null }
        ],
        tips: [
            'Don\'t overcrowd the pan when frying',
            'Add pickled onions for extra zing',
            'Use corn tortillas for authentic style'
        ]
    },
    {
        id: 'veggie-stir-fry',
        name: 'Quick Veggie Stir-Fry',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
        cookTime: 15,
        calories: 280,
        servings: 2,
        difficulty: 'Easy',
        tags: ['Vegetarian', 'Asian', 'Quick', 'Healthy'],
        cuisine: 'vegetarian',
        source: {
            name: 'Personal Collection',
            url: null
        },
        favourite: false,
        timesCooked: 8,
        lastCooked: '2024-11-22',
        dateAdded: '2023-04-20',
        personalNote: 'Perfect for using up veg in the fridge',
        ingredients: {
            vegetables: [
                { name: 'Broccoli', amount: 150, unit: 'g', scalable: true, prep: 'cut into florets' },
                { name: 'Pak choi', amount: 2, unit: 'heads', scalable: true, prep: 'quartered' },
                { name: 'Red pepper', amount: 1, unit: '', scalable: true, prep: 'sliced' },
                { name: 'Carrot', amount: 1, unit: 'large', scalable: true, prep: 'julienned' },
                { name: 'Spring onions', amount: 4, unit: '', scalable: true, prep: 'sliced' }
            ],
            sauce: [
                { name: 'Soy sauce', amount: 2, unit: 'tbsp', scalable: 'partial' },
                { name: 'Sesame oil', amount: 1, unit: 'tsp', scalable: false },
                { name: 'Rice vinegar', amount: 1, unit: 'tbsp', scalable: false }
            ],
            pantry: [
                { name: 'Vegetable oil', amount: 1, unit: 'tbsp', scalable: false },
                { name: 'Garlic', amount: 2, unit: 'cloves', scalable: 'partial', prep: 'minced' },
                { name: 'Fresh ginger', amount: 1, unit: 'inch piece', scalable: false, prep: 'grated' }
            ]
        },
        steps: [
            { instruction: 'Mix soy sauce, sesame oil, and rice vinegar in a small bowl.', time: null },
            { instruction: 'Heat oil in a wok over high heat. Add garlic and ginger, stir for 30 seconds.', time: 1 },
            { instruction: 'Add broccoli and carrot first (they take longest). Stir-fry for 2-3 minutes.', time: 3 },
            { instruction: 'Add remaining vegetables. Continue stir-frying until just tender-crisp.', time: 3 },
            { instruction: 'Pour over sauce, toss well, and serve immediately with rice or noodles.', time: null }
        ],
        tips: [
            'Cut all veg before you start - stir-frying is fast!',
            'Add tofu or cashews for protein',
            'Keep vegetables moving in the wok'
        ]
    },
    {
        id: 'beef-teriyaki',
        name: 'Beef Teriyaki Bowl',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
        cookTime: 20,
        calories: 450,
        servings: 2,
        difficulty: 'Easy',
        tags: ['Asian', 'Quick', 'Beef'],
        cuisine: 'asian',
        source: {
            name: 'Family Recipe',
            url: null
        },
        favourite: true,
        timesCooked: 6,
        lastCooked: '2024-11-18',
        dateAdded: '2023-08-12',
        personalNote: 'Tom\'s favourite - always asks for extra sauce',
        ingredients: {
            protein: [
                { name: 'Sirloin steak', amount: 300, unit: 'g', scalable: true, prep: 'thinly sliced' }
            ],
            vegetables: [
                { name: 'Broccoli', amount: 150, unit: 'g', scalable: true, prep: 'florets' },
                { name: 'Edamame beans', amount: 100, unit: 'g', scalable: true },
                { name: 'Spring onions', amount: 3, unit: '', scalable: true, prep: 'sliced' }
            ],
            carbs: [
                { name: 'Sushi rice', amount: 200, unit: 'g', scalable: true }
            ],
            sauce: [
                { name: 'Soy sauce', amount: 3, unit: 'tbsp', scalable: true },
                { name: 'Mirin', amount: 2, unit: 'tbsp', scalable: true },
                { name: 'Brown sugar', amount: 1, unit: 'tbsp', scalable: true }
            ],
            pantry: [
                { name: 'Sesame seeds', amount: 1, unit: 'tbsp', scalable: false },
                { name: 'Vegetable oil', amount: 1, unit: 'tbsp', scalable: false }
            ]
        },
        steps: [
            { instruction: 'Cook rice according to packet instructions.', time: 12 },
            { instruction: 'Mix soy sauce, mirin, and sugar in a small bowl to make teriyaki sauce.', time: null },
            { instruction: 'Steam broccoli and edamame until just tender.', time: 5 },
            { instruction: 'Heat oil in a frying pan over high heat. Flash-fry beef slices for 1-2 minutes.', time: 2 },
            { instruction: 'Add teriyaki sauce to beef, let it bubble and coat the meat. Serve over rice with vegetables and spring onions.', time: 2 }
        ],
        tips: [
            'Slice beef against the grain for tenderness',
            'Don\'t overcook the beef - it should be pink inside',
            'Make extra sauce to drizzle over the bowl'
        ]
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { recipes };
}
