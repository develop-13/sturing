import React from "react";
import OptionButtonContainer from "./OptionButtonContainer";
import { TDispatchFuncs, TFilterState } from "@/reducers/filterReducer";

function LevelSetter({
  level,
  setLevel,
}: {
  level: TFilterState["levels"];
  setLevel: TDispatchFuncs["setLevel"];
}) {
  console.log(level);

  return (
    <div>
      <OptionButtonContainer
        categoryLevel={level}
        onClick={(word: TFilterState["levels"]) => () => {
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
