"use client";
import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import React from "react";
const ProfileCard = () => {
  return (
    <div className="border p-4 rounded-lg flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold">웅진님</h2>
        <p className="text-gray-500">turing@kakao.com</p>
        <p className="text-blue-500">스터링 프로필</p>
      </div>
      <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
        {/* 아이콘 자리 */}
        <span>🔗</span>
      </div>
    </div>
  );
};

// components/MenuList.tsx

const MenuList = () => {
  return (
    <div className="border-t border-b py-4">
      <ul className="space-y-4">
        <li className="font-bold">추천</li>
        <li className="font-bold">검색</li>
        <li className="flex justify-between items-center">
          <span className="font-bold">내 스터디</span>
          <span>▼</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="font-bold">분야</span>
          <span>▼</span>
        </li>
      </ul>
    </div>
  );
};

const OtherLinks = () => {
  return (
    <div className="py-4">
      <ul className="space-y-2 text-gray-600">
        <li>공지사항</li>
        <li>고객센터</li>
        <li>설정</li>
      </ul>
    </div>
  );
};

// components/ProfileCard.tsx

const Overall = () => {
  return (
    <div className="w-[323px] bg-green-500 pt-10 pb-14 px-6 flex flex-col gap-10 container">
      <div className="relative Xbtn">
        <Icon
          type="CLOSE"
          width={12}
          height={12}
          className="absolute right-0"
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
        </Text>{" "}
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
};

function page() {
  return <Overall />;
}

export default page;
