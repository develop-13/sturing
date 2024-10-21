"use client";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Link from "next/link";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import GoMatchingModal from "../organisms/GoMatchingModal";

function GoMatchingPage() {
  let isMatchingModalUp = true;

  console.log(`isMatchingModalUp = ${isMatchingModalUp}`);
  // const [Modalup, setModalUp] = useState(!!isMatchingModalUp);
  const [Modalup, setModalUp] = useState(true);
  // 매칭 모달이 뜨는 경우: 로그인은 했지만 사용자 매칭 정보는 설정 안한 경우
  // state값 조정필요

  const [recommendPage, setRecommendPage] = useState<Element | null>(null);
  console.log(`modalUp = ${Modalup}`);

  const closeModal = () => {
    setModalUp(false);
  };

  // 클라이언트 측에서만 document에 접근
  useEffect(() => {
    const page = document.getElementById("recommendPage");
    setRecommendPage(page);
    console.log("page useEffect in GoMatchingPage");
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

    console.log("eventListener useEffect in GoMatchingPage");

    // 이벤트 리스너 제거 (clean up)
    return () => {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [modalRef]);
  // 겹치니까 훅으로 뺄것

  // useEffect(() => {
  //   if (isMatchingModalUp) {
  //     setModalUp(true); // 모달 띄우기
  //   } else {
  //     setModalUp(false); // 모달 숨기기
  //   }
  // }, [isMatchingModalUp]);

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
            <GoMatchingModal ref={modalRef} />
          </div>,
          recommendPage
        )}
    </div>
  );
}

export default GoMatchingPage;
