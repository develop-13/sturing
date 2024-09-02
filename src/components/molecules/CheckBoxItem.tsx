import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

function CheckBoxItem({
  text,
  isSelected,
  onClick,
}: {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  switch (isSelected) {
    case true:
      return (
        <li className="flex gap-2" onClick={onClick}>
          <Icon type="CHECKBOX_CHECKED" />
          <Text
            size="sm"
            weight="bold"
            color="main"
            className="cursor-pointer "
          >
            {text}
          </Text>
        </li>
      );

    default:
      return (
        <li className="flex gap-2" onClick={onClick}>
          <Icon type="CHECKBOX_UNCHECKED" />
          <Text size="sm" weight="bold" className="cursor-pointer ">
            {text}
          </Text>
        </li>
      );
  }
}

export default CheckBoxItem;
