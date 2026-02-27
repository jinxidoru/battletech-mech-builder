/**
 * Deep comparison utility for lance data
 * Checks if current lance state differs from saved snapshot
 */

export const compareLanceMechs = (currentMechs, savedMechs) => {
  if (!Array.isArray(currentMechs) || !Array.isArray(savedMechs)) {
    return true; // Different if either is not an array
  }

  if (currentMechs.length !== savedMechs.length) {
    return true; // Different if length differs
  }

  // Compare each mech by mechId, gunnery, piloting, and locked status
  return !currentMechs.every((currentMech, index) => {
    const savedMech = savedMechs[index];
    if (!savedMech) return false;

    return (
      currentMech.mechId === savedMech.mechId &&
      currentMech.gunnery === savedMech.gunnery &&
      currentMech.piloting === savedMech.piloting &&
      currentMech.skillsLocked === savedMech.skillsLocked
    );
  });
};

export const isLanceDirty = (currentLance, currentTargetBV, savedSnapshot) => {
  // If no saved snapshot, it's dirty
  if (!savedSnapshot) {
    return true;
  }

  // Compare lance name
  if (currentLance.name !== savedSnapshot.name) {
    return true;
  }

  // Compare target BV
  if (currentTargetBV !== savedSnapshot.targetBV) {
    return true;
  }

  // Compare mechs using deep comparison
  if (compareLanceMechs(currentLance.mechs, savedSnapshot.mechs)) {
    return true;
  }

  // No differences found
  return false;
};
