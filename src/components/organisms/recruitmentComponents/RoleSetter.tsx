import Text from "@/components/atoms/Text";
import { CheckBarButton } from "@/components/molecules/IconLabelButton";
import React from "react";
import { roleData } from "@/db/roles";
import { TRoleText } from "@/types/common";

type TWritable = {
  type: "writable";
  intro: string;
  selectedRoles: TRoleText[];
  handleSetRole: (selectedRole: TRoleText) => void;
};

type TReadOnly = {
  type: "readOnly";
  intro: string;
  selectedRoles: TRoleText[];
};

type TRoleSetter = TWritable | TReadOnly;

function RoleSetter(props: TRoleSetter) {
  const { intro, selectedRoles } = props;
  const isWritable = props.type === "writable";

  return (
    <div className="flex flex-col gap-[13px]">
      <Text>{intro}</Text>
      <div className="grid grid-cols-2 gap-2">
        {roleData.map((el) => (
          <CheckBarButton
            key={el.role}
            type="checkOnClick"
            theme="ordinary"
            className="!p-2 "
            isActive={selectedRoles.includes(el.role)}
            onClick={
              isWritable
                ? () => {
                    props.handleSetRole(el.role);
                  }
                : undefined
            }
          >
            <div>
              <Text size="xs" weight="bold">
                {el.title}
              </Text>
              <Text size="xs" weight="bold" className="!text-gray-600">
                {el.text}
              </Text>
            </div>
          </CheckBarButton>
        ))}
      </div>
    </div>
  );
}

export default React.memo(RoleSetter);
