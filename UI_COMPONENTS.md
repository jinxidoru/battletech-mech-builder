# BattleTech Mech Manager - UI Components Documentation

## Overview

The BattleTech Mech Manager is a single-page React application for managing and building lance compositions. This document describes the core UI components and their functionality.

## Running the Application

```bash
npm run dev
```

The app will be available at http://localhost:5173/

## Components Built

### 1. MechSelectionView
**Location:** `/src/components/MechSelectionView.jsx`

A comprehensive mech browser with advanced filtering capabilities.

**Features:**
- Rich card-based mech display (not simple text lines)
- Real-time filtering on:
  - Name/variant search
  - Tonnage range (min/max)
  - Battle Value range (min/max)
  - Role selection
  - Weapon search
  - Owned minis toggle
- Shows filtered count
- Drag mechs to lance editor
- Click to preview details
- Editable owned mini counts

**Filter Panel Includes:**
- Search input for name/variant
- Min/max tonnage inputs
- Min/max BV inputs
- Role dropdown
- Weapon search input
- Owned-only checkbox
- Clear filters button

### 2. LanceEditor
**Location:** `/src/components/LanceEditor.jsx`

Drag-and-drop lance builder with BV management and skill adjustment.

**Features:**
- Drop zone for adding mechs from browser
- Per-mech information display:
  - Name and variant
  - Base and adjusted BV
  - Tonnage
- Skill adjustment (Gunnery/Piloting 0-8):
  - Individual skill inputs
  - Real-time BV recalculation
  - Lock/unlock mechanism
- Auto-balance feature:
  - Enter target BV
  - Automatically adjusts unlocked mech skills
  - Uses standard skill progression matrix
  - Respects locked mechs
- Total statistics at top:
  - Total Battle Value
  - Total tonnage
  - Mech count
- Remove mechs from lance
- Click mech to preview details

**BV Calculation:**
Uses the skill multiplier table from `/bv-skill-multipliers.json`:
- Base BV assumes Gunnery 4 / Piloting 5
- Multipliers applied based on actual skills
- Real-time updates

### 3. MechPreviewPanel
**Location:** `/src/components/MechPreviewPanel.jsx`

Ever-present detail panel showing selected mech information.

**Displays:**
- Mech name and variant
- Tonnage class badge (color-coded)
- Overview stats:
  - Tonnage
  - Base BV
  - Role
  - Armor points
- Movement stats:
  - Walk speed
  - Run speed (calculated)
  - Jump capability
- Complete weapon loadout
- Owned mini status
- BV calculation note

**Tonnage Class Colors:**
- Light (20-35t): Blue (#4a9eff)
- Medium (40-55t): Orange (#ffa500)
- Heavy (60-75t): Red (#ff4444)
- Assault (80-100t): Purple (#aa00ff)

### 4. MechCard
**Location:** `/src/components/MechCard.jsx`

Reusable mech card component used in the selection view.

**Features:**
- Compact, information-rich display
- Color-coded tonnage class border
- Shows all key stats at a glance
- Weapon tags
- Inline owned count editing
- Draggable for lance building
- Click for detailed preview
- Hover effects

## Layout Structure

The application uses a 3-column grid layout:

```
┌────────────────────────────────────────────────────┐
│              App Header                            │
├───────────────┬──────────────┬─────────────────────┤
│               │              │                     │
│  Mech         │   Lance      │   Mech Preview     │
│  Selection    │   Editor     │   Panel            │
│  View         │              │                     │
│               │              │                     │
│  (Filters +   │  (Drop Zone) │   (Selected Mech)  │
│   Grid)       │              │                     │
│               │              │                     │
└───────────────┴──────────────┴─────────────────────┘
```

**Responsive Breakpoints:**
- > 1400px: Full 3-column layout
- 1200-1400px: 3 columns with smaller preview
- 900-1200px: 2 columns (hides preview panel)
- < 900px: Stacked vertical layout

## Data Management

### State Management
**App.jsx** manages global state:
- `mechs` - Array of all available mechs with owned counts
- `selectedMech` - Currently selected mech for preview
- `lance` - Current lance composition

### LocalStorage Persistence
- `battletech-mechs` - Saved mechs array (includes owned counts)
- `battletech-lance` - Saved lance configuration
- Auto-saves on changes
- Auto-loads on mount

### Data Sources
1. **Mock Data** (`/src/mockData.js`): 12 sample mechs for testing
2. **Real Data** (`/src/data/mechs.js`): Extracted from PDF sheets with full details
3. **Adapter** (`/src/utils/mechAdapter.js`): Converts detailed data to UI format

## Utilities

### BV Calculator (`/src/utils/bvCalculator.js`)

Functions:
- `calculateAdjustedBV(baseBV, gunnery, piloting)` - Calculate BV for skill levels
- `getSkillMultiplier(gunnery, piloting)` - Get multiplier from table
- `calculateLanceBV(lanceMechs)` - Sum total lance BV
- `findBestSkillsForTarget(baseBV, targetBV, currentBV)` - Auto-balance helper

### Mech Adapter (`/src/utils/mechAdapter.js`)

Functions:
- `adaptMechForUI(detailedMech)` - Convert detailed mech to UI format
- `adaptMechsForUI(detailedMechs)` - Batch convert array

## Styling

### Color Palette
- **Background:** #0f0f0f, #1a1a1a, #222
- **Primary:** #00aaff (cyan)
- **Success:** #00c864 (green)
- **Warning:** #ffa500 (orange)
- **Danger:** #ff4444 (red)
- **Text:** #fff (white), #888 (gray), #aaa (light gray)

### Design System
- Dark theme throughout
- Consistent border radius (4px, 6px, 8px)
- Smooth transitions (0.2s ease)
- Hover effects on interactive elements
- Custom scrollbars
- Color-coded by mech weight class

## Mock Data

12 sample mechs included:
- Atlas (100t Assault)
- Timber Wolf (75t Heavy)
- Marauder (75t Heavy)
- Warhammer (70t Heavy)
- Catapult (65t Heavy)
- Shadow Hawk (55t Medium)
- Hunchback (50t Medium)
- Jenner (35t Light)
- Commando (25t Light)
- Locust (20t Light)
- Awesome (80t Assault)
- Archer (70t Heavy)

Each has realistic stats, weapon loadouts, and varied owned counts.

## Key Features Implemented

1. **Drag-and-Drop:** Full support for adding mechs to lance
2. **Real-time Filtering:** Instant results as you type/select
3. **BV Calculation:** Accurate multiplier-based calculations
4. **Skill Management:** Individual control with lock/unlock
5. **Auto-Balance:** Smart BV distribution algorithm
6. **Persistence:** LocalStorage for data retention
7. **Responsive Design:** Works on various screen sizes
8. **Rich Cards:** Information-dense mech displays
9. **Preview Panel:** Always-visible detailed view
10. **Owned Tracking:** Mini inventory management

## Future Enhancements

- Multiple lance save slots
- Lance naming and metadata
- Export to PDF (print sheets)
- Import additional mech data
- Validation warnings (weight, BV limits)
- Lance/Star templates (4/5 mechs)
- Mech comparison view
- Advanced weapon filtering
- Search by equipment/tech
- Battle scenario builder

## Component Dependencies

```
App.jsx
├── MechSelectionView.jsx
│   └── MechCard.jsx
├── LanceEditor.jsx
└── MechPreviewPanel.jsx

Utils:
├── bvCalculator.js (uses bv-skill-multipliers.json)
└── mechAdapter.js

Data:
├── mockData.js
├── data/mechs.js
└── types.js
```

## Testing the UI

1. **Start dev server:** `npm run dev`
2. **Open browser:** http://localhost:5173/
3. **Test filtering:** Use all filter options in left panel
4. **Test drag-drop:** Drag mech cards to lance editor
5. **Test skills:** Adjust gunnery/piloting, watch BV change
6. **Test lock:** Lock some mechs, try auto-balance
7. **Test auto-balance:** Enter target BV (e.g., 8000), click Auto-Balance
8. **Test owned:** Click owned count, edit value
9. **Test preview:** Click different mechs, watch preview panel
10. **Test persistence:** Refresh page, verify data persists

## Notes

- The app uses mock data by default but can switch to real extracted mech data
- All BV calculations use the official skill multiplier table
- LocalStorage is used for persistence (Firebase migration path ready)
- The design follows BattleTech aesthetic with hex patterns and military styling
- All components are functional and fully interactive
- The layout is responsive and works on tablets/desktops
