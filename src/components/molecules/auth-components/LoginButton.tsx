"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "@/components/organisms/modals/LoginModal";

type TLoginButton = {
  upModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LoginButton = (props: TLoginButton) => {
  const { upModal, openModal, closeModal } = props;

  const modalRef = useRef<HTMLDivElement | null>(null); // 모달 Ref
  const rootLayout = useRef<Element | null>(null); // useRef로 관리

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 rootLayout 참조 설정
    rootLayout.current = document.getElementById("rootLayout");

    // 모달 바깥 클릭했을 때 닫히게 하기
    const clickListener = (e: MouseEvent) => {
      if (!modalRef.current || modalRef.current.contains(e.target as Node))
        return;
      closeModal();
    };

    // ESC 키 클릭 시 모달 닫기
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", clickListener);
    document.addEventListener("keydown", keyboardListener);

    // 이벤트 리스너 제거 (clean up)
    return () => {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("keydown", keyboardListener);
    };
  }, []);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Button
        theme="secondary"
        extraCss="p-[6px] rounded-[5px]"
        onClick={openModal}
      >
        <Text weight="bold">간편 로그인</Text>
        {/* rootLayout.current가 null이 아닌 경우에만 createPortal 실행 */}
        {upModal &&
          rootLayout.current &&
          createPortal(
            <div className="w-[375px] h-full fixed top-0 z-50 flex items-center bg-black bg-opacity-70">
              <LoginModal ref={modalRef} />
            </div>,
            rootLayout.current // useRef로 관리된 rootLayout 참조
          )}
      </Button>
    </Suspense>
  );
};

export default React.memo(LoginButton);
