import './Version.css';

function Version() {
  // Access the version from Vite's define config
  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'unknown';

  return (
    <div className="version-info">
      <span className="version-label">v:</span> {version}
    </div>
  );
}

export default Version;
