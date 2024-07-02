"use client";
// 굳이 client 컴포넌트여야 하나?
import SidebarSection from "./SidebarSection";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";
import Icon from "../common/atoms/Icon";
const userInfo_dummy = {
  id: 1,
  name: "웅진",
  email: "sturing@kakao.com",
  profileImage: "",
  studies: [
    { id: 1, title: "스터디1" },
    { id: 2, title: "스터디2" },
    { id: 3, title: "스터디3" },
  ],

  interests: ["프론트엔드", "피그마"],
};

function Sidebar() {
  return (
    <div className="w-[323px] px-[23px] py-[40px] fixed top-0 left-0 bg-white z-[999999999]">
      <div className="flex justify-between ">
        <div></div>
        <Icon type="CLOSE" />
      </div>

      <SidebarSection>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[12px]">
            <h1 className="font-semibold text-[24px] leading-9">
              {userInfo_dummy.name}님
            </h1>
            <div className="text-[14px] font-normal leading-[22px] text-gray-600">
              {userInfo_dummy.email}
            </div>
          </div>
          <div className="w-[60px] h-[60px] bg-blue-500 rounded-full"></div>
        </div>

        <SidebarItem text={"스터링 프로필"} fontWeight={500} />
      </SidebarSection>

      <SidebarSection>
        <SidebarItem text="추천" />
        <SidebarItem text="검색" />
        <SidebarItem text="내 스터디" data={userInfo_dummy.studies} />
        <SidebarItem text="분야" data={userInfo_dummy.interests} />
      </SidebarSection>
      <SidebarSection>
        <SidebarItem fontWeight={400} textColor="#909090" text="공지사항" />
        <SidebarItem fontWeight={400} textColor="#909090" text="고객센터" />
        <SidebarItem fontWeight={400} textColor="#909090" text="설정" />
      </SidebarSection>
    </div>
  );
}

export default Sidebar;
