import {
  UserStatusContext,
  UserStatusContextProps,
} from "@/providers/UserStatusProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

function useLoginCheck() {
  const router = useRouter();

  const { session, isLoggedIn }: UserStatusContextProps =
    useContext(UserStatusContext);

  useEffect(() => {
    if (session === null && !isLoggedIn) {
      alert("로그인이 필요한 페이지 입니다");
      router.replace("/");
      return;
    }
  }, [session?.user, status, router]);
}

export default useLoginCheck;
