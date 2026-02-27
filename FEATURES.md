# BattleTech Mech Manager - Feature Guide

## Core Features

### 1. Mech Browser (Left Panel)

**Filter Capabilities:**
- 🔍 **Search by Name/Variant** - Type "Atlas" or "AS7-D"
- ⚖️ **Tonnage Range** - Min 20t to Max 100t
- 💎 **BV Range** - Filter by Battle Value
- 🎯 **Role Selection** - Juggernaut, Sniper, Striker, Scout, etc.
- 🔫 **Weapon Search** - Find mechs with "PPC", "LRM", "AC/20", etc.
- 📦 **Owned Only** - Show only mechs you own

**Mech Cards Display:**
- Name and variant
- Tonnage with color-coded badge
- Base Battle Value
- Movement stats (Walk/Run/Jump)
- Armor points
- Combat role
- Complete weapon loadout
- Owned mini count (click to edit)
- Drag handle for adding to lance

**Color Coding:**
- 🔵 Light (20-35t): Blue
- 🟠 Medium (40-55t): Orange
- 🔴 Heavy (60-75t): Red
- 🟣 Assault (80-100t): Purple

### 2. Lance Editor (Center Panel)

**Building Your Lance:**
1. Drag mechs from browser to drop zone
2. Drop zone shows all added mechs
3. Click remove (×) button to remove a mech
4. Click any mech to view details in preview panel

**Per-Mech Management:**
- Base BV display
- Adjusted BV (changes with skills)
- Gunnery skill (0-8, lower is better)
- Piloting skill (0-8, lower is better)
- Lock button (🔒/🔓) to prevent auto-balance changes

**Lance Statistics (Top Bar):**
- 💎 **Total BV** - Sum of all adjusted BVs
- ⚖️ **Total Tonnage** - Combined weight
- 🤖 **Mech Count** - Number of mechs in lance

**Auto-Balance Feature:**
1. Enter target BV (e.g., 8000)
2. Click "Auto-Balance" button
3. System adjusts skills on unlocked mechs to reach target
4. Locked mechs maintain their skills
5. Uses standard skill progression matrix

**Skill Effects on BV:**
- Better skills (lower numbers) = Higher BV multiplier
- Worse skills (higher numbers) = Lower BV multiplier
- Standard: Gunnery 4 / Piloting 5 = 1.0× multiplier
- Elite: Gunnery 0 / Piloting 1 = 3.36× multiplier
- Green: Gunnery 6 / Piloting 7 = 0.72× multiplier

### 3. Mech Preview Panel (Right Panel)

**Always-Visible Details:**
- Mech name and variant
- Tonnage class badge
- Complete stat breakdown:
  - Tonnage and BV
  - Combat role
  - Armor points
  - Movement (Walk/Run/Jump)
- Full weapon listing
- Owned mini status
- BV calculation note

**Interaction:**
- Click any mech card in browser → Shows preview
- Click any mech in lance editor → Shows preview
- Preview updates instantly

### 4. Data Persistence

**Automatic Saving:**
- ✓ Owned mini counts saved to localStorage
- ✓ Lance composition saved to localStorage
- ✓ All data persists across page refreshes
- ✓ No server required
- ✓ Ready for Firebase migration

**Storage Keys:**
- `battletech-mechs` - Mech data with owned counts
- `battletech-lance` - Current lance configuration

### 5. Drag-and-Drop System

**How It Works:**
1. Hover over any mech card in browser
2. Click and hold to start dragging
3. Drag over to lance editor drop zone
4. Release to add mech to lance
5. Mech appears with default skills (4/5)
6. Adjust skills as needed

**Visual Feedback:**
- Cursor changes during drag
- Drop zone highlights when dragging
- Smooth animations

### 6. BV Calculation System

**Multiplier Table:**
- Uses official BattleTech skill multipliers
- Located in `/bv-skill-multipliers.json`
- Base assumption: Gunnery 4 / Piloting 5
- Real-time recalculation on skill change

**Calculation Formula:**
```
Adjusted BV = Base BV × Skill Multiplier
```

**Example:**
- Atlas AS7-D: Base BV 1897
- With Gunnery 3 / Piloting 4: 1897 × 1.69 = 3206 BV
- With Gunnery 6 / Piloting 7: 1897 × 0.72 = 1366 BV

### 7. Owned Mini Tracking

**Features:**
- Track how many physical minis you own
- Click owned count to edit
- Filter to show only owned mechs
- Quantity displayed on each card
- Green checkmark when owned
- Persists across sessions

**Use Cases:**
- Build lances from available minis
- Plan which mechs to acquire
- Quick inventory check

## Workflow Examples

### Building a Balanced Lance

1. **Set Target BV** (e.g., 8000)
2. **Add 4 Mechs** to lance editor
3. **Lock Special Mechs** you want at specific skills
4. **Click Auto-Balance**
5. **Review Total BV** at top
6. **Adjust manually** if needed
7. **Data auto-saves**

### Finding the Perfect Mech

1. **Set Role Filter** (e.g., "Sniper")
2. **Set BV Range** (e.g., 1200-1600)
3. **Set Tonnage** (e.g., 60-75 for Heavy)
4. **Add Weapon** search (e.g., "PPC")
5. **Toggle Owned Only** if using physical minis
6. **Browse Results** in card grid
7. **Click for Details** in preview panel

### Managing Owned Minis

1. **Click Owned Count** on any mech card
2. **Enter Quantity** you own
3. **Press Enter** or click away to save
4. **Toggle "Owned Only"** filter
5. **Build Lance** from available mechs
6. **Track What You Need** (0 count = need to buy)

## Keyboard & Mouse

**Navigation:**
- Click mech cards to preview
- Click filter inputs to edit
- Click owned counts to edit inline
- Drag mech cards to lance editor

**Editing:**
- Type in search boxes for instant filtering
- Use number inputs for tonnage/BV ranges
- Select from dropdown for role
- Check/uncheck for owned filter

**Lance Management:**
- Click × to remove mech from lance
- Click 🔒/🔓 to lock/unlock skills
- Use number inputs for skill values
- Drag new mechs to add

## Responsive Design

**Desktop (>1400px):**
- Full 3-column layout
- All features visible
- Optimal experience

**Laptop (1200-1400px):**
- 3 columns with smaller preview
- All features accessible

**Tablet (900-1200px):**
- 2 columns (hides preview)
- Click mech for details modal
- Touch-friendly

**Mobile (<900px):**
- Stacked vertical layout
- One section at a time
- Fully functional

## Tips & Tricks

### Quick Lance Building
- Drag 4 mechs quickly
- Enter target BV
- Auto-balance
- Done in seconds!

### Finding Complementary Mechs
- Use BV range to match existing mechs
- Filter by role for balanced composition
- Check weapon types for variety

### Managing Large Collections
- Use owned filter for quick access
- Search by name for specific variants
- Sort by tonnage/BV in your head

### Optimizing BV
- Lock your "hero" mech at elite skills
- Auto-balance others to fill BV
- Manually tweak for fine-tuning

### Experimenting
- Try different skill combinations
- Watch BV change in real-time
- Build multiple lances (save feature coming)

## Sample Data

The app includes 12 sample mechs:

**Light (20-35t):**
- Locust LCT-1V (356 BV)
- Commando COM-2D (471 BV)
- Jenner JR7-D (669 BV)

**Medium (40-55t):**
- Hunchback HBK-4G (1021 BV)
- Shadow Hawk SHD-2H (918 BV)

**Heavy (60-75t):**
- Catapult CPLT-C1 (1319 BV)
- Warhammer WHM-6R (1299 BV)
- Archer ARC-2R (1353 BV)
- Marauder MAD-3R (1543 BV)
- Timber Wolf TBR-Prime (2370 BV)

**Assault (80-100t):**
- Awesome AWS-8Q (1605 BV)
- Atlas AS7-D (1897 BV)

All with realistic stats, weapons, and varied owned counts.

## What's Next?

Future enhancements planned:
- Multiple saved lances
- Lance naming/editing
- PDF export for printing
- Import more mech data
- Validation warnings
- Lance templates
- Mech comparison
- Advanced filtering
- Battle scenarios

The foundation is solid and ready to build upon!
