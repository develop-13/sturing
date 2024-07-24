type TCol = {
  type: "col";
  mx?: number;
};

type TRow = {
  type: "row";
  my?: number;
  py?: number;
  color?: "gray-100" | "gray-400" | "gray-300";
};

type TDivider = TCol | TRow;

function Divider(props: TDivider) {
  switch (props.type) {
    case "col":
      return (
        <div
          className="divider text-gray-400"
          style={{ margin: `0 ${props.mx || 2}px` }}
        ></div>
      );
    case "row":
      const effectiveColor = props.color || "gray-400";
      return (
        <div
          className={"h-[1px] bg-" + effectiveColor}
          style={{
            margin: `${props.my}px 0`,
            padding: `${props.py}px 0`,
          }}
        ></div>
      );
  }
}

export default Divider;
