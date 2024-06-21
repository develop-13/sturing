"use client";

function TemporalSaveBtn() {
  const onClickTemporalSaveBtn = () => {
    console.log("임시저장 기능을 구현해주세요");
  };

  return (
    <span
      className="font-normal text-[14px] leading-[22px] tracking-[-3%] text-[#909090]"
      onClick={onClickTemporalSaveBtn}
    >
      임시저장
    </span>
  );
}

export default TemporalSaveBtn;
