import { TIconData } from "@/components/atoms/Icon";
import { TAtmosphere } from "@/types/common";

export type TAtmosphereItem = {
  atmosphere: TAtmosphere;
  icon: TIconData["type"];
};

export const atmosphereData: TAtmosphereItem[] = [
  { atmosphere: "FRIENDLY", icon: "FRIENDLY" },
  { atmosphere: "PROFESSIONAL", icon: "PROFESSIONAL" },
  { atmosphere: "SERIOUS", icon: "SERIOUS" },
  { atmosphere: "SYSTEMATIC", icon: "SYSTEMATIC" },
  { atmosphere: "ENTHUSIASTIC", icon: "ENTHUSIASTIC" },
  { atmosphere: "RESPONSIBLE", icon: "RESPONSIBLE" },
  { atmosphere: "LEARNING", icon: "LEARNING" },
  { atmosphere: "COOPERATIVE", icon: "COOPERATIVE" },
  { atmosphere: "SELFDIRECTED", icon: "SELFDIRECTED" },
  { atmosphere: "FREE", icon: "FREE" },
];
// 클라이언트에서는 접속하자마자 가져와서 세션 스토리지 같은데 저장해놓고,
// 이후에는 세션 스토리지에 접근해서 사용할 수 있도록 하기?
