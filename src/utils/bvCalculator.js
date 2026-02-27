// BV calculation utilities using skill multipliers

import bvMultipliers from '../../bv-skill-multipliers.json';

/**
 * Calculate adjusted BV based on pilot skills
 * @param {number} baseBV - Base BV (assumes Gunnery 4 / Piloting 5)
 * @param {number} gunnery - Gunnery skill (0-8, lower is better)
 * @param {number} piloting - Piloting skill (0-8, lower is better)
 * @returns {number} Adjusted BV
 */
export function calculateAdjustedBV(baseBV, gunnery, piloting) {
  // Ensure skills are within valid range
  const g = Math.max(0, Math.min(8, gunnery));
  const p = Math.max(0, Math.min(8, piloting));

  // Get multiplier from the table
  const multiplier = bvMultipliers.multipliers[g.toString()][p];

  // Calculate adjusted BV
  return Math.round(baseBV * multiplier);
}

/**
 * Get the skill multiplier for given skills
 * @param {number} gunnery - Gunnery skill (0-8)
 * @param {number} piloting - Piloting skill (0-8)
 * @returns {number} Multiplier
 */
export function getSkillMultiplier(gunnery, piloting) {
  const g = Math.max(0, Math.min(8, gunnery));
  const p = Math.max(0, Math.min(8, piloting));
  return bvMultipliers.multipliers[g.toString()][p];
}

/**
 * Calculate total BV for a lance
 * @param {Array} lanceMechs - Array of lance mechs with adjusted BV
 * @returns {number} Total BV
 */
export function calculateLanceBV(lanceMechs) {
  return lanceMechs.reduce((total, mech) => total + (mech.adjustedBV || 0), 0);
}

/**
 * Find the best skill combination to reach a target BV
 * Uses the standard skill progression where skills increase together
 * Prefers staying at or below target, only exceeding if necessary
 * @param {number} baseBV - Base BV of the mech
 * @param {number} targetBV - Desired total BV for the lance
 * @param {number} currentTotalBV - Current total BV of other mechs
 * @returns {{gunnery: number, piloting: number, adjustedBV: number}} Best skill combo
 */
export function findBestSkillsForTarget(baseBV, targetBV, currentTotalBV) {
  const needed = targetBV - currentTotalBV;
  let bestAtOrUnder = null;
  let bestOver = null;
  let bestAtOrUnderDiff = Infinity;
  let bestOverDiff = Infinity;

  // Standard skill progression matrix (gunnery typically 1 better than piloting)
  const skillCombos = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], // Standard progressions
    [5, 6], [6, 7], [7, 8],
    [0, 0], [1, 1], [2, 2], [3, 3], [4, 4], // Equal skills
    [5, 5], [6, 6], [7, 7], [8, 8]
  ];

  for (const [g, p] of skillCombos) {
    const adjustedBV = calculateAdjustedBV(baseBV, g, p);
    const diff = Math.abs(needed - adjustedBV);

    if (adjustedBV <= needed) {
      // At or under target - prefer closest to target
      if (diff < bestAtOrUnderDiff) {
        bestAtOrUnderDiff = diff;
        bestAtOrUnder = { gunnery: g, piloting: p, adjustedBV };
      }
    } else {
      // Over target - only use if no at-or-under option exists
      if (diff < bestOverDiff) {
        bestOverDiff = diff;
        bestOver = { gunnery: g, piloting: p, adjustedBV };
      }
    }
  }

  // Prefer at-or-under target, only go over if no at-or-under option exists
  return bestAtOrUnder || bestOver || { gunnery: 4, piloting: 5, adjustedBV: calculateAdjustedBV(baseBV, 4, 5) };
}
