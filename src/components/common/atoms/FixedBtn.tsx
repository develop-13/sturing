type TProps = {
  icon: React.ReactNode;
  isGray?: boolean;
};

function FixedBtn(props: TProps) {
  const { isGray, icon } = props;
  // console.log("bgColor= " + effectiveColor);
  return (
    <div
      className={`w-14 h-14  rounded-full flex items-center justify-center text-white 
      ${isGray ? "bg-gray-400" : "bg-mainColor"}`}
    >
      {icon}
    </div>
  );
}

export default FixedBtn;
