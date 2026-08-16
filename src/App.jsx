import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import AdminPanelModal from './components/AdminPanelModal';

function AppContent() {
  const { themeSettings, setIsAdminModalOpen } = useApp();
  const primaryColor = themeSettings?.primaryColor || '#10b981';

  // Force admin panel to be open always on this site
  useEffect(() => {
    setIsAdminModalOpen(true);
  }, [setIsAdminModalOpen]);

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 font-sans antialiased selection:bg-emerald-600 selection:text-white"
         style={{ 
           '--color-emerald-400': primaryColor,
           '--color-emerald-500': primaryColor,
           '--color-emerald-600': primaryColor,
           '--color-emerald-900': primaryColor + '40'
         }}>
      {/* 
        This is the Admin Site. 
        It only renders the AdminPanelModal in full screen.
      */}
      <AdminPanelModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
