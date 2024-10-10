import StudyBanner from "@/components/organisms/StudyBanner";
import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";
import { studyBanners } from "@/db/studyBanners";
import { getPopularStudies, getNewStudies } from "@/lib/studyUtils";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import GoMatchingPage from "../molecules/GoMatchingPage";
import Divider from "../atoms/Divider";
import { SearchbarWrapper } from "../molecules/Searchbar";
import SlideContentList from "../organisms/SlideContentList";
import Link from "next/link";
import LoginButton from "../molecules/auth-components/LoginButton";
import LogoutButton_temp from "../molecules/auth-components/LogoutButton_temp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MenuBtn from "../molecules/MenuBtn";

// 추후에 srp 에 맞게 리팩토링할 것
export default async function RecommendPage() {
  const session = await getServerSession(authOptions); // 동적처리 => ssr

  const popularStudies = await getPopularStudies();
  const newStudies = await getNewStudies();

  return (
    <div id="recommendPage" className="flex flex-col overflow-hidden">
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <MenuBtn />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          session ? (
            <div className="flex gap-[12px]">
              <Icon type="BELL" />
              <Link href={"#"}>
                <Icon type="USER" />
              </Link>
              <LogoutButton_temp />
            </div>
          ) : (
            <LoginButton />
          )
        }
      />
      <NavButtonGroup pathname="/recommend" />
      <div>
        <StudyBanner props={studyBanners} />
        <GoMatchingPage session={session} />
      </div>
      <div className="flex flex-col gap-5 py-5">
        <SearchbarWrapper
          usage="main"
          placeholder="관심 스터디 분야나 강의명을 검색해보세요"
          className="px-4"
        />
        <SlideContentList title="분야별 스터디 탐색하기" hasArrow={true}>
          <StudyCategory />
        </SlideContentList>
        <Divider type="row" py={4} color="gray-100" />
        <SlideContentList title="이번주 인기 스터디" hasArrow={true}>
          {/* 이런식으로 클라이언트 컴포넌트 안에 서버 컴포넌트를 자식으로 넣어주는 구조 */}
          <div className="flex flex-row gap-2 pl-4">
            {popularStudies.map((study) => (
              <StudyBox props={study} key={study.id} />
            ))}
          </div>
        </SlideContentList>
        <SlideContentList title="새로 개설된 스터디" hasArrow={true}>
          <div className="flex flex-row gap-2 pl-4">
            {newStudies.map((study) => (
              <StudyBox props={study} key={study.id} />
            ))}
          </div>
        </SlideContentList>
      </div>
    </div>
  );
}
