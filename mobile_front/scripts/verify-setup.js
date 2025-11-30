#!/usr/bin/env node

// Simple verification script to check if main components can be imported
console.log('Verifying SuperSlice Mobile setup...');

try {
  // Try importing main components
  const App = require('../App');
  console.log('✓ App component imported successfully');
  
  const dataService = require('../services/dataService');
  console.log('✓ Data service imported successfully');
  
  const mockData = require('../screens/data/mokup.json');
  console.log('✓ Mock data imported successfully');
  
  console.log('\n✅ All components imported successfully! The setup is working correctly.');
  console.log('\nTo start the development server, run:');
  console.log('npm start');
  
} catch (error) {
  console.error('❌ Error importing components:', error.message);
  process.exit(1);
}
