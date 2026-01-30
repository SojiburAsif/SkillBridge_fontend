import { RoleType } from "@/app/constants/role";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  image?: string;
}

export interface SessionResponse {
  success: boolean;
  data: {
    user: SessionUser;
  } | null;
}
