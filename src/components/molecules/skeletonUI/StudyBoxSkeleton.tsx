import React from "react";

function StudyBoxSkeleton() {
  return (
    <div className="w-[182px] flex flex-col gap-2 animate-pulse">
      <div className="h-[100px] bg-slate-200 rounded-md"></div>
      <div className="h-[12px] bg-slate-200  rounded-md"></div>
      <div className="h-[12px] w-[55%] bg-slate-200  rounded-md"></div>
      <div className="h-[12px] w-[80%] bg-slate-200  rounded-md"></div>
      <div className="h-[12px]  bg-slate-200  rounded-md"></div>
    </div>
  );
}

export default StudyBoxSkeleton;
