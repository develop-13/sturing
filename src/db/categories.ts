import { TIconData } from "@/components/atoms/Icon";
import { TCategory } from "@/types/common";
export type TCategoryItem = { category: TCategory; icon: TIconData["type"] };

export const categories: TCategory[] = [
  "DESIGN",
  "TECH",
  "BUSINESS",
  "MARKETING",
  "ECONOMY",
  "LANGUAGE",
  "CERTIFICATION",
  "SELFDEVELOP",
];

// 후에 db로 빼서 db에서 가져오도록
