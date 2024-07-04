"use client";

import Image from "next/image";

type TButtonLabel = {
	text: string;
	src: string;
	onClick?: () => {};
};
export default function ButtonLabel(props: TButtonLabel) {
	const { text, src, onClick } = props;
	return (
		<>
			<li className="flex w-auto h-[50px] font-bold rounded-full border-gray-200 border whitespace-nowrap">
				<button
					className={"flex justify-center items-center px-2 gap-2"}
					onClick={onClick}
				>
					<div className="flex rounded-full justify-center items-center bg-gray-200 overflow-hidden w-9 h-9">
						<Image src={src} alt="" />
					</div>
					{text}
				</button>
			</li>
		</>
	);
}
