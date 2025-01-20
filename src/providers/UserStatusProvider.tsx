"use client";
import React, {
  createContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export type UserStatusContextProps = {
  session?: Session | null;
  isLoggedIn: boolean;
  hasUser: boolean;
  hasMatchingInfo: boolean;
  handleHasMatchingInfo: () => void;
};

const initialStateContext = {
  session: undefined,
  isLoggedIn: false,
  hasUser: false,
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

  const isLoggedIn = status === "authenticated";

  const [userInfo, setUserInfo] = useState({
    hasUser: false,
    hasMatchingInfo: false,
  });

  const handleHasMatchingInfo = useCallback(() => {
    setUserInfo((prev) => ({ hasUser: true, hasMatchingInfo: true }));
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
        hasUser: !!hasUser,
        hasMatchingInfo: !!hasMatchingInfo,
      });
    }

    if (
      status === "authenticated" &&
      !userInfo.hasUser &&
      !userInfo.hasMatchingInfo
    ) {
      getUserStatus();
    } else if (status === "unauthenticated") {
      setUserInfo({
        hasUser: false,
        hasMatchingInfo: false,
      });
    }
  }, [session?.user, status, userInfo.hasUser, userInfo.hasMatchingInfo]);

  // useMemo로 value 객체 메모화
  const value = useMemo(
    () => ({
      session,
      isLoggedIn,
      hasUser: userInfo.hasUser,
      hasMatchingInfo: userInfo.hasMatchingInfo,
      handleHasMatchingInfo,
    }),
    [
      isLoggedIn,
      userInfo.hasUser,
      userInfo.hasMatchingInfo,
      handleHasMatchingInfo,
    ]
  );

  return (
    <UserStatusContext.Provider value={value}>
      {children}
    </UserStatusContext.Provider>
  );
};
