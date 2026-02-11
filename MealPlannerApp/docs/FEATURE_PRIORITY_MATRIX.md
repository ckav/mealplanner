# Feature Priority Matrix & Roadmap

> **Purpose**: Quick visual reference showing priority levels, spec completeness, and implementation timeline for all features  
> **Status**: Planning reference (updated from FEATURE_INVENTORY.md)  
> **Last Updated**: February 2026
**Prototype v3 status**: Core MVP UX is implemented in `MealPlannerApp/frontend/v3/` with drag & drop planner, quiet safety filters, pantry persistence, and manual add-recipe. See FEATURE_INVENTORY.md for completeness notes.

---

## 🎯 Priority Levels Explained

| Level | Focus | Timeline | When to Build | Risk Level |
|-------|-------|----------|---------------|-----------|
| **🔴 Phase 1: MVP (Core)** | Core functionality - app won't work without these | **Now (2-3 weeks)** | First sprint | Low - must have |
| **🟡 Phase 2: Essential** | Family/multi-user features, waste reduction | **After Phase 1 (1-2 weeks)** | Second sprint | Medium |
| **🟢 Phase 3: Advanced** | Optimization & smart features | **After Phase 2 (2-4 weeks)** | Third sprint | Medium |
| **⚪ Future/Parking Lot** | Nice-to-haves, research needed | **Post-launch** | Never (unless priorities change) | High - requires validation |

---

## 📊 Feature Matrix: Priority × Spec Completeness

### Legend
- ✅ **Fully Spec'd**: Complete requirements, clear implementation path
- ⚠️ **Partially Spec'd**: Core idea clear, some details need fleshing out
- ❓ **Needs More Thinking**: Concept defined, but significant unknowns remain
- 🚫 **Not Yet Scoped**: Mentioned in parking lot, needs research

---

## 🔴 PHASE 1: CORE MVP (Priority 1)

**Goal**: Build minimum viable product that replaces HelloFresh + adds allergy safety  
**Timeline**: 2-3 weeks  
**Success Metric**: One person can plan 7 dinners, get shopping list, scale portions  

| # | Feature | Spec Status | Dependencies | Notes |
|---|---------|-------------|--------------|-------|
| 2 | **Recipe Cards** | ✅ Fully Spec'd | Recipe data | Dopamine-friendly UI - essential for user engagement |
| 3 | **Filtering/Sorting** | ✅ Fully Spec'd | Recipe data | Time, complexity, dietary pills - core discovery |
| 6 | **Portion Scaling** | ✅ Fully Spec'd | Recipe data | 1-6+ servings, auto-calculation required |
| 7 | **Shopping List** | ✅ Fully Spec'd | Meal plan + recipes | Ingredient aggregation, deduplication, grouping |
| 8 | **Cooking Instructions** | ✅ Fully Spec'd | Recipes | Step-by-step, ingredient panel, timer integration |
| 9 | **Meal Planning (Weekly)** | ✅ Fully Spec'd | All above | 7-day grid, progress counter, slot picker modal |
| 13 | **Firebase + Auth** | ✅ Fully Spec'd | None (foundational) | Email, Google, Apple Sign-In, Firestore sync |
| 4 | **Basic Allergies** | ⚠️ Partially Spec'd | Profiles (Phase 2) | MVP version: just per-recipe safe/unsafe flags. Full version (Phase 2) needs more complexity |
| 5 | **User Profiles** | ⚠️ Partially Spec'd | Firebase | MVP: single profile only. Multi-profile (Phase 2). "Cooking for who" (Phase 2) |
| 1 | **Recipe Management** | ⚠️ Partially Spec'd | Database | Manual entry fully spec'd. Import from URL & quick add need more detail |

---

## 🟡 PHASE 2: ESSENTIAL (Priority 2)

**Goal**: Enable multi-person households, reduce food waste  
**Timeline**: 1-2 weeks after Phase 1  
**Success Metric**: Family with allergies can plan meals, see which recipes are safe for whom  

| # | Feature | Spec Status | Dependencies | Notes |
|---|---------|-------------|--------------|-------|
| 1 | **Recipe Import** | ⚠️ Partially Spec'd | Phase 1 + APIs | URL parsing, BBC Good Food integration, needs API selection |
| 4 | **Full Allergy Config** | ⚠️ Partially Spec'd | Profiles | "May contain" tolerance, baked-form exceptions, per-allergen settings |
| 5 | **Family Profiles** | ⚠️ Partially Spec'd | Auth + Profiles | Multiple profiles, roles (Owner/Member/Guest), combined restrictions |
| 5 | **"Cooking For Who"** | ⚠️ Partially Spec'd | Profiles | Group selection (Everyone/Adults/Kids/Solo), portion calc, restriction merging |
| 6 | **Leftover Awareness** | ⚠️ Partially Spec'd | Meal plan + Shopping | Suggest using leftovers, flag repetition, make 2 serve strategy |
| 7 | **Pantry Management** | ⚠️ Partially Spec'd | Database | Expiry tracking, "Verify First" section, opened-date tracking, "Always Have" items |
| 7 | **Fridge Inventory** | ❓ Needs More Thinking | Meal plan | Manual entry spec'd. Photo upload vision - needs tech research |
| 10 | **Inspiration & Discovery** | ⚠️ Partially Spec'd | Recipes | Seasonal, favourites, use-up suggestions, try-something-new |
| 14 | **Sharing & Privacy** | ✅ Fully Spec'd | Database | Public/private recipes, personal notes, no public comments |
| 15 | **Household Sharing** | ⚠️ Partially Spec'd | Auth + Database | Invite flow, access levels, shared resources vs personal |

---

## 🟢 PHASE 3: ADVANCED (Priority 3)

**Goal**: Smart optimization, reduce mental load further  
**Timeline**: 2-4 weeks after Phase 2  
**Success Metric**: Meal planning becomes effortless with intelligent suggestions  

| # | Feature | Spec Status | Dependencies | Notes |
|---|---------|-------------|--------------|-------|
| 7 | **Supermarket Cost Comparison** | ⚠️ Partially Spec'd | Shopping list | Price APIs or web scraping. Tesco, Sainsbury's, ASDA, Waitrose, Ocado, Lidl, Aldi |
| 7 | **Weekly Specials** | ⚠️ Partially Spec'd | Cost comparison + recipes | Fetch weekly promotions, smart recipe suggestions, cost optimization |
| 7 | **Seasonal Awareness** | ⚠️ Partially Spec'd | Recipes + Locations | Track seasonality by month/region, filter "In Season", suggest seasonal recipes |
| 8 | **Multi-Step Timers** | ⚠️ Partially Spec'd | Timer | Concurrent timers, presets, audio alerts, voice control |
| 11 | **Nutritional Dashboard** | ⚠️ Partially Spec'd | Recipes + Meal plan | Calorie/macro summaries, gentle suggestions, but "not a diet app" |
| 12 | **Supermarket Export** | ✅ Fully Spec'd | Shopping list | Generate compatible lists, one-tap open for Tesco/Sainsbury's/ASDA/Waitrose/Ocado |
| 7 | **Ingredient Overlap** | ❓ Needs More Thinking | Shopping list | Detect when 3+ recipes use same item, suggest bulk buying |
| 7 | **Pack Size Optimization** | ❓ Needs More Thinking | Pantry + Recipes | Track pack sizes, show leftovers, nudge to use remaining quantities |

---

## ⚪ PARKING LOT: FUTURE / RESEARCH PHASE (Priority 4)

**Goal**: TBD - research these after MVP is live  
**Timeline**: Post-launch (3+ months)  
**Success Metric**: Validation that these solve real problems & are worth the investment  

| # | Feature | Spec Status | Why It's Parked | Research Needed |
|---|---------|-------------|-----------------|-----------------|
| 7 | **Farmer's Market Integration** | ❓ Needs More Thinking | Out of scope for initial UK rollout | Local producer networks, data sources, regional variation |
| 7 | **Carbon Footprint Estimates** | ❓ Needs More Thinking | Requires recipe data standardization | Algorithm, data accuracy, user interest validation |
| 1 | **Recipe Version History** | ❓ Needs More Thinking | Edge case feature | How to handle conflicts, storage implications |
| 1 | **Recipe Forking** | ❓ Needs More Thinking | Advanced UX, could confuse users | Mental model clarity, storage, attribution |
| 8 | **Voice Control** | ❓ Needs More Thinking | Accessibility feature, post-MVP | Which voice assistant, testing, edge cases |
| 8 | **Step Photos** | ❓ Needs More Thinking | Nice-to-have, storage overhead | Storage costs, user adoption, value prop |
| 7 | **Photo-Upload Fridge** | ❓ Needs More Thinking | Cool idea, very uncertain | Computer vision libraries, accuracy, privacy concerns |
| 7 | **Barcode Scanning** | ❓ Needs More Thinking | Pantry automation | Barcode DB reliability, implementation complexity |
| 7 | **Multi-shop Optimization** | ❓ Needs More Thinking | Complex algorithm | Cost/benefit ratio, user willingness to split shops |
| 12 | **Price API Integration** | ❓ Needs More Thinking | Phase 3 feature needs research | Which APIs exist, cost, accuracy, terms |
| 10 | **AI Recipe Generation** | ❓ Needs More Thinking | Fundamental misalignment with app philosophy | "Curate, don't generate" principle |
| 14 | **Community Features** | ❓ Needs More Thinking | Moderation burden | Not part of core value prop; skip social complexity |
| 10 | **Collections** | ❓ Needs More Thinking | Nice-to-have discovery | User value unclear, low priority |
| — | **Monetisation** | 🚫 Not Yet Scoped | Business decision pending | Affiliate, ads, premium features, free-to-use? |

---

## 📈 Implementation Timeline

```
Week 1-2: Phase 1 Essentials
├── Firebase setup + Auth
├── Recipe cards + basic filtering
├── Meal planning grid
└── Shopping list generation

Week 2-3: Phase 1 Polish
├── Portion scaling with calculations
├── Cook mode + instructions
├── Persistence + data validation
└── Testing + bug fixes

Week 4-5: Phase 2 Multi-User
├── User profiles
├── Full allergy management
├── Household sharing (invite/roles)
└── Pantry + leftover awareness

Week 5-6: Phase 2 Polish
├── Recipe import from URL
├── Discovery/inspiration
├── Edge case handling
└── Testing + bug fixes

Week 7-9: Phase 3 Smart Features
├── Supermarket price integration
├── Weekly specials + suggestions
├── Nutritional dashboard
├── Advanced timers
└── Performance optimization
```

---

## 🔍 Spec Completeness: What Needs More Thinking?

### High-Spec features (ready to build immediately)
- ✅ Recipe Cards
- ✅ Filtering/Sorting
- ✅ Portion Scaling
- ✅ Shopping List
- ✅ Cooking Instructions
- ✅ Weekly Meal Planning
- ✅ Firebase + Auth
- ✅ Supermarket Export
- ✅ Sharing & Privacy

### Medium-Spec features (build in Phase 2-3 with minor clarification)
- ⚠️ Recipe Management (manual entry done; import + quick add need details)
- ⚠️ Basic Allergies (MVP version simple; Phase 2 adds complexity)
- ⚠️ User Profiles (single user MVP; Phase 2 adds multi-user)
- ⚠️ Allergy Config (core idea clear; tolerance levels need clarification)
- ⚠️ Family Profiles & "Cooking For Who"
- ⚠️ Leftover Awareness
- ⚠️ Pantry Management
- ⚠️ Inspiration & Discovery
- ⚠️ Household Sharing
- ⚠️ Cost Comparison
- ⚠️ Weekly Specials
- ⚠️ Seasonal Awareness
- ⚠️ Multi-Step Timers
- ⚠️ Nutritional Dashboard

### Low-Spec features (need more research before building)
- ❓ Fridge Inventory (photo upload especially)
- ❓ Ingredient Overlap Detection
- ❓ Pack Size Optimization
- ❓ Multi-shop Optimization (complex algorithm)
- ❓ Price API Integration (needs research on available APIs)

### Parking Lot (not ready to commit to)
- 🚫 Farmer's Market Integration
- 🚫 Carbon Footprint
- 🚫 Recipe Version History
- 🚫 Recipe Forking
- 🚫 Voice Control
- 🚫 Step Photos
- 🚫 Photo-Upload Fridge
- 🚫 Barcode Scanning
- 🚫 Community Features
- 🚫 AI Recipe Generation
- 🚫 Monetisation Strategy

---

## 📝 Features to Improve Later (UX backlog)

- Booking-style filters UX refinement (multi-select chips behavior + visual hierarchy)
- Long-press “Add to Plan” day/slot selector polish (faster selection, clearer affordance)
- Per-day “Cooking for” selector on planner slots (override default)
- Per-day portion override UI (show/adjust portions on filled slots)
- Add-to-plan flow: quick-add menu from recipe card (day/slot + portions in one panel)

---

## 🚦 Priority Decision Tree

**Use this to decide where a new feature should go:**

```
Is it blocking MVP launch?
├─ YES → Phase 1 (do immediately)
└─ NO → Does it solve core problem (HelloFresh replacement or allergy safety)?
    ├─ YES → Phase 2-3 (do soon)
    └─ NO → Is it a known pain point from user research?
        ├─ YES → Phase 3 (optimize experience)
        └─ NO → Parking Lot (research + validate first)
```

---

## 📋 Quick Status Reference

| Status | Meaning | Example |
|--------|---------|---------|
| ✅ Fully Spec'd | Requirements are complete, clear implementation path exists | "Shopping list aggregates ingredients, deduplicates, groups by aisle" |
| ⚠️ Partially Spec'd | Core idea is clear, some details need fleshing out | "Pantry has expiry dates, but unclear if soft/hard reminders" |
| ❓ Needs More Thinking | Concept exists but significant unknowns remain | "Fridge photo upload - unclear if computer vision is reliable enough" |
| 🚫 Not Yet Scoped | Parking lot item, not ready for commitment | "Monetisation strategy - business decision pending" |

---

## 🎯 What to Focus On Right Now

### If launching in 2 weeks: Phase 1 only
- Recipe Cards
- Filtering
- Meal Planning
- Shopping List
- Cooking Instructions
- Portion Scaling
- Firebase setup

### If you have 4-6 weeks: Phase 1 + Phase 2
- Add: Full allergy management
- Add: Family profiles
- Add: Pantry management
- Add: Household sharing

### If you have 8+ weeks: Phase 1 + Phase 2 + Phase 3
- Add: Smart features
- Add: Supermarket integration
- Add: Advanced timers
- Add: Nutritional insights

---

## 🔗 Cross-Reference

- **For detailed specs**: See `FEATURE_INVENTORY.md`
- **For implementation details**: See `features-from-old-version/README.md`
- **For code examples**: See `features-from-old-version/01-10-*.md` (specific feature files)
- **For weekly planner spec**: See `MEAL_PLANNER_WEEKLY_VIEW_SPEC.md`

---

*Guide created: February 2026*  
*Source: FEATURE_INVENTORY.md analysis*  
*Purpose: Help prioritize development sprints and understand spec completeness*
