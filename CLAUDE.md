# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page web application for managing and printing BattleTech mech sheets. The app enables users to filter/search mech variants, build lances/stars with BV balancing, track owned minis, and print mech sheets in multiple formats.

## Source Data

**CRITICAL**: The `data/` directory contains source materials and should NEVER be tracked in git:
- `data/sheets/`: PDF mech sheets (4 files: Force Packs Wave 1/2, Wolf's Dragoons, Succession Wars)
- `data/templates/`: Alternative mech sheet format templates (sheet-with-tables.pdf)

These PDFs are the source of truth for mech variants and serve as design references for print formats.

## Architecture

This is a browser-only single-page application with these key components:

### Core Views
1. **Mech Selection View**: Filterable grid/list with rich mech cards (not simple text lines)
   - Filters: tonnage, BV, name, weapons, owned minis
   - Owned mini tracking with quantity support
   - Card display shows: name, variant, tonnage, BV, weapon summary, role

2. **Lance/Star Editor**: Drag-and-drop interface for building unit compositions
   - Shows tonnage and BV per mech
   - Adjustable piloting/gunnery skills with BV recalculation
   - Auto-balance feature to hit target BV using standard skill matrix
   - Lock mechanism for individual mech skills
   - Total BV display at top
   - Save/load lance configurations
   - Supports arbitrary number of mechs with validation tools for standard lance (4) / star (5) configurations

3. **Mech Preview Panel**: Ever-present panel showing selected mech details

### Data Flow
- Extract mech data from PDF sheets into JSON structure (may need extraction tool for future PDFs)
- BV calculations use skill multiplier matrix (see bv-skill-multipliers.json)
- Store in browser localStorage initially
- Architecture must support easy migration to Firebase + Google auth later

### Technology Stack
- Frontend: **React** (preferred)
- Backend: Minimal Node.js server serving static content only
- Persistence: localStorage (designed for Firebase migration path)
- Version Control: Git with regular commits

## Development Workflow

The spec.md mentions using up to two additional agents with git-subtree for parallel development.

## Print System

**MOST IMPORTANT FEATURE**: Multiple print format support with priority order:

1. **Standard Layout** (PRIORITY 1): Match format from source PDFs
   - Print individual mechs or full lances

2. **Table Layout** (PRIORITY 2): Include hit location and other reference tables
   - Configurable options for which tables to include
   - Based on sheet-with-tables.pdf template

3. **Abbreviated Layout** (FUTURE): Entire lance on one page
   - Requires redesigned critical hit tables
   - Defer until standard layouts complete

## Data Structure

Create a JSON structure extracted from the PDF sheets containing:
- Mech variant specifications
- Tonnage, BV, armor, weapons, equipment
- Internal structure/critical hits
- All data needed for filtering, display, and printing
