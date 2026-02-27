// Adapter to convert detailed mech data to UI-friendly format

/**
 * Convert detailed mech data to simplified format for UI
 * @param {Object} detailedMech - Mech with full data structure
 * @returns {Object} Simplified mech for UI
 */
export function adaptMechForUI(detailedMech) {
  // Calculate total armor
  const totalArmor = detailedMech.armor
    ? Object.values(detailedMech.armor).reduce((sum, val) => sum + val, 0)
    : 0;

  // Convert weapons array to simple string array
  const weaponsList = detailedMech.weapons
    ? detailedMech.weapons.map(w => w.name)
    : [];

  // Group duplicate weapons
  const weaponCounts = {};
  weaponsList.forEach(weapon => {
    weaponCounts[weapon] = (weaponCounts[weapon] || 0) + 1;
  });

  const weaponSummary = Object.entries(weaponCounts).map(([weapon, count]) => {
    return count > 1 ? `${count}x ${weapon}` : weapon;
  });

  return {
    id: detailedMech.id,
    name: detailedMech.name,
    variant: detailedMech.variant,
    tonnage: detailedMech.tonnage,
    baseBV: detailedMech.bv,
    weapons: weaponSummary,
    role: detailedMech.role || 'Unknown',
    armor: totalArmor,
    speed: detailedMech.movement?.walk || 0,
    jumpJets: detailedMech.movement?.jump || 0,
    ownedCount: 0 // Default to 0, will be loaded from storage
  };
}

/**
 * Adapt an array of detailed mechs to UI format
 * @param {Array} detailedMechs - Array of detailed mech objects
 * @returns {Array} Array of UI-friendly mechs
 */
export function adaptMechsForUI(detailedMechs) {
  return detailedMechs.map(adaptMechForUI);
}
