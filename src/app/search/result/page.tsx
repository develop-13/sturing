import ArrowBackBtn from "@/components/common/atoms/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";

function SearchResultPage() {
  return (
    <div>
      <HeaderForamt icons_left={<ArrowBackBtn />} hasSearchBar={true} />
    </div>
  );
}

export default SearchResultPage;
