# Recipe Card Selection - Feature Handoff Summary

Location: MealPlannerApp/docs/features/card-select/
Wireframe: recipe-card-wireframe-v8.html
Status: UX specification complete, ready for Flutter implementation
Last updated: February 2026

---

## Overview

The recipe card selection experience is where users browse, triage, and commit recipes to their weekly meal plan. The interaction patterns borrow from streaming skip/dislike, food delivery browsing, meal-kit planning, and swipe-to-reveal actions.

---

## Three-Tier System

Recipes flow through three tiers (similar to a basket/save-for-later model):

### Browse (indigo)
All available recipes minus dismissed ones. Discovery mode with quick decisions and minimal friction.

### Saved for Later (amber)
Interested but not this week. A low-commitment holding area that can be promoted later.

### This Week's Meals (green)
Committed recipes assigned to specific days. These generate the shopping list.

Flow direction: Browse -> Saved -> Meals (and back; nothing is permanently lost except dismissed recipes).

Tier tabs sit below the view toggle as pill buttons with live counts. Each tier uses a distinct active color (indigo/amber/green).

---

## Three Browse Modes

Users select a browse mode via a segmented toggle:

### Full Card
- Large hero image (200px), leisurely scroll
- Frosted glass dietary badges on image (confirmation, not headline)
- "New" badge for unseen recipes
- Heart button on image for favoriting
- Save button: tap = save, long-press (600ms) = day picker
- "Not for me" text button triggers dismiss flow
- Best for: sofa browsing, first look at new recipes

### Quick View
- Compact horizontal rows (64px thumbnail + name + time + tag + heart)
- Swipe actions (reveal-and-hold, tap to act):
	- Swipe right -> Save (amber) | Add (indigo)
	- Swipe left -> Skip (grey) | Not for me (dark)
	- Full swipe right -> auto Add to Meals
	- Full swipe left -> auto Skip
- Best for: rapid triage, filling remaining slots

### Swipe Mode
- Single-card focus with swipe gestures
- SKIP / ADD stamps appear on drag as feedback
- Three buttons below card: Save | Add (primary) | Heart
- Skip = swipe left only (no button)
- "Not for me - do not show again" = subtle text link below buttons
- Best for: quick decision-making, low-effort browsing

---

## Actions by Tier

### Browse actions
| Action | Trigger | Result |
| --- | --- | --- |
| Save for Later | Tap button / short swipe right | Moves to Saved tier |
| Add to Meals | Long-press / full swipe right / day picker | Moves to Meals tier with day assignment |
| Skip | Swipe left / skip button | Card removed from view, comes back later |
| Not for me | Text link / nope button | Dismiss + learning banner |
| Favorite | Heart tap | Toggle favorite (independent of tiers) |

### Saved for Later actions
| Action | Trigger | Result |
| --- | --- | --- |
| Add to Meals | "Meals" button / swipe right | Day picker -> Meals tier |
| Remove | "X" button / swipe left | Back to Browse |

Buttons and swipe gestures both work in Saved view.

### This Week's Meals actions
| Action | Trigger | Result |
| --- | --- | --- |
| Remove | "X" button | Back to Saved |

---

## Dismiss Flow ("Not for me")

1) Tap "Not for me" -> card dismisses (slides off)
2) Auto-fading banner appears: "Won't suggest [recipe] again - tell us why?"
3) If ignored -> banner fades after 4 seconds
4) If tapped -> bottom sheet with one-tap options:
	 - Just this recipe -> hide this recipe only
	 - An ingredient -> log ingredient signal
	 - The cuisine -> log cuisine signal

No ingredient picker or cuisine selector in-flow to avoid interruption.

### Pattern Learning Logic

- Just this recipe -> blacklist recipe ID only
- An ingredient -> flag ingredient dislike for this recipe
- The cuisine -> flag cuisine dislike for this recipe

After 2-3 ingredient flags, infer a pattern and surface in Settings -> Preferences:

"Things we've noticed"
"You skip recipes with chickpeas" [Correct] [Wrong]
"You skip Thai food" [Correct] [Wrong]

---

## Day Picker

Triggered by long-press on Save/Add or by full swipe right:

- Shows Mon-Sun with current assignments
- First empty day highlighted (indigo)
- Tap a day -> assigns recipe to that day
- "Just save for later" fallback at bottom

---

## Footer Bar (Saved Count)

- Fixed at bottom of phone frame
- Only appears when in Browse tier and saved count > 0
- Shows recipe thumbnails (up to 4) + "X saved" count + "Review" button
- Review switches to Saved tier tab

---

## Card Design Elements

### Dietary Badges
- Frosted glass style: background rgba(255,255,255,0.8) + backdrop blur
- Positioned top-left on image
- Muted grey text

### "New" Badge
- Indigo pill, top-right on image
- For recipes the user has not seen

### Smart Tags
- Below recipe name: "One Pot", "Quick", "High Protein", "Slow Cook", "Classic"
- One tag in Quick View, full set in Full/Swipe

### Heart / Favorite
- On image (Full/Swipe) or inline (Quick View)
- Independent of tiers

---

## Key Design Principles

1) Image does the emotional work
2) Dietary badges are confirmation, not warnings
3) Skip != Dislike (skip returns later, dislike is permanent)
4) Never interrupt browse flow (all feedback is optional and one-tap)
5) Nothing is permanently lost (except dismissed recipes)
6) Escalating commitment: Browse (low) -> Save (medium) -> Meals (high)
7) Multiple input methods: swipe and buttons

---

## Integration Points

- Shopping List: generated from Meals tier only
- Weekly Planner: day assignments sync to weekly grid
- Cook Mode: launch from Meals cards
- Settings -> Preferences: surface learned dislikes
- Allergy/Dietary Profiles: filter browse list (invisible)

---

## Implementation Notes for Flutter

- Three-tier state management: recipes have a tier enum (browse/saved/meals/dismissed)
- Swipe gestures: use GestureDetector with onHorizontalDragUpdate/End
- Reveal pattern: AnimatedContainer or Dismissible with custom thresholds
- Day picker: showDialog with custom content
- Toast/banner: OverlayEntry with auto-dismiss timer
- Footer bar: AnimatedSlide or AnimatedPositioned tied to saved count
- Tier tabs: ToggleButtons or custom chip row with AnimatedContainer

---

Wireframe prototype: recipe-card-wireframe-v8.html (open in browser to interact)
