import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import Searchbar from "@/components/molecules/Searchbar";
import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import Suggestions from "@/components/organisms/Suggestions";
import { TState, TDispatchFuncs } from "@/components/pages/MatchingPage";
import { useCallback, useEffect, useState } from "react";

type TInterestsTemplate = {
  studyPlacePreference: TState["studyPlacePreference"];
  setStudyPlacePreference: TDispatchFuncs["setStudyPlacePreference"];
};

type TLocationData = {
  [region: string]: string[];
};

function StudyPlaceTemplate(props: TInterestsTemplate) {
  const dummyUsername = "웅진";
  const [data, setData] = useState<TLocationData>({});
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  console.log("studyPlaceTemplate render");
  console.log(`query=${query}`);
  console.log(`suggestions=${suggestions}`);

  const onSelect = useCallback((word: string) => {
    console.log("onSelect occured");
    const [region, location] = word.split(" ");
    if (props.studyPlacePreference.has(region + "/" + location)) {
      alert("이미 선택하신 지역입니다");
      return;
    }
    props.setStudyPlacePreference(region, location);
  }, []);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`onChangeQuery occured`);
    console.log(e.target);
    setQuery(e.target.value);
  };

  useEffect(() => {
    console.log(`data useEffect occured`);
    fetch("/data/location.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  // 처음에만 실행

  useEffect(() => {
    console.log("suggestion useEffect occured");
    if (suggestions.length === 0 && query === "") {
      return;
    }

    if (query === "") {
      setSuggestions([]);
      return;
    }
    const results: string[] = [];
    for (const [region, districts] of Object.entries(data)) {
      districts.forEach((district) => {
        let fullName = region + " " + district;
        if (fullName.includes(query)) {
          results.push(`${region} ${district}`);
        }
      });
    }
    setSuggestions(results);
  }, [query]);

  return (
    <section className="flex flex-col py-[20px]">
      <MatchingTitle role="PLACE" userName={dummyUsername} />
      <div className="mt-[19px] mb-[14px] relative">
        <Searchbar
          usage="main"
          placeholder="스터디 선호지역을 입력해 주세요"
          value={query}
          onChange={onChangeQuery}
        />
        <Suggestions
          currentQuery={query}
          suggestions={suggestions}
          onSelect={onSelect}
        />
      </div>

      <article className="h-[333px] overflow-y-scroll  mx-[-16px] border-t border-gray-300 ">
        <div className="flex">
          <div className="w-[133px] pl-[16px] bg-gray-200 ">
            {/* 주요도시 및 도 */}
          </div>

          {/* 지역구 */}
          <div className="flex-grow pl-[16px] pr-[32px]"></div>
        </div>
      </article>

      {/* 선택된 항목 */}
      <div className="flex gap-[14px] mt-[26px]">
        {props.studyPlacePreference}
      </div>
    </section>
  );
}

export default StudyPlaceTemplate;
