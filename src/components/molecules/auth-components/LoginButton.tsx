"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "@/components/organisms/LoginModal";

export default function LoginButton() {
  const [upModal, setUpModal] = useState(false);

  const closeModal = () => {
    setUpModal(false);
  };

  const [recommendPage, setRecommendPage] = useState<Element | null>(null);

  // 클라이언트 측에서만 document에 접근
  useEffect(() => {
    const page = document.getElementById("recommendPage");
    setRecommendPage(page);
  }, []);

  const modalRef = useRef<HTMLDivElement | null>(null); // 타입을 명시적으로 설정

  useEffect(() => {
    // 모달 바깥 클릭했을 때, 닫히게 하기
    const clickListener = (e: MouseEvent) => {
      if (!modalRef.current || modalRef.current.contains(e.target as Node))
        return;
      // 모달창이 뜨지 않았거나 클릭한 부분이 모달창일 때는 아무일도 안일어남
      closeModal();
    };

    // ESC 키 클릭했을 때 닫히게 하기
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
  }, [modalRef, closeModal]);

  return (
    <Button
      theme="secondary"
      extraCss="p-[6px] rounded-[5px]"
      onClick={() => {
        console.log("LoginButton clicked");
        setUpModal(true);
      }}
    >
      <Text weight="bold">간편 로그인</Text>
      {/* recommendPage가 null이 아닌 경우에만 createPortal 실행 */}
      {upModal &&
        recommendPage &&
        createPortal(
          <div className="w-[375px] h-full fixed z-50 flex items-center bg-black bg-opacity-70">
            <LoginModal ref={modalRef} />
          </div>,
          recommendPage
        )}
    </Button>
  );
}
