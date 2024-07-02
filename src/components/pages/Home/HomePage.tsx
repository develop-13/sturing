import StudyBox from "@/components/organisms/StudyBox";

export default function HomePage() {
	return (
		<>
			<div className="flex h-[2400px] gap-2 mt-2">
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
		</>
	);
}
