import { useEffect } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import useScroll from '@/hooks/useScroll';
import { useLocation } from 'react-router-dom';

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
