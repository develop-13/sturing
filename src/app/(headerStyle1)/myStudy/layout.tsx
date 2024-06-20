// 다가오는 스터디 데이터를 서버로부터 가져옴
// myStudyList데이터를 서버로부터 가져옴
// mySTudyList데이터를 진행 | 대기 | 수락 | 종료 별로 나누어서 StudyList 컴포넌트로 전달

function MyStudyPageLayout({
  children,
  UpcomingStudyList,
  MyStudyList,
}: {
  children: React.ReactNode;
  UpcomingStudyList: React.ReactNode;
  MyStudyList: React.ReactNode;
}) {
  return (
    <div className="w-auto ">
      {UpcomingStudyList}
      {MyStudyList}
    </div>
  );
}

export default MyStudyPageLayout;
