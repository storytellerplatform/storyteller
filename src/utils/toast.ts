import { toast } from "react-toastify";

export const serverErrorNotify = (errorMsg: string) => toast.error(errorMsg, { 
  position: 'bottom-center', 
  autoClose: 3000,
  className: 'py-4'
});

export const successNotification = (successMsg: string) => toast.success(successMsg, {
  position: 'top-right',
  autoClose: 6000,
  className: 'font-bold'
});

export const emailSendingNotification = (notification: string) => toast.success(notification, { position: 'top-center' });
