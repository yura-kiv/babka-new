import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import AuthLayout from '../components/AuthLayout';

import Home from '../pages/Home';
import Game from '../pages/Game';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'profile',
        element: <AuthLayout requireAuth={true} />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout requireAuth={false} />,
    children: [
      {
        path: 'login',
        element: <Auth />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
