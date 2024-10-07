"use client";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Link from "next/link";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LoginModal from "../organisms/LoginModal";

//GoMatchingPage를 TitleLink랑 합치고 싶었음
// 왜냐하면 디자인도 >로 겹치는 부분이 있어서
// 하지만 역할이 다름. GoMatchingPage는 라우팅 기능, TitleLink는 슬라이딩 기능
function GoMatchingPage({ session }: { session: Session | null }) {
  const [Modalup, setModalUp] = useState(!!session);

  console.log(session);

  const [recommendPage, setRecommendPage] = useState<Element | null>(null);

  const closeModal = () => {
    setModalUp(false);
  };

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
  // 겹치니까 훅으로 뺄것

  return (
    <div>
      <Link
        className="h-[43px] bg-black text-white flex gap-[8px] items-center px-[16px] hover:underline cursor-pointer "
        href={"/matching"}
      >
        <Icon type="RLOGO" />
        <Text size="sm" weight="bold">
          매칭항목 선택하고 딱 맞는 스터디 추천받기
        </Text>
        <Icon type="FORWARD" />
      </Link>
      {/* recommendPage가 null이 아닌 경우에만 createPortal 실행 */}
      {Modalup &&
        recommendPage &&
        createPortal(
          <div className="w-[375px] h-full fixed z-50 flex items-center bg-black bg-opacity-70">
            <LoginModal ref={modalRef} />
          </div>,
          recommendPage
        )}
    </div>
  );
}

export default GoMatchingPage;
