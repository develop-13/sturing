import MatchingTitle from "@/components/molecules/MatchingTitle";
import Searchbar from "@/components/molecules/Searchbar";

function StudyPlaceTemplate() {
  const dummyUsername = "웅진";

  return (
    <section className="flex flex-col">
      <MatchingTitle type="PLACE" userName={dummyUsername} />
      <Searchbar usage="main" placeholder="스터디 선호지역을 입력해 주세요" />
    </section>
  );
}

export default StudyPlaceTemplate;
