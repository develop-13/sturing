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

const googleClientId = GoogleClientId;
const googleClientSecret = GoogleClientSecret;

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

async function refreshAccessToken(token: JWT) {
  // 굳이 필요없다.
  console.log("refreshAccessToken called!");

  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // 밀리 초 변환
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
      clientId: GoogleClientId,
      clientSecret: KakaoClientSecret,
    }),
    // ...add more providers here

    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          // scope: "read:user user:email",
          access_type: "offline", // 리프레시 토큰 요청
          prompt: "consent", // 항상 동의 화면 표시 (리프레시 토큰 재발급을 위해 필요)
        },
      },
    }),
  ],
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
      console.log("jwt callback called!");
      console.log(user);
      console.log("account");
      console.log(account);
      console.log("token");
      console.log(token);
      // if (user) {
      //   token.email = user.email; // user.email을 token에 저장
      // }
      if (user) {
        token.user = user;
      }
      // return token;
      if (account && user) {
        token.accessToken = account.access_token;

        // `expires_at` 값이 초 단위라고 가정한 만료 시간 설정
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000 // 초 단위 → 밀리초 단위로 변환
          : Date.now() + 3600 * 1000; // 기본값: 1시간 후 만료

        // Refresh token 갱신 로직
        token.refreshToken = account.refresh_token || token.refreshToken;

        return token;
      }
      const nowTime = Date.now();
      const accessTokenExpires = token.accessTokenExpires as number;
      const TEN_MINUTES_AGO_IN_MS = 60 * 10 * 1000; // 10분 전

      // 10분전에 토큰을 갱신해준다.
      const shouldRefreshTime =
        accessTokenExpires - nowTime - TEN_MINUTES_AGO_IN_MS;

      if (shouldRefreshTime > 0) {
        return token;
      }

      return refreshAccessToken(token);
    },

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
      console.log("singIn callback called");
      console.log(user);
      console.log("profile");
      console.log(profile);

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

    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }) {
      // await dbConnect();
      // session.user가 있는지 먼저 확인
      // console.log("User 이메일 정보:", user?.email); // User 객체의 이메일 확인

      console.log("session 요청을 받아 callbacks의 session 호출");
      console.log(user);

      if (session.user && user?.email) {
        session.user.email = user.email;
        console.log("세션에 이메일이 추가되었습니다:", session.user.email); // 세션에 추가된 이메일 확인
      }

      const sessionUser = {
        ...token,
      };
      delete sessionUser.refreshToken;
      session.user = sessionUser as any;

      return session;
    },
  },
};
