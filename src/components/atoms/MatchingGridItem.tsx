import DesignIcon from "./svg/design.svg";

function MatchingGridItem({
  svgPath,
  name,
}: {
  svgPath: string;
  name: string;
}) {
  return (
    <span className=" border rounded-lg border-gray-300  flex items-center justify-center cursor-pointer">
      <div className="flex gap-[10px]">
        <img src={svgPath} alt="" />
        <div>{name}</div>
      </div>
    </span>
  );
}

export default MatchingGridItem;
