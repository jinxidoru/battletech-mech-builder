import { useState } from 'react';
import { calculateAdjustedBV, calculateLanceBV, findBestSkillsForTarget } from '../utils/bvCalculator';
import { BASELINE_SKILLS } from '../types';
import { abbreviateWeaponName } from '../utils/weaponFormatter';
import './LanceEditor.css';

function LanceEditor({ lance, mechs, onLanceUpdate, onMechSelect, targetBV, onTargetBVChange, onClearLance }) {
  const [compactView, setCompactView] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const mechId = e.dataTransfer.getData('mechId');
    const mech = mechs.find(m => m.id === mechId);

    if (mech) {
      const newLanceMech = {
        mechId: mech.id,
        gunnery: BASELINE_SKILLS.gunnery,
        piloting: BASELINE_SKILLS.piloting,
        adjustedBV: mech.baseBV,
        skillsLocked: false
      };

      onLanceUpdate({
        ...lance,
        mechs: [...lance.mechs, newLanceMech]
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleRemoveMech = (index) => {
    const newMechs = lance.mechs.filter((_, i) => i !== index);
    onLanceUpdate({
      ...lance,
      mechs: newMechs
    });
  };

  const handleSkillChange = (index, skill, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 8) return;

    const newMechs = [...lance.mechs];
    newMechs[index] = {
      ...newMechs[index],
      [skill]: numValue
    };

    // Recalculate BV
    const mech = mechs.find(m => m.id === newMechs[index].mechId);
    newMechs[index].adjustedBV = calculateAdjustedBV(
      mech.baseBV,
      newMechs[index].gunnery,
      newMechs[index].piloting
    );

    onLanceUpdate({
      ...lance,
      mechs: newMechs
    });
  };

  const handleLockToggle = (index) => {
    const newMechs = [...lance.mechs];
    newMechs[index] = {
      ...newMechs[index],
      skillsLocked: !newMechs[index].skillsLocked
    };

    onLanceUpdate({
      ...lance,
      mechs: newMechs
    });
  };

  const handleAutoBalance = () => {
    const target = typeof targetBV === 'number' ? targetBV : parseInt(targetBV);
    if (isNaN(target) || target <= 0) {
      alert('Please enter a valid target BV');
      return;
    }

    const newMechs = [...lance.mechs];
    const lockedBV = newMechs
      .filter(lm => lm.skillsLocked)
      .reduce((sum, lm) => sum + lm.adjustedBV, 0);

    const unlockedMechs = newMechs.filter(lm => !lm.skillsLocked);
    const remainingBV = target - lockedBV;

    if (unlockedMechs.length === 0) {
      alert('All mechs are locked. Unlock at least one mech to auto-balance.');
      return;
    }

    // Distribute remaining BV evenly among unlocked mechs
    const bvPerMech = remainingBV / unlockedMechs.length;

    unlockedMechs.forEach((lanceMech) => {
      const mech = mechs.find(m => m.id === lanceMech.mechId);
      const bestSkills = findBestSkillsForTarget(mech.baseBV, bvPerMech, 0);

      const index = newMechs.findIndex(lm => lm === lanceMech);
      newMechs[index] = {
        ...lanceMech,
        gunnery: bestSkills.gunnery,
        piloting: bestSkills.piloting,
        adjustedBV: bestSkills.adjustedBV
      };
    });

    onLanceUpdate({
      ...lance,
      mechs: newMechs
    });
  };

  const totalBV = calculateLanceBV(lance.mechs);
  const totalTonnage = lance.mechs.reduce((sum, lm) => {
    const mech = mechs.find(m => m.id === lm.mechId);
    return sum + (mech?.tonnage || 0);
  }, 0);

  // Check for warnings
  const targetBVNum = typeof targetBV === 'number' ? targetBV : parseInt(targetBV);
  const showBVWarning = !isNaN(targetBVNum) && targetBVNum > 0 && totalBV > targetBVNum;
  const mechCount = lance.mechs.length;
  const showMechCountWarning = mechCount > 0 && mechCount !== 4 && mechCount !== 5;

  const getTonnageClass = (tonnage) => {
    if (tonnage <= 35) return 'light';
    if (tonnage <= 55) return 'medium';
    if (tonnage <= 75) return 'heavy';
    return 'assault';
  };

  return (
    <div className="lance-editor">
      <div className="lance-header">
        <div className="lance-title">
          <h2>{lance.name || 'New Lance'}</h2>
          <div className="lance-stats">
            <div className="lance-stat">
              <span className="stat-label">Total BV:</span>
              <span className="stat-value bv-value">{totalBV}</span>
              {showBVWarning && (
                <span
                  className="warning-indicator"
                  title={`Total BV (${totalBV}) exceeds target BV (${targetBVNum})`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/>
                  </svg>
                </span>
              )}
            </div>
            <div className="lance-stat">
              <span className="stat-label">Total Tonnage:</span>
              <span className="stat-value">{totalTonnage}t</span>
            </div>
            <div className="lance-stat">
              <span className="stat-label">Mechs:</span>
              <span className="stat-value">{lance.mechs.length}</span>
              {showMechCountWarning && (
                <span
                  className="warning-indicator"
                  title={`Mech count (${mechCount}) is non-standard. Standard sizes: 4 (Lance) or 5 (Star)`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/>
                  </svg>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="lance-header-controls">
          <div className="auto-balance-section">
            <input
              type="number"
              placeholder="Target BV"
              value={targetBV}
              onChange={(e) => onTargetBVChange(parseInt(e.target.value) || 0)}
              className="target-bv-input"
            />
            <button
              onClick={handleAutoBalance}
              disabled={lance.mechs.length === 0}
              className="auto-balance-btn"
            >
              Auto-Balance
            </button>
            <button
              onClick={onClearLance}
              disabled={lance.mechs.length === 0}
              className="clear-lance-btn"
              title="Clear all mechs from lance"
            >
              Clear Lance
            </button>
          </div>
          <div className="compact-toggle">
            <label>
              <input
                type="checkbox"
                checked={compactView}
                onChange={(e) => setCompactView(e.target.checked)}
              />
              <span>Compact View</span>
            </label>
          </div>
        </div>
      </div>

      <div
        className={`lance-drop-zone ${lance.mechs.length === 0 ? 'empty' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {lance.mechs.length === 0 ? (
          <div className="drop-placeholder">
            <div className="drop-icon">+</div>
            <p>Drag mechs here to build your lance</p>
          </div>
        ) : (
          <div className="lance-mechs-list">
            {lance.mechs.map((lanceMech, index) => {
              const mech = mechs.find(m => m.id === lanceMech.mechId);
              if (!mech) return null;

              if (compactView) {
                return (
                  <div
                    key={index}
                    className={`lance-mech-item compact clickable ${getTonnageClass(mech.tonnage)}`}
                    onClick={() => onMechSelect && onMechSelect(mech)}
                    title="Click to preview this mech"
                  >
                    <div className="lance-mech-compact-header">
                      <div className="lance-mech-info">
                        <h3>{mech.name}</h3>
                        <span className="variant">{mech.variant}</span>
                      </div>
                    </div>

                    <div className="lance-mech-compact-content">
                      <div className="compact-badges">
                        <span className={`tonnage-badge ${getTonnageClass(mech.tonnage)}`}>
                          {mech.tonnage}t
                        </span>
                        <span className="bv-badge">{lanceMech.adjustedBV} BV</span>
                        <span className="role-badge">{mech.role}</span>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMech(index);
                        }}
                        title="Remove from lance"
                      >
                        ×
                      </button>
                    </div>

                    <div className="lance-mech-skills">
                      <div className="skill-control">
                        <label>G:</label>
                        <input
                          type="number"
                          min="0"
                          max="8"
                          value={lanceMech.gunnery}
                          onChange={(e) => handleSkillChange(index, 'gunnery', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={lanceMech.skillsLocked}
                        />
                      </div>

                      <div className="skill-control">
                        <label>P:</label>
                        <input
                          type="number"
                          min="0"
                          max="8"
                          value={lanceMech.piloting}
                          onChange={(e) => handleSkillChange(index, 'piloting', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={lanceMech.skillsLocked}
                        />
                      </div>

                      <button
                        className={`lock-btn ${lanceMech.skillsLocked ? 'locked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLockToggle(index);
                        }}
                        title={lanceMech.skillsLocked ? 'Unlock skills' : 'Lock skills'}
                      >
                        {lanceMech.skillsLocked ? '🔒' : '🔓'}
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`lance-mech-item clickable ${getTonnageClass(mech.tonnage)}`}
                  onClick={() => onMechSelect && onMechSelect(mech)}
                  title="Click to preview this mech"
                >
                  <div className="lance-mech-header">
                    <div className="lance-mech-info">
                      <h3>{mech.name}</h3>
                      <span className="variant">{mech.variant}</span>
                    </div>
                  </div>
                  <div className="lance-mech-badges">
                    <span className={`tonnage-badge ${getTonnageClass(mech.tonnage)}`}>
                      {mech.tonnage}t
                    </span>
                    <span className="bv-badge">{lanceMech.adjustedBV} BV</span>
                    <span className="role-badge">{mech.role}</span>
                  </div>

                  <div className="lance-mech-body">
                    <div className="lance-mech-movement-stats">
                      <div className="stat">
                        <span className="stat-label">Speed:</span>
                        <span className="stat-value">{mech.speed}/{mech.runSpeed}</span>
                      </div>
                      {mech.jumpJets > 0 && (
                        <div className="stat">
                          <span className="stat-label">Jump:</span>
                          <span className="stat-value">{mech.jumpJets}</span>
                        </div>
                      )}
                      <div className="stat">
                        <span className="stat-label">Armor:</span>
                        <span className="stat-value">{mech.armor}</span>
                      </div>
                    </div>

                    <div className="lance-mech-weapons">
                      <span className="weapons-label">Weapons:</span>
                      <div className="weapons-list">
                        {mech.weapons.slice(0, 3).map((weapon, wIndex) => (
                          <span key={wIndex} className="weapon-tag">{abbreviateWeaponName(weapon)}</span>
                        ))}
                        {mech.weapons.length > 3 && (
                          <span className="weapon-tag more">+{mech.weapons.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {mech.ownedCount > 0 && (
                      <div className="owned-indicator">
                        <span className="owned-icon">✓</span>
                        <span className="owned-text">Owned: {mech.ownedCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="lance-mech-footer">
                    <div className="lance-mech-skills">
                      <div className="skill-control">
                        <label>Gunnery:</label>
                        <input
                          type="number"
                          min="0"
                          max="8"
                          value={lanceMech.gunnery}
                          onChange={(e) => handleSkillChange(index, 'gunnery', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={lanceMech.skillsLocked}
                        />
                      </div>

                      <div className="skill-control">
                        <label>Piloting:</label>
                        <input
                          type="number"
                          min="0"
                          max="8"
                          value={lanceMech.piloting}
                          onChange={(e) => handleSkillChange(index, 'piloting', e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          disabled={lanceMech.skillsLocked}
                        />
                      </div>

                      <button
                        className={`lock-btn ${lanceMech.skillsLocked ? 'locked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLockToggle(index);
                        }}
                        title={lanceMech.skillsLocked ? 'Unlock skills' : 'Lock skills'}
                      >
                        {lanceMech.skillsLocked ? '🔒' : '🔓'}
                      </button>
                    </div>

                    <div className="adjusted-bv-with-remove">
                      <div className="adjusted-bv-display">
                        <span className="label">Adjusted BV:</span>
                        <span className="value">{lanceMech.adjustedBV}</span>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMech(index);
                        }}
                        title="Remove from lance"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default LanceEditor;
