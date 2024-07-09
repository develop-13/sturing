import Searchbar from "@/components/molcules/SearchBar";
import MatchingHeader from "../../molcules/MatchingTitle";
import LocationPicker from "../../organisms/LocationPicker";

function StudyPlaceTemplate() {
  return (
    <section>
      <MatchingHeader
        title={["웅진님이 선호하는", "스터디 장소를 선택해주세요"]}
        subtitle={["최대 3개까지 선택 가능합니다."]}
      />
      <div className="mx-4 my-4">
        <Searchbar
          px={20}
          py={12}
          placeholder="스터디 선호지역을 입력해 주세요"
        />
      </div>
      <LocationPicker />
    </section>
  );
}

export default StudyPlaceTemplate;
