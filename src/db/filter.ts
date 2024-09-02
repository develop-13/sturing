import { TCategory, TFilterDatas, TLocation } from "@/types/common";
import { TLevelItem, levelData } from "./levels";
import { TRoleItem, roleData } from "./roles";
import locationData from "./locations";

export const filterDatas: TFilterDatas = {
  categories: [
    "DESIGN",
    "TECH",
    "BUSINESS",
    "CERTIFICATION",
    "ECONOMY",
    "SELFDEVELOP",
    "MARKETING",
    "LANGUAGE",
  ],
  membernum: 0,
  locations: locationData,
  duration: {
    from: new Date(),
    to: new Date(),
  },
  levels: levelData,
  roles: roleData,
};

// 클라이언트의 filterState 값도 정해보자.
// 하 그냥 filterReducer 만 정의 해놔도 되었는데.. 진짜 멍청한ㅅㄲ
