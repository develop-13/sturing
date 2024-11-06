import Text from "@/components/atoms/Text";
import NumberSetter from "@/components/organisms/NumberSetter";
import LevelSetter from "@/components/organisms/recruitmentComponents/LevelSetter";
import AgeSetter from "@/components/organisms/recruitmentComponents/AgeSetter";
import RoleSetter from "@/components/organisms/recruitmentComponents/RoleSetter";
import { TStudyRecruitment } from "@/types/study";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import React, { useCallback } from "react";
import { TRoleText } from "@/types/common";

type TMemberPreference = {
  state: TStudyRecruitment;
  handleStateChange: HandleStateChange<TStudyRecruitment>;
};

function MemberPreference(props: TMemberPreference) {
  const { state, handleStateChange } = props;

  const increaseMaxMemberNum = useCallback(() => {
    const increasedMaxMemberNum = state.maxMembersNum + 1;
    handleStateChange("maxMembersNum", increasedMaxMemberNum);
  }, [state.maxMembersNum]);

  const decreaseMaxMemberNum = useCallback(() => {
    let decreasedMaxMemberNum = state.maxMembersNum - 1;
    decreasedMaxMemberNum =
      decreasedMaxMemberNum >= 0 ? decreasedMaxMemberNum : 0;
    handleStateChange("maxMembersNum", decreasedMaxMemberNum);
  }, [state.maxMembersNum]);

  const handleSetAge = useCallback(
    (selectedAge: number) => {
      const isSelected = state.preferentialAge.includes(selectedAge);
      const updatedAges = isSelected
        ? state.preferentialAge.filter((age) => age !== selectedAge) // 이미 있으면 제거
        : [...state.preferentialAge, selectedAge]; // 없으면 추가

      handleStateChange("preferentialAge", updatedAges);
    },
    [state.preferentialAge]
  );

  const handleSetRole = useCallback(
    (selectedRole: TRoleText) => {
      const isSelected = state.necessaryRoles.includes(selectedRole);
      const updatedRoles = isSelected
        ? state.necessaryRoles.filter((role) => role !== selectedRole) // 이미 있으면 제거
        : [...state.necessaryRoles, selectedRole]; // 없으면 추가

      handleStateChange("necessaryRoles", updatedRoles);
    },
    [state.necessaryRoles]
  );

  return (
    <div className="px-4 py-5">
      <Text>원하는 팀원의 정보를 입력해 주세요</Text>
      <section className="flex flex-col gap-[60px]">
        <LevelSetter
          level={state.preferentialLevel}
          handleStateChange={handleStateChange}
        />
        <NumberSetter
          memberNum={state.maxMembersNum}
          increaseFunc={increaseMaxMemberNum}
          decreaseFunc={decreaseMaxMemberNum}
        />
        <AgeSetter
          selectedAges={state.preferentialAge}
          handleSetAge={handleSetAge}
        />
        <RoleSetter
          intro={"스터디에서 필요한 역할 선택"}
          selectedRoles={state.necessaryRoles}
          handleSetRole={handleSetRole}
        />
      </section>
    </div>
  );
}

export default React.memo(MemberPreference);
