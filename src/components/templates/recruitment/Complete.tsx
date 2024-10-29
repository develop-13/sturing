import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

function Complete() {
  return (
    <div className="w-full h-screen bg-white absolute left-0 top-0 flex items-center justify-center ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Icon type="COMPLETE" width={62} height={62} />
        <Text size="lg" weight="bold">
          모집글 작성을 완료했습니다!
        </Text>
        <div className="w-[80%] text-center">
          <Text>
            스터디 지원자들의 지원서는 내 스터디에서 확인하고 수락할 수 있어요.
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Complete;
