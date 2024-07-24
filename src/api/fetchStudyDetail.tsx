import { studyDatas } from "@/db/studyDatas";

export const fetchStudyDetail = (id: string) => {
  const data = studyDatas.find((data) => data.id == id);
  return data;
};
