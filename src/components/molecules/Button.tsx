import { ReactNode } from "react";
import Box, { TBox } from "../atoms/Box";

type TButton = {
  box: TBox;
};

export default function Button({
  props,
  children,
}: {
  props: TButton;
  children?: ReactNode;
}) {
  return (
    <>
      <Box props={props.box}>{children}</Box>
    </>
  );
}
