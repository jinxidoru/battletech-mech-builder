import { abbreviateWeaponName } from '../utils/weaponFormatter';
import './MechPreviewPanel.css';

function MechPreviewPanel({ mech }) {
  if (!mech) {
    return (
      <div className="mech-preview-panel">
        <div className="preview-empty">
          <div className="preview-icon">🤖</div>
          <p>Select a mech to view details</p>
        </div>
      </div>
    );
  }

  const getTonnageClass = () => {
    if (mech.tonnage <= 35) return 'light';
    if (mech.tonnage <= 55) return 'medium';
    if (mech.tonnage <= 75) return 'heavy';
    return 'assault';
  };

  const getTonnageClassName = () => {
    if (mech.tonnage <= 35) return 'Light';
    if (mech.tonnage <= 55) return 'Medium';
    if (mech.tonnage <= 75) return 'Heavy';
    return 'Assault';
  };

  return (
    <div className="mech-preview-panel">
      <div className="preview-header">
        <div className="preview-title">
          <h2>{mech.name}</h2>
          <span className="preview-variant">{mech.variant}</span>
        </div>
        <div className={`tonnage-class-badge ${getTonnageClass()}`}>
          {getTonnageClassName()}
        </div>
      </div>

      <div className="preview-content">
        <div className="preview-section">
          <h3>Overview</h3>
          <div className="preview-stats-grid">
            <div className="preview-stat">
              <span className="preview-stat-label">Tonnage</span>
              <span className="preview-stat-value">{mech.tonnage} tons</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Base BV</span>
              <span className="preview-stat-value highlight">{mech.baseBV}</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Role</span>
              <span className="preview-stat-value">{mech.role}</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Armor</span>
              <span className="preview-stat-value">{mech.armor} pts</span>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <h3>Movement</h3>
          <div className="preview-stats-grid">
            <div className="preview-stat">
              <span className="preview-stat-label">Walk</span>
              <span className="preview-stat-value">{mech.speed}</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Run</span>
              <span className="preview-stat-value">{Math.floor(mech.speed * 1.5)}</span>
            </div>
            <div className="preview-stat">
              <span className="preview-stat-label">Jump</span>
              <span className="preview-stat-value">
                {mech.jumpJets > 0 ? mech.jumpJets : 'None'}
              </span>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <h3>Armament</h3>
          <div className="weapons-preview-list">
            {mech.weapons.map((weapon, index) => (
              <div key={index} className="weapon-preview-item">
                <span className="weapon-bullet">•</span>
                <span className="weapon-name">{abbreviateWeaponName(weapon)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="preview-section">
          <h3>Owned Minis</h3>
          <div className="owned-preview">
            {mech.ownedCount > 0 ? (
              <div className="owned-info has-mini">
                <span className="owned-icon">✓</span>
                <span className="owned-text">
                  {mech.ownedCount} {mech.ownedCount === 1 ? 'mini' : 'minis'} owned
                </span>
              </div>
            ) : (
              <div className="owned-info no-mini">
                <span className="owned-icon">✗</span>
                <span className="owned-text">No minis owned</span>
              </div>
            )}
          </div>
        </div>

        <div className="preview-footer">
          <div className="preview-note">
            <strong>Base BV</strong> assumes Gunnery 4 / Piloting 5 skills.
            Adjust skills in lance editor to modify BV.
          </div>
        </div>
      </div>
    </div>
  );
}

export default MechPreviewPanel;
