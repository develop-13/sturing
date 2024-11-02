import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import React from "react";
import { v4 } from "uuid";

type TAgeSetter = {
  selectedAges: number[];
  handleSetAge: (selectedAge: number) => void;
};

const ageDatas = [-1, 20, 30, 40, 50]; // -1은 누구나

function AgeSetter(props: TAgeSetter) {
  const { selectedAges, handleSetAge } = props;

  return (
    <div className="flex flex-col gap-[13px] gray-600">
      <Text>함께하고 싶은 팀원의 연령대</Text>
      <div className="flex gap-2 flex-wrap">
        {ageDatas.map((age) => (
          <Button
            theme="ordinary"
            shape="listItem"
            key={v4()}
            isActive={selectedAges.includes(age)}
            onClick={() => {
              handleSetAge(age);
            }}
          >
            <Text size="xs">{age === -1 ? "누구나" : age + "대"}</Text>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default React.memo(AgeSetter);
