import Box, { TBoxColorTheme, TBoxShape } from "@/components/atoms/Box";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

function WriteButton() {}

// typq 별로 분리해야 srp..
type TButtonLabel = {
  theme?: TBoxColorTheme;
  shape?: TBoxShape;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  usage: "gridItem" | "round" | "close" | "checkBar";
  extraStyle?: string;
};

// icon 과 라벨이 같이 있는 버튼
function IconLabelButton({ datas }: { datas: TButtonLabel }) {
  // theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
  // usage 에 따라 fontSize, height, width가 달라집니다.

  let btnTheme: undefined | TBoxColorTheme = datas.theme;
  let btnShape: undefined | TBoxShape = datas.shape;
  let defaultBtnStyle = "inline shrink-0 font-bold text-sm ";
  // let activeClassName = "";

  switch (datas.usage) {
    case "gridItem":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "full";
      // activeClassName = datas.isActive
      //   ? "border border-mainColor !bg-main-100 text-mainColor "
      //   : " ";
      break;

    case "round":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "rounded";
      defaultBtnStyle += "w-auto px-[12px] gap-[8px] text-gray-700 ";
      break;

    case "close":
      let closeBtnStyle = "flex gap-[8px] items-center justify-center ";
      return (
        <Box
          props={{
            theme: btnTheme,
            shape: btnShape,
            extraCss:
              closeBtnStyle +
              defaultBtnStyle +
              `${datas.extraStyle ? datas.extraStyle : ""}`,
          }}
        >
          <Text>{datas.text}</Text>
          <Icon type="CLOSE" onClick={datas.onClick} />
        </Box>
      );

    case "checkBar":
      return (
        <Box
          props={{
            isActive: datas.isActive,
            onClick: datas.onClick,
            theme: btnTheme,
            shape: "bar",
            extraCss:
              defaultBtnStyle + `${datas.extraStyle ? datas.extraStyle : ""}`,
          }}
        >
          <div className="flex justify-between"></div>
        </Box>
      );

    default:
      break;
  }

  return (
    <Box
      props={{
        theme: btnTheme,
        shape: btnShape,
        extraCss:
          defaultBtnStyle +
          // activeClassName +
          `${datas.extraStyle ? datas.extraStyle : ""}`,
        isActive: datas.isActive,
        onClick: datas.onClick,
      }}
    >
      {datas.icon}
      <Text>{datas.text}</Text>
    </Box>
  );
}

export default IconLabelButton;

type TCheckBarButton = "checkOnClick" | "defaultCheck";

export function CheckBarButton({
  type,
  isActive,
  text,
  onClick,
}: {
  type: TCheckBarButton;
  isActive: boolean;
  text: string;
  onClick?: () => void;
}) {
  switch (type) {
    case "checkOnClick":
      return (
        <Box
          props={{
            theme: "transparent",
            shape: "bar",
            isActive: isActive,
            onClick: onClick,
            extraCss: "h-[50px] flex justify-between ",
          }}
        >
          <Text size="sm" weight="bold" color={isActive ? "main" : "gray-700"}>
            {text}
          </Text>
          {isActive && <Icon type="CHECKED" />}
        </Box>
      );

    case "defaultCheck":
      return (
        <Box
          props={{
            theme: "ordinary",
            shape: "bar",
            isActive: isActive,
            extraCss: "flex justify-between ",
            onClick: onClick,
          }}
        >
          <Text
            size="base"
            weight="bold"
            color={isActive ? "main" : "gray-700"}
          >
            {text}
          </Text>
          <Icon type="CHECKED" />
        </Box>
      );
  }
}
