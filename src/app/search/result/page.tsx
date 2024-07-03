import Icon from "@/components/atoms/Icon";
import HeaderForamt from "@/components/organisms/headerForamt";
import FilterBar from "@/components/molcules/FilterBar";
import FilterModal from "@/components/organisms/FilterModal";

function SearchResultPage() {
  return (
    <div className="w-[375px]">
      <HeaderForamt icons_left={<Icon type="BACK" />} hasSearchBar={true} />
      <FilterBar />
      <FilterModal />
    </div>
  );
}

export default SearchResultPage;
