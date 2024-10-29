import { MouseEvent, useEffect, useState } from "react";
import Text from "../atoms/Text";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TDispatchFuncs, TFilterState } from "@/reducers/filterReducer";
import { TStudyRecruitment } from "@/types/study";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TileContentProps {
  date: Date;
  view: string;
}

const renderTitle = (duration: TFilterState["duration"]) => {
  if (!(duration.startDate && duration.endDate)) {
    return (
      <Text size="sm" weight="bold" color="gray-500">
        진행기간을 선택해 주세요
      </Text>
    );
  } else {
    const { startDate, endDate } = duration;
    return (
      <div>
        <Text size="sm" weight="bold" color="gray-500">
          {startDate?.toLocaleDateString()}
        </Text>
        <Text size="sm" weight="bold" color="gray-500">
          {" ~ "}
        </Text>
        <Text size="sm" weight="bold" color="gray-500">
          {endDate?.toLocaleDateString()}
        </Text>
      </div>
    );
  }
};

type TDurationSetter = {
  duration: TStudyRecruitment["period"];
  setDate: (startDate: Date, endDate: Date) => void;
};

function DurationSetter({ duration, setDate }: TDurationSetter) {
  const [dates, setDates] = useState<Value>([null, null]);

  useEffect(() => {
    if (!Array.isArray(dates)) return;
    const [startDate, endDate] = dates;
    if (!startDate || !endDate) return;
    setDate(startDate, endDate);
  }, [dates]);

  const removeTextFromTile = ({ date, view }: TileContentProps) => {
    if (view === "month") {
      return <div className="tileDiv">{date.getDate()}</div>; // 날짜만 표시
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center border border-gray-500 rounded-[5px]">
      <div className=" h-[50px] w-[88%] border-b-2 border-gray-500 flex items-center">
        {renderTitle(duration)}
      </div>
      <Calendar
        locale="ko"
        selectRange={true} // 범위 선택 모드 활성화
        onChange={setDates} // 날짜 변경 시 호출
        value={dates} // 선택된 날짜를 전달
        tileContent={removeTextFromTile}
      />
    </div>
  );
}

export default DurationSetter;
