import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";

function ImageSetter() {
  return (
    <div className="flex flex-col gap-3 thumbnail">
      <Text size="sm" weight="bold">
        스터디 대표 사진
      </Text>
      <div className="w-[70px] h-[70px] rounded-[5px] border border-gray-300 flex items-center justify-center">
        <Icon type="CAMERA" height={30} width={30} />
      </div>
    </div>
  );
}

export default ImageSetter;
