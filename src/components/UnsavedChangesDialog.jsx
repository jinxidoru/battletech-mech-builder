import './UnsavedChangesDialog.css';

function UnsavedChangesDialog({ onSaveAndContinue, onDiscard, onCancel }) {
  return (
    <div className="unsaved-changes-overlay" onClick={onCancel}>
      <div className="unsaved-changes-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="unsaved-changes-header">
          <h2>Unsaved Changes</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <div className="unsaved-changes-content">
          <div className="warning-icon">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/>
            </svg>
          </div>
          <p>You have unsaved changes to your lance.</p>
          <p>What would you like to do?</p>
        </div>

        <div className="unsaved-changes-actions">
          <button
            className="save-continue-btn"
            onClick={onSaveAndContinue}
          >
            Save & Continue
          </button>
          <button
            className="discard-btn"
            onClick={onDiscard}
          >
            Discard Changes
          </button>
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnsavedChangesDialog;
