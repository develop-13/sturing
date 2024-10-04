import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("missing clientId or clientSecret");
}

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
    // ...add more providers here
  ],

  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  // },
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
