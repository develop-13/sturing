import Icon from "@/components/common/atoms/Icon";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";

function editMePage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<Icon type="BACK" />}
        text_center="프로필 수정"
        icons_right={"수정"}
      />
    </div>
  );
}

export default editMePage;
