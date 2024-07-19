import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags, { InfoTagContents } from "../molecules/InfoTags";

function StudyList() {
  return (
    <div>
      <div className="ml-[16px]">
        <Text props={{ size: "xl", weight: "bold" }}>스터디 리스트</Text>
      </div>

      <div className="bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
        <div className="flex gap-[12px]">
          <Button
            props={{
              box: {
                theme: "transparent-border",
                shape: "tag",
              },
            }}
          >
            <Text props={{ size: "sm", weight: "bold" }}> 진행 중</Text>
          </Button>
          <Button
            props={{ box: { theme: "transparent-border", shape: "tag" } }}
          >
            <Text props={{ size: "sm", weight: "bold" }}> 진행 예정</Text>
          </Button>
          <Button
            props={{ box: { theme: "transparent-border", shape: "tag" } }}
          >
            <Text props={{ size: "sm", weight: "bold" }}>종료</Text>
          </Button>
        </div>

        {/* StudyListItem 컴포넌트 시작 */}
        <div className="flex flex-col gap-[16px] px-[20px] py-[24px] bg-gradient-to-br from-custom-blue-70 to-custom-pink-70">
          <div className="flex flex-col gap-[8px]">
            <InfoTags theme="transparent">
              <InfoTagContents
                type="meetingType-date-place"
                meetingType="offline"
                date="06.03~06.21"
                place="종로구"
              />
            </InfoTags>
            <Text props={{ size: "base", weight: "bold" }}>
              UXUI 디자이너 본질 강화 피그마 스터디{" "}
            </Text>
            <hr className="gray-500" />
            <div className="p-[8px] bg-white">
              <InfoTags theme="transparent">
                <InfoTagContents
                  type="member-day-photo"
                  day="매주 토요일"
                  member={4}
                  photo={true}
                />
              </InfoTags>
            </div>
          </div>
        </div>
        {/* StudyListItem 컴포넌트 끝 */}

        {/* StudyListItem 컴포넌트 시작 */}
        <div className="flex flex-col gap-[16px] px-[20px] py-[24px] bg-gradient-to-br from-custom-blue-70 to-custom-pink-70">
          <div className="flex flex-col gap-[8px]">
            <Text props={{ size: "xs", weight: "bold" }}>
              오프라인 | 06.03~06.21 |종로구
            </Text>
            <Text props={{ size: "base", weight: "bold" }}>
              UXUI 디자이너 본질 강화 피그마 스터디{" "}
            </Text>
          </div>
          <hr className="gray-500" />
          <div className="p-[8px] bg-white">
            <Text props={{ size: "sm", weight: "bold" }}>
              팀원 4명 | 매주 토요일 | 사진 인증
            </Text>
          </div>
        </div>
        {/* StudyListItem 컴포넌트 끝 */}
      </div>
    </div>
  );
}

export default StudyList;
