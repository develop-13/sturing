import Text from "../atoms/Text";

type TMatchingTitle = {
  type: "INTEREST" | "LEVEL" | "TYPE" | "PLACE" | "ATMOSPHERE";
  userName: string;
};

function MatchingTitle({ type, userName }: TMatchingTitle) {
  switch (type) {
    case "INTEREST":
      return (
        <>
          <div className="flex flex-col gap-[11px]">
            <Text size="xl" weight="bold">
              {userName}님 안녕하세요 <br />
              현재 관심있는 분야는 무엇인가요?
            </Text>
            <Text size="sm" weight="regular" color="gray-700">
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );
    case "LEVEL":
      return (
        <>
          <div>
            <Text size="xl" weight="bold">
              관심 분야에 대한 <br />
              나의 직업 수준을 선택해 주세요.
            </Text>
          </div>
        </>
      );
    case "TYPE":
      return (
        <>
          <div>
            <Text size="xl" weight="bold">
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
          <div className="flex flex-col gap-[11px]">
            <Text size="xl" weight="bold">
              {userName}님이 선호하는
              <br />
              스터디 장소를 선택해 주세요.
            </Text>
            <Text size="sm" weight="regular" color="gray-700">
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );
    case "ATMOSPHERE":
      return (
        <>
          <div className="flex flex-col gap-[11px]">
            <Text size="xl" weight="bold">
              {userName}님이 선호하는
              <br />
              스터디 분위기를 선택해 주세요.
            </Text>
            <Text size="sm" weight="regular" color="gray-700">
              최대 3개까지 선택 가능합니다.
            </Text>
          </div>
        </>
      );
  }
  return <div>데이터가 비어있습니다.</div>;
}
export default MatchingTitle;
