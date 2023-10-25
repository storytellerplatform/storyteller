import { toast } from "react-toastify";

  export const serverErrorNotify = (errorMsg: string) => toast.error(errorMsg);
