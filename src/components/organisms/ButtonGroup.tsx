// 배열로 받는다?
type TButtonGroup = {
  gap: number;
  children?: React.ReactNode;
};

function ButtonGroup({ children, gap }: TButtonGroup) {
  return (
    <div
      className="h-[46px] px-[16px] bg-transparent border-b border-gray-300 flex mx-[-16px]"
      style={{ gap: gap }}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;
