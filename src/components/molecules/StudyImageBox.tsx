type TStudyImageBox = {
	src: string;
	date: string;
	isChecked: boolean;
};

export default function StudyImageBox(props: TStudyImageBox) {
	const { src, date, isChecked } = props;

	return (
		<>
			<div className="flex flex-col">
				<div
					className={
						`flex relative w-[182px] h-[100px] rounded-lg overflow-hidden ` +
						(src == "" ? "bg-mainColor" : "")
					}
				>
					{/* <div> 아이콘 추가해주세요 !!! </div> */}
					<div className="flex absolute bottom-0 w-full h-[24px]  bg-black bg-opacity-80 justify-center items-center">
						<text className="text-white font-bold text-[12px]">
							{date}
						</text>
					</div>
				</div>
			</div>
		</>
	);
}
