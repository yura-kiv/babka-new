import { toast } from 'react-toastify';
import type {
  ToastOptions,
  ToastPosition,
  ToastContent,
  Theme,
} from 'react-toastify';
import type { ReactNode } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationOptions extends Omit<ToastOptions, 'type'> {
  position?: ToastPosition;
  autoClose?: number | false;
  theme?: Theme;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  hideProgressBar?: boolean;
}

const defaultOptions: NotificationOptions = {
  position: 'top-right',
  autoClose: 3000,
  theme: 'dark',
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
};

class NotificationService {
  success(message: ToastContent, options?: NotificationOptions): void {
    toast.success(message, { ...defaultOptions, ...options });
  }

  info(message: ToastContent, options?: NotificationOptions): void {
    toast.info(message, { ...defaultOptions, ...options });
  }

  warning(message: ToastContent, options?: NotificationOptions): void {
    toast.warning(message, { ...defaultOptions, ...options });
  }

  error(message: ToastContent, options?: NotificationOptions): void {
    toast.error(message, { ...defaultOptions, ...options });
  }

  custom(message: ToastContent, options?: NotificationOptions): void {
    toast(message, { ...defaultOptions, ...options });
  }

  dismissAll(): void {
    toast.dismiss();
  }

  update(
    toastId: string | number,
    message: ReactNode,
    options?: NotificationOptions
  ): void {
    toast.update(toastId, {
      render: message,
      ...options,
    });
  }
}

export const notificationService = new NotificationService();
