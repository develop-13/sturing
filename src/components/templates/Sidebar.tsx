"use client";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import { forwardRef } from "react";

// Sidebar 컴포넌트의 props 타입 정의
interface SidebarProps {
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}

// forwardRef를 올바르게 사용하는 코드
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  { isSidebarOpen, onCloseSidebar }, // props
  ref // ref
) {
  return (
    <div
      ref={ref}
      className={`w-[375px] absolute h-[100%] top-0 z-40 pt-10 pb-14 px-6 flex flex-col gap-10 bg-white transition-all duration-500 ease-in-out transform ${
        isSidebarOpen ? "left-0" : "-left-[375px]"
      }`}
    >
      <div className="relative Xbtn">
        <Icon
          type="CLOSE"
          width={12}
          height={12}
          className="absolute right-0"
          onClick={onCloseSidebar}
        />
      </div>

      <div className="flex flex-col gap-8 profileSection">
        <div className="flex justify-between profileInfo">
          <div className="flex flex-col gap-[6px] nameEmail">
            <Text size="2xl" weight="bold">
              웅진님
            </Text>
            <Text size="sm" weight="bold" color="gray-600">
              sturing@kakao.com
            </Text>
          </div>
          <div className="bg-blue-500 rounded-full w-[60px] h-[60px] flex items-center justify-center profileImage">
            {/* 프로필 이미지를 넣거나 기본 아이콘으로 대체 */}
            <span className="text-white">사진</span>
          </div>
        </div>
        <Text size="lg" weight="bold">
          스터디 프로필
        </Text>
      </div>

      <Divider type="row" />
      <ul className="flex flex-col gap-6 menuList">
        <li>
          <Text size="lg" weight="bold">
            추천
          </Text>
        </li>
        <li>
          <Text size="lg" weight="bold">
            검색
          </Text>
        </li>
        <li>
          <Text size="lg" weight="bold">
            내 스터디
          </Text>
        </li>
        <li>
          <Text size="lg" weight="bold">
            분야
          </Text>
        </li>
      </ul>
      <Divider type="row" />
      <ul className="flex flex-col gap-[22px] otherLinks">
        <li>
          <Text size="lg" color="gray-600">
            공지사항
          </Text>
        </li>
        <li>
          <Text size="lg" color="gray-600">
            고객센터
          </Text>
        </li>
        <li>
          <Text size="lg" color="gray-600">
            설정
          </Text>
        </li>
      </ul>
    </div>
  );
});

export default Sidebar;
