import React, { useState, useCallback, useEffect } from "react";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import IconLabelButton, {
  CheckBarButton,
} from "@/components/molecules/IconLabelButton";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import Searchbar from "@/components/molecules/Searchbar";
import Suggestions from "@/components/organisms/Suggestions";
import { TMatchingState, TDispatchFuncs } from "@/reducer/MatchingReducer";
import locationData from "@/data/location.json";
import { v4 as uuidv4 } from "uuid";

type locationData = {
  [key: string]: string[];
};
// 유지보수하기 힘들어졌다.. 액션 하나 추가할때 마다 고쳐야 할 부분이 상당함..
type TInterestsTemplate = {
  studyPlacePreference: TMatchingState["studyPlacePreference"];
  addStudyPlacePreference: TDispatchFuncs["addStudyPlacePreference"];
  deleteStudyPlacePreference: TDispatchFuncs["deleteStudyPlacePreference"];
};

const data: locationData = locationData;

function StudyPlaceTemplate(props: TInterestsTemplate) {
  const dummyUsername = "웅진";
  const [currentRegion, setCurrentRegion] = useState<string>(
    Object.keys(data)[0]
  );
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  console.log(`StudyPlaceTemplate render`);
  console.log(`query=${query}`);
  console.log(`suggestions=${suggestions}`);

  const onSelect = (word: string) => {
    console.log("onSelect occurred");
    const [region, location] = word.split(" ");
    if (props.studyPlacePreference.has(region + " " + location)) {
      alert("이미 선택하신 지역입니다");
      return;
    }
    if (props.studyPlacePreference.size >= 3) {
      alert("최대 3개까지만 선택 가능합니다.");
      return;
    }
    setQuery(""); // 선택 후 query를 초기화합니다.
    props.addStudyPlacePreference(region, location);
  };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") {
      if (suggestions.length === 0) {
        return;
      }
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

      <article className="h-[333px] overflow-y-scroll mx-[-16px] border-t border-gray-300">
        <div className="flex">
          <div className="w-[133px] pl-[16px] bg-gray-200 ">
            {/* 주요도시 및 도 */}
            {Object.keys(data).map((region) => (
              <Button
                theme="transparent"
                extraCss={
                  region === currentRegion
                    ? "h-[50px] !bg-mainColor "
                    : "h-[50px] "
                }
                onClick={() => setCurrentRegion(region)}
                key={uuidv4()}
              >
                <Text
                  size="sm"
                  weight="bold"
                  color={region === currentRegion ? "white" : "gray-600"}
                >
                  {region}
                </Text>
              </Button>
            ))}
          </div>
          <div className="flex-grow">
            {/* 해당 도의 지역구들 */}
            {data[currentRegion].map((location) => (
              <CheckBarButton
                type="checkOnClick"
                isActive={props.studyPlacePreference.has(
                  currentRegion + " " + location
                )}
                text={location}
                onClick={() => {
                  let fullName = currentRegion + " " + location;
                  onSelect(fullName);
                }}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
      </article>

      {/* 선택된 항목 */}
      <div className="flex gap-[14px] mt-[26px]">
        {Array.from(props.studyPlacePreference).map((location) => (
          <IconLabelButton
            key={uuidv4()}
            datas={{
              onClick: () => {
                props.deleteStudyPlacePreference(
                  location.split(" ")[0],
                  location.split(" ")[1]
                );
              },
              text: location.split(" ")[1],
              usage: "close",
              extraStyle:
                "px-[14px] py-[9px] bg-main-100 text-mainColor rounded-[8px] border border-mainColor",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default StudyPlaceTemplate;
