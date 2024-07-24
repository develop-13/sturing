import Icon from "@/components/atoms/Icon";
import TitleLink from "@/components/molecules/TitleLink";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import StudyBox from "@/components/organisms/StudyBox";
import { studyDatas } from "@/db/studyDatas";

const dummyUserName = "웅진";

function CompleteTemplate() {
  return (
    <section className="flex flex-col gap-[70px] pt-[36px]">
      <div className="mx-auto flex flex-col items-center gap-[10px]">
        <Icon type="COMPLETE" />
        <MatchingTitle role="COMPLETE" />
      </div>
      <div>
        <TitleLink
          props={{ title: `${dummyUserName}님과 딱 맞는 스터디 추천` }}
        />
        <div className="flex flex-row gap-2">
          <StudyBox props={studyDatas[0]} />
          <StudyBox props={studyDatas[1]} />
        </div>
      </div>
    </section>
  );
}

export default CompleteTemplate;
