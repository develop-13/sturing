import GithubProvider from "next-auth/providers/github";
import Kakao from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import { Account, Profile, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";

const GithubClientId = process.env.GITHUB_ID;
const GithubClientSecret = process.env.GITHUB_SECRET;
const KakaoClientId = process.env.KAKAO_CLIENT_ID;
const KakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const GoogleClientId = process.env.AUTH_GOOGLE_ID;
const GoogleClientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!GithubClientId || !GithubClientSecret) {
  throw new Error("missing github clientId or clientSecret");
}

if (!KakaoClientId || !KakaoClientSecret) {
  throw new Error("missing kakao clientId or clientSecret");
}

if (!GoogleClientId || !GoogleClientSecret) {
  throw new Error("missing google clientId or clientSecret");
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
    };
  }
}

// 별도의 타입으로 정의
export type SessionUser = {
  name: string;
  email: string;
  image?: string;
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: GithubClientId,
      clientSecret: GithubClientSecret,
      authorization: {
        params: {
          scope: "read:user user:email",
          prompt: "login",
        },
      }, // 여기에 prompt 추가
    }),
    Kakao({
      clientId: KakaoClientId,
      clientSecret: KakaoClientSecret,
    }),
    // ...add more providers here

    GoogleProvider({
      clientId: GoogleClientId,
      clientSecret: GoogleClientSecret,
      authorization: {
        params: {
          // scope: "read:user user:email",
          access_type: "offline", // 리프레시 토큰 요청
          prompt: "consent", // 항상 동의 화면 표시 (리프레시 토큰 재발급을 위해 필요)
        },
      },
    }),
  ],

  pages: {
    signIn: "/", // 커스터마이징된 signIn 페이지 경로
    error: "/", // 에러 발생 시 이동할 경로
  },

  // strategy: "jwt", // 세션을 JWT로 저장 (기본값은 'database'가 아닌 'jwt'가 추천됨)

  session: {
    maxAge: 60 * 60 * 1, // 1시간 후 세션 만료
    updateAge: 24 * 60 * 60, // 세션이 갱신되는 주기 (기본값은 24시간)
  },

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: User;
      account: Account | null;
    }) {
      if (user && account) {
        token.user = user;
        token.accessToken = account.access_token;
        token.providerId = account.providerAccountId;
      }

      return token;
    },

    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
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
      if (session.user && user?.email) {
        session.user.email = user.email;
        console.log("세션에 이메일이 추가되었습니다:", session.user.email); // 세션에 추가된 이메일 확인
      }

      return session;
    },
  },
};
