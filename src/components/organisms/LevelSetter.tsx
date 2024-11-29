import React from "react";
import OptionButtonContainer from "./OptionButtonContainer";
import { TDispatchFuncs, TFilterState } from "@/reducers/filterReducer";
import { TLevel } from "@/types/common";

function LevelSetter({
  level,
  setLevel,
}: {
  level: TLevel | null;
  setLevel: (level: TLevel | null) => void;
}) {
  return (
    <div>
      <OptionButtonContainer
        level={level}
        onClick={(word: TLevel) => () => {
          if (level === word) {
            setLevel(null);
          } else {
            setLevel(word);
          }
        }}
      />
    </div>
  );
}

export default LevelSetter;
