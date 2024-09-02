import { TDispatchFuncs } from "@/reducers/filterReducer";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

function NumberSetter({
  memberNum,
  increaseFunc,
  decreaseFunc,
}: {
  memberNum: number;
  increaseFunc: TDispatchFuncs["increaseMemberNum"];
  decreaseFunc: TDispatchFuncs["decreaseMemberNum"];
}) {
  return (
    <article className="flex flex-col gap-3">
      <Text size="sm" weight="bold">
        함께하고 싶은 팀원 수 (본인 포함)
      </Text>
      <div className="py-3 flex justify-around rounded-[5px] border border-gray-300">
        <Icon
          type="MINUS"
          onClick={() => {
            decreaseFunc();
          }}
        />
        <Text size="sm" weight="bold">
          {memberNum}명
        </Text>
        <Icon
          type="PLUS"
          onClick={() => {
            increaseFunc();
          }}
        />
      </div>
    </article>
  );
}

export default NumberSetter;
