// Type definitions for BattleTech mech management

/**
 * @typedef {Object} Mech
 * @property {string} id - Unique identifier
 * @property {string} name - Mech name (e.g., "Atlas")
 * @property {string} variant - Variant code (e.g., "AS7-D")
 * @property {number} tonnage - Mech weight in tons
 * @property {number} baseBV - Base Battle Value (assumes Gunnery 4 / Piloting 5)
 * @property {string[]} weapons - List of weapons
 * @property {string} role - Combat role (e.g., "Juggernaut", "Striker")
 * @property {number} armor - Total armor points
 * @property {number} speed - Walking speed
 * @property {number} jumpJets - Jump jet capability
 * @property {number} ownedCount - Number of owned minis
 */

/**
 * @typedef {Object} LanceMech
 * @property {string} mechId - Reference to mech ID
 * @property {number} gunnery - Gunnery skill (0-8, lower is better)
 * @property {number} piloting - Piloting skill (0-8, lower is better)
 * @property {number} adjustedBV - BV adjusted for pilot skills
 * @property {boolean} skillsLocked - Whether skills are locked during auto-balance
 */

/**
 * @typedef {Object} Lance
 * @property {string} id - Unique identifier
 * @property {string} name - Lance name
 * @property {LanceMech[]} mechs - Mechs in the lance
 * @property {number} totalBV - Total Battle Value
 */

export const BASELINE_SKILLS = {
  gunnery: 4,
  piloting: 5
};

export const MECH_ROLES = [
  'Juggernaut',
  'Sniper',
  'Striker',
  'Scout',
  'Brawler',
  'Skirmisher',
  'Missile Boat'
];

export const TONNAGE_CLASSES = {
  Light: [20, 35],
  Medium: [40, 55],
  Heavy: [60, 75],
  Assault: [80, 100]
};
