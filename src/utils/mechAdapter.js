// Adapter to convert detailed mech data to UI-friendly format

/**
 * Convert detailed mech data to simplified format for UI
 * @param {Object} detailedMech - Mech with full data structure
 * @returns {Object} Simplified mech for UI
 */
export function adaptMechForUI(detailedMech) {
  // Calculate total armor from array format: [head, CT, CTr, LT, LTr, RT, RTr, LA, RA, LL, RL]
  const totalArmor = Array.isArray(detailedMech.armor)
    ? detailedMech.armor.reduce((sum, val) => sum + val, 0)
    : (detailedMech.armor && typeof detailedMech.armor === 'object'
        ? Object.values(detailedMech.armor).reduce((sum, val) => sum + val, 0)
        : 0);

  // Convert weapons array from [qty, location, weaponRef] format
  // weaponRef is an object with name, heat, damage, etc.
  const weaponsList = detailedMech.weapons
    ? detailedMech.weapons.flatMap(([qty, location, weaponRef]) => {
        // Create array with qty instances of the weapon name
        return Array(qty).fill(weaponRef.name);
      })
    : [];

  // Group duplicate weapons
  const weaponCounts = {};
  weaponsList.forEach(weapon => {
    weaponCounts[weapon] = (weaponCounts[weapon] || 0) + 1;
  });

  const weaponSummary = Object.entries(weaponCounts).map(([weapon, count]) => {
    return count > 1 ? `${count}x ${weapon}` : weapon;
  });

  // Extract movement from array format: [walk, run, jump]
  let walkSpeed = 0;
  let runSpeed = 0;
  let jumpSpeed = 0;

  if (Array.isArray(detailedMech.movement)) {
    walkSpeed = detailedMech.movement[0] || 0;
    runSpeed = detailedMech.movement[1] || 0;
    jumpSpeed = detailedMech.movement[2] || 0;
  } else if (detailedMech.movement && typeof detailedMech.movement === 'object') {
    walkSpeed = detailedMech.movement.walk || 0;
    runSpeed = detailedMech.movement.run || 0;
    jumpSpeed = detailedMech.movement.jump || 0;
  }

  return {
    id: detailedMech.id,
    name: detailedMech.name,
    variant: detailedMech.variant,
    tonnage: detailedMech.tonnage,
    baseBV: detailedMech.bv,
    weapons: weaponSummary,
    role: detailedMech.role || 'Unknown',
    armor: totalArmor,
    speed: walkSpeed,
    runSpeed: runSpeed,
    jumpJets: jumpSpeed,
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
