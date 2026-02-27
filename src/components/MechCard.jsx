import { useState } from 'react';
import { abbreviateWeaponName } from '../utils/weaponFormatter';
import './MechCard.css';

function MechCard({ mech, onSelect, isSelected, onOwnedCountChange, compactView }) {
  const [isEditingOwned, setIsEditingOwned] = useState(false);
  const [ownedValue, setOwnedValue] = useState(mech.ownedCount);

  const handleOwnedClick = (e) => {
    e.stopPropagation();
    setIsEditingOwned(true);
  };

  const handleOwnedBlur = () => {
    setIsEditingOwned(false);
    if (onOwnedCountChange) {
      onOwnedCountChange(mech.id, ownedValue);
    }
  };

  const handleOwnedChange = (e) => {
    const inputValue = e.target.value;
    // If empty string, set to 0
    if (inputValue === '') {
      setOwnedValue(0);
      return;
    }
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setOwnedValue(Math.max(0, value));
    }
  };

  const handleOwnedFocus = (e) => {
    // Select all text when focused for easy replacement
    e.target.select();
  };

  const getTonnageClass = () => {
    if (mech.tonnage <= 35) return 'light';
    if (mech.tonnage <= 55) return 'medium';
    if (mech.tonnage <= 75) return 'heavy';
    return 'assault';
  };

  // Compact view - only show essential info
  if (compactView) {
    return (
      <div
        className={`mech-card compact ${isSelected ? 'selected' : ''} ${getTonnageClass()}`}
        onClick={() => onSelect(mech)}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('mechId', mech.id);
          e.dataTransfer.effectAllowed = 'copy';
        }}
      >
        <div className="mech-card-compact-content">
          <div className="compact-name">
            <h3>{mech.name}</h3>
            <span className="variant">{mech.variant}</span>
          </div>
          <div className="compact-stats">
            <span className={`tonnage-badge ${getTonnageClass()}`}>
              {mech.tonnage}t
            </span>
            <span className="bv-badge">{mech.baseBV} BV</span>
          </div>
        </div>
      </div>
    );
  }

  // Standard view
  return (
    <div
      className={`mech-card ${isSelected ? 'selected' : ''} ${getTonnageClass()}`}
      onClick={() => onSelect(mech)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('mechId', mech.id);
        e.dataTransfer.effectAllowed = 'copy';
      }}
    >
      <div className="mech-card-header">
        <div className="mech-card-title">
          <h3>{mech.name}</h3>
          <span className="variant">{mech.variant}</span>
        </div>
        <div className="mech-card-badges">
          <span className={`tonnage-badge ${getTonnageClass()}`}>
            {mech.tonnage}t
          </span>
          <span className="bv-badge">{mech.baseBV} BV</span>
        </div>
      </div>

      <div className="mech-card-body">
        <div className="mech-role">
          <span className="role-badge">{mech.role}</span>
        </div>

        <div className="mech-stats-compact">
          <div className="stat">
            <span className="stat-label">Speed:</span>
            <span className="stat-value">{mech.speed}/{mech.speed * 1.5}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Armor:</span>
            <span className="stat-value">{mech.armor}</span>
          </div>
          {mech.jumpJets > 0 && (
            <div className="stat">
              <span className="stat-label">Jump:</span>
              <span className="stat-value">{mech.jumpJets}</span>
            </div>
          )}
        </div>

        <div className="mech-weapons-compact">
          <span className="weapons-label">Weapons:</span>
          <div className="weapons-list">
            {mech.weapons.slice(0, 3).map((weapon, index) => (
              <span key={index} className="weapon-tag">{abbreviateWeaponName(weapon)}</span>
            ))}
            {mech.weapons.length > 3 && (
              <span className="weapon-tag more">+{mech.weapons.length - 3}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mech-card-footer">
        <div className="owned-section" onClick={handleOwnedClick}>
          <span className="owned-label">Owned:</span>
          {isEditingOwned ? (
            <input
              type="number"
              min="0"
              value={ownedValue}
              onChange={handleOwnedChange}
              onBlur={handleOwnedBlur}
              onFocus={handleOwnedFocus}
              onClick={(e) => e.stopPropagation()}
              autoFocus
              className="owned-input"
            />
          ) : (
            <span className={`owned-count ${mech.ownedCount > 0 ? 'has-mini' : ''}`}>
              {mech.ownedCount}
            </span>
          )}
        </div>
        <div className="drag-hint">Drag to lance</div>
      </div>
    </div>
  );
}

export default MechCard;
