"use client";
// UserStatusContext.tsx
import React, { createContext, useEffect, useCallback, useRef } from "react";
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

  const userCreatedRef = useRef(false);
  // db에 사용자 정보가 있는지 없는지에 대한 정보
  const hasMatchingInfoRef = useRef(false);
  // db에 사용자의 매칭 정보가 있는지 없는지에 대한 정보

  const handleHasMatchingInfo = useCallback(() => {
    // setHasMatchingInfo(true);
    hasMatchingInfoRef.current = true;
  }, []);

  console.log("userContext render!");
  console.log(session);
  console.log(`status=${status}`);
  console.log(`userCreated=${userCreatedRef.current}`);
  console.log(`hasMatchingInfo=${hasMatchingInfoRef.current}`);

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
      userCreatedRef.current = !!hasUser;
      hasMatchingInfoRef.current = !!hasMatchingInfo;

      return userResponse;
    }

    if (
      status === "authenticated" &&
      !userCreatedRef.current &&
      !hasMatchingInfoRef.current
    ) {
      // 로그인을 했는데 db에 사용자 정보가 없으면 만들기
      getUserStatus();
    } else if (status === "unauthenticated") {
      // 로그인이 안되어 있으면 사용자 정보 false 처리: 실제로는 db에 사용자 정보가 있다고 하더라도, 로그인 안되어 있으면 의미가 없으므로
      userCreatedRef.current = false;
      hasMatchingInfoRef.current = false;
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
        userCreated: userCreatedRef.current,
        hasMatchingInfo: hasMatchingInfoRef.current,
        handleHasMatchingInfo,
      }}
    >
      {children}
    </UserStatusContext.Provider>
  );
};
