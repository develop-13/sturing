import Box, { TBox, TBoxColorTheme, TBoxShape } from "@/components/atoms/Box";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import { twMerge } from "tailwind-merge";

function WriteButton() {}

// typq 별로 분리해야 srp..
type TButtonLabel = {
  theme?: TBoxColorTheme;
  shape?: TBoxShape;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  usage: "gridItem" | "round" | "close" | "checkBar" | "listItem";
  extraStyle?: string;
};

// icon 과 라벨이 같이 있는 버튼
function IconLabelButton({ datas }: { datas: TButtonLabel }) {
  // theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
  // usage 에 따라 fontSize, height, width가 달라집니다.

  let btnTheme: undefined | TBoxColorTheme = datas.theme;
  let btnShape: undefined | TBoxShape = datas.shape;
  let defaultBtnStyle = "inline shrink-0 font-bold text-xs ";

  switch (datas.usage) {
    case "gridItem":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "full";
      break;

    case "round":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "rounded";
      defaultBtnStyle += "w-auto px-[12px] gap-[8px] text-gray-700 ";
      break;

    case "listItem":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "listItem";
      break;
    case "close":
      let closeBtnStyle = "flex gap-[8px] items-center justify-center ";
      return (
        <Box
          props={{
            theme: btnTheme,
            shape: btnShape,
            extraCss: twMerge(closeBtnStyle, defaultBtnStyle, datas.extraStyle),
          }}
        >
          <Text>{datas.text}</Text>
          <Icon type="CLOSE" onClick={datas.onClick} />
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
        extraCss: twMerge(defaultBtnStyle, datas.extraStyle),
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
  theme,
  type,
  isActive,
  children,
  onClick,
  className,
}: {
  type: TCheckBarButton;
  theme?: TBox["theme"];
  isActive?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  switch (type) {
    case "checkOnClick":
      return (
        <Box
          props={{
            theme: theme || "transparent",
            shape: "bar",
            isActive: isActive,
            onClick: onClick,
            extraCss: "h-[50px] flex justify-between " + className,
          }}
        >
          {children}
          {isActive && <Icon type="CHECKED" />}
        </Box>
      );

    case "defaultCheck":
      return (
        <Box
          props={{
            theme: theme || "ordinary",
            shape: "bar",
            isActive: isActive,
            extraCss: "flex justify-between " + className,
            onClick: onClick,
          }}
        >
          {children}
          <Icon type="CHECKED" />
        </Box>
      );
  }
}
