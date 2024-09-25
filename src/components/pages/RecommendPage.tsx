import TitleLink from "@/components/molecules/TitleLink";
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
import Searchbar from "../molecules/Searchbar";

export default function RecommendPage() {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div>
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
          <NavButtonGroup />
        </div>
        <div>
          <StudyBanner props={studyBanners} />
          <GoMatchingPage />
        </div>
        <div className="flex flex-col gap-5 py-5">
          <div className="px-4">
            <Searchbar
              usage="main"
              placeholder="관심 스터디 분야나 강의명을 검색해보세요"
            />
          </div>
          {/*  */}
          <TitleLink
            props={{ title: "분야별 스터디 탐색하기", hasArrow: true }}
          />
          <StudyCategory />
          {/*  */}
          <Divider type="row" py={4} color="gray-100" />
          {/*  */}
          {/* 개설 플로팅 버튼? */}
          <div className="flex flex-row gap-2 pl-4 fixed bottom-[9%] right-[3%]">
            {/* <ButtonLabel
              datas={{
                theme: "shadow",
                role: "openStudy",
                text: "내 스터디 개설하기",
                icon: <Icon type="RLOGO" />,
                onClick: () => {
                  router.push("/recruitment");
                },
              }}
            /> */}
          </div>
          <TitleLink props={{ title: "이번주 인기 스터디", hasArrow: false }} />
          <div className="flex flex-row gap-2 pl-4">
            <StudyBox props={studyDatas[0]} />
            <StudyBox props={studyDatas[1]} />
          </div>
          {/*  */}
          <TitleLink props={{ title: "새로 개설된 스터디", hasArrow: false }} />
          <div className="flex flex-row gap-2 pl-4">
            {/* 만약 실무엣 이러면 보안 상 안좋을 것 같다. */}
            <StudyBox props={studyDatas[2]} />
            <StudyBox props={studyDatas[3]} />
          </div>
        </div>
      </div>
    </>
  );
}
