import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

function StudyOverviewItem({
  icon,
  name,
  content,
}: {
  icon: React.ReactNode;
  name: string;
  content: string;
}) {
  return (
    <li className="h-[21px] flex items-center gap-[22px] ">
      <div className="flex gap-[7px]">
        <Icon type="RLOGO" />
        <Text size="sm" weight="bold" color="gray-800">
          팀원
        </Text>
      </div>
      <Text size="sm" weight="bold" color="gray-800">
        최대 4명
      </Text>
    </li>
  );
}

export default StudyOverviewItem;
