"use client";
// UserStatusContext.tsx
import React, { createContext, useEffect, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import Loading from "@/components/templates/Loading";

export type UserStatusContextProps = {
  session?: Session | null;
  status: string;
  userCreated: boolean;
  hasMatchingInfo: boolean;
  handleHasMatchingInfo: () => void;
};

const initialStateContext = {
  session: undefined,
  status: "loading", // 기본값 설정
  userCreated: false,
  hasMatchingInfo: false,
  handleHasMatchingInfo: () => {},
};

export const UserStatusContext =
  createContext<UserStatusContextProps>(initialStateContext);

export const UserStatusFunctionContext = createContext<
  undefined | { handleHasMatchingInfo: () => void }
>(undefined);

export const UserStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();

  const [userInfo, setUserInfo] = useState({
    userCreated: false,
    hasMatchingInfo: false,
  });

  const handleHasMatchingInfo = useCallback(() => {
    setUserInfo((prev) => ({ userCreated: true, hasMatchingInfo: true }));
  }, []);

  useEffect(() => {
    async function getUserStatus() {
      const userResponse = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImg: session?.user.image,
          userEmail: session?.user.email,
          userName: session?.user.name,
        }),
      }).then((res) => res.json());

      const { hasUser, hasMatchingInfo } = userResponse;
      setUserInfo({
        userCreated: !!hasUser,
        hasMatchingInfo: !!hasMatchingInfo,
      });
    }

    if (
      status === "authenticated" &&
      !userInfo.userCreated &&
      !userInfo.hasMatchingInfo
    ) {
      // 로그인을 했는데 db에 사용자 정보가 없으면 만들기
      getUserStatus();
    } else if (status === "unauthenticated") {
      // 로그인이 안되어 있으면 사용자 정보 false 처리: 실제로는 db에 사용자 정보가 있다고 하더라도, 로그인 안되어 있으면 의미가 없으므로
      setUserInfo({
        userCreated: false,
        hasMatchingInfo: false,
      });
    }
  }, [session?.user]);

  if (session === undefined && status === "loading") {
    // 세션 정보를 가져오는 중(새로고침 할 때)
    return <Loading />;
  }

  return (
    <UserStatusContext.Provider
      value={{
        session,
        status,
        userCreated: userInfo.userCreated,
        hasMatchingInfo: userInfo.hasMatchingInfo,
        handleHasMatchingInfo,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  );
};
