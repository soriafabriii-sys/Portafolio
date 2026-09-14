import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/Layout/MainLayout';
import { useProtectionMode } from './hooks/useProtectionMode';

function App() {
  useProtectionMode();

  return (
    <LanguageProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
