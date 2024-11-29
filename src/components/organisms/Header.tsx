// 리팩토링 시 고려할 점. position이 absolute란 얘기는 위치가 상의 컴포넌트에 의존하므로 재사용성이 떨어진다는 점이지 않을까?
type THeader = {
  position?: "absolute" | "static";
<<<<<<< HEAD
  bgColor?: "bg-transparent " | "bg-gray-100 ";
  leftSlot?: React.ReactNode;
  middleSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
=======
  bgColor?: "bg-transparent" | "bg-gray-100";
  leftSlot?: React.ReactNode;
  middleSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59
};

function Header({
  position = "static",
<<<<<<< HEAD
  bgColor = "bg-transparent ",
  leftSlot,
  middleSlot,
  rightSlot,
  className = "px-4",
}: THeader) {
  let style = position + " " + bgColor + className;
=======
  bgColor = "bg-transparent",
  leftSlot,
  middleSlot,
  rightSlot,
}: THeader) {
  let style = position + " " + bgColor;
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59

  return (
    <header
      className={
<<<<<<< HEAD
        "w-full h-[54px] flex justify-between items-center top-0 left-0 shrink-0 " +
=======
        "w-full h-[54px] flex justify-between items-center top-0 left-0 " +
>>>>>>> d690408071b010d7de636b9936c9e61e23807a59
        style
      }
    >
      {leftSlot}
      {middleSlot}
      {rightSlot}
    </header>
  );
}

export default Header;
