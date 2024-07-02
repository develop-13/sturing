import Button from "../atoms/Button";
import StudyImageBox from "../molecules/StudyImageBox";

export default function StudyBox(props: study) {
	const { src, date, isChecked, type, category } = props;
	return (
		<>
			<div className="flex flex-col">
				<StudyImageBox src={src} date={date} isChecked={isChecked} />
				<div className="flex flex-row gap-2 pt-2">
					<Button
						fontsize={12}
						height={22}
						text={type}
						theme="PRIMARY"
					/>
					<Button
						fontsize={12}
						height={22}
						text={category}
						theme="SECONDARY"
					/>
				</div>
			</div>
		</>
	);
}
