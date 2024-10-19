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

export type TUser = {
  name: string;
  email: string;
  imgSrc?: string;
  matchingInfo?: NewTMatching | null;
  recentQueries: string[];
  recentViewedStudies: string[];
  study_in_participants: string[];
  schedules: string[];
  watchList: string[];
  Accepted_applies: string[];
  applies: string[];
};
