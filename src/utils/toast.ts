import { toast } from "react-toastify";

export const serverErrorNotify = (errorMsg: string) => toast.error(errorMsg, { 
  position: 'bottom-center', 
  autoClose: 3000,
  className: 'py-4'
});

export const emailSendingNotification = (notification: string) => toast.success(notification, { position: 'top-center' });
