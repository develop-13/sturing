type TUser = {
	id: number;
	name: string;
	email: string;
	profile: TUserProfile;
	matching: TUserMatching;
};

type TUserProfile = {
	nickname: string;
	age: number;
	gender: string;
	location: string;
};

type TUserMatching = {
	favorite: [
		{
			category: TCategory;
			career: TCareer;
		}
	];
	location?: TLocation[];
	studytype: TStudyType;
	mood: TMood[];
};

type TCategory = string;
type TMood = string;
type TCareer = "비기너" | "신입" | "주니어" | "시니어";
type TLocation = string;
type TStudyType = "온라인" | "오프라인" | "상관없음";

/// Server Type
type TUserServer = {
	id: number;
	name: string;
	email: string;
	profile: TUserProfile;
	matching: TUserMatching;
};

/// Adapter To Server
const adapterTUser = (user: TUser) => {
	return;
};
