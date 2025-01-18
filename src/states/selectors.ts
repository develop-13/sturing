"use client";
import { selector } from "recoil";
import { sessionUserState } from "./atoms";

export const userStatusSelector = selector({
  key: "userStatusSelector",
  get: async ({ get }) => {
    // Atom에서 세션 정보 가져오기
    console.log("userStatusSelector called");
    const { image, name, email } = get(sessionUserState);
    console.log(`image=${image}`);
    console.log(`name=${name}`);
    console.log(`email=${email}`);

    if (!email) {
      // 세션 정보가 없으면 기본 값 반환
      return { userCreated: false, hasMatchingInfo: false };
    }

    // API 요청에 세션 정보 전달
    console.log("API 요청 시작");
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userImg: image,
        userName: name,
        userEmail: email,
      }),
    }).then((res) => res.json());

    const { hasUser, hasMatchingInfo } = response;
    console.log("API 요청 완료");

    return {
      userCreated: !!hasUser,
      hasMatchingInfo: !!hasMatchingInfo,
    };
  },
});
