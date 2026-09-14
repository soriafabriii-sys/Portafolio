import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import GifPage from '../pages/GifPage';
import PcbackPage from '../pages/PcbackPage';
import PstylePage from '../pages/PstylePage';
import XatspacePage from '../pages/XatspacePage';
import ReproductoresPage from '../pages/ReproductoresPage';
import SalaPage from '../pages/SalaPage';
import { useAppContext } from '../../hooks/useAppContext';
import Lightbox from '../Lightbox/Lightbox';

export default function MainLayout() {
  const { currentCategory } = useAppContext();

  const renderPage = () => {
    switch (currentCategory) {
      case 'home':
        return <Home />;
      case 'animated':
        return <GifPage />;
      case 'static':
        return <PcbackPage />;
      case 'pstyle':
        return <PstylePage />;
      case 'xatspaces':
        return <XatspacePage />;
      case 'reproductores':
        return <ReproductoresPage />;
      case 'sala':
        return <SalaPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f0f0f', overflowX: 'hidden' }}>
      <Sidebar />
      <div className="main-column" style={{ flex: 1, minWidth: 0, marginLeft: '100px', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
          {renderPage()}
        </main>
      </div>
      <Lightbox />
    </div>
  );
}
