// Meal data for the application

const meals = [
    { 
        id: 1, 
        name: "Soy & Chilli Chicken Wings", 
        time: 25, 
        type: ["asian", "quick"], 
        calories: 420,
        icon: "🍗",
        description: "Sticky, sweet and spicy chicken wings with a gorgeous glaze"
    },
    { 
        id: 2, 
        name: "Five-Bean Chilli", 
        time: 35, 
        type: ["vegetarian", "healthy"], 
        calories: 310,
        icon: "🌶️",
        description: "Hearty vegetarian chilli packed with protein and flavor",
        imageUrl: "https://www.bbcgoodfood.com/recipes/five-bean-chilli"
    },
    { 
        id: 3, 
        name: "Thai Green Curry", 
        time: 25, 
        type: ["asian", "healthy"], 
        calories: 380, 
        icon: "🥥",
        description: "Fragrant and creamy curry with fresh vegetables"
    },
    { 
        id: 4, 
        name: "Spaghetti Carbonara", 
        time: 15, 
        type: ["italian", "quick"], 
        calories: 520, 
        icon: "🍝",
        description: "Classic Italian pasta with bacon and creamy egg sauce"
    },
    { 
        id: 5, 
        name: "Grilled Salmon & Veg", 
        time: 18, 
        type: ["fish", "healthy", "quick"], 
        calories: 320, 
        icon: "🐟",
        description: "Omega-rich salmon with seasonal vegetables"
    },
    { 
        id: 6, 
        name: "Veggie Stir-Fry", 
        time: 12, 
        type: ["vegetarian", "quick", "asian", "healthy"], 
        calories: 280, 
        icon: "🥦",
        description: "Quick and colorful vegetable stir-fry"
    },
    { 
        id: 7, 
        name: "Beef Teriyaki Bowl", 
        time: 20, 
        type: ["asian", "quick"], 
        calories: 450, 
        icon: "🥩",
        description: "Sweet and savory beef with rice"
    },
    { 
        id: 8, 
        name: "Margherita Pizza", 
        time: 25, 
        type: ["italian", "vegetarian"], 
        calories: 480, 
        icon: "🍕",
        description: "Classic pizza with tomato, mozzarella and basil"
    },
    { 
        id: 9, 
        name: "Fish Tacos", 
        time: 15, 
        type: ["fish", "quick"], 
        calories: 350, 
        icon: "🌮",
        description: "Fresh fish tacos with lime and cilantro"
    },
    { 
        id: 10, 
        name: "Mushroom Risotto", 
        time: 30, 
        type: ["italian", "vegetarian"], 
        calories: 420, 
        icon: "🍄",
        description: "Creamy Italian rice with mixed mushrooms"
    },
    { 
        id: 11, 
        name: "Greek Salad Bowl", 
        time: 10, 
        type: ["vegetarian", "healthy", "quick"], 
        calories: 250, 
        icon: "🥗",
        description: "Fresh Mediterranean salad with feta"
    }
];

// Ingredients data organized by meal ID
const ingredients = {
    1: { 
        // Soy & Chilli Chicken Wings
        proteins: ["1kg chicken wings"],
        marinadeAndSauce: [
            "3 tbsp dark soy sauce",
            "2 tbsp honey",
            "1 tbsp sweet chilli sauce",
            "1 tsp sesame oil",
            "2 tbsp rice vinegar"
        ],
        produce: [
            "3 cloves garlic (minced)",
            "1 inch fresh ginger (grated)",
            "2 spring onions",
            "1 red chilli"
        ],
        garnish: ["1 tbsp sesame seeds", "Fresh coriander"],
        staples: ["Salt", "Black pepper"]
    },
    2: { 
        // Five-Bean Chilli
        produce: [
            "1 large onion (diced)",
            "2 cloves garlic (minced)", 
            "1 red pepper (chopped)",
            "1 yellow pepper (chopped)",
            "1 celery stick (diced)"
        ],
        beans: [
            "400g can kidney beans",
            "400g can black beans",
            "400g can pinto beans",
            "400g can cannellini beans",
            "400g can butter beans"
        ],
        pantry: [
            "2 x 400g cans chopped tomatoes",
            "2 tbsp tomato purée",
            "1 tbsp olive oil"
        ],
        spices: [
            "2 tsp ground cumin",
            "2 tsp paprika",
            "1 tsp chilli powder",
            "1 tsp dried oregano",
            "1 vegetable stock cube"
        ],
        toppings: ["Soured cream", "Fresh coriander", "Grated cheese"],
        staples: ["Brown rice or jacket potatoes"]
    },
    3: { 
        // Thai Green Curry
        produce: ["Lemongrass", "Lime", "Thai basil", "Green beans"],
        proteins: ["400g chicken breast"],
        pantry: ["400ml coconut milk", "2 tbsp green curry paste", "Fish sauce"],
        staples: ["Jasmine rice"]
    },
    4: {
        // Spaghetti Carbonara
        produce: ["3 cloves garlic", "Fresh parsley"],
        proteins: ["150g bacon", "2 eggs", "100g parmesan"],
        pantry: ["200g spaghetti", "Black pepper"],
        staples: []
    },
    5: {
        // Grilled Salmon & Veg
        produce: ["200g broccoli", "150g asparagus", "1 lemon"],
        proteins: ["2 salmon fillets"],
        pantry: ["Olive oil"],
        staples: ["300g new potatoes"]
    },
    6: {
        // Veggie Stir-Fry
        produce: ["Mixed vegetables", "Garlic", "Ginger"],
        proteins: ["Tofu (optional)"],
        pantry: ["Soy sauce", "Sesame oil"],
        staples: ["Rice or noodles"]
    }
};
