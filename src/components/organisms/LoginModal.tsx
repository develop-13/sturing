"use client";
import { signIn } from "next-auth/react";
import React, { forwardRef, useState } from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Box from "../atoms/Box";

const LoginModal = forwardRef<HTMLDivElement, {}>(function LoginModal(
  props,
  ref
) {
  return (
    <div
      ref={ref}
      className="py-9 px-5 flex flex-col gap-8 container w-[276px] mx-auto text-center rounded-lg bg-white"
    >
      <div className="flex flex-col gap-[5px] items-center logo_Title">
        <Icon type="LOGO" width={155} height={48} />
        <Text weight="bold">사람과 스터디, 강의를 한 고리로</Text>
      </div>
      <div className="flex flex-col gap-5 text_btn">
        <div className="flex items-center justify-center text">
          <div className="relative bg-white text-center rounded-xl shadow-lg px-4 py-[10px] text-xs ">
            {/* 텍스트 콘텐츠 */}
            <Text color="gray-700" className="border-none">
              지금 회원가입하고 <br />
              <span className="text-blue-500 font-bold ">나와 맞는 스터디</span>
              에 참가해보세요!
            </Text>
            {/* 말풍선 아래쪽 삼각형 */}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
          </div>
        </div>
        <div>
          <Box
            props={{
              shape: "full",
              extraCss: "bg-yellow ",
              onClick: () => {
                signIn("kakao");
              },
            }}
          >
            <div className="flex gap-4 py-3">
              <Icon type="KAKAO" />
              <Text size="sm" weight="bold">
                카카오로 3초만에 시작하기
              </Text>
            </div>
          </Box>
          <Box
            props={{
              shape: "full",
              extraCss: "bg-black mt-[8px] ",
              onClick: () => {
                signIn("github");
              },
            }}
          >
            <div className="flex gap-4 py-3">
              <Icon type="GITHUB" />
              <Text size="sm" weight="bold" color="white">
                깃허브로 3초만에 시작하기
              </Text>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
});

export default LoginModal;
