import { DefaultSession, DefaultUser } from "next-auth";
// export enum Role {
//   user = "user",
//   admin = "admin",
// }
interface IUser extends DefaultUser {
  
   uuid: string;
   email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}
interface Common {
  uuid: string;
  refreshTokenExpires?: number;
  accessTokenExpires?: number;
  refreshToken?: string;
  token?: string;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session extends Common {
    user?: IUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser,Common {}
}
