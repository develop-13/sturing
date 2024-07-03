import Link from "next/link";

//예시값 입니다.
const dummyInterests = ["디자인", "마케팅", "금융"];
const dummyCurrentInterest = "디자인";

function TabHeader() {
  return (
    <div className="flex justify-center border-b border-gray-300">
      {dummyInterests.map((interest, idx) => (
        <Link
          key={idx}
          href={``}
          className={`flex-1 text-center font-medium text-[16px] leading-[15px] p-4 ${
            dummyCurrentInterest === interest
              ? `text-mainColor border-b-2 border-mainColor`
              : `text-gray-700`
          }`}
        >
          {interest}
        </Link>
      ))}
    </div>
  );
}

export default TabHeader;
