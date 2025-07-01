import { createBrowserRouter } from 'react-router-dom';
import { Pages } from '@/constants';

import { MainLayout, AuthLayout, AccessGuard } from '@/components/layouts';

import {
  Home,
  Game,
  Profile,
  Auth,
  NotFound,
  Leaders,
  Rules,
  Cash,
  Comic,
  ForgotPassword,
  ResetPassword,
  AskToConfirmEmail,
} from '@/pages';

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
        element: <AccessGuard withAuth withoutActivated />,
        children: [
          {
            path: Pages.AskToConfirmEmail,
            element: <AskToConfirmEmail />,
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
