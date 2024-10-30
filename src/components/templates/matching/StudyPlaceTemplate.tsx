import React from "react";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import LocationSetter from "@/components/organisms/LocationSetter";

// 유지보수하기 힘들어졌다.. 액션 하나 추가할때 마다 고쳐야 할 부분이 상당함..
type TPlaceTemplate = {
  userName?: string | null;
  studyPlacePreference: TMatchingState["studyPlacePreference"]; // set으로 대체
  addStudyPlacePreference: TDispatchFuncs["addStudyPlacePreference"]; // (region:string,location:string)=>void 로 대체
  deleteStudyPlacePreference: TDispatchFuncs["deleteStudyPlacePreference"]; // (region:string,location:string)=>void로 대체
};

function StudyPlaceTemplate(props: TPlaceTemplate) {
  return (
    <section className="flex flex-col gap-3 py-[20px]">
      <MatchingTitle role="PLACE" userName={props.userName} />
      <LocationSetter
        addLocation={props.addStudyPlacePreference}
        selectedLocations={props.studyPlacePreference}
        deleteLocation={props.deleteStudyPlacePreference}
      />
    </section>
  );
}

export default StudyPlaceTemplate;
