type TCol = {
  type: "col";
  mx?: number;
};

type TRow = {
  type: "row";
  my?: number;
};

type TDivider = TCol | TRow;

function Divider(props: TDivider) {
  switch (props.type) {
    case "col":
      return <div className="divider text-gray-400"></div>;
    case "row":
      return (
        <hr className={"bg-gray-700"} style={{ margin: `${props.my}px 0` }} />
      );
  }
}

export default Divider;
