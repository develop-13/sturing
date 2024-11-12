import { twMerge } from "tailwind-merge";

type TCol = {
  type: "col";
  mx?: number;
  color?: "bg-gray-100" | "bg-gray-400" | "bg-gray-300";
  classname?: string;
};

type TRow = {
  type: "row";
  my?: number;
  py?: number;
  color?: "bg-gray-100" | "bg-gray-400" | "bg-gray-300";
  classname?: string;
};

type TDivider = TCol | TRow;

function Divider(props: TDivider) {
  let className = "";

  switch (props.type) {
    case "col":
      className = twMerge(
        "relative divider before:bg-gray-400 mx-2",
        props.color,
        props.classname
      );
      return (
        <div
          className={className}
          style={{ margin: `${0}px ${props.mx}px` }}
        ></div>
      );
    case "row":
      className = twMerge("h-[1px] " + props.color + " " + props.classname);
      return (
        <div
          className={className}
          style={{
            margin: `${props.my || 2}px 0`,
            padding: `${props.py || 1}px 0`,
          }}
        ></div>
      );
  }
}

export default Divider;
