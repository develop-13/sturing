import Text from "../atoms/Text";

type TProps = {
  type: "INTEREST" | "LEVEL" | "TYPE" | "PLACE" | "ATMOSPHERE";
  userName: string;
};

function MatchingTitle({ datas }: { datas: TProps }) {
  let textComponents: React.ReactNode = [];

  switch (datas.type) {
    case "INTEREST":
      textComponents = [
        <div>
          <Text
            datas={{
              text: `${datas.userName}님 안녕하세요`,
              size: "xl",
              weight: "bold",
            }}
          />
          <Text
            datas={{
              text: "현재 관심있는 분야는 무엇인가요?",
              size: "xl",
              weight: "bold",
            }}
          />
        </div>,
        <Text
          datas={{
            text: "최대 3개까지 선택 가능합니다.",
            size: "sm",
            weight: "regular",
            color: "gray-700",
          }}
        />,
      ];
      break;
    case "LEVEL":
      textComponents = [
        <div>
          <Text
            datas={{
              text: "관심 분야에 대한 ",
              size: "xl",
              weight: "bold",
            }}
          />
          <Text
            datas={{
              text: "나의 직업 수준을 선택해 주세요.",
              size: "xl",
              weight: "bold",
            }}
          />
        </div>,
      ];
      break;
    case "TYPE":
      textComponents = [
        <div>
          <Text
            datas={{
              text: "웅진님이 선호하는",
              size: "xl",
              weight: "bold",
            }}
          />
          <Text
            datas={{
              text: "스터디 유형을 선택해 주세요.",
              size: "xl",
              weight: "bold",
            }}
          />
        </div>,
      ];
      break;
    case "PLACE":
      textComponents = [
        <div>
          <Text
            datas={{
              text: "웅진님이 선호하는",
              size: "xl",
              weight: "bold",
            }}
          />
          <Text
            datas={{
              text: "스터디 장소를 선택해 주세요.",
              size: "xl",
              weight: "bold",
            }}
          />
        </div>,
        <Text
          datas={{
            text: "최대 3개까지 선택 가능합니다.",
            size: "sm",
            weight: "regular",
            color: "gray-700",
          }}
        />,
      ];
      break;

    case "ATMOSPHERE":
      textComponents = [
        <div>
          <Text
            datas={{
              text: "웅진님이 선호하는",
              size: "xl",
              weight: "bold",
            }}
          />
          <Text
            datas={{
              text: "스터디 분위기를 선택해 주세요.",
              size: "xl",
              weight: "bold",
            }}
          />
        </div>,
        <Text
          datas={{
            text: "최대 3개까지 선택 가능합니다.",
            size: "sm",
            weight: "regular",
            color: "gray-700",
          }}
        />,
      ];
      break;
  }

  return <div className="flex flex-col gap-[11px]">{textComponents}</div>;
}

export default MatchingTitle;
