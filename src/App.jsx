import { useState, useEffect } from 'react';
import MechSelectionView from './components/MechSelectionView';
import LanceEditor from './components/LanceEditor';
import MechPreviewPanel from './components/MechPreviewPanel';
import detailedMechsData from './data/mechs';
import { adaptMechsForUI } from './utils/mechAdapter';
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
    if (savedMechs) {
      try {
        const savedMechsData = JSON.parse(savedMechs);
        // Merge saved owned counts with the real mech data
        const mergedMechs = initialMechs.map(mech => {
          const savedMech = savedMechsData.find(m => m.id === mech.id);
          return {
            ...mech,
            ownedCount: savedMech?.ownedCount ?? 0
          };
        });
        setMechs(mergedMechs);
      } catch (e) {
        console.error('Failed to load mechs from localStorage', e);
      }
    }

    const savedLance = localStorage.getItem('battletech-lance');
    if (savedLance) {
      try {
        setLance(JSON.parse(savedLance));
      } catch (e) {
        console.error('Failed to load lance from localStorage', e);
      }
    }
  }, []);

  // Save mechs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('battletech-mechs', JSON.stringify(mechs));
  }, [mechs]);

  // Save lance to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('battletech-lance', JSON.stringify(lance));
  }, [lance]);

  const handleMechSelect = (mech) => {
    setSelectedMech(mech);
  };

  const handleOwnedCountChange = (mechId, newCount) => {
    setMechs(prevMechs =>
      prevMechs.map(m =>
        m.id === mechId ? { ...m, ownedCount: newCount } : m
      )
    );
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
    </div>
  );
}

export default App;
