type TButtonIcon = {
  icon: React.ReactNode;
  theme: "primary" | "secondary";
  type: "forward" | "backward" | "plus";
  onClick?: () => void;
};

function ButtonIcon({ icon, theme, type, onClick }: TButtonIcon) {
  let btnTheme = "";
  let btnType = "";

  switch (theme) {
    case "primary":
      btnTheme = "bg-mainColor ";
      break;

    case "secondary":
      btnTheme = "bg-gray-400 ";
      break;
  }

  switch (type) {
    case "plus":
      btnType = "shadow-lg ";
  }

  return (
    <button
      className={
        btnTheme +
        btnType +
        `w-[58px] h-[58px] rounded-full flex justify-center items-center`
      }
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default ButtonIcon;
