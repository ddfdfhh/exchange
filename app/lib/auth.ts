/*eslint-disable*/

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions:NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const resp = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const response: any = await resp.json();
       
        if (response.success) {
          return response.data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
     
      if (session?.user)
        session.user = token.user as any

      return session;
    }
     ,
    async jwt({ token, user, account, profile, isNewUser }) {
      if(user!==undefined)
        token.user = { ...token, ...user }
     
      return  token
    },
  },
};
