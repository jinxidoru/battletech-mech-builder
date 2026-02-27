# BattleTech Mech Manager - React Components

This directory contains the core React UI components for the BattleTech mech management application.

## Components Overview

### MechCard.jsx
A rich card component for displaying individual mech information.

**Features:**
- Displays mech name, variant, tonnage, BV, and role
- Shows weapon loadout with tags
- Color-coded tonnage class badges (Light/Medium/Heavy/Assault)
- Editable owned mini count with inline editing
- Draggable for adding to lance
- Hover effects and selection state
- Click to preview in detail panel

**Props:**
- `mech` - Mech object with all details
- `onSelect` - Callback when card is clicked
- `isSelected` - Boolean for selection state
- `onOwnedCountChange` - Callback when owned count changes

### MechSelectionView.jsx
Main mech browser with comprehensive filtering capabilities.

**Features:**
- Grid layout of mech cards
- Real-time filtering on:
  - Name/variant search
  - Tonnage range (min/max)
  - BV range (min/max)
  - Role selection
  - Weapon search
  - Owned minis only toggle
- Shows filtered count
- Clear filters button
- Responsive grid layout

**Props:**
- `mechs` - Array of all available mechs
- `onMechSelect` - Callback when a mech is selected
- `selectedMech` - Currently selected mech object
- `onOwnedCountChange` - Callback for owned count changes

### LanceEditor.jsx
Drag-and-drop lance builder with BV management.

**Features:**
- Drag-and-drop zone for adding mechs
- Shows total BV and tonnage at top
- Individual mech management:
  - Adjustable Gunnery/Piloting skills (0-8)
  - Real-time BV recalculation
  - Skill lock mechanism for auto-balance
  - Remove from lance
- Auto-balance feature:
  - Enter target BV
  - Distributes BV among unlocked mechs
  - Uses skill multiplier table
  - Respects locked mech skills
- Supports arbitrary number of mechs
- Click mech to view in preview panel

**Props:**
- `lance` - Lance object containing mechs array
- `mechs` - Reference array of all available mechs
- `onLanceUpdate` - Callback when lance changes
- `onMechSelect` - Callback when a lance mech is clicked

**Lance Object Structure:**
```javascript
{
  id: 'lance-1',
  name: 'My Lance',
  mechs: [
    {
      mechId: 'mech-1',
      gunnery: 4,
      piloting: 5,
      adjustedBV: 1897,
      skillsLocked: false
    }
  ]
}
```

### MechPreviewPanel.jsx
Ever-present detail panel showing selected mech information.

**Features:**
- Displays comprehensive mech details
- Tonnage class badge with color coding
- Overview stats (tonnage, BV, role, armor)
- Movement stats (walk, run, jump)
- Complete weapon loadout
- Owned mini status
- BV calculation note

**Props:**
- `mech` - Currently selected mech object (null shows placeholder)

## Styling

Each component has its own CSS file with:
- Dark theme color scheme
- Consistent spacing and typography
- Hover and transition effects
- Responsive design considerations
- Custom scrollbars
- Color-coded elements by tonnage class

### Color Scheme
- Light mechs: Blue (#4a9eff)
- Medium mechs: Orange (#ffa500)
- Heavy mechs: Red (#ff4444)
- Assault mechs: Purple (#aa00ff)
- Primary accent: Cyan (#00aaff)
- Background: Dark grays (#0f0f0f, #1a1a1a, #222)

## Data Flow

1. **App.jsx** maintains state for:
   - All mechs (with owned counts)
   - Selected mech
   - Current lance composition

2. **LocalStorage Persistence:**
   - Mechs array saved on change
   - Lance configuration saved on change
   - Auto-loaded on app mount

3. **BV Calculation:**
   - Uses `/utils/bvCalculator.js`
   - References `/bv-skill-multipliers.json`
   - Real-time updates on skill changes

## Usage Example

```jsx
import { useState } from 'react';
import MechSelectionView from './components/MechSelectionView';
import LanceEditor from './components/LanceEditor';
import MechPreviewPanel from './components/MechPreviewPanel';
import { MOCK_MECHS } from './mockData';

function App() {
  const [mechs, setMechs] = useState(MOCK_MECHS);
  const [selectedMech, setSelectedMech] = useState(null);
  const [lance, setLance] = useState({ id: '1', name: 'My Lance', mechs: [] });

  return (
    <div className="app-layout">
      <MechSelectionView
        mechs={mechs}
        onMechSelect={setSelectedMech}
        selectedMech={selectedMech}
        onOwnedCountChange={(id, count) => {
          setMechs(prev => prev.map(m =>
            m.id === id ? {...m, ownedCount: count} : m
          ));
        }}
      />
      <LanceEditor
        lance={lance}
        mechs={mechs}
        onLanceUpdate={setLance}
        onMechSelect={setSelectedMech}
      />
      <MechPreviewPanel mech={selectedMech} />
    </div>
  );
}
```

## Future Enhancements

- Save/load multiple lance configurations
- Lance naming/editing
- Export lance to PDF
- Import real mech data from sheets
- Add validation warnings (overweight, BV limits)
- Undo/redo functionality
- Mech comparison view
- Advanced filtering (speed, armor, weapon types)
