"use client";

function SkillTabItem({
  level,
  description,
}: {
  level: string;
  description: string;
}) {
  return (
    <li className="px-6 py-5 border border-gray-300 rounded-[5px] flex gap-1 items-center">
      <span className="font-medium text-xs basis-0 grow">{level}</span>
      <span className="font-medium text-[11px] leading-[21px] basis-0 grow-[4]">
        {description}
      </span>
    </li>
  );
}

export default SkillTabItem;
