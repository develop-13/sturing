type TCol = {
  type: "col";
  mx?: number;
  color?: "gray-100" | "gray-400" | "gray-300";
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
      const effectColor = props.color || "gray-400";

      return <div className="relative divider before:bg-gray-400 "></div>;
    case "row":
      const effectiveColor = props.color || "gray-300";
      return (
        <div
          className={"h-[1px] bg-gray-500 "}
          style={{
            margin: `${props.my || 2}px 0`,
            padding: `${props.py || 1}px 0`,
          }}
        ></div>
      );
  }
}

export default Divider;
