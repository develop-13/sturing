"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"; // NextAuth에서 제공하는 Session 타입

export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null; // 정확한 타입 지정
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
