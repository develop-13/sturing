import React from "react";
import OptionButtonContainer from "./OptionButtonContainer";
import { TLevel } from "@/types/common";

function LevelSetter({
  level,
  setLevel,
}: {
  level: "" | TLevel;
  setLevel: (level: TLevel | "") => void;
}) {
  return (
    <div>
      <OptionButtonContainer
        level={level}
        onClick={(word: TLevel) => () => {
          if (level === word) {
            setLevel("");
          } else {
            setLevel(word);
          }
        }}
      />
    </div>
  );
}

export default LevelSetter;
