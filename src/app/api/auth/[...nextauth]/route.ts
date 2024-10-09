import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";

const GithubClientId = process.env.GITHUB_ID;
const GithubClientSecret = process.env.GITHUB_SECRET;
const KakaoClientId = process.env.KAKAO_CLIENT_ID;
const KakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;

if (!GithubClientId || !GithubClientSecret) {
  console.log(GithubClientId);
  console.log(GithubClientSecret);
  throw new Error("missing clientId or clientSecret");
}

if (!KakaoClientId || !KakaoClientSecret) {
  throw new Error("missing clientId or clientSecret");
}

export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: GithubClientId,
      clientSecret: GithubClientSecret,
    }),
    Kakao({
      clientId: KakaoClientId,
      clientSecret: KakaoClientSecret,
    }),
    // ...add more providers here
  ],
  // strategy: "jwt", // 세션을 JWT로 저장 (기본값은 'database'가 아닌 'jwt'가 추천됨)

  session: {
    maxAge: 60 * 60 * 1, // 1시간 후 세션 만료
    // updateAge: 24 * 60 * 60, // 세션이 갱신되는 주기 (기본값은 24시간)
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  // },
};

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
