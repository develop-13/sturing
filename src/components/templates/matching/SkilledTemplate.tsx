import Button from "@/components/molecules/Button";
import ButtonOptionDetail from "@/components/molecules/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import ButtonGroup from "@/components/organisms/ButtonGroup";

const dummyUsername = "웅진";

function SkilledTemplate() {
  return (
    <section className="flex flex-col">
      <MatchingTitle type="LEVEL" userName={dummyUsername} />
      <main>
        <ButtonGroup gap={12}>
          <Button theme="border-bottom" type="full">
            디자인
          </Button>
          <Button theme="border-bottom" type="full">
            마케팅
          </Button>
          <Button theme="border-bottom" type="full">
            비즈니스
          </Button>
        </ButtonGroup>
        <div className="py-[16px] flex flex-col gap-[14px]">
          <ButtonOptionDetail
            role="LEVEL"
            level="비기너"
            detail="관련 공부를 이제 막 시작했어요"
          />
          <ButtonOptionDetail
            role="LEVEL"
            level="신입"
            detail="관련 분야에서 일한지 아직 1년이 안됐어요"
          />
          <ButtonOptionDetail
            role="LEVEL"
            level="주니어"
            detail="1-3년 정도 관련 분야 업무경험이 있어요"
          />
          <ButtonOptionDetail
            role="LEVEL"
            level="시니어"
            detail="4년 이상의 관련 분야 업무경험이 있어요"
          />
        </div>
      </main>
    </section>
  );
}

export default SkilledTemplate;
