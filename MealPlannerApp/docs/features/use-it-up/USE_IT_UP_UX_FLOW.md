# "Use It Up" — Fridge & Waste Reduction UX Flow

> **Purpose**: Step-by-step screen flow for the "Use It Up" feature — helping users reduce food waste and save money by incorporating ingredients they already have into their weekly meal plan.
> **Companion to**: `MEAL_PLANNER_WEEKLY_VIEW_SPEC.md`, `FEATURE_INVENTORY.md`
> **Design philosophy**: Optional, frictionless, and genuinely helpful. Never mandatory. The app should feel like a friend saying "oh, you've got chicken? Let me find something good for that."

---

## 🎯 Feature Goals

1. **Reduce food waste** — use perishables before they go off
2. **Save money** — prioritise recipes using what you already have
3. **Reduce packaging waste** — use up whole packs/jars across the week
4. **Seasonal awareness** — gently nudge toward in-season fresh produce
5. **Feel effortless** — not like inventorying a warehouse

---

## 📍 Entry Points

The "Use It Up" feature can be triggered from three places:

### Entry Point A: Weekly Planner (Primary)
- Prompt appears at the top of the Weekly Plan view when starting a new week
- "Before you plan — anything to use up?" (dismissible)

### Entry Point B: Home Screen Widget
- Persistent card showing current "Use Up" items with countdown
- "🥑 Avocado — use by tomorrow"

### Entry Point C: Recipe Picker Modal
- When picking a recipe for a slot, a toggle/tab shows "Uses your ingredients"
- Filters recipe list to prioritise matches

---

## 🔄 Core Flow: Adding "Use Up" Items

### Overview
```
Entry Point → Input Method Selection → Add Items → Confirm & Prioritise → Influence Meal Plan
```

---

## Screen 1: "Use It Up" Prompt

**When**: User opens Weekly Plan tab for a new/empty week
**Where**: Banner at top of planner grid, above the day rows

```
┌──────────────────────────────────────────────────────────────────┐
│  🧊 Got anything to use up this week?                            │
│                                                                  │
│  Tell us what's in your fridge and we'll suggest recipes          │
│  that help you waste less.                                       │
│                                                                  │
│  [ 📸 Snap my fridge ]  [ 🎤 Tell me ]  [ ✏️ Add manually ]     │
│                                                                  │
│                                          [Skip for now →]        │
└──────────────────────────────────────────────────────────────────┘
```

**Elements:**
- Friendly, low-pressure copy — not "you must inventory your fridge"
- Three input method buttons (see Screens 2a, 2b, 2c)
- "Skip for now" link — always available, never guilt-tripping
- Remembers if user dismisses — doesn't nag every week
  - Setting: "Ask me about fridge items" on/off (default: on)
  - After 3 consecutive skips: reduces to a small icon rather than full banner

**Behaviour:**
- First time: Full banner with explanation
- Returning user: Compact version — "🧊 Anything to use up? [Add items] [Skip]"
- If user already has items from last week still marked: "You still have 🥦 broccoli and 🧀 cheddar — still need to use these?"

---

## Screen 2a: Photo Capture (📸 Snap My Fridge)

**Step 1: Camera View**

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back                    Snap your fridge                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │                                                          │    │
│  │                    [ Camera viewfinder ]                  │    │
│  │                                                          │    │
│  │                                                          │    │
│  │                                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  📷 Snap a shelf, veg drawer, or countertop                      │
│  Don't worry about getting everything — you can add more later   │
│                                                                  │
│                        [ 📸 Take Photo ]                         │
│                                                                  │
│  Or: [ Choose from gallery ]                                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**UX Notes:**
- Camera opens directly — no separate permissions screen (uses standard OS permission prompt)
- Tip text reassures: imperfect photos are fine
- Can take multiple photos (fridge shelf + veg drawer + freezer)
- "Choose from gallery" for photos already taken

**Step 2: Processing**

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │              [ Photo with scanning overlay ]              │    │
│  │              [ Items being highlighted as               │    │
│  │                they're identified ]                      │    │
│  │                                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  🔍 Identifying ingredients...                                   │
│  ████████████░░░░░░░░ 60%                                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Behaviour:**
- Brief processing animation (1-3 seconds)
- Visual overlay shows items being "found" — feels smart but doesn't need to be pixel-perfect
- Transitions to confirmation screen (Screen 3)

---

## Screen 2b: Voice / Chat Input (🎤 Tell Me)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back                    What's in your fridge?                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Just tell me what you've got — I'll pull out the ingredients    │
│                                                                  │
│  Examples:                                                       │
│  "I've got some chicken thighs, half a pepper, and mushrooms"   │
│  "There's mince in the freezer and some sad-looking courgettes" │
│  "Leftover rice from yesterday and a tin of coconut milk"        │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                                                          │    │
│  │  Type or tap the mic to talk...                    🎤    │    │
│  │                                                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│                                                                  │
│                                        [ Find ingredients → ]    │
└──────────────────────────────────────────────────────────────────┘
```

**Behaviour:**
- Text input field with microphone button for voice-to-text
- Natural language — doesn't need structured input
- "Find ingredients" parses the text and extracts ingredient names
- Handles informal language: "sad-looking courgettes" → courgette, "mince" → beef mince
- Transitions to confirmation screen (Screen 3) with extracted items

**Voice Flow:**
1. User taps 🎤
2. "Listening..." indicator appears
3. Speech-to-text converts in real time (shows text appearing)
4. User taps "Done" or pauses for 3 seconds
5. Same parsing as typed input → Screen 3

---

## Screen 2c: Manual Add (✏️ Add Manually)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back                    Add ingredients                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🔍 Search ingredients...                                        │
│                                                                  │
│  ── From your recent shops ──────────────────────────────────    │
│                                                                  │
│  [ 🥩 Chicken breast ]  [ 🥦 Broccoli ]  [ 🧅 Onions ]         │
│  [ 🥕 Carrots ]  [ 🍅 Tomatoes ]  [ 🧀 Cheddar ]               │
│  [ 🌶️ Red pepper ]  [ 🍚 Rice ]  [ 🥚 Eggs ]                   │
│                                                                  │
│  ── Common perishables ──────────────────────────────────────    │
│                                                                  │
│  [ 🥬 Lettuce ]  [ 🥑 Avocado ]  [ 🍋 Lemon ]                  │
│  [ 🫑 Herbs (fresh) ]  [ 🥛 Milk ]  [ 🍞 Bread ]               │
│  [ 🐟 Fish fillets ]  [ 🥓 Bacon ]  [ 🍄 Mushrooms ]           │
│                                                                  │
│  ── Added ───────────────────────────────────────────────────    │
│                                                                  │
│  🥩 Chicken breast  ✕     🍄 Mushrooms  ✕                       │
│                                                                  │
│                                        [ Continue → ]            │
└──────────────────────────────────────────────────────────────────┘
```

**Elements:**
- Search bar at top for finding specific items
- **"From your recent shops"** — pre-populated from last week's shopping list (smart shortcut!)
- **"Common perishables"** — the items most likely to go off and need using
- Tappable chips (Unimeal-style, chunky, easy targets)
- "Added" section shows selected items with ✕ to remove
- Alphabetical browse available via search (like the HelloFresh ingredient filter you screenshotted)

**Smart behaviour:**
- Items from last week's shopping list appear first (highest probability of being in the fridge)
- Items the user frequently adds to "Use Up" list bubble up over time
- Seasonal items highlighted subtly (🌿 "In season now")

---

## Screen 3: Confirm & Prioritise

**Reached from**: All three input methods (2a, 2b, 2c)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back                    Your Use-Up List                      │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  We'll prioritise recipes using these ingredients                │
│                                                                  │
│  ── Use Soon 🔴 ─────────────────────────────────────────────    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🥩 Chicken thighs                                       │    │
│  │  [Use soon ▼]                              [ ✕ Remove ] │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🍄 Mushrooms                                            │    │
│  │  [Use soon ▼]                              [ ✕ Remove ] │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ── Have at Home 🟢 ─────────────────────────────────────────    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🫙 Half jar passata                                     │    │
│  │  [Have at home ▼]                          [ ✕ Remove ] │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  🥥 Tin coconut milk                                     │    │
│  │  [Have at home ▼]                          [ ✕ Remove ] │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  [ + Add more items ]                                            │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  💡 We found 12 recipes using your ingredients            │    │
│  │     3 recipes use chicken AND mushrooms together          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│                        [ Find me recipes → ]                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Elements:**

**Urgency dropdown** (per item):
- **Use soon** 🔴 — Perishable, needs using in next 1-2 days. Strongly influences recipe suggestions.
- **This week** 🟡 — Should be used this week but not urgent. Moderate influence.
- **Have at home** 🟢 — In the cupboard/freezer, no rush. Light influence (cost saving, not waste prevention).

**Behaviour:**
- Photo input items default to "Use soon" (assumption: you photographed them because they need using)
- Manual add items default to "Have at home" (assumption: you're noting stock, not urgency)
- Voice input: parses urgency cues — "going off" / "expires tomorrow" → Use soon; "in the freezer" → Have at home
- User can always adjust

**Recipe preview teaser:**
- Shows count of matching recipes before user commits
- Highlights multi-ingredient matches ("3 recipes use chicken AND mushrooms together" — that's the magic moment)
- Tapping the teaser could show a quick preview list

**"+ Add more items":**
- Returns to manual add screen (2c) with already-added items preserved

---

## Screen 4: Recipe Suggestions (Filtered View)

**Option A: Dedicated "Use It Up" recipe view**

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to planner            Recipes using your ingredients     │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Using: [🥩 Chicken ✕] [🍄 Mushrooms ✕] [🫙 Passata ✕]  [+]   │
│                                                                  │
│  ── Best matches (uses 2+ of your items) ────────────────────    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ [Image]  Creamy Chicken & Mushroom Pasta                 │    │
│  │          25 min · Uses: 🥩 chicken, 🍄 mushrooms         │    │
│  │                                    [ + Add to Monday ]   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ [Image]  Chicken Cacciatore                              │    │
│  │          40 min · Uses: 🥩 chicken, 🫙 passata           │    │
│  │                                    [ + Add to Tuesday ]  │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ── Uses one of your items ──────────────────────────────────    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ [Image]  Mushroom Risotto                                │    │
│  │          30 min · Uses: 🍄 mushrooms                      │    │
│  │                                    [ + Add to Plan ]     │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │ [Image]  Chicken Fajitas                                 │    │
│  │          20 min · Uses: 🥩 chicken                        │    │
│  │                                    [ + Add to Plan ]     │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ── All recipes ─────────────────────────────────────────────    │
│  [Show all recipes without ingredient filter]                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Key UX decisions:**

**Ranking:**
1. Recipes using the most "Use Up" items ranked first
2. Within that, "Use soon" items weighted higher than "Have at home"
3. Then by user's normal preferences (favourites, recently cooked, etc.)

**"Uses: 🥩 chicken, 🍄 mushrooms" badges:**
- Shows which of the user's flagged items each recipe contains
- Green highlight on matched ingredients
- Makes the value immediately visible — "this recipe helps me use TWO things"

**"+ Add" button:**
- Simple "+ Add" button on each recipe card
- On tap: button changes to "✓ Added", card dims slightly, toast shows "✓ Added to your plan"
- No day assignment at this stage — recipes go into a "selected for this week" collection
- User arranges them into specific days in the planner view if they want to
- Keeps the browsing flow fast and commitment-free

> **🔮 OPEN QUESTION: Day auto-assignment**
> 
> Should "+ Add" automatically slot recipes into the next empty day on the planner?
> 
> **For:** Saves a step for users who are actively meal planning Mon→Sun. The "✓ Monday" button with green confirmation felt satisfying in testing.
> 
> **Against:** Not everyone plans Monday-first. Some users only plan 2-3 meals. Some weeks start on Thursday. Auto-assigning days adds cognitive load for users who just want to collect recipes ("why is it saying Tuesday? I don't care about Tuesday").
> 
> **Possible middle ground:** If the user entered via the meal planner (clicking an empty slot), auto-assign. If they're just browsing recipes with a "use up" filter, just collect without day assignment.
> 
> **Decision:** Park for user testing. The "✓ Added" without day works for MVP. Revisit when planner integration is more mature.

**Removing filter chips:**
- User can tap ✕ on ingredient chips to broaden results
- "Show all recipes" link at bottom removes ingredient filter entirely

---

## Screen 5: Back to Weekly Planner (with Use-Up Context)

After adding recipes, the planner shows subtle indicators:

```
┌───────────┬─────────────────────────────────────────────────────┐
│  Monday   │  🥩🍄 Creamy Chicken & Mushroom Pasta    ❷         │
│           │  25 min · Uses up: chicken, mushrooms               │
├───────────┼─────────────────────────────────────────────────────┤
│  Tuesday  │  🥩🫙 Chicken Cacciatore                 ❶         │
│           │  40 min · Uses up: chicken, passata                 │
├───────────┼─────────────────────────────────────────────────────┤
│  Wednesday│  [Click to add]                                     │
│           │  💡 You still have coconut milk to use              │
├───────────┼─────────────────────────────────────────────────────┤
│  Thursday │  [Click to add]                                     │
│           │                                                     │
└───────────┴─────────────────────────────────────────────────────┘
```

**Planner enhancements:**
- **"Uses up:" label** on filled slots that contain Use-Up ingredients (subtle, not overwhelming)
- **Gentle nudge on empty slots** when un-used Use-Up items remain: "💡 You still have coconut milk to use"
- **Nudges only appear for "Use soon" and "This week" items**, not "Have at home"
- Nudges disappear once the item is covered by a planned recipe

**Use-Up progress indicator** (optional, in planner header):
```
🧊 Use-Up: 3 of 4 items planned  [Chicken ✓] [Mushrooms ✓] [Passata ✓] [Coconut milk ○]
```

---

## 🔄 Ongoing Management

### Editing Use-Up Items Mid-Week

**Access:** Settings icon or "Use Up" section in planner header

```
┌──────────────────────────────────────────────────────────────────┐
│  Your Use-Up List                                    [ + Add ]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🥩 Chicken thighs     🔴 Use soon    ✓ Planned Mon & Tue       │
│  🍄 Mushrooms           🔴 Use soon    ✓ Planned Monday          │
│  🫙 Passata (half jar)  🟢 Have at home ✓ Planned Tuesday        │
│  🥥 Coconut milk        🟢 Have at home ○ Not yet planned        │
│                                                                  │
│  [ + Add more ]                   [ Clear all ]                  │
└──────────────────────────────────────────────────────────────────┘
```

### After Cooking

When user marks a recipe as "Cooked" in cook mode:
- Use-Up items in that recipe automatically marked as "Used ✓"
- If all items are used, celebration micro-moment: "🎉 Zero waste week!"
- Items don't carry over to next week unless user explicitly keeps them

### Week Rollover

- "Use soon" items that weren't planned get a gentle reminder: "🥩 Chicken thighs from last week — still need to use this?"
- "Have at home" items persist quietly until user removes them
- User can snooze or dismiss

---

## 📦 Package Size Intelligence (Phase 2)

### How It Works

When the user plans a recipe that uses a partial quantity of a commonly-packaged item:

```
┌──────────────────────────────────────────────────────────────────┐
│  💡 Smart suggestion                                             │
│                                                                  │
│  Monday's Chicken Stir Fry uses 300g chicken breast.             │
│  A typical pack is 500g.                                         │
│                                                                  │
│  You'll have ~200g left over. Here are recipes that              │
│  could use it:                                                   │
│                                                                  │
│  [ Chicken Caesar Wrap — 20 min ]                                │
│  [ Thai Chicken Soup — 25 min ]                                  │
│  [ Chicken Quesadilla — 15 min ]                                 │
│                                                                  │
│  [ Add one to my plan ]              [ Dismiss ]                 │
└──────────────────────────────────────────────────────────────────┘
```

**Trigger conditions:**
- Recipe uses a perishable ingredient in a quantity less than standard pack size
- Remaining amount is enough to be useful (>100g meat, >half jar of sauce, etc.)
- There's an empty slot later in the week
- Only triggers for perishables, not for things like "500g bag of rice" where leftover keeps indefinitely

**Common package sizes to track (UK):**
- Chicken breast: 500g pack (2-3 breasts)
- Beef mince: 500g pack
- Passata/chopped tomatoes: 400g tin
- Coconut milk: 400ml tin
- Fresh herbs (coriander, parsley): 28g bunch
- Cream: 300ml pot
- Bacon: 200g pack (6-8 rashers)
- Salmon fillets: typically 2 per pack

**Behaviour:**
- Suggestion appears as a soft card/notification, not a modal blocker
- Dismissed suggestions don't reappear for that item this week
- User can tap "Don't suggest for this item" to permanently ignore a specific package size trigger

---

## 🌿 Seasonal Produce (Phase 2)

### In-Season Indicators

```
Recipe card with seasonal badge:
┌──────────────────────────────────────────────────────────────────┐
│ [Image]  Spring Pea & Mint Risotto          🌿 In season        │
│          30 min · Fresh peas are at their best right now         │
└──────────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Seasonal calendar data for UK fruit & veg (well-documented, ~40-50 items)
- Recipes tagged with key seasonal ingredients
- 🌿 badge on recipe cards when primary ingredients are in season
- Seasonal recipes get a small boost in suggestion ranking
- No blocking or filtering — just a gentle signal
- Monthly "What's in season" discovery card on home screen

**Seasonal data source:**
- UK seasonal produce calendar (e.g., eatseasonably.co.uk data)
- Updated monthly, not daily — seasons are broad enough for monthly granularity
- Edge cases: "forced rhubarb" in January vs outdoor rhubarb in spring — keep it simple, use the main outdoor season

---

## 💰 Cost Saving Visibility (Phase 2-3)

### Shopping List Savings

```
┌──────────────────────────────────────────────────────────────────┐
│  🛒 Shopping List                                                │
│                                                                  │
│  Items to buy: 18                                                │
│  Items from pantry: 7 (already have)                             │
│  Items from Use-Up list: 4 (already in fridge)                   │
│                                                                  │
│  💰 Estimated saving this week: ~£8.50                           │
│     (from pantry staples and fridge items)                       │
│                                                                  │
│  ── Need to buy ─────────────────────────────────────────────    │
│  ...                                                             │
└──────────────────────────────────────────────────────────────────┘
```

**Logic:**
- Pantry items (Always Have tier) → excluded from shopping list, estimated cost saved
- Use-Up items → excluded from shopping list, estimated cost saved
- "Check First" pantry items → flagged for user to verify, potential saving shown
- Estimated costs based on average UK supermarket prices (static lookup, not live API)

---

## 📋 Data Structure

### UseUpItem Object
```javascript
{
  id: 'useup_001',
  ingredientId: 'chicken-thigh',  // links to ingredient database
  name: 'Chicken thighs',
  emoji: '🥩',
  urgency: 'useSoon',  // 'useSoon' | 'thisWeek' | 'haveAtHome'
  source: 'photo',     // 'photo' | 'voice' | 'manual' | 'carryover'
  addedDate: '2024-11-25',
  estimatedQuantity: '500g',  // optional, from photo AI or user input
  plannedInRecipes: ['recipe_001', 'recipe_003'],  // recipe IDs
  status: 'planned',   // 'active' | 'planned' | 'used' | 'expired' | 'dismissed'
}
```

### Integration with Meal Plan
```javascript
// In the meal plan day slot:
{
  slotType: 'main',
  status: 'filled',
  recipeId: 'creamy-chicken-mushroom-pasta',
  portions: 2,
  usesUpItems: ['useup_001', 'useup_002']  // links to UseUpItems
}
```

### Seasonal Calendar (simplified)
```javascript
const SEASONAL_UK = {
  january: ['leeks', 'parsnips', 'beetroot', 'celeriac', 'kale', 'cauliflower', 'forced-rhubarb'],
  february: ['leeks', 'parsnips', 'purple-sprouting-broccoli', 'chicory', 'blood-oranges'],
  march: ['purple-sprouting-broccoli', 'spring-onions', 'watercress', 'rhubarb'],
  april: ['asparagus', 'jersey-royals', 'spring-lamb', 'radishes', 'rocket', 'spring-onions'],
  may: ['asparagus', 'broad-beans', 'elderflower', 'new-potatoes', 'peas', 'strawberries'],
  june: ['strawberries', 'cherries', 'broad-beans', 'courgettes', 'peas', 'new-potatoes', 'gooseberries'],
  july: ['tomatoes', 'strawberries', 'raspberries', 'runner-beans', 'courgettes', 'fennel', 'sweetcorn'],
  august: ['tomatoes', 'sweetcorn', 'plums', 'blackberries', 'peppers', 'aubergine', 'greengages'],
  september: ['blackberries', 'damsons', 'figs', 'pears', 'sweetcorn', 'wild-mushrooms', 'cobnut'],
  october: ['pumpkin', 'squash', 'apples', 'pears', 'wild-mushrooms', 'chestnuts', 'quince'],
  november: ['parsnips', 'swede', 'cranberries', 'chestnuts', 'game', 'jerusalem-artichoke'],
  december: ['brussels-sprouts', 'parsnips', 'cranberries', 'chestnuts', 'clementines', 'red-cabbage'],
};
```

---

## ✅ Acceptance Criteria

### Phase 1 (MVP — Manual Input Only)
- [ ] "Use It Up" prompt appears at top of empty weekly plan
- [ ] Manual add screen with search + tappable chips
- [ ] "From recent shops" pre-populated from last shopping list
- [ ] Two-tier urgency: "Use soon" and "Have at home"
- [ ] Confirm screen showing items with urgency levels
- [ ] Recipe suggestions filtered/ranked by Use-Up items
- [ ] "Uses: [ingredient]" badges on recipe cards
- [ ] Use-Up items excluded from shopping list
- [ ] Gentle nudge on empty planner slots for unplanned Use-Up items
- [ ] "Skip for now" always available, never guilt-tripping

### Phase 2 (Photo + Voice)
- [ ] Camera capture with AI ingredient detection
- [ ] Confirmation screen to verify/correct detected items
- [ ] Voice/text natural language input
- [ ] Natural language parsing ("sad courgettes" → courgette)
- [ ] Package size suggestions for leftover quantities
- [ ] Seasonal produce badges on recipe cards
- [ ] Seasonal boost in recipe suggestion ranking
- [ ] Cost saving estimate on shopping list

### Phase 3 (Smart Features)
- [ ] Multi-ingredient recipe matching ("3 recipes use chicken AND mushrooms")
- [ ] Smart day suggestions based on ingredient urgency
- [ ] "Zero waste week" celebration when all items used
- [ ] Week rollover for unused items
- [ ] Learning from user patterns (frequently added items bubble up)
- [ ] Supermarket price comparison integration

---

## 🚀 Implementation Priority

### Build First (MVP)
1. Manual add screen with search and chips
2. Use-Up item data model and storage
3. Recipe filtering/ranking by Use-Up items
4. Shopping list integration (exclude Use-Up items)
5. Planner nudges for unplanned items

### Build Second
1. Photo capture + AI detection
2. Voice/text natural language input
3. Package size intelligence
4. Seasonal calendar and badges

### Build Third
1. Smart day suggestions
2. Cost saving estimates
3. Week rollover and carryover logic
4. Learning/personalisation

---

*Document created: February 2025*
*Based on: User discussions about food waste, HelloFresh pain points, and money saving goals*
*For: C:\Users\clair\ClaudeProjects\App_Playground\recipe_planner\docs\*
