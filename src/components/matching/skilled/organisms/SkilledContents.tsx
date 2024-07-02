import SkillTabItem from "../molecules/SkilledTabItem";

const dummy_data = [
  { level: "비기너", description: "관련 공부를 이제 막 시작했어요" },
  { level: "신입", description: "관련 분야에서 일한지 아직 1년이 안됐어요" },
  { level: "주니어", description: "1-3년 정도 관련 분야 업무경험이 있어요" },
  { level: "시니어", description: "4년 이상의 관련 분야 업무경험이 있어요" },
];

function SkilledContents() {
  return (
    <ul className="flex flex-col gap-[14px] mx-[15px] my-5">
      {dummy_data.map((data, idx) => (
        <SkillTabItem
          key={idx}
          level={data.level}
          description={data.description}
        />
      ))}
    </ul>
  );
}

export default SkilledContents;
