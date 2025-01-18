"use client";
import { atom } from "recoil";

// SessionUser 타입 정의
interface SessionUser {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}

// Recoil Atom 정의
export const sessionUserState = atom<SessionUser>({
  key: "sessionUserState",
  default: {
    image: null,
    name: null,
    email: null,
  },
});
