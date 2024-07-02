type TButtuon = {
	className?: string;
	children: React.ReactNode;
};

export default function Button(props: TButtuon) {
	const { children, className } = props;
	return (
		<>
			<button className={`  rounded border ` + className}>
				{children}
			</button>
		</>
	);
}
