import { IoIosArrowForward } from "react-icons/io";
import IconFormat from "./IconFormat";

function ArrowForwardBtn() {
	return (
		<IconFormat
			icon={<IoIosArrowForward />}
			onClick={() => {
				"앞으로 가기 기능을 구현해주세요";
			}}
		/>
	);
}

export default ArrowForwardBtn;
