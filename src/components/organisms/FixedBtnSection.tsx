import React from "react";

function FixedBtnSection({ children }: { children: React.ReactNode }) {
  // children 요소의 수를 계산
  const childrenCount = React.Children.count(children);

  // children의 요소 수가 두 개가 아닐 경우 에러를 발생시킴
  if (childrenCount !== 2) {
    throw new Error("FixedBtnSection requires exactly two children.");
  }
  return (
    <div className="w-full px-4 flex justify-between fixed bottom-2">
      {children}
    </div>
  );
}

export default FixedBtnSection;
