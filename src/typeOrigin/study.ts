type TStudy = {
  id: number;
  title: string;
  src: string;
  date: string;
  // 스터디 하는 요일/시간을 말하는 건지 스터디 기간을 말하는 건지 모르겠음.
  type: TStudyType;
  category: TCategory;
  location: string;
  // 성동구 외3의 의미는? 희망스터디 장소
  member?: TStudyMember[];
  schedule?: TStudySchedule[];
};
// 추가적으로 필요한 정보 (recommend의 스터디 아이템에 보여질 정보)
// 1.기간 (스터디 시작날짜, 스터디 종료날짜)
// 2.최대 모집인원

// 내가 참여하고 있지 않은 스터디 페이지에 추가적으로 필요한 정보
// 1. 최대인원
// 2. 과제
// 3. 평점
// 4. 분위기
// 5. 이 스터디에서 원하는 팀원

type TStudyMember = {
  user_id: number;
  attendance: boolean;
  prograss: number;
};

type TStudySchedule = {
  id: number;
  date: string;
};

type TStudyScheduleDetail = {
  schedule_id: number;
  title: string;
  location: string;
  time: string;
};

type TStudyBoard = {
  id: number;
  views: number;
  user_id: number;
  date: string;
  title: string;
  detail: string;
  src?: string;
};

type TStudyBanner = {
  id: number;
  src: string;
};
