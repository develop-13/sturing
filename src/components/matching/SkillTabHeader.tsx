"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

// contextAPI에서 가져옵니다. 현재는 예시값 입니다.
const currentSkilled = new Map(
  Object.entries({
    design: 0,
    marketing: 0,
    tech: 0,
  })
);

function TabHeader() {
  const interests = currentSkilled.keys();
  const params = useParams();

  return (
    <div className="flex justify-center border-b border-gray-300">
      {Array.from(interests).map((mkey, idx) => (
        <Link
          key={idx}
          href={`./${mkey}`}
          className={`flex-1 text-center font-medium text-[16px] leading-[15px] p-4 ${
            params.interests === mkey
              ? `text-[#4171FF] border-b-2 border-[#4171FF]`
              : `text-gray-700`
          }`}
        >
          {mkey}
        </Link>
      ))}
    </div>
  );
}

export default TabHeader;
