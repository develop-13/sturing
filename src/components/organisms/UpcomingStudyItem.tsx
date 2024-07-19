import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags, { InfoTagContents } from "../molecules/InfoTags";

function UpcomingStudyItem() {
  return (
    <div className="px-[16px] pt-[20px] pb-[70px] flex flex-col gap-[20px] bg-gradient-to-br from-custom-blue-30 to-custom-pink-30">
      <Text props={{ size: "xl", weight: "bold" }}>다가오는 스터디</Text>
      {/* Info컴포넌트 시작 */}
      <div className="py-[24px] px-[20px] flex flex-col gap-[8px] bg-white rounded-[8px] border border-gray-300">
        <div className="flex gap-[4px]">
          <Button props={{ box: { theme: "primary", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "white" }}>
              D-3
            </Text>
          </Button>
          <Button props={{ box: { theme: "secondary", shape: "tag" } }}>
            <Text props={{ size: "xs", weight: "bold", color: "main" }}>
              6월 7일
            </Text>
          </Button>
        </div>
        <Text props={{ size: "base", weight: "bold" }}>
          UXUI 디자이너 본질 강화 피그마 스터디
        </Text>
        <div className="p-[8px] bg-gray-100">
          {/* 이 부분 컴포넌트화 고려 */}
          <InfoTags theme="gray">
            <InfoTagContents
              type="time-place"
              time="06.07(토) 오후 8:00 - 9:00"
              place="스타벅스 종로점"
            />
          </InfoTags>
        </div>
      </div>
      {/* Info컴포넌트 끝 */}
    </div>
  );
}

export default UpcomingStudyItem;
