import { useState, useEffect } from 'react';
import MechSelectionView from './components/MechSelectionView';
import LanceEditor from './components/LanceEditor';
import MechPreviewPanel from './components/MechPreviewPanel';
import Version from './components/Version';
import detailedMechsData from './data/mechs';
import { adaptMechsForUI } from './utils/mechAdapter';
import { getBaseMechName, migrateOwnedCounts } from './utils/mechNameUtils';
import './App.css';

// Use real mech data from the mechs.js file
const initialMechs = adaptMechsForUI(detailedMechsData);

function App() {
  const [mechs, setMechs] = useState(initialMechs);
  const [selectedMech, setSelectedMech] = useState(null);
  const [lance, setLance] = useState({
    id: 'lance-1',
    name: 'My Lance',
    mechs: []
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMechs = localStorage.getItem('battletech-mechs');
    const savedOwnedCounts = localStorage.getItem('battletech-owned-counts');

    let ownedByBaseName = {};

    if (savedOwnedCounts) {
      // New format: owned counts stored by base name
      try {
        ownedByBaseName = JSON.parse(savedOwnedCounts);
      } catch (e) {
        console.error('Failed to load owned counts from localStorage', e);
      }
    } else if (savedMechs) {
      // Old format: migrate from mech-specific storage
      try {
        const savedMechsData = JSON.parse(savedMechs);
        ownedByBaseName = migrateOwnedCounts(initialMechs, savedMechsData);
        // Save migrated data in new format
        localStorage.setItem('battletech-owned-counts', JSON.stringify(ownedByBaseName));
      } catch (e) {
        console.error('Failed to migrate mechs from localStorage', e);
      }
    }

    // Apply owned counts to all mechs based on their base name
    const mergedMechs = initialMechs.map(mech => {
      const baseName = getBaseMechName(mech);
      return {
        ...mech,
        ownedCount: ownedByBaseName[baseName] ?? 0
      };
    });
    setMechs(mergedMechs);

    const savedLance = localStorage.getItem('battletech-lance');
    if (savedLance) {
      try {
        setLance(JSON.parse(savedLance));
      } catch (e) {
        console.error('Failed to load lance from localStorage', e);
      }
    }
  }, []);

  // Save owned counts to localStorage when mechs change
  useEffect(() => {
    // Extract owned counts by base name
    const ownedByBaseName = {};
    mechs.forEach(mech => {
      const baseName = getBaseMechName(mech);
      if (mech.ownedCount > 0) {
        ownedByBaseName[baseName] = mech.ownedCount;
      }
    });
    localStorage.setItem('battletech-owned-counts', JSON.stringify(ownedByBaseName));
  }, [mechs]);

  // Save lance to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('battletech-lance', JSON.stringify(lance));
  }, [lance]);

  const handleMechSelect = (mech) => {
    setSelectedMech(mech);
  };

  const handleOwnedCountChange = (mechId, newCount) => {
    setMechs(prevMechs => {
      // Find the mech that was changed to get its base name
      const changedMech = prevMechs.find(m => m.id === mechId);
      if (!changedMech) return prevMechs;

      const baseName = getBaseMechName(changedMech);

      // Update all mechs with the same base name
      return prevMechs.map(m =>
        getBaseMechName(m) === baseName ? { ...m, ownedCount: newCount } : m
      );
    });
  };

  const handleLanceUpdate = (updatedLance) => {
    setLance(updatedLance);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>BattleTech Mech Manager</h1>
          <div className="header-subtitle">
            Build and manage your lance compositions
          </div>
        </div>
      </header>

      <div className="app-layout">
        <div className="left-panel">
          <MechSelectionView
            mechs={mechs}
            onMechSelect={handleMechSelect}
            selectedMech={selectedMech}
            onOwnedCountChange={handleOwnedCountChange}
          />
        </div>

        <div className="center-panel">
          <LanceEditor
            lance={lance}
            mechs={mechs}
            onLanceUpdate={handleLanceUpdate}
            onMechSelect={handleMechSelect}
          />
        </div>

        <div className="right-panel">
          <MechPreviewPanel mech={selectedMech} />
        </div>
      </div>

      <Version />
    </div>
  );
}

export default App;
