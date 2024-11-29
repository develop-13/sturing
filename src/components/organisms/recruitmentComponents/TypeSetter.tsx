import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import React from "react";

function TypeSetter({
  type,
  handleSetType,
}: {
  type?: "offline" | "online";
  handleSetType: (text: "online" | "offline") => void;
}) {
  return (
    <div className="flex gap-2 text-gray-600">
      <Button
        theme="ordinary"
        shape="tag"
        isActive={type == "online"}
        onClick={() => {
          handleSetType("online");
        }}
      >
        <Text size="xs" weight="bold">
          온라인
        </Text>
      </Button>
      <Button
        theme="ordinary"
        shape="tag"
        isActive={type == "offline"}
        onClick={() => {
          handleSetType("offline");
        }}
      >
        <Text size="xs" weight="bold">
          오프라인
        </Text>
      </Button>
    </div>
  );
}

export default React.memo(TypeSetter);
