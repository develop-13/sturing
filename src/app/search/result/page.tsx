import Icon from "@/components/common/atoms/Icon";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
import FilterBar from "@/components/search/molecules/FilterBar";
import FilterModal from "@/components/search/organisms/FilterModal";

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
