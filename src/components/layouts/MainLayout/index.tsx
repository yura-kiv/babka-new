import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useScroll } from '@/hooks';
import { Header, Footer } from '@/components/shared';

const MainLayout: React.FC = () => {
  const { scrollToTop } = useScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
