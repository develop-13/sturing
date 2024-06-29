import Searchbar from "@/components/common/molecules/SearchBar";
import MatchingHeader from "@/components/matching/common/MatchingHeader";

function placePage() {
  return (
    <section className="flex flex-col gap-5">
      <MatchingHeader
        title={[`웅진님이 선호하는`, `스터디 장소를 선택해 주세요`]}
        subtitle={[`최대 3개까지 선택 가능합니다.`]}
      />
      <Searchbar />
      place page
    </section>
  );
}

export default placePage;
