import { Outlet } from 'react-router-dom';
import NavBar from '@/components/block/NavBar';
import Footer from '@/components/block/Footer';

const ThemeProvider = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ThemeProvider;
