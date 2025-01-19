"use client";
import { useRouter } from "next/navigation"; // App Router의 useRouter
import {
  UserStatusContext,
  UserStatusContextProps,
} from "@/providers/UserStatusProvider";
import { useContext, useEffect } from "react";

function useLoginCheck() {
  console.log("use logIn Check occur");

  const router = useRouter(); // next/navigation에서 가져오기
  const { session, isLoggedIn }: UserStatusContextProps =
    useContext(UserStatusContext);

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    if (session === null && !isLoggedIn) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/");
    }
  }, [session, isLoggedIn, router]);
}

export default useLoginCheck;
