import IconFormat from "./IconFormat";
import { IoSearchOutline } from "react-icons/io5";

function SearchIcon() {
	return (
		<IconFormat
			icon={<IoSearchOutline />}
			onClick={() => {
				console.log("search/result페이지로 이동");
			}}
		/>
	);
}

export default SearchIcon;
