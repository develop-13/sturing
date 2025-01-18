import Text from "@/components/atoms/Text";
import RoleSetter from "@/components/organisms/recruitmentComponents/RoleSetter";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { TApplyState } from "@/states/ApplyReducer";
import { TRoleText } from "@/types/common";
import { useCallback } from "react";

type TRoleSelectTemp = {
  state: TApplyState;
  handleStateChange: HandleStateChange<TApplyState>;
};

function RoleSelectTemp(props: TRoleSelectTemp) {
  const { state, handleStateChange } = props;

  const handleSetRole = useCallback(
    (selectedRole: TRoleText) => {
      const isSelected = state.desiredRole.includes(selectedRole);
      const updatedRoles = isSelected
        ? state.desiredRole.filter((role) => role !== selectedRole) // 이미 있으면 제거
        : [...state.desiredRole, selectedRole]; // 없으면 추가

      handleStateChange("desiredRole", updatedRoles);
    },
    [state.desiredRole]
  );
  return (
    <section className="py-4 flex flex-col gap-5">
      <Text size="xl" weight="bold">
        스터디에 지원글을 작성해 주세요
      </Text>
      <RoleSetter
        type="writable"
        handleSetRole={handleSetRole}
        intro="개설자가 원하는 역할 목록이에요"
        selectedRoles={props.state.desiredRole}
      />
    </section>
  );
}

export default RoleSelectTemp;
