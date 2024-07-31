// 리팩토링 시 고려할 점. position이 absolute란 얘기는 위치가 상의 컴포넌트에 의존하므로 재사용성이 떨어진다는 점이지 않을까?
type THeader = {
  position?: "absolute" | "static";
  bgColor?: "bg-transparent" | "bg-gray-100";
  leftSlot?: React.ReactNode;
  middleSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

function Header({
  position = "static",
  bgColor = "bg-transparent",
  leftSlot,
  middleSlot,
  rightSlot,
}: THeader) {
  let style = position + " " + bgColor;

  return (
    <header
      className={
        "w-full h-[54px] flex justify-between items-center top-0 left-0 " +
        style
      }
    >
      {leftSlot}
      {middleSlot}
      {rightSlot}
      {/* <Text props={{}}></Text> */}
    </header>
  );
}

export default Header;
