"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // NextAuth에서 제공하는 Session 타입

export default function AuthWrapper({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
