import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import DurationSetter from "@/components/organisms/DurationSetter";
import AtmosphereSetter from "@/components/organisms/recruitmentComponents/AtmosphereSetter";
import DaySetter from "@/components/organisms/recruitmentComponents/DaySetter";
import StudyDurationSetter from "@/components/organisms/recruitmentComponents/StudyDurationSetter";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { atmosphereData } from "@/db/atmospheres";
import { TAtmosphere } from "@/types/common";
import { TStudyRecruitment } from "@/types/study";
import { useCallback } from "react";

function StudyDetail({
  state,
  handleStateChange,
}: {
  state: TStudyRecruitment;
  handleStateChange: HandleStateChange<TStudyRecruitment>;
}) {
  const handleSetStudyDuration = useCallback(
    (startDate: Date, endDate: Date) => {
      handleStateChange("period", {
        startDate,
        endDate,
      });
    },
    [state.period]
  );

  console.log(state);

  const handleAtmosphere = useCallback(
    (selectedAtmosphere: TAtmosphere) => {
      const isSelected = state.atmospheres.includes(selectedAtmosphere);
      const updatedAtmospheres = isSelected
        ? state.atmospheres.filter(
            (atmosphere) => atmosphere !== selectedAtmosphere
          ) // 이미 있으면 제거
        : [...state.atmospheres, selectedAtmosphere]; // 없으면 추가

      handleStateChange("atmospheres", updatedAtmospheres);
    },
    [state.atmospheres]
  );

  // const handleAtmosphere = useCallback(() => {}, [state.atmospheres]);

  return (
    <section className="py-4 flex flex-col gap-5">
      <StudyDurationSetter
        currentDuration={state.period}
        handleSetStudyDuration={handleSetStudyDuration}
      />
      <div className="flex flex-col gap-[13px]">
        <DaySetter
          dayOfWeek={state.dayOfWeek}
          time={state.time}
          handleStateChange={handleStateChange}
        />
        <AtmosphereSetter
          handleAtmosphere={handleAtmosphere}
          selectedAtmospheres={state.atmospheres}
        />
      </div>
    </section>
  );
}

export default StudyDetail;
