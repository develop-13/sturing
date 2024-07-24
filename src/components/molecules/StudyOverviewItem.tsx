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
        {icon}
        <Text size="sm" weight="bold" color="gray-800">
          {name}
        </Text>
      </div>
      <Text size="sm" weight="bold" color="gray-800">
        {content}
      </Text>
    </li>
  );
}

export default StudyOverviewItem;
