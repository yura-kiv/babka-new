import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

import Home from '@/pages/Home';
import Game from '@/pages/Game';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Leaders from '@/pages/Leaders';
import Rules from '@/pages/Rules';
import Cash from '@/pages/Cash';
import { Pages } from '@/constants';

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
        path: Pages.Game,
        element: <Game />,
      },
      {
        path: Pages.Profile,
        element: <AuthLayout requireAuth={true} />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: Pages.Leaders,
        element: <Leaders />,
      },
      {
        path: Pages.Rules,
        element: <Rules />,
      },
      {
        path: Pages.Cash,
        element: <Cash />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: Pages.Auth,
    element: <AuthLayout requireAuth={false} />,
    children: [
      {
        index: true,
        element: <Auth />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
