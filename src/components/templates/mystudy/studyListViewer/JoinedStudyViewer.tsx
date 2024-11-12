import React, { useState } from "react";

type TOngoingStudyViwer = {
  studyData: any[];
};

function JoinedStudyViewer(props: TOngoingStudyViwer) {
  const [currentStudy, setCurrentStudy] = useState("ongoing");

  return <div>OngoingStudyTemplate</div>;
}

export default JoinedStudyViewer;
