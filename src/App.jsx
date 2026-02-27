import { useState, useEffect } from 'react';
import MechSelectionView from './components/MechSelectionView';
import LanceEditor from './components/LanceEditor';
import MechPreviewPanel from './components/MechPreviewPanel';
import Version from './components/Version';
import detailedMechsData from './data/mechs';
import { adaptMechsForUI } from './utils/mechAdapter';
import { getBaseMechName, migrateOwnedCounts } from './utils/mechNameUtils';
import { calculateAdjustedBV } from './utils/bvCalculator';
import { isLanceDirty } from './utils/lanceComparison';
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
  const [targetBV, setTargetBV] = useState(5000);
  const [isDirty, setIsDirty] = useState(false);
  const [savedLanceSnapshot, setSavedLanceSnapshot] = useState(null);

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

    // Load current lance from new format
    const savedCurrentLance = localStorage.getItem('battletech-current-lance');
    if (savedCurrentLance) {
      try {
        const lanceData = JSON.parse(savedCurrentLance);

        // Validate and load lance data
        if (lanceData.version === '1.0' && lanceData.currentLance) {
          const { targetBV: savedTargetBV, mechs: savedMechs, name: savedName } = lanceData.currentLance;

          // Set target BV
          if (typeof savedTargetBV === 'number' && savedTargetBV > 0) {
            setTargetBV(savedTargetBV);
          }

          // Validate and restore mechs
          const validMechs = (savedMechs || [])
            .map(lanceMech => {
              // Validate mech exists in data
              const mech = initialMechs.find(m => m.id === lanceMech.mechId);
              if (!mech) {
                console.warn(`Mech ${lanceMech.mechId} no longer exists, skipping`);
                return null;
              }

              // Validate skill values
              const gunnery = typeof lanceMech.gunnery === 'number' &&
                              lanceMech.gunnery >= 0 &&
                              lanceMech.gunnery <= 8
                              ? lanceMech.gunnery : 4;
              const piloting = typeof lanceMech.piloting === 'number' &&
                              lanceMech.piloting >= 0 &&
                              lanceMech.piloting <= 8
                              ? lanceMech.piloting : 5;

              // Calculate adjusted BV based on restored skills
              const adjustedBV = calculateAdjustedBV(mech.baseBV, gunnery, piloting);

              return {
                mechId: lanceMech.mechId,
                gunnery,
                piloting,
                adjustedBV,
                skillsLocked: lanceMech.locked === true
              };
            })
            .filter(Boolean);

          if (validMechs.length > 0) {
            setLance({
              id: 'lance-1',
              name: savedName || 'My Lance',
              mechs: validMechs
            });
          }
        }
      } catch (e) {
        console.error('Failed to load current lance from localStorage', e);
      }
    } else {
      // Fallback: try old format for migration
      const savedLance = localStorage.getItem('battletech-lance');
      if (savedLance) {
        try {
          const oldLance = JSON.parse(savedLance);
          if (oldLance.mechs && oldLance.mechs.length > 0) {
            setLance(oldLance);
          }
        } catch (e) {
          console.error('Failed to load lance from old format', e);
        }
      }
    }

    // Initialize empty saved lances structure for future
    const savedLances = localStorage.getItem('battletech-saved-lances');
    if (!savedLances) {
      localStorage.setItem('battletech-saved-lances', JSON.stringify({
        version: '1.0',
        lances: []
      }));
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

  // Save current lance to localStorage when it changes
  useEffect(() => {
    const lanceData = {
      version: '1.0',
      currentLance: {
        name: lance.name,
        targetBV,
        mechs: lance.mechs.map(lanceMech => ({
          mechId: lanceMech.mechId,
          gunnery: lanceMech.gunnery,
          piloting: lanceMech.piloting,
          locked: lanceMech.skillsLocked === true
        }))
      }
    };
    localStorage.setItem('battletech-current-lance', JSON.stringify(lanceData));
  }, [lance, targetBV]);

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
    // Use smart dirty detection - only mark dirty if data actually changed
    const dirty = isLanceDirty(updatedLance, targetBV, savedLanceSnapshot);
    setIsDirty(dirty);
  };

  const handleTargetBVChange = (newTargetBV) => {
    setTargetBV(newTargetBV);
    // Use smart dirty detection - only mark dirty if data actually changed
    const dirty = isLanceDirty(lance, newTargetBV, savedLanceSnapshot);
    setIsDirty(dirty);
  };

  const handleLanceNameChange = (newName) => {
    const updatedLance = { ...lance, name: newName };
    setLance(updatedLance);
    // Use smart dirty detection - only mark dirty if data actually changed
    const dirty = isLanceDirty(updatedLance, targetBV, savedLanceSnapshot);
    setIsDirty(dirty);
  };

  const handleClearLance = () => {
    setLance({
      id: 'lance-1',
      name: 'My Lance',
      mechs: []
    });
    setTargetBV(5000);
    setIsDirty(false);
    setSavedLanceSnapshot(null);
    // Clear localStorage
    localStorage.setItem('battletech-current-lance', JSON.stringify({
      version: '1.0',
      currentLance: {
        name: 'My Lance',
        targetBV: 5000,
        mechs: []
      }
    }));
  };

  const handleSaveLance = (lanceName) => {
    if (!lanceName || lanceName.trim() === '') {
      alert('Please enter a lance name');
      return false;
    }

    if (lance.mechs.length === 0) {
      alert('Cannot save an empty lance');
      return false;
    }

    try {
      const savedData = localStorage.getItem('battletech-saved-lances');
      let lancesList = [];

      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.version === '1.0' && Array.isArray(parsed.lances)) {
          lancesList = parsed.lances;
        }
      }

      // Check if lance with same name exists
      const existingIndex = lancesList.findIndex(l => l.name === lanceName);
      const now = new Date().toISOString();

      const lanceToSave = {
        id: existingIndex >= 0 ? lancesList[existingIndex].id : `lance-${Date.now()}`,
        name: lanceName,
        targetBV,
        mechs: lance.mechs.map(lm => ({
          mechId: lm.mechId,
          gunnery: lm.gunnery,
          piloting: lm.piloting,
          adjustedBV: lm.adjustedBV,
          skillsLocked: lm.skillsLocked
        })),
        dateCreated: existingIndex >= 0 ? lancesList[existingIndex].dateCreated : now,
        dateModified: now
      };

      if (existingIndex >= 0) {
        // Update existing lance
        lancesList[existingIndex] = lanceToSave;
      } else {
        // Add new lance
        lancesList.push(lanceToSave);
      }

      const newData = {
        version: '1.0',
        lances: lancesList
      };

      localStorage.setItem('battletech-saved-lances', JSON.stringify(newData));

      // Mark as clean and save snapshot
      setIsDirty(false);
      setSavedLanceSnapshot({
        name: lanceName,
        targetBV,
        mechs: lance.mechs.map(lm => ({
          mechId: lm.mechId,
          gunnery: lm.gunnery,
          piloting: lm.piloting,
          adjustedBV: lm.adjustedBV,
          skillsLocked: lm.skillsLocked
        }))
      });

      return true;
    } catch (e) {
      console.error('Failed to save lance', e);
      alert('Failed to save lance');
      return false;
    }
  };

  const handleLoadLance = (savedLance) => {
    try {
      // Validate mechs still exist
      const validMechs = savedLance.mechs
        .map(lanceMech => {
          const mech = initialMechs.find(m => m.id === lanceMech.mechId);
          if (!mech) {
            console.warn(`Mech ${lanceMech.mechId} no longer exists, skipping`);
            return null;
          }
          return lanceMech;
        })
        .filter(Boolean);

      if (validMechs.length === 0) {
        alert('None of the mechs in this lance are available');
        return;
      }

      // Set the lance with the loaded name
      setLance({
        id: 'lance-1',
        name: savedLance.name || 'My Lance',
        mechs: validMechs
      });

      // Set target BV
      if (typeof savedLance.targetBV === 'number' && savedLance.targetBV > 0) {
        setTargetBV(savedLance.targetBV);
      }

      // Mark as clean and save snapshot
      setIsDirty(false);
      setSavedLanceSnapshot({
        name: savedLance.name || 'My Lance',
        targetBV: savedLance.targetBV || 5000,
        mechs: validMechs.map(lm => ({
          mechId: lm.mechId,
          gunnery: lm.gunnery,
          piloting: lm.piloting,
          adjustedBV: lm.adjustedBV,
          skillsLocked: lm.skillsLocked
        }))
      });
    } catch (e) {
      console.error('Failed to load lance', e);
      alert('Failed to load lance');
    }
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
            targetBV={targetBV}
            onTargetBVChange={handleTargetBVChange}
            onClearLance={handleClearLance}
            onSaveLance={handleSaveLance}
            onLoadLance={handleLoadLance}
            onLanceNameChange={handleLanceNameChange}
            isDirty={isDirty}
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
