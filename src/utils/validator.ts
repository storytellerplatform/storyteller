import { EMAIL_PATTERN } from "./config";

export const isPasswordValid = (password: string): boolean => {
    return (
      password.length >= 6 &&
      /[A-Za-z]/.test(password) &&
      /\d/.test(password)
    );
  };

export const isEmailValid = (email: string): boolean => {
  return EMAIL_PATTERN.test(email);
};