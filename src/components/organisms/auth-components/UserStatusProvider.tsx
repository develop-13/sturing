"use client";
// UserStatusContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

export type UserStatusContextProps = {
  session: Session | null;
  status: string;
  userCreated: boolean;
  hasMatchingInfo: boolean;
};

export const UserStatusContext = createContext<
  UserStatusContextProps | undefined
>(undefined);

export const UserStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const [userCreated, setUserCreated] = useState(false);
  const [hasMatchingInfo, setHasMatchingInfo] = useState(false);

  const handleHasMatchingInfo = useCallback(() => {
    setHasMatchingInfo(!hasMatchingInfo);
  }, [hasMatchingInfo]);

  useEffect(() => {
    async function getUserStatus() {
      const userResponse = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session?.user.email,
          userName: session?.user.name,
        }),
      }).then((res) => res.json());

      const { hasUser, hasMatchingInfo } = userResponse;

      setHasMatchingInfo((prev) => !!hasMatchingInfo);
      setUserCreated((prev) => !!hasUser);

      return userResponse;
    }

    if (status === "authenticated" && !userCreated && !hasMatchingInfo) {
      // 로그인을 했는데 db에 사용자 정보가 없으면 만들기
      getUserStatus();
    }
  }, [session?.user]);

  return (
    <UserStatusContext.Provider
      value={{ session, status, userCreated, hasMatchingInfo }}
    >
      {children}
    </UserStatusContext.Provider>
  );
};
