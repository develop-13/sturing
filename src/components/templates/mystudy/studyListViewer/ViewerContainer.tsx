import React from "react";

function ViewerContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[300px] overflow-scroll bg-gray-100 px-[16px] pt-[20px] pb-[40px] ">
      {children}
    </div>
  );
}

export default ViewerContainer;
