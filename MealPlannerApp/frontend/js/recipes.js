// Recipe instructions and details

const recipes = {
    1: {
        name: "Soy & Chilli Chicken Wings",
        servings: 4,
        prepTime: "10 mins",
        cookTime: "25 mins",
        source: "Inspired by BBC Good Food",
        sourceUrl: "https://www.bbc.co.uk/food/recipes/",
        steps: [
            { 
                step: "Preheat your oven to 200°C (180°C fan). Pat the chicken wings dry with kitchen paper - this helps them get crispy", 
                time: "2 mins" 
            },
            { 
                step: "In a large bowl, mix together the soy sauce, honey, sweet chilli sauce, sesame oil, and rice vinegar. Add the minced garlic and grated ginger", 
                time: "3 mins" 
            },
            { 
                step: "Add the chicken wings to the marinade and toss well to coat. Let them marinate for at least 10 minutes (or up to 2 hours in the fridge for more flavour)", 
                time: "10 mins" 
            },
            { 
                step: "Arrange the wings on a baking tray lined with parchment paper. Reserve the leftover marinade for basting", 
                time: "2 mins" 
            },
            { 
                step: "Bake for 20-25 minutes, turning halfway through and basting with the reserved marinade. The wings should be golden and sticky", 
                time: "25 mins" 
            },
            { 
                step: "While the wings cook, finely slice the spring onions and red chilli", 
                time: "2 mins" 
            },
            { 
                step: "Remove from oven when the wings are glossy and caramelised. Sprinkle with sesame seeds, spring onions, and chilli. Serve immediately", 
                time: "2 mins" 
            }
        ]
    },
    2: {
        name: "Five-Bean Chilli",
        servings: 6,
        prepTime: "15 mins",
        cookTime: "35 mins",
        source: "BBC Good Food",
        sourceUrl: "https://www.bbcgoodfood.com/recipes/five-bean-chilli",
        imageNote: "Image from BBC Good Food website",
        steps: [
            { 
                step: "Heat 1 tbsp olive oil in a large pan. Add the diced onion and cook for 5 minutes until softened", 
                time: "5 mins" 
            },
            { 
                step: "Add the garlic, red and yellow peppers, and celery. Cook for another 5 minutes, stirring regularly", 
                time: "5 mins" 
            },
            { 
                step: "Stir in the ground cumin, paprika, chilli powder and oregano. Cook for 1 minute until fragrant", 
                time: "1 min" 
            },
            { 
                step: "Pour in the chopped tomatoes and tomato purée. Crumble in the stock cube and add 200ml water", 
                time: "2 mins" 
            },
            { 
                step: "Drain and rinse all the beans. Add them to the pan and stir well", 
                time: "3 mins" 
            },
            { 
                step: "Bring to the boil, then reduce heat and simmer for 20 minutes, stirring occasionally", 
                time: "20 mins" 
            },
            { 
                step: "Season with salt and pepper to taste. The chilli should be thick and rich", 
                time: "2 mins" 
            },
            { 
                step: "Meanwhile, cook rice or prepare jacket potatoes according to package instructions", 
                time: "Concurrent" 
            },
            { 
                step: "Serve the chilli on rice or potatoes, topped with soured cream, fresh coriander and grated cheese", 
                time: "2 mins" 
            }
        ]
    },
    3: {
        name: "Thai Green Curry",
        servings: 4,
        prepTime: "10 mins",
        cookTime: "15 mins",
        steps: [
            { step: "Prepare rice according to package instructions", time: "15 mins" },
            { step: "Heat oil in wok, add curry paste and fry for 1 minute until fragrant", time: "1 min" },
            { step: "Add chicken strips and cook until golden on all sides", time: "5 mins" },
            { step: "Pour in coconut milk and bring to a gentle simmer", time: "3 mins" },
            { step: "Add vegetables and cook until tender but still crisp", time: "4 mins" },
            { step: "Season with fish sauce and lime juice", time: "1 min" },
            { step: "Finish with Thai basil leaves and serve over rice", time: "1 min" }
        ]
    },
    4: {
        name: "Spaghetti Carbonara",
        servings: 2,
        prepTime: "5 mins",
        cookTime: "15 mins",
        steps: [
            { step: "Bring a large pot of salted water to boil and cook spaghetti al dente", time: "10 mins" },
            { step: "Meanwhile, fry bacon pieces until crispy and golden", time: "5 mins" },
            { step: "Beat eggs with grated parmesan and lots of black pepper", time: "2 mins" },
            { step: "Drain pasta, reserving 1 cup of pasta water", time: "1 min" },
            { step: "Off the heat, quickly mix hot pasta with egg mixture, adding pasta water gradually", time: "2 mins" },
            { step: "Add crispy bacon and toss. Serve immediately with extra parmesan", time: "1 min" }
        ]
    }
};
