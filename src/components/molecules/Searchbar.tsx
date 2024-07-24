import Icon from "../atoms/Icon";

type TSearchbar = {
  placeholder?: string;
  usage: "header" | "main";
  value?: string;
};

function Searchbar({ placeholder, usage, value }: TSearchbar) {
  let searchbarSize = "";
  let searchIconColor = "";

  switch (usage) {
    case "header":
      searchbarSize = "px-[16px] h-[36px]";
      searchIconColor = "text-gray-800";
      break;
    case "main":
      searchbarSize = "px-[20px] h-[48px]";
      searchIconColor = "text-mainColor";
  }

  return (
    <div
      className={
        "w-full flex items-center gap-[10px] bg-main-100 rounded-full " +
        searchbarSize
      }
    >
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border-none outline-none bg-transparent text-[14px] text-gray-1000 font-bold placeholder:text-gray-700"
        value={value}
      />
      <Icon type="SEARCH" color={searchIconColor} />
    </div>
  );
}

export default Searchbar;
