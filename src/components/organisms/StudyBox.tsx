import Text from "../atoms/Text";
import Button from "../molecules/Button";
import StudyImageBox from "../molecules/StudyImageBox";

export default function StudyBox({ props }: { props: TStudy }) {
  return (
    <>
      <div className="flex flex-col">
        <StudyImageBox src={props.src} date={props.date} isChecked={false} />
        <div className="flex flex-row gap-2 pt-3">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {props.type}
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              {props.category}
            </Text>{" "}
          </Button>
        </div>
        <h1 className="text-[16px] font-bold pt-2">{props.title}</h1>
        <div className="flex flex-row pt-3 text-gray-600 border-b-2 py-2">
          <span className="text-[12px] font-bold">{props.location}</span>
        </div>
      </div>
    </>
  );
}
