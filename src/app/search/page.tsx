import TwoIconsFormat from "@/components/header_metarials/atoms/TwoIconsFormat";
import BellBtn from "@/components/header_metarials/molecules/BellBtn";
import LogoBtn from "@/components/header_metarials/molecules/LogoBtn";
import MenuBtn from "@/components/header_metarials/molecules/MenuBtn";
import UserBtn from "@/components/header_metarials/molecules/UserBtn";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";

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
            <BellBtn />
            <UserBtn />
          </TwoIconsFormat>
        }
        hasTab={true}
      />
    </div>
  );
}

export default SearchPage;
