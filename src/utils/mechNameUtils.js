/**
 * Utility functions for working with mech names and variants
 */

/**
 * Extract the base mech name from a mech object
 * The base name is the mech name without the variant designation
 * @param {Object} mech - Mech object with 'name' property
 * @returns {string} Base mech name (e.g., "Locust")
 */
export function getBaseMechName(mech) {
  return mech.name;
}

/**
 * Migrate old localStorage format (by mech ID) to new format (by base name)
 * @param {Array} mechs - Array of mech objects
 * @param {Array} savedMechsData - Saved mech data from localStorage
 * @returns {Object} Object mapping base names to owned counts
 */
export function migrateOwnedCounts(mechs, savedMechsData) {
  const ownedByBaseName = {};

  // Build a mapping of mech IDs to base names
  const idToBaseName = {};
  mechs.forEach(mech => {
    idToBaseName[mech.id] = getBaseMechName(mech);
  });

  // Convert old format to new format
  savedMechsData.forEach(savedMech => {
    if (savedMech.ownedCount > 0) {
      const baseName = idToBaseName[savedMech.id];
      if (baseName) {
        // If multiple variants were tracked separately, use the max count
        ownedByBaseName[baseName] = Math.max(
          ownedByBaseName[baseName] || 0,
          savedMech.ownedCount
        );
      }
    }
  });

  return ownedByBaseName;
}
