# Features Documentation

Central location for all feature documentation in the Meal Planner application. Each feature has its own folder with consistent documentation structure.

## Features List

### 1. [Allergen Filter](./allergen-filter/)
Comprehensive allergen filtering system supporting the 16 European allergens.

**Location:** `docs/features/allergen-filter/`

**Documentation:**
- 📖 [README.md](./allergen-filter/README.md) - Feature overview & quick start
- 👤 [USER_GUIDE.md](./allergen-filter/USER_GUIDE.md) - User-facing guide with how-to instructions
- 👨‍💻 [IMPLEMENTATION.md](./allergen-filter/IMPLEMENTATION.md) - Technical reference for developers

**Status:** ✅ Complete and tested

**Quick Facts:**
- 16 EU allergens supported
- Quick filter panel for instant use
- Family profile allergen preferences
- Automatic ingredient scanning
- localStorage persistence

---

## Adding New Features

When creating a new feature, follow this structure:

```
features/
├── feature-name/
│   ├── README.md              # Overview and quick links
│   ├── USER_GUIDE.md          # User-facing documentation
│   ├── IMPLEMENTATION.md      # Developer/technical docs
│   └── [OPTIONAL]
│       ├── FEATURE-SPEC.md    # Detailed specifications
│       ├── API.md             # API reference (if applicable)
│       └── EXAMPLES.md        # Code examples
```

### README.md Template
- Feature name and description
- Quick links to other docs
- Brief overview of what it does
- Supported features list
- Current status

### USER_GUIDE.md Template
- User-facing explanations
- How-to guides with step-by-step instructions
- Screenshots/examples
- FAQ and troubleshooting

### IMPLEMENTATION.md Template
- Files changed/created
- Code snippets and explanations
- Data structures
- Integration points
- Testing checklist

---

## Related Documentation

Core documentation for the entire project:
- [PROJECT_OBJECTIVES.md](../PROJECT_OBJECTIVES.md) - Project goals and user personas
- [FEATURE_INVENTORY.md](../FEATURE_INVENTORY.md) - Complete feature list
- [requirements.md](../requirements.md) - Functional and non-functional requirements
- [MEAL_PLANNER_WEEKLY_VIEW_SPEC.md](../MEAL_PLANNER_WEEKLY_VIEW_SPEC.md) - Weekly planner specs
- [getting_started.md](../getting_started.md) - Getting started guide
