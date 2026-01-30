// types/auth.ts
export interface SignUpEmailInput {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: "STUDENT" | "TUTOR"; // add your role
}
