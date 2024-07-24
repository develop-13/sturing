import { studyDatas } from "@/db/studyDatas";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import ButtonLabel from "../molecules/ButtonLabel";
import Searchbar from "../molecules/Searchbar";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import StudyBox from "../organisms/StudyBox";

function SearchPage() {
  return (
    <div>
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          <div className="flex gap-[12px]">
            <Icon type="BELL" />
            <Icon type="USER" />
          </div>
        }
      />
      <NavButtonGroup />
      <section className="px-4 py-5 flex flex-col gap-10">
        <Searchbar
          placeholder="관심 스터디 분야나 강의명을 검색해 보세요"
          usage="main"
        />
        <article>
          <div className="flex justify-between ">
            <Text size="base" weight="bold">
              최근검색어
            </Text>
            <Text size="sm" weight="bold" color="gray-600">
              전체삭제
            </Text>
          </div>
          <div className="flex gap-3 flex-wrap mt-5">
            <ButtonLabel
              datas={{ theme: "ordinary", role: "close", text: "포트폴리오" }}
            />
            <ButtonLabel
              datas={{ theme: "ordinary", role: "close", text: "디자이너" }}
            />
            <ButtonLabel
              datas={{ theme: "ordinary", role: "close", text: "UIUX" }}
            />
            <ButtonLabel
              datas={{ theme: "ordinary", role: "close", text: "블랜더 3DX" }}
            />
          </div>
        </article>
        <article>
          <Text size="base" weight="bold">
            추천검색어
          </Text>
          <div className="flex gap-3 flex-wrap mt-5">
            <Button theme="secondary" shape="button" extraCss="px-[10px]">
              <Text size="sm" weight="bold" color="main">
                스프링
              </Text>
            </Button>
            <Button theme="secondary" shape="button" extraCss="px-[10px]">
              <Text size="sm" weight="bold" color="main">
                AI
              </Text>
            </Button>
            <Button theme="secondary" shape="button" extraCss="px-[10px]">
              <Text size="sm" weight="bold" color="main">
                UIUX
              </Text>
            </Button>
            <Button theme="secondary" shape="button" extraCss="px-[10px]">
              <Text size="sm" weight="bold" color="main">
                CHAT GPT
              </Text>
            </Button>
            <Button theme="secondary" shape="button" extraCss="px-[10px]">
              <Text size="sm" weight="bold" color="main">
                JAVA
              </Text>
            </Button>
          </div>
        </article>
        <article>
          <Text size="base" weight="bold">
            최근 본 스터디
          </Text>
          <div className="flex gap-4 mt-5">
            <StudyBox props={studyDatas[2]} />
            <StudyBox props={studyDatas[3]} />
          </div>
        </article>
      </section>
    </div>
  );
}

export default SearchPage;
