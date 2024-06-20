"use client";
function MyStudyList() {
  return (
    <div>
      <h1 className="text-[20px] font-semibold leading-7 tracking-[-3%] mb-5 mt-10 ml-[18px]">
        스터디 리스트
      </h1>
      <ul className="mx-[12px] flex gap-[16px] h-[46px]">
        <li className="flex-1 justify-center flex items-center">진행</li>
        <li className="flex-1 justify-center flex items-center">수락</li>
        <li className="flex-1 justify-center flex items-center">대기</li>
        <li className="flex-1 justify-center flex items-center">종료</li>
      </ul>
      <section className="mx-[12px]">
        <div>
          <button>진행 중</button>
          <button>진행 전</button>
        </div>
      </section>
    </div>
  );
}

export default MyStudyList;
