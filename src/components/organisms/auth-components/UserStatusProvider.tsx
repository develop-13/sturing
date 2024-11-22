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
  const [userCreated, setUserCreated] = useState(false);
  const [hasMatchingInfo, setHasMatchingInfo] = useState(false);

  const handleHasMatchingInfo = useCallback(() => {
    setHasMatchingInfo(true);
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

      setHasMatchingInfo((prev) => !!hasMatchingInfo);
      setUserCreated((prev) => !!hasUser);

      return userResponse;
    }

    if (status === "authenticated" && !userCreated && !hasMatchingInfo) {
      // 로그인을 했는데 db에 사용자 정보가 없으면 만들기
      getUserStatus();
    } else if (status === "unauthenticated") {
      // 로그인이 안되어 있으면 사용자 정보 false
      setUserCreated(false);
      setHasMatchingInfo(false);
    }
  }, [session?.user]);

  // console.log(session);

  return (
    <UserStatusContext.Provider
      value={{
        session,
        status,
        userCreated,
        hasMatchingInfo,
        handleHasMatchingInfo,
      }}
    >
      {/* <UserStatusFunctionContext.Provider value={{ handleHasMatchingInfo }}> */}
      {children}
      {/* </UserStatusFunctionContext.Provider> */}
    </UserStatusContext.Provider>
  );
};
