import StudyTypeItem from "../molcules/StudyTypeItem";

function StudyTypes() {
  return (
    <ul className="flex flex-col gap-[14px] mx-4 ">
      <StudyTypeItem />
      <StudyTypeItem />
      <StudyTypeItem />
    </ul>
  );
}

export default StudyTypes;
