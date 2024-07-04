type TStudy = {
    id: number;
    title: string;
    src: string;
    date: string;
    type: TStudyType;
    category: TCategory;
    location: string;
    member?: TStudyMember[];
    schedule?: TStudySchedule[];
};

type TStudyMember = {
    user_id: number;
    attendance: boolean;
    prograss: number;
};

type TStudySchedule = {
    id: number;
    date: string;
};

type TStudyScheduleDetail = {
    schedule_id: number;
    title: string;
    location: string;
    time: string;
};

type TStudyBoard = {
    id: number;
    views: number;
    user_id: number;
    date: string;
    title: string;
    detail: string;
    src?: string;
};

type TStudyBanner = {
    id: number;
    src: string;
};
