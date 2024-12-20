import React, { useEffect, useRef, useState } from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/molecules/Button";
import Icon from "@/components/atoms/Icon";
import { createPortal } from "react-dom";
import BoardEditor from "../BoardEditor";
import { TBoard_Server, TJoiningStudy_Client } from "@/types/study";

type TBoardBox = {
  studyId: string;
  teamMembers: TJoiningStudy_Client["currentMembers"];
  boardLabel: string;
  children: React.ReactNode;
  postBoard: (newBoard: TBoard_Server) => void;
};

function BoardBox({
  studyId,
  boardLabel,
  teamMembers,
  postBoard,
  children,
}: TBoardBox) {
  const [isCreatingNewBoard, setIsCreatingNewBoard] = useState(false);
  const rootLayout = useRef<Element | null>(null); // useRef로 관리
  const closeModal = () => {
    setIsCreatingNewBoard(false);
  };

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 rootLayout 참조 설정
    rootLayout.current = document.getElementById("rootLayout");
  }, []);

  return (
    <InfoBox theme="white">
      <div className="flex justify-between items-center">
        <Text size="base" weight="bold">
          {boardLabel}
        </Text>
        <Button
          theme="primary"
          extraCss="w-[80px] h-[30px] rounded-[5px]"
          onClick={() => {
            setIsCreatingNewBoard(true);
          }}
        >
          <Icon type="WRITE" />
          <Text size="sm">작성하기</Text>
        </Button>
      </div>
      <Divider type="row" />
      <div className="flex flex-col gap-4">{children}</div>
      {isCreatingNewBoard &&
        rootLayout.current &&
        createPortal(
          <div className="w-[375px] h-full fixed top-0 z-50 flex items-center bg-black bg-opacity-70">
            <BoardEditor
              studyId={studyId}
              teamMembers={teamMembers}
              closeModal={closeModal}
              postBoard={postBoard}
            />
          </div>,
          rootLayout.current // useRef로 관리된 최상단page 참조
        )}
    </InfoBox>
  );
}

export default BoardBox;
