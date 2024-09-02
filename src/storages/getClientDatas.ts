import { categories } from "@/db/categories";
import locationData from "@/db/locations";
import { levelData } from "@/db/levels";
import { roleData } from "@/db/roles";
// 지금은 import 해서 가져오지만 나중에는 서버 통신으로 바꾸기

// 각 데이터를 가져와서 filterOptions에 저장한다.

export const setSessionData = (key: string, value: any) => {
  // const categories = fetch("카테고리 데이터")
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionData = (key: string) => {
  const sessionData = sessionStorage.getItem(key);
  if (sessionData) {
    return JSON.parse(sessionData);
  } else {
    return null;
  }
};

// session 사용하지 말고 next js ssg 사용하기
