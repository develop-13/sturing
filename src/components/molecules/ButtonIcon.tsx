type TButtonIcon = {
  icon: React.ReactNode;
  theme: "PRIMARY" | "SECONDARY";
  type: "FORWARD" | "BACKWARD" | "PLUS";
};

function ButtonIcon({ datas }: { datas: TButtonIcon }) {
  let btnTheme = "";
  let btnType = "";

  switch (datas.theme) {
    case "PRIMARY":
      btnTheme = "bg-mainColor ";
      break;

    case "SECONDARY":
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
        `w-[58px] h-[58px] rounded-full flex justify-center items-center` +
        btnTheme +
        btnType
      }
    ></button>
  );
}

export default ButtonIcon;
