import { useState, useEffect } from 'react';
import './SavedLancesDialog.css';

function SavedLancesDialog({ mechs, onClose, onLoadLance }) {
  const [savedLances, setSavedLances] = useState([]);

  useEffect(() => {
    loadSavedLances();
  }, []);

  const loadSavedLances = () => {
    try {
      const savedData = localStorage.getItem('battletech-saved-lances');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.version === '1.0' && Array.isArray(parsed.lances)) {
          setSavedLances(parsed.lances);
        }
      }
    } catch (e) {
      console.error('Failed to load saved lances', e);
    }
  };

  const handleDelete = (lanceId) => {
    if (!window.confirm('Are you sure you want to delete this lance?')) {
      return;
    }

    try {
      const savedData = localStorage.getItem('battletech-saved-lances');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.version === '1.0' && Array.isArray(parsed.lances)) {
          const updatedLances = parsed.lances.filter(lance => lance.id !== lanceId);
          const newData = {
            version: '1.0',
            lances: updatedLances
          };
          localStorage.setItem('battletech-saved-lances', JSON.stringify(newData));
          setSavedLances(updatedLances);
        }
      }
    } catch (e) {
      console.error('Failed to delete lance', e);
      alert('Failed to delete lance');
    }
  };

  const handleLoad = (savedLance) => {
    onLoadLance(savedLance);
    onClose();
  };

  const getMechName = (mechId) => {
    const mech = mechs.find(m => m.id === mechId);
    return mech ? `${mech.name} ${mech.variant}` : 'Unknown Mech';
  };

  const calculateTotalBV = (lanceMechs) => {
    return lanceMechs.reduce((sum, lm) => sum + (lm.adjustedBV || 0), 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="saved-lances-overlay" onClick={onClose}>
      <div className="saved-lances-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="saved-lances-header">
          <h2>Saved Lances</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="saved-lances-content">
          {savedLances.length === 0 ? (
            <div className="no-saved-lances">
              <p>No saved lances yet</p>
              <p className="hint">Build a lance and click "Save Lance" to save it</p>
            </div>
          ) : (
            <div className="saved-lances-list">
              {savedLances.map((lance) => (
                <div key={lance.id} className="saved-lance-item">
                  <div className="saved-lance-info">
                    <h3>{lance.name}</h3>
                    <div className="saved-lance-stats">
                      <span className="stat">
                        <span className="label">Total BV:</span>
                        <span className="value bv-value">{calculateTotalBV(lance.mechs)}</span>
                      </span>
                      <span className="stat">
                        <span className="label">Mechs:</span>
                        <span className="value">{lance.mechs.length}</span>
                      </span>
                    </div>
                    <div className="saved-lance-mechs">
                      {lance.mechs.map((lanceMech, index) => (
                        <span key={index} className="mech-name">
                          {getMechName(lanceMech.mechId)}
                        </span>
                      ))}
                    </div>
                    <div className="saved-lance-dates">
                      <span className="date-info">
                        Created: {formatDate(lance.dateCreated)}
                      </span>
                      {lance.dateModified && lance.dateModified !== lance.dateCreated && (
                        <span className="date-info">
                          Modified: {formatDate(lance.dateModified)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="saved-lance-actions">
                    <button
                      className="load-btn"
                      onClick={() => handleLoad(lance)}
                    >
                      Load
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(lance.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedLancesDialog;
