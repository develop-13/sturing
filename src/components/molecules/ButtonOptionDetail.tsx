type TButtonOptionDetail = {
  type: "LEVEL" | "STUDYPLACE";
  level?: string;
  levelDetail?: string;
  studyTypeDetail?: string;
  checkIcon: React.ReactNode;
  onClick: () => void;
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

  switch (datas.type) {
    case "LEVEL":
      return (
        <span
          className={commonClassName + "gap-[18px] "}
          onClick={datas.onClick}
        >
          <span>{datas.level}</span>
          <span>{datas.levelDetail}</span>
        </span>
      );

    case "STUDYPLACE":
      return (
        <button className={commonClassName + "justify-end"}>
          <span>{datas.studyTypeDetail}</span>
          {datas.checkIcon}
        </button>
      );
  }
}

export default ButtonOptionDetail;
