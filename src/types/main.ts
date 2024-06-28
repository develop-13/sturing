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
};

type TCategory = string;
type TCareer = string;
