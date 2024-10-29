import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import NumberSetter from "@/components/organisms/NumberSetter";
import { levelData } from "@/db/levels";
import { v4 } from "uuid";
import { roleData } from "@/db/roles";
import { CheckBarButton } from "@/components/molecules/IconLabelButton";

function MemberPreference() {
  return (
    <div className="px-4 py-5">
      <Text>원하는 팀원의 정보를 입력해 주세요</Text>
      <section className="flex flex-col gap-[60px]">
        <div className="flex flex-col gap-[13px]">
          <Text>함께하고 싶은 팀원</Text>
          <div className="flex flex-wrap gap-2">
            {levelData.map((el) => (
              <Button theme="ordinary" shape="tag" key={el.level}>
                <Text size="xs" color="gray-600">
                  {el.level + el.experience}
                </Text>
              </Button>
            ))}
          </div>
        </div>
        <NumberSetter />

        <div className="flex flex-col gap-[13px]">
          <Text>함께하고 싶은 팀원의 연령대</Text>
          <div className="flex gap-2 flex-wrap">
            <Button theme="ordinary" shape="listItem" key={v4()}>
              <Text size="xs" color="gray-600">
                누구나
              </Text>
            </Button>
            <Button theme="ordinary" shape="listItem" key={v4()}>
              <Text size="xs" color="gray-600">
                20대
              </Text>
            </Button>
            <Button theme="ordinary" shape="listItem" key={v4()}>
              <Text size="xs" color="gray-600">
                30대
              </Text>
            </Button>
            <Button theme="ordinary" shape="listItem" key={v4()}>
              <Text size="xs" color="gray-600">
                40대
              </Text>
            </Button>
            <Button theme="ordinary" shape="listItem" key={v4()}>
              <Text size="xs" color="gray-600">
                50대
              </Text>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-[13px]">
          <Text>스터디에서 필요한 역할 선택</Text>
          <div className="grid grid-cols-2 gap-2">
            {roleData.map((el) => (
              <CheckBarButton
                key={el.role}
                type="checkOnClick"
                theme="ordinary"
                className="!p-2 "
              >
                {" "}
                <div>
                  <Text size="xs" weight="bold">
                    {el.title}
                  </Text>
                  <Text size="xs" weight="bold" className="!text-gray-600">
                    {el.text}
                  </Text>
                </div>
              </CheckBarButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MemberPreference;
