"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { create } from "zustand";
// userStatusStore.ts

// Zustand store 정의
type UserStatusState = {
  session: Session | null;
  status: string;
  userCreated: boolean;
  hasMatchingInfo: boolean;
  setSession: (session: Session | null, status: string) => void;
  setUserCreated: (userCreated: boolean) => void;
  setMatchingInfo: (hasMatchingInfo: boolean) => void;
  resetUserStatus: () => void; // 로그아웃 시 상태 초기화 함수
};

export const useUserStatusStore = create<UserStatusState>((set) => ({
  session: null,
  status: "unauthenticated",
  userCreated: false,
  hasMatchingInfo: false,
  setSession: (session, status) => set({ session, status }),
  setUserCreated: (userCreated) => set({ userCreated }),
  setMatchingInfo: (hasMatchingInfo) => set({ hasMatchingInfo }),
  resetUserStatus: () =>
    set({
      session: null,
      status: "unauthenticated",
      userCreated: false,
      hasMatchingInfo: false,
    }),
}));

// useSession을 통해 Zustand에 세션 동기화
export const useSyncSessionWithZustand = () => {
  const { data: session, status } = useSession();
  const setSession = useUserStatusStore((state) => state.setSession);

  useEffect(() => {
    setSession(session, status);
  }, [session, status, setSession]);
};
