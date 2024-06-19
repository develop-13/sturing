// 서버로부터 불러온 다가오는 스터디 리스트의 예상 포멧
type TupcomingStudy = {
  startDate: string;
  title: string;
  location: string;
  hour: number;
};

function UpcomingStudyInfo({
  upcomingStudyInfo,
}: {
  upcomingStudyInfo: TupcomingStudy;
}) {
  return (
    <section className="py-[28px] flex flex-col gap-5 px-[16px] bg-gradient-to-br from-custom-blue-bright to-custom-pink-bright">
      <h1 className="font-semibold text-[20px] leading-7 tracking-[-3%] opacity-100 ">
        다가오는 스터디
      </h1>
      <div className="flex flex-col gap-3 opacity-100">
        <div className="px-[20px] py-[24px] flex flex-col gap-[8px] rounded-lg border border-gray-300 bg-[#ffffff]">
          <div className="flex gap-1">
            <button className="text-[12px] font-medium tracking-[-3%] leading-[18px] py-[2px] px-[6px] bg-[#4171FF] rounded-[3px] text-[#FFFFFF]">
              {/* // 시간처리 함수 구현은 추후에 하겠습니다.. */}
              D-3
            </button>
            <button className="border bg-[#ECF1FF]  py-[2px] px-[6px] rounded-[3px] text-[12px] font-medium tracking-[-3%] leading-[18px] text-[#4171FF]">
              6월 7일
            </button>
          </div>
          <h2 className="text-[16px] font-semibold leading-6 tracking-[-2%] text-[##212121]">
            {upcomingStudyInfo.title}
          </h2>
          <h6 className="bg-gray-100 rounded-[3px] p-2 flex gap-2 text-[12px] font-medium leading-[18px] tracking-[-3%]">
            <span>{upcomingStudyInfo.location}</span>
            <span>|</span>
            <span>06.07(토) 오후 8:00 - 9:00</span>
          </h6>
        </div>
      </div>
    </section>
  );
}

export default UpcomingStudyInfo;
