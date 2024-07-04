import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";

export default function HomePage() {
	return (
		<>
			<div className="flex flex-col h-[2400px] mt-2 overflow-hidden">
				<StudyCategory />
				<div className="flex flex-row gap-2 mt-2">
					<StudyBox
						src=""
						isChecked={false}
						date="매주 금 오후 9:00"
						type="오프라인"
						category="개발·테크"
					/>
					<StudyBox
						src=""
						isChecked={false}
						date="모임 날짜 미정"
						type="온라인"
						category="디자인"
					/>
				</div>
			</div>
		</>
	);
}
