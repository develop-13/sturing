import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import Searchbar from "@/components/molecules/Searchbar";
import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";

const dummyRegions = [
  "서울",
  "경기",
  "인천",
  "대전",
  "세종",
  "충남",
  "충북",
  "경북",
];
const dummyLocatons = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
];

function StudyPlaceTemplate() {
  const dummyUsername = "웅진";

  return (
    <section className="flex flex-col py-[20px]">
      <MatchingTitle role="PLACE" userName={dummyUsername} />
      <div className="mt-[19px] mb-[14px]">
        <Searchbar usage="main" placeholder="스터디 선호지역을 입력해 주세요" />
      </div>
      {/*  */}
      <div className="h-[333px] overflow-y-scroll  mx-[-16px] border-t border-gray-300 ">
        <div className="flex">
          <div className="w-[133px] pl-[16px] bg-gray-200 ">
            {dummyRegions.map((region, idx) => (
              <Button
                key={idx}
                props={{ box: { theme: "transparent", extraCss: "h-[50px]" } }}
              >
                <Text props={{ size: "sm", weight: "bold", color: "gray-600" }}>
                  {region}
                </Text>
              </Button>
            ))}
          </div>
          <div className="flex-grow pl-[16px] pr-[32px]">
            <ButtonOptionDetail
              role="CHECK"
              text={"전체"}
              checkType="onClickCheck"
            />
            {dummyLocatons.map((location, idx) => (
              <ButtonOptionDetail
                role="CHECK"
                text={location}
                checkType="onClickCheck"
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex gap-[14px] mt-[26px]">
        <ButtonLabel
          datas={{
            role: "close",
            icon: <Icon type="CLOSE" />,
            theme: "secondary",
            text: "강남구",
          }}
        />
        <ButtonLabel
          datas={{
            role: "close",
            icon: <Icon type="CLOSE" />,
            theme: "secondary",
            text: "강동구",
          }}
        />
      </div>
    </section>
  );
}

export default StudyPlaceTemplate;
