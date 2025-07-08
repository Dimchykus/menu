import { type DefaultSession, User as SessionUser } from "next-auth";

// eslint-disable-next-line
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    user: SessionUser;
    refreshToken?: string;
    isOidc: boolean;
  }
}

declare module "next-auth" {
  interface User extends DefaultSession["user"] {
    userId: number;
  }

  interface Session {
    token?: string;
    id?: number;
    refreshToken?: string;
  }
}
