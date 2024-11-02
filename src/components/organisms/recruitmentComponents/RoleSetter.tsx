import Text from "@/components/atoms/Text";
import { CheckBarButton } from "@/components/molecules/IconLabelButton";
import React from "react";
import { roleData } from "@/db/roles";
import { TRoleText } from "@/types/common";

type TRoleSetter = {
  selectedRoles: TRoleText[];
  handleSetRole: (selectedRole: TRoleText) => void;
};

function RoleSetter(props: TRoleSetter) {
  const { selectedRoles, handleSetRole } = props;
  return (
    <div className="flex flex-col gap-[13px]">
      <Text>스터디에서 필요한 역할 선택</Text>
      <div className="grid grid-cols-2 gap-2">
        {roleData.map((el) => (
          <CheckBarButton
            key={el.role}
            type="checkOnClick"
            theme="ordinary"
            className="!p-2 "
            isActive={selectedRoles.includes(el.role)}
            onClick={() => {
              handleSetRole(el.role);
            }}
          >
            {" "}
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
