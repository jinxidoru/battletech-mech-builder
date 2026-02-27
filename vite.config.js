import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Get git SHA during build, or use 'development' for dev mode
function getAppVersion(mode) {
  // In development mode, always return 'development'
  if (mode === 'development') {
    return 'development';
  }

  // In production/build mode, try to get git SHA
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch (error) {
    console.log('Could not get git SHA, using "unknown"');
    return 'unknown';
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/battletech-mech-builder/',
  define: {
    __APP_VERSION__: JSON.stringify(getAppVersion(mode)),
  },
}))
