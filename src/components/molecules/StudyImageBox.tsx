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
    <div className=" relative w-[182px] h-[100px] rounded-lg overflow-hidden ">
      <img className="absolute" src={src} />
      <div className="flex absolute bottom-0 w-full h-[24px]  bg-black bg-opacity-80 justify-center items-center">
        <Text size="sm" weight="bold" color="white">
          {dayOfWeek + " " + startTime}
        </Text>
      </div>
    </div>
  );
}
