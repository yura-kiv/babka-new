import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useScroll } from '@/hooks';
import { Header, Footer } from '@/components/shared';
import { userApi } from '@/api/user';
import { useAppSelector } from '@/store/hooks';
import { getUserToken } from '@/store/helpers/selectors';
import { setUserState } from '@/store/helpers/actions';

const MainLayout: React.FC = () => {
  const token = useAppSelector(getUserToken);
  const { scrollToTop } = useScroll();
  const { pathname } = useLocation();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userRes = await userApi.getUserInfo();
        const balanceRes = await userApi.getBalance();

        const { data: userData } = userRes.data;
        const { data: balanceData } = balanceRes.data;
        const data = { ...userData, ...balanceData };

        setUserState(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (token) {
      getUserInfo();
    }
  }, []);

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
