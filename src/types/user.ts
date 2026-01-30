// types/user.ts

export type UserRole = "STUDENT" | "TUTOR";

export interface RegisterForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
