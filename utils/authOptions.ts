import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your API to verify credentials
        const res = await fetch(
          "https://medicine-e-commerce-server.vercel.app/api/v1/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            credentials: "include", // Include cookies in the request
          }
        );

        if (!res.ok) {
          const error = await res.text();
          toast.error("Error logging in");
          throw new Error(error || "Error logging in");
        }

        const user = await res.json();

        if (!user.isVerified) {
          // Send verification if not verified
          await fetch(
            "https://medicine-e-commerce-server.vercel.app/api/v1/send-verification",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: user.email }),
            }
          );

          toast.info("Account not verified. Redirecting to OTP verification.");
          throw new Error("Account not verified. Please verify your email.");
        }

        if (user) {
          // If the login is successful, return the user object
          return user;
        } else {
          toast.error("Invalid credentials");
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirect to login page if unauthenticated
    error: "/login", // Error page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
