import Text from "../atoms/Text";

type TMatchingTitle = {
  role: "INTEREST" | "LEVEL" | "TYPE" | "PLACE" | "ATMOSPHERE" | "COMPLETE";
  userName?: string;
};

function MatchingTitle({ role, userName }: TMatchingTitle) {
  const commonMargin = "";

  switch (role) {
    case "INTEREST":
      return (
        <>
          <div className={"flex flex-col gap-[11px] " + commonMargin}>
            <Text props={{ size: "xl", weight: "bold" }}>
              {userName}님 안녕하세요 <br />
              현재 관심있는 분야는 무엇인가요?
            </Text>
            <Text props={{ size: "sm", weight: "regular", color: "gray-700" }}>
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );
    case "LEVEL":
      return (
        <>
          <div className={commonMargin}>
            <Text props={{ size: "xl", weight: "bold" }}>
              관심 분야에 대한 <br />
              나의 직업 수준을 선택해 주세요.
            </Text>
          </div>
        </>
      );
    case "TYPE":
      return (
        <>
          <div className={commonMargin}>
            <Text props={{ size: "xl", weight: "bold" }}>
              {userName}님이 선호하는
              <br />
              스터디 유형을 선택해 주세요.
            </Text>
          </div>
        </>
      );
    case "PLACE":
      return (
        <>
          <div className={"flex flex-col gap-[11px] " + commonMargin}>
            <Text props={{ size: "xl", weight: "bold" }}>
              {userName}님이 선호하는
              <br />
              스터디 장소를 선택해 주세요.
            </Text>
            <Text props={{ size: "sm", weight: "regular", color: "gray-700" }}>
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );
    case "ATMOSPHERE":
      return (
        <>
          <div className={"flex flex-col gap-[11px] " + commonMargin}>
            <Text props={{ size: "xl", weight: "bold" }}>
              {userName}님이 선호하는
              <br />
              스터디 분위기를 선택해 주세요.
            </Text>
            <Text props={{ size: "sm", weight: "regular", color: "gray-700" }}>
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );

    case "COMPLETE":
      return (
        <div className={"flex flex-col gap-[8px] text-center "}>
          <Text props={{ size: "xl", weight: "bold" }}>
            매칭 선택을 완료했습니다!
          </Text>
          <Text props={{ size: "sm", weight: "regular", color: "gray-700" }}>
            선택하신 매칭 요소는 내 프로필에서 확인할 수 있으며 <br />
            웅진님을 위한 스터디 추천에 반영됩니다.
          </Text>
        </div>
      );
  }
  return <div>데이터가 비어있습니다.</div>;
}
export default MatchingTitle;
