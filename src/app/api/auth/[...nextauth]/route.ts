import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import { Account, Profile, User, Session } from "next-auth";

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
      authorization: {
        params: { scope: "read:user user:email", prompt: "login" },
      }, // 여기에 prompt 추가
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

  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean | undefined };
    }) {
      // GitHub에서 이메일을 제공하지 않는 경우
      if (!profile?.email && account?.provider === "github") {
        const res = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${account.access_token}`,
          },
        });
        // 이메일 타입은 GitHub API 응답에 맞춰 정의
        const emails: Array<{
          email: string;
          primary: boolean;
          verified: boolean;
        }> = await res.json();

        console.log("GitHub API 이메일 응답:", emails);

        if (emails?.length > 0) {
          // primary 이메일 추출
          const primaryEmail = emails.find((email) => email.primary);
          if (primaryEmail) {
            user.email = primaryEmail.email;
          }
        }
      }

      // true를 반환하여 로그인 절차 진행
      return true;
    },

    async session({ session, user }: { session: Session; user: User }) {
      // session.user가 있는지 먼저 확인

      console.log("User 이메일 정보:", user?.email); // User 객체의 이메일 확인

      if (session.user && user?.email) {
        session.user.email = user.email;
        console.log("세션에 이메일이 추가되었습니다:", session.user.email); // 세션에 추가된 이메일 확인
      }
      return session;
    },
  },
};
const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
