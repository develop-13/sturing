import TwoIconsFormat from "@/components/atoms/TwoIconsFormat";
import HeaderForamt from "@/components/organisms/headerForamt";
import Icon from "@/components/atoms/Icon";

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
