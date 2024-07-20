import { ReactNode } from "react";
import Box, { TBox } from "../atoms/Box";

type TButton = TBox;

export default function Button({
  theme,
  shape,
  extraCss,
  children,
  onClick,
}: TButton & { children: ReactNode }) {
  return <Box props={{ theme, shape, extraCss, onClick }}>{children}</Box>;
}
