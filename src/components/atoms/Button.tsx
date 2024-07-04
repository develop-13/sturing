type TButton = {
	type: "TAG";
	text: string;
	theme: "PRIMARY" | "SECONDARY";
	onClick?: () => {};
};

export default function Button({ datas }: { datas: TButton }) {
	let btnTheme = "";
	let btnType = "";
	switch (datas.theme) {
		case "PRIMARY":
			btnTheme = "text-white bg-mainColor ";
			break;
		case "SECONDARY":
			btnTheme = "text-mainColor bg-main-100 border-mainColor border-2 ";
			break;
	}
	switch (datas.type) {
		case "TAG":
			btnType = "text-[12px] h-[22px] ";
			break;
	}

	return (
		<>
			<button
				className={
					`flex w-auto font-bold justify-center items-center px-2 rounded-[3px] ` +
					btnTheme +
					btnType
				}
				onClick={datas.onClick}
			>
				{datas.text}
			</button>
		</>
	);
}
