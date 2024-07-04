"use client";
import ButtonLabel from "../atoms/ButtonLabel";

export default function StudyCategory() {
	let isDragging = false;
	const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
		if (!isDragging) return;
		e.currentTarget.scrollLeft -= e.movementX;
	};

	return (
		<>
			<div className="relative overflow-x-hidden">
				<ul
					className="flex gap-2 overflow-x-hidden list-none px-2"
					onMouseMove={dragging}
					onMouseDown={() => (isDragging = true)}
					onMouseUp={() => (isDragging = false)}
					onMouseLeave={() => (isDragging = false)}
				>
					<ButtonLabel text="디자인" src="" />
					<ButtonLabel text="개발·테크" src="" />
					<ButtonLabel text="마케팅" src="" />
					<ButtonLabel text="비즈니스" src="" />
					<ButtonLabel text="경제" src="" />
					<ButtonLabel text="외국어" src="" />
					<ButtonLabel text="자격증" src="" />
					<ButtonLabel text="자기계발" src="" />
				</ul>
			</div>
		</>
	);
}
