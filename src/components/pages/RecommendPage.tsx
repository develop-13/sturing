import StudyBanner from "@/components/organisms/StudyBanner";
import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";
import { studyBanners } from "@/db/studyBanners";
import { studyDatas } from "@/db/studyDatas";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import GoMatchingPage from "../molecules/GoMatchingPage";
import Divider from "../atoms/Divider";
import { SearchbarWrapper } from "../molecules/Searchbar";
import SlideContentList from "../organisms/SlideContentList";

export default function RecommendPage() {
  const pathname = "/recommend";

  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <Header
          leftSlot={
            <div className="flex gap-[12px]">
              <Icon type="MENU" />
              <Icon type="LOGO" />
            </div>
          }
          rightSlot={
            <div className="flex gap-[12px]">
              <Icon type="BELL" />
              <Icon type="USER" />
            </div>
          }
        />
        <NavButtonGroup pathname={pathname} />
        <div>
          <StudyBanner props={studyBanners} />
          <GoMatchingPage />
        </div>
        <div className="flex flex-col gap-5 py-5">
          <SearchbarWrapper
            usage="main"
            placeholder="관심 스터디 분야나 강의명을 검색해보세요"
            className="px-4 "
          />
          <SlideContentList title="분야별 스터디 탐색하기" hasArrow={true}>
            <StudyCategory />
          </SlideContentList>
          <Divider type="row" py={4} color="gray-100" />
          <SlideContentList title="이번주 인기 스터디" hasArrow={true}>
            <div className="flex flex-row gap-2 pl-4">
              <StudyBox props={studyDatas[0]} />
              <StudyBox props={studyDatas[1]} />
            </div>
          </SlideContentList>
          <SlideContentList title="새로 개설된 스터디" hasArrow={true}>
            <div className="flex flex-row gap-2 pl-4">
              <StudyBox props={studyDatas[2]} />
              <StudyBox props={studyDatas[3]} />
            </div>
          </SlideContentList>
        </div>
      </div>
    </>
  );
}
