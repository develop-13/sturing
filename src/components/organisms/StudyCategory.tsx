"use client";
import { MouseEventHandler } from "react";
import ButtonLabel from "../atoms/ButtonLabel";

const dragging = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
	e.currentTarget.scrollLeft -= e.movementX;
};

export default function StudyCategory() {
	return (
		<>
			<div className="relative overflow-x-hidden">
				<ul
					className="flex gap-2 overflow-x-hidden list-none"
					onMouseMove={dragging}
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
