import TwoIconsFormat from "@/components/header_metarials/atoms/TwoIconsFormat";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
import Icon from "@/components/common/atoms/Icon";

function SearchPage() {
  return (
    <div>
      <HeaderForamt
        icons_left={
          <TwoIconsFormat gap={8}>
            <MenuBtn />
            <LogoBtn />
          </TwoIconsFormat>
        }
        icons_right={
          <TwoIconsFormat gap={12}>
            <Icon type="CHECKED" />
            <UserBtn />
          </TwoIconsFormat>
        }
        hasTab={true}
      />
    </div>
  );
}

export default SearchPage;
