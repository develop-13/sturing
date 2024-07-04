import TitleLink from "@/components/atoms/TitleLink";
import StudyBanner from "@/components/organisms/StudyBanner";
import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";
import { studyBanners } from "@/db/studyBanners";
import { studyDatas } from "@/db/studyDatas";

export default function HomePage() {
    return (
        <>
            <div className="flex flex-col overflow-hidden">
                <StudyBanner props={studyBanners} />
                <TitleLink props={{ title: "분야별 스터디 탐색하기" }} />
                <StudyCategory />
                <TitleLink props={{ title: "이번주 인기 스터디" }} />
                <div className="flex flex-row gap-2">
                    <StudyBox props={studyDatas[0]} />
                    <StudyBox props={studyDatas[1]} />
                </div>
                <TitleLink props={{ title: "새로 개설된 스터디" }} />
                <div className="flex flex-row gap-2">
                    <StudyBox props={studyDatas[2]} />
                    <StudyBox props={studyDatas[3]} />
                </div>
            </div>
        </>
    );
}
