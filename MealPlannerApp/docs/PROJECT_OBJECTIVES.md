# Meal Planner - Project Objectives & Vision

> **Purpose**: Define who this app is for, what problems it solves, and how features align to user needs  
> **Last Updated**: January 2026

---

## Origin Story

This app was born from two experiences:

### The HelloFresh Problem (Claire - Solo Cook)

I'm a single woman who enjoys cooking, but solo cooking is depressing. HelloFresh seemed like a solution - convenient, inspiring, takes the thinking out of "what's for dinner?"

**What I liked:**
- The dopamine hit of picking meals each week
- Having a plan meant I wasn't wandering the supermarket hungry making bad choices
- Recipe variety and inspiration

**What didn't work:**

| Problem | Impact |
|---------|--------|
| **2-person portions** | Eating the same meal 3× in a row is repetitive and demotivating |
| **Excessive packaging** | So much plastic - bags within bags, ice packs, cardboard |
| **Inconsistent quality** | Limp spring onions, sad vegetables |
| **Missing items** | A 50p refund for missing kecap manis doesn't help when you're left with plain chicken and rice instead of a proper meal |
| **Short shelf life** | Meat best-before doesn't last the week, forcing you to eat meals in their order, not yours |
| **Cost** | For a single person, you need 3-4 meals (feeding 2) to make the maths work - that's 10+ days of food |

**Without a meal plan, I:**
- Go to the small supermarket hungry and unprepared
- Make poor dinner choices (ready meals, takeaway)
- Buy things I already have in the fridge
- Buy portions meant for 4 people
- Waste food

### The Family Chaos Problem (Sister-in-Law - Family of 4+)

Watching my sister-in-law plan meals for her family was an eye-opener. She doesn't enjoy cooking, yet every week she has to solve a complex puzzle:

**The constraints she's juggling:**
- One child has **severe allergies** (constant vigilance required)
- Kids have different **preferences** ("nephew doesn't like rice")
- **Schedule complexity** ("Monday nephew has sport, needs early meal, so that's when niece can have paella")
- Separate planning for **parents vs kids** sometimes
- Managing a **Tesco weekly delivery**
- A **stack of printed recipes** she knows work - no searchable system

**The result:** The whole process looked stressful and exhausting.

---

## Target Users (Personas)

### Persona 1: Solo Cook (Claire)

> *"I want the inspiration and structure of HelloFresh without the waste, cost, and repetition."*

| Attribute | Detail |
|-----------|--------|
| Household | Single person |
| Cooking skill | Enjoys cooking, competent |
| Pain point | Meal planning motivation, portion sizes, food waste |
| Goal | Stop wandering supermarket hungry; eat varied, interesting meals |
| Key features needed | Flexible portions, meal inspiration, shopping list, leftover management |

**Success looks like:** 
- Picking meals feels fun (dopamine!)
- Portions scale to 1-2 servings without waste
- Clear shopping list prevents duplicate purchases
- Variety in the week - not eating the same thing 3× in a row

### Persona 2: Busy Parent with Allergies (Sister-in-Law)

> *"I need to feed my family safely without meal planning taking over my life."*

| Attribute | Detail |
|-----------|--------|
| Household | Family of 4+ (2 adults, 2+ children) |
| Cooking skill | Functional, doesn't enjoy it |
| Pain point | Allergies, fussy eaters, schedule complexity, mental load |
| Goal | Safe meals, happy kids, less stress, Tesco delivery integration |
| Key features needed | Allergy filtering, kid-friendly tags, schedule awareness, family profiles |

**Success looks like:**
- Allergies handled invisibly - safe recipes just appear
- Kids' preferences remembered ("Tommy doesn't like rice")
- Weekly plan accounts for activities (sport days = quick meals)
- One-tap export to Tesco basket
- No more stack of printed recipes - everything searchable

### Persona 3: Couple / Small Household

> *"We want HelloFresh convenience without the subscription and packaging."*

| Attribute | Detail |
|-----------|--------|
| Household | 2 people |
| Cooking skill | Mixed |
| Pain point | Cost of meal kits, packaging waste, inflexibility |
| Goal | Plan varied meals, shop efficiently, reduce waste |
| Key features needed | 2-person portions, seasonal produce, price awareness |

---

## Core Problems We're Solving

### 1. The Meal Kit Trap
**Problem:** Meal kits like HelloFresh are convenient but expensive, wasteful, inflexible, and designed for couples not singles.

**Solution:** Provide the *good parts* of meal kits (inspiration, structure, curated recipes, dopamine of choosing) without the bad (cost, waste, inflexibility, fixed portions).

### 2. The "What's for Dinner?" Paralysis
**Problem:** Without a plan, people default to poor choices - takeaway, ready meals, repetitive staples, or hungry supermarket trips.

**Solution:** Make meal planning enjoyable, not a chore. The picking should feel rewarding. The result is a clear plan that prevents decision fatigue.

### 3. Food Waste from Poor Planning
**Problem:** Buying wrong quantities, forgetting what's in the fridge, letting ingredients expire, cooking portions meant for 4 when you're 1.

**Solution:** Smart portion scaling, pantry awareness, ingredient overlap detection, expiry tracking, shopping lists that account for what you have.

### 4. The Allergy Mental Load
**Problem:** Families with allergies spend enormous mental energy checking every recipe, every ingredient, every label. It's exhausting and stressful.

**Solution:** Make allergies invisible. Configure once, then the app only shows safe recipes. Handle nuance like "may contain" tolerance and baked-form exceptions.

### 5. The Family Puzzle
**Problem:** Different family members have different needs (allergies, preferences, schedules). Planning around all constraints simultaneously is hard.

**Solution:** Family profiles with individual settings. "Cooking for who" selector that applies the right constraints. Schedule-aware suggestions (sport day = quick meal).

### 6. The Stack of Printed Recipes
**Problem:** Families accumulate paper recipes they know work, but they're not searchable, shareable, or integrated with planning.

**Solution:** Digital recipe library that's searchable, filterable, and integrated with the meal planner. Import existing favourites easily.

---

## Feature → Problem Mapping

| Feature | Solves Problem | For Persona |
|---------|---------------|-------------|
| Flexible portion scaling (1-6+) | Meal kit trap, food waste | Solo, Couple, Family |
| Recipe inspiration/browsing | "What's for dinner?" paralysis | All |
| Weekly meal picker with progress | Dopamine of choosing, structure | All |
| Shopping list generation | Poor planning, duplicate purchases | All |
| "Always have" / pantry tracking | Food waste, duplicate purchases | All |
| Allergy configuration with nuance | Allergy mental load | Family |
| Family profiles | Family puzzle | Family |
| "Cooking for who" selector | Family puzzle | Family |
| Kid-friendly / preference tags | Family puzzle, fussy eaters | Family |
| Tesco/supermarket export | Convenience, integration | Family |
| Seasonal produce suggestions | Cost, freshness, sustainability | All |
| Leftover management (post-MVP) | Food waste | Solo, Couple |
| Schedule-aware planning (post-MVP) | Family puzzle | Family |

---

## Design Principles (Derived from Problems)

### 1. Solo-first, Family-ready
Design for Claire (single, enjoys cooking) first - she's the builder and primary user. But architecture should support families from day one.

### 2. The Dopamine of Choosing
The meal selection experience should feel rewarding, not like homework. Beautiful recipe cards, satisfying interactions, visible progress ("6 of 7 meals planned!").

### 3. Invisible Allergies
Once configured, allergies shouldn't feel like a barrier. Don't show "you can't eat this" - just show what you *can* eat. Make safe recipes the default view.

### 4. Fresh Over Processed
Encourage cooking from scratch with fresh ingredients. Differentiate from meal kits that rely on processed components (sauces in packets, pre-made pastes).

### 5. Flexible, Not Prescriptive
Don't force a rigid structure. Support someone planning 3 dinners as easily as someone planning 14 meals. Allow skipping, changing, and adapting.

### 6. Reduce Mental Load
The app should make decisions easier, not add complexity. Smart defaults, sensible suggestions, minimal required configuration.

---

## Success Metrics (How We'll Know It's Working)

### For Solo Cook (Claire)
- [ ] Meals planned for the week in under 10 minutes
- [ ] No more "wandering supermarket hungry" moments
- [ ] Eating varied meals (not same thing 3× in a row)
- [ ] Food waste reduced (qualitative)
- [ ] Enjoys the planning process (dopamine achieved)

### For Family (Sister-in-Law)
- [ ] Safe recipes surface without manual checking
- [ ] Weekly plan accounts for family preferences
- [ ] Tesco order generated from app
- [ ] Printed recipe stack retired
- [ ] Planning feels less stressful

### For the App
- [ ] Replaces HelloFresh subscription entirely
- [ ] Used weekly (not abandoned after initial setup)
- [ ] Recipe library grows over time
- [ ] Family members can collaborate on planning

---

## What This App is NOT

- ❌ **Not a diet/nutrition app** - We may show nutritional info, but we don't prescribe diets
- ❌ **Not a social network** - No public comments, ratings, or community moderation burden
- ❌ **Not a meal kit delivery service** - We help you shop and cook yourself
- ❌ **Not a restaurant/takeaway app** - Focus is home cooking
- ❌ **Not an AI chef** - We curate and organise, not generate recipes from nothing

---

## MVP Scope (Informed by Objectives)

Based on the problems above, MVP must include:

| Feature | Why It's MVP |
|---------|--------------|
| Recipe browsing with cards | The dopamine of choosing |
| Weekly meal planner grid | Structure prevents paralysis |
| Flexible portion scaling | Solo cook needs 1-2 servings |
| Shopping list generation | Prevents hungry supermarket trips |
| Basic filtering (time, dietary) | Quick meals for busy days |
| Basic allergy flags | Safety for families |

**MVP can defer:**
- Full pantry management (nice to have)
- Supermarket price integration (complex)
- Schedule-aware planning (complex)
- Nutritional dashboard (not core problem)

---

*Document created: January 2026*  
*"I want the good parts of HelloFresh without the bad parts."*
