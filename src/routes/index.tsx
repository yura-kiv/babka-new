import { createBrowserRouter } from 'react-router-dom';

import { Pages } from '@/constants';

import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import AccessGuard from '@/components/layouts/AccessGuard';

import Home from '@/pages/Home';
import Game from '@/pages/Game';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Leaders from '@/pages/Leaders';
import Rules from '@/pages/Rules';
import Cash from '@/pages/Cash';
import Comic from '@/pages/Comic';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import AskToConfirmEmail from '@/pages/AskToConfirmEmail';
import ConfirmEmail from '@/pages/ConfirmEmail';

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
        path: Pages.Leaders,
        element: <Leaders />,
      },
      {
        path: Pages.Rules,
        element: <Rules />,
      },
      {
        path: Pages.Comic,
        element: <Comic />,
      },
      {
        element: <AccessGuard withAuth />,
        children: [
          {
            path: Pages.Profile,
            element: <Profile />,
          },
          {
            path: Pages.Cash,
            element: <Cash />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <AccessGuard withoutAuth />,
        children: [
          {
            path: Pages.Auth,
            element: <Auth />,
          },
          {
            path: Pages.ForgotPassword,
            element: <ForgotPassword />,
          },
        ],
      },
      {
        element: <AccessGuard withAuth withoutConfirmed />,
        children: [
          {
            path: Pages.AskToConfirmEmail,
            element: <AskToConfirmEmail />,
          },
          {
            path: Pages.ConfirmEmail,
            element: <ConfirmEmail />,
          },
        ],
      },
      {
        path: Pages.ResetPassword,
        element: <ResetPassword />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
