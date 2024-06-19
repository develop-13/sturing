"use client";
function MyStudyList() {
  return (
    <div>
      <h1 className="text-[20px] font-semibold leading-7 tracking-[-3%] mb-5 mt-10 ml-[18px]">
        스터디 리스트
      </h1>
      <ul className="mx-[12px] flex gap-[16px]">
        <li>진행</li>
        <li>수락</li>
        <li>대기</li>
        <li>종료</li>
      </ul>
    </div>
  );
}

export default MyStudyList;
