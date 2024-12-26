import Image from "../atoms/Image";
import Text from "../atoms/Text";

type TStudyImageBox = {
  src: string;
  dayOfWeek: string;
  startTime: string;
  // isChecked: boolean;
};

export default function StudyImageBox(props: TStudyImageBox) {
  const { src, dayOfWeek, startTime } = props;

  return (
    <div className=" relative h-[100px] rounded-lg overflow-hidden ">
      <Image
        className="absolute"
        src={src}
        fill
        style={{ objectFit: "cover" }}
        loading="eager" // 즉시 로드
      />
      <div className="flex absolute bottom-0 w-full h-[24px]  bg-black bg-opacity-80 justify-center items-center">
        <Text size="sm" weight="bold" color="white">
          {dayOfWeek + " " + startTime}
        </Text>
      </div>
    </div>
  );
}
