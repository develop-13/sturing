type TProps = {
  icon: React.ReactNode;
  bgColor?: string;
};

function FixedBtn(props: TProps) {
  const { bgColor, icon } = props;
  const effectiveColor = bgColor || "#4171FF";
  console.log("bgColor= " + effectiveColor);
  return (
    <div
      className={`w-14 h-14 bg-[${effectiveColor}] rounded-full flex items-center justify-center text-white `}
    >
      {icon}
    </div>
  );
}

export default FixedBtn;
