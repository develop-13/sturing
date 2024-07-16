import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

// 서버로부터 불러온 다가오는 스터디 리스트의 예상 포멧
type TupcomingStudy = {
  startDate: string;
  title: string;
  location: string;
  hour: number;
};

// 이미 여기서 데이터 받아오는 작업이 이뤄줘야 할 듯
function UpcomingStudyList() {
  return <Swiper></Swiper>;
}

export default UpcomingStudyList;
