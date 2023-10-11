export type ErrorCode = 'ACCOUNT_EXISTS' | 'EMAIL_EXISTS' | 'INVALID_PASSWORD' | 'SIGNIN_FAILED' | 'WRONG_PASSWORD';
export type ErrorPlace = 'username' | 'email' | 'password' | 'server';

export interface ErrorForm {
  place: ErrorPlace; 
  message: string;
} 

export const codeToMsg = (code: ErrorCode): ErrorForm => {
  let errorForm: ErrorForm = {
    place: 'server',
    message: '伺服器錯誤'
  };
  
  if (code === 'ACCOUNT_EXISTS') {
    errorForm = {
      place: 'username',
      message: '使用者名稱已存在'
    }
    return errorForm;
  }
  if (code === 'EMAIL_EXISTS') {
    errorForm = {
      place: 'email',
      message: '電子郵件已註冊過'
    }
    return errorForm;
  }
  if (code === 'INVALID_PASSWORD') {
    errorForm = {
      place: 'password',
      message: '密碼必須至少包括一個數字、一個字母，並且其長度必須超過6個字符'
    }
    return errorForm;
  }

  return errorForm;
};