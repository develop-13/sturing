import { IoIosArrowBack } from "react-icons/io";
import IconFormat from "./IconFormat";

function SearchIcon() {
  return (
    <IconFormat
      icon={<IoIosArrowBack />}
      onClick={() => {
        console.log("search/result페이지로 이동");
      }}
    />
  );
}

export default SearchIcon;
