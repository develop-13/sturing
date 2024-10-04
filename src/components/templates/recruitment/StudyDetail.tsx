import Text from "@/components/atoms/Text";

function StudyDetail() {
  return (
    <section className="py-4 flex flex-col gap-5">
      {" "}
      <Text size="xl" weight="bold">
        스터디 상세정보를 입력해 주세요{" "}
      </Text>
      <div></div>
      <div>
        <div className="flex flex-col gap-[13px]">
          <Text size="sm" weight="bold">
            스터디 진행 요일 및 시간
          </Text>
          {/* select 영역 */}
          <div className="flex gap-[11px]">
            <div className="relative w-64">
              <select className="h-12 w-full px-4 pr-10 border border-gray-300 rounded-[5px] text-sm font-bold appearance-none">
                <option value="">요일을 선택해주세요</option>
                <option value="monday">월요일</option>
                <option value="tuesday">화요일</option>
                <option value="wednesday">수요일</option>
                <option value="thursday">목요일</option>
                <option value="friday">금요일</option>
                <option value="saturday">토요일</option>
                <option value="sunday">일요일</option>
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
            <div className="relative w-64">
              <select className="h-12 w-full px-4 pr-10 border border-gray-300 rounded-[5px] text-sm font-bold appearance-none">
                <option value="">시간을 선택해주세요</option>
                <option value="saturday">오전 9:00</option>
                <option value="sunday">오후 2:00</option>
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
          </div>
          {/* select 영역 */}
        </div>
      </div>
    </section>
  );
}

export default StudyDetail;
