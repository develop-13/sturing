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
    <div className="py-[28px] flex flex-col gap-5 px-[16px] bg-gradient-to-br from-[#D9E3FF] 100% to-[#FFE4E0] 100%">
      <h1 className="font-semibold text-[20px] leading-7 tracking-[-3%]">
        다가오는 스터디
      </h1>
      <div className="flex flex-col gap-3">
        <div className="px-[20px] py-[24px] flex flex-col gap-[8px] rounded-lg border border-gray-300 bg-[#ffffff]">
          <div className="flex gap-1">
            <button className="text-[12px] font-medium tracking-[-3%] leading-[18px] py-[2px] px-[6px] bg-[#4171FF] rounded-[3px] text-[#FFFFFF]">
              D-3
            </button>
            <button className="border bg-[#ECF1FF]  py-[2px] px-[6px] rounded-[3px] text-[12px] font-medium tracking-[-3%] leading-[18px] text-[#4171FF]">
              6월 7일
            </button>
          </div>
          <h2 className="text-[16px] font-semibold leading-6 tracking-[-2%] text-[##212121]">
            UXUI 디자이너 본질 강화 피그마 스터디
          </h2>
          <h6 className="bg-gray-100 rounded-[3px] p-2 flex gap-2 text-[12px] font-medium leading-[18px] tracking-[-3%]">
            {/* 스타벅스 종로점 | 06.07(토) 오후 8:00 - 9:00 */}
            <span>스타벅스 종로점</span>
            <span>|</span>
            <span>06.07(토) 오후 8:00 - 9:00</span>
          </h6>
        </div>
        {/* <div><PageBtns /></div> */}
      </div>
    </div>
  );
}

export default UpcomingStudyInfo;
