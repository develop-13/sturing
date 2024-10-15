import { TAtmosphere, TCategory, TLevel } from "./common";

export type TMatching = {
  interests: TCategory[];
  fieldLevels: Map<TCategory, TLevel | "">;
  studyTypePreference: "online" | "offline" | "" | "both";
  studyPlacePreference: Set<string>;
  studyAtmospherePreference: Set<TAtmosphere>;
};

export type NewTMatching = {
  interests: TCategory[];
  fieldLevels: Record<TCategory, TLevel | "">;
  studyTypePreference: "online" | "offline" | "not_decided" | "both";
  studyPlacePreference: Record<string, boolean>;
  studyAtmospherePreference: Record<TAtmosphere, boolean>;
};
