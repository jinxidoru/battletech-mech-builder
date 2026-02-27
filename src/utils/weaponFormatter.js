/**
 * Utility functions for formatting weapon names in the UI
 */

/**
 * Abbreviate weapon names for compact display
 * @param {string} weaponName - Full weapon name (e.g., "Medium Laser", "2x Small Laser")
 * @returns {string} Abbreviated weapon name (e.g., "ML", "2x SL")
 */
export function abbreviateWeaponName(weaponName) {
  const abbreviations = {
    'Small Laser': 'SL',
    'Medium Laser': 'ML',
    'Large Laser': 'LL',
    'ER Small Laser': 'ER-SL',
    'ER Medium Laser': 'ER-ML',
    'ER Large Laser': 'ER-LL'
  };

  // Check if the weapon name starts with a count (e.g., "2x Medium Laser")
  const countMatch = weaponName.match(/^(\d+x\s+)(.+)$/);
  if (countMatch) {
    const count = countMatch[1];
    const name = countMatch[2];
    const abbreviated = abbreviations[name];
    return abbreviated ? count + abbreviated : weaponName;
  }

  // Return abbreviated name or original if not found
  return abbreviations[weaponName] || weaponName;
}
