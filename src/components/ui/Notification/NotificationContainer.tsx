import type { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import type { ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NotificationContainer.scss';

interface NotificationContainerProps extends Partial<ToastContainerProps> {}

export const NotificationContainer: FC<NotificationContainerProps> = (props) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      {...props}
    />
  );
};
