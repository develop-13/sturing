"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "@/components/organisms/LoginModal";

export default function LoginButton() {
  const [upModal, setUpModal] = useState(false);
  const recommendPageRef = useRef<Element | null>(null); // useRef로 관리

  const openModal = () => {
    setUpModal(true);
  };

  const closeModal = () => {
    setUpModal(false);
  };

  const modalRef = useRef<HTMLDivElement | null>(null); // 모달 Ref

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 recommendPage 참조 설정
    recommendPageRef.current = document.getElementById("recommendPage");

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
    <Button
      theme="secondary"
      extraCss="p-[6px] rounded-[5px]"
      onClick={openModal}
    >
      <Text weight="bold">간편 로그인</Text>
      {/* recommendPageRef.current가 null이 아닌 경우에만 createPortal 실행 */}
      {upModal &&
        recommendPageRef.current &&
        createPortal(
          <div className="w-[375px] h-full fixed z-50 flex items-center bg-black bg-opacity-70">
            <LoginModal ref={modalRef} />
          </div>,
          recommendPageRef.current // useRef로 관리된 recommendPage 참조
        )}
    </Button>
  );
}
