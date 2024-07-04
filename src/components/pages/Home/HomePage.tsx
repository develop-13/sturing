import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";

export default function HomePage() {
    const study1: TStudy = {
        id: 0,
        src: "",
        date: "매주 금 오후 9:00",
        type: "오프라인",
        category: "개발·테크",
        location: "",
    };
    const study2: TStudy = {
        id: 1,
        src: "",
        date: "모임 날짜 미정",
        type: "온라인",
        category: "디자인",
        location: "",
    };

    return (
        <>
            <div className="flex flex-col h-[2400px] mt-2 overflow-hidden">
                <StudyCategory />
                <div className="flex flex-row gap-2 mt-2">
                    <StudyBox props={study1} />
                    <StudyBox props={study2} />
                </div>
            </div>
        </>
    );
}
