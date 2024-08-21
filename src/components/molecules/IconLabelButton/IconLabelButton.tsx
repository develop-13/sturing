import Box, { TBoxColorTheme, TBoxShape } from "@/components/atoms/Box";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

function WriteButton() {}

type TButtonLabel = {
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

  let btnTheme: "" | TBoxColorTheme = "";
  let btnShape: "" | TBoxShape = "";
  let btnStyle = "inline shrink-0 font-bold ";
  let activeClassName = "";

  switch (datas.usage) {
    case "matchingItem":
      btnTheme = "ordinary";
      btnShape = "full";
      activeClassName = datas.isActive
        ? "border border-mainColor !bg-main-100 text-mainColor "
        : " ";
      break;

    case "category":
      btnTheme = "ordinary";
      btnShape = "rounded";
      btnStyle += "w-auto px-[12px] text-[14px] gap-[8px] text-gray-700 ";
      break;

    case "close":
      let closeStyle = "flex gap-[8px] items-center justify-center ";
      return (
        <Box props={{ extraCss: closeStyle + btnStyle + datas.extraStyle }}>
          <Text>{datas.text}</Text>
          <Icon type="CLOSE" onClick={datas.onClick} />
        </Box>
      );
  }

  return (
    <Box
      props={{
        theme: btnTheme,
        shape: btnShape,
        extraCss: btnStyle + activeClassName,
        onClick: datas.onClick,
      }}
    >
      {datas.icon}
      <Text>{datas.text}</Text>
    </Box>
  );
}

export default IconLabelButton;
