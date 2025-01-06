"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // NextAuth에서 제공하는 Session 타입
// import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthWrapper({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    // <GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID as string}>
    <SessionProvider>{children}</SessionProvider>
    // </GoogleOAuthProvider>
  );
}
