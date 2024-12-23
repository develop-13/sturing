import Box, { TBoxColorTheme } from "../atoms/Box";
import Icon from "../atoms/Icon";

type TButtonIcon = {
  theme: TBoxColorTheme;
  type: "forward" | "backward" | "plus";
  onClick?: () => void;
};

function ButtonIcon({ theme, type, onClick }: TButtonIcon) {
  let btnIconStyle = "w-[58px] h-[58px]";

  let icon: null | React.ReactNode = null;

  switch (type) {
    case "plus":
      btnIconStyle += " shadow-lg ";
      icon = <Icon type="ADD" />;
      break;

    case "forward":
      icon = <Icon type="FORWARD_WHITE" />;
      break;

    case "backward":
      icon = <Icon type="BACK_WHITE" />;
      break;
  }

  return (
    <Box
      props={{
        theme: theme,
        shape: "rounded",
        extraCss: btnIconStyle,
        onClick: onClick,
      }}
    >
      {icon}
    </Box>
  );
}

export default ButtonIcon;
