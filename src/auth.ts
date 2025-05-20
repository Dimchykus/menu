import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "http://localhost:3000/api/signin";
        const res: Response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();

        return {
          id: user.data.id,
          email: user.data.email,
          name: user.data.name,
        };
      },
    }),
  ],
});
