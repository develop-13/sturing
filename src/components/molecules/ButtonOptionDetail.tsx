"use client";

type TButtonOptionDetail = {
  role: "LEVEL" | "STUDYPLACE";
  level?: string;
  levelDetail?: string;
  studyTypeDetail?: string;
  checkIcon?: React.ReactNode;
  onClick?: () => void;
  // 함수 넘겨받는 issue
};

function ButtonOptionDetail({ datas }: { datas: TButtonOptionDetail }) {
  if (!isValidData(datas)) {
    return "옳바른 datas형식이 아닙니다.";
  }

  function isValidData(datas: TButtonOptionDetail) {
    const hasLevelInfo = datas.level && datas.levelDetail;
    const hasStudyType = datas.studyTypeDetail && datas.checkIcon;
    return (hasLevelInfo && !hasStudyType) || (!hasLevelInfo && hasStudyType);
  }

  const commonClassName =
    "w-full px-[24px] h-[64px] flex items-center rounded-[3px] border border-gray-300 text-gray-700 font-bold ";

  switch (datas.role) {
    case "LEVEL":
      return (
        <span
          className={commonClassName + "text-[14px] gap-[18px] "}
          onClick={datas.onClick}
        >
          <span>{datas.level}</span>
          <span>{datas.levelDetail}</span>
        </span>
      );

    case "STUDYPLACE":
      return (
        <span className={commonClassName + "text-[16pz] justify-between"}>
          <span>{datas.studyTypeDetail}</span>
          {datas.checkIcon}
        </span>
      );
  }
}

export default ButtonOptionDetail;
