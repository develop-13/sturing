import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import React from "react";
import { levelData } from "@/db/levels";
import { TLevel } from "@/types/common";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { TStudyRecruitment } from "@/types/study";

type TLevelSetter = {
  level?: TLevel;
  handleStateChange: HandleStateChange<TStudyRecruitment>;
};

function LevelSetter({ level, handleStateChange }: TLevelSetter) {
  return (
    <div className="flex flex-col gap-[13px] gray-600">
      <Text>함께하고 싶은 팀원</Text>
      <div className="flex flex-wrap gap-2">
        {levelData.map((el) => (
          <Button
            theme="ordinary"
            shape="tag"
            key={el.level}
            isActive={level == el.level}
            onClick={() => {
              handleStateChange("preferentialLevel", el.level);
            }}
          >
            <Text size="xs">{el.level + el.experience}</Text>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default LevelSetter;
