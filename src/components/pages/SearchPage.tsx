import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";

function SearchPage() {
  return (
    <div>
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          <div className="flex gap-[12px]">
            <Icon type="BELL" />
            <Icon type="USER" />
          </div>
        }
      />
      <NavButtonGroup />
    </div>
  );
}

export default SearchPage;
