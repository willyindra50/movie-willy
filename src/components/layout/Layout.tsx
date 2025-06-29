import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movie/');

  return (
    <div className='min-h-screen bg-zinc-950 flex flex-col'>
      <Header isTransparent={isDetailPage} />
      <main className='flex-1 pt-20'>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            borderRadius: '9999px',
            padding: '12px 24px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          },
          iconTheme: {
            primary: '#00B894',
            secondary: '#fff',
          },
          success: {
            icon: '✅',
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              borderRadius: '9999px',
              padding: '12px 24px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
