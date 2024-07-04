type TButton = {
	height: number;
	text: string;
	fontsize: number;
	theme: "PRIMARY" | "SECONDARY";
	onClick?: () => {};
};

export default function Button(props: TButton) {
	const { height, text, fontsize, theme, onClick } = props;
	let btnStyle = "";
	switch (theme) {
		case "PRIMARY":
			btnStyle = "text-white bg-mainColor";
			break;
		case "SECONDARY":
			btnStyle = "text-mainColor bg-main-100 border-mainColor border-2";
			break;
	}

	return (
		<>
			<button
				style={{ height: height, fontSize: fontsize }}
				className={
					`flex w-auto font-bold justify-center items-center px-2 rounded-[3px] ` +
					btnStyle
				}
				onClick={onClick}
			>
				{text}
			</button>
		</>
	);
}
