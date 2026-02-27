import { useState, useMemo } from 'react';
import MechCard from './MechCard';
import './MechSelectionView.css';

function MechSelectionView({ mechs, onMechSelect, selectedMech, onOwnedCountChange }) {
  const [filters, setFilters] = useState({
    name: '',
    tonnageMin: '',
    tonnageMax: '',
    bvMin: '',
    bvMax: '',
    role: '',
    weapon: '',
    ownedOnly: false
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const filteredMechs = useMemo(() => {
    return mechs.filter(mech => {
      // Name filter
      if (filters.name && !mech.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          !mech.variant.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }

      // Tonnage filters
      if (filters.tonnageMin && mech.tonnage < parseInt(filters.tonnageMin)) {
        return false;
      }
      if (filters.tonnageMax && mech.tonnage > parseInt(filters.tonnageMax)) {
        return false;
      }

      // BV filters
      if (filters.bvMin && mech.baseBV < parseInt(filters.bvMin)) {
        return false;
      }
      if (filters.bvMax && mech.baseBV > parseInt(filters.bvMax)) {
        return false;
      }

      // Role filter
      if (filters.role && mech.role !== filters.role) {
        return false;
      }

      // Weapon filter
      if (filters.weapon) {
        const weaponLower = filters.weapon.toLowerCase();
        const hasWeapon = mech.weapons.some(w =>
          w.toLowerCase().includes(weaponLower)
        );
        if (!hasWeapon) return false;
      }

      // Owned filter
      if (filters.ownedOnly && mech.ownedCount === 0) {
        return false;
      }

      return true;
    });
  }, [mechs, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      tonnageMin: '',
      tonnageMax: '',
      bvMin: '',
      bvMax: '',
      role: '',
      weapon: '',
      ownedOnly: false
    });
  };

  const uniqueRoles = [...new Set(mechs.map(m => m.role))].sort();

  const hasActiveFilters = Object.values(filters).some(v =>
    typeof v === 'boolean' ? v : v !== ''
  );

  return (
    <div className="mech-selection-view">
      <div className="selection-header">
        <h2>Mech Browser</h2>
        <div className="mech-count">
          {filteredMechs.length} of {mechs.length} mechs
        </div>
      </div>

      <div className="filters-panel">
        {/* Basic Filters - Always Visible */}
        <div className="basic-filters">
          <div className="filter-group">
            <label>Search Name/Variant</label>
            <input
              type="text"
              placeholder="Atlas, AS7-D..."
              value={filters.name}
              onChange={(e) => handleFilterChange('name', e.target.value)}
            />
          </div>

          <div className="filter-toggles">
            <div className="filter-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={filters.ownedOnly}
                  onChange={(e) => handleFilterChange('ownedOnly', e.target.checked)}
                />
                <span>Show Only Owned Minis</span>
              </label>
            </div>

            <div className="filter-group checkbox-group">
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

          <button
            className="toggle-advanced-btn"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            {showAdvancedFilters ? '- Hide' : '+ Show'} Advanced Filters
          </button>
        </div>

        {/* Advanced Filters - Collapsible */}
        {showAdvancedFilters && (
          <div className="advanced-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Min Tonnage</label>
                <input
                  type="number"
                  placeholder="20"
                  min="20"
                  max="100"
                  value={filters.tonnageMin}
                  onChange={(e) => handleFilterChange('tonnageMin', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Max Tonnage</label>
                <input
                  type="number"
                  placeholder="100"
                  min="20"
                  max="100"
                  value={filters.tonnageMax}
                  onChange={(e) => handleFilterChange('tonnageMax', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Min BV</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.bvMin}
                  onChange={(e) => handleFilterChange('bvMin', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>Max BV</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={filters.bvMax}
                  onChange={(e) => handleFilterChange('bvMax', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Role</label>
              <select
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Weapon</label>
              <input
                type="text"
                placeholder="PPC, LRM, AC/20..."
                value={filters.weapon}
                onChange={(e) => handleFilterChange('weapon', e.target.value)}
              />
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        )}
      </div>

      <div className="mechs-grid">
        {filteredMechs.length === 0 ? (
          <div className="no-mechs">
            <p>No mechs match your filters</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          filteredMechs.map(mech => (
            <MechCard
              key={mech.id}
              mech={mech}
              onSelect={onMechSelect}
              isSelected={selectedMech?.id === mech.id}
              onOwnedCountChange={onOwnedCountChange}
              compactView={compactView}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MechSelectionView;
