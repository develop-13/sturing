type TButtonIcon = {
  icon: React.ReactNode;
  theme: "MAIN" | "GRAY";
  type: "FORWARD" | "BACKWARD" | "PLUS";
};

function ButtonIcon({ datas }: { datas: TButtonIcon }) {
  let btnTheme = "";
  let btnType = "";

  switch (datas.theme) {
    case "MAIN":
      btnTheme = "bg-mainColor ";
      break;

    case "GRAY":
      btnTheme = "bg-gray-400 ";
      break;
  }

  switch (datas.type) {
    case "PLUS":
      btnType = "shadow-lg ";
  }

  return (
    <button
      className={
        btnTheme +
        btnType +
        `w-[58px] h-[58px] rounded-full flex justify-center items-center`
      }
    >
      {datas.icon}
    </button>
  );
}

export default ButtonIcon;
