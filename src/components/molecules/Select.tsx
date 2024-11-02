import React from "react";

type TSelect = {
  type: "day" | "startTime" | "endTime";
  datas: string[];
  setterFuncs: (type: string, time: string) => void;
};

function Select({ type, datas, setterFuncs }: TSelect) {
  let intro = "";

  switch (type) {
    case "day":
      intro = "요일을 선택해주세요";
      break;

    case "startTime":
      intro = "시작시간을 선택해주세요";
      break;

    case "endTime":
      intro = "종료시간을 선택해주세요";
      break;
  }

  return (
    <div className="relative w-64">
      <select
        className=" h-12 w-full px-4 pr-10 border overflow-y-auto border-gray-300 rounded-[5px] text-sm font-bold appearance-none"
        onChange={(e) => {
          setterFuncs(type, e.target.value);
        }}
      >
        <option key={"intro"} value="">
          {intro}
        </option>
        {datas.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default React.memo(Select);
