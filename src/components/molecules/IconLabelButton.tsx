import Box, { TBoxColorTheme, TBoxShape } from "@/components/atoms/Box";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

function WriteButton() {}

type TButtonLabel = {
  theme?: TBoxColorTheme;
  shape?: TBoxShape;
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  usage: "matchingItem" | "category" | "close";
  extraStyle?: string;
};

// icon 과 라벨이 같이 있는 버튼
function IconLabelButton({ datas }: { datas: TButtonLabel }) {
  // theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
  // usage 에 따라 fontSize, height, width가 달라집니다.

  let btnTheme: undefined | TBoxColorTheme = datas.theme;
  let btnShape: undefined | TBoxShape = datas.shape;
  let defaultBtnStyle = "inline shrink-0 font-bold text-sm ";
  let activeClassName = "";

  switch (datas.usage) {
    case "matchingItem":
      btnTheme = datas.theme || "ordinary";
      btnShape = datas.shape || "full";
      activeClassName = datas.isActive
        ? "border border-mainColor !bg-main-100 text-mainColor "
        : " ";
      break;

    case "category":
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
    default:
      return <div>없는 usage입니다</div>;
  }

  return (
    <Box
      props={{
        theme: btnTheme,
        shape: btnShape,
        extraCss:
          defaultBtnStyle +
          activeClassName +
          `${datas.extraStyle ? datas.extraStyle : ""}`,
        onClick: datas.onClick,
      }}
    >
      {datas.icon}
      <Text>{datas.text}</Text>
    </Box>
  );
}

export default IconLabelButton;
