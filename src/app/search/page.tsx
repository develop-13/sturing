import BellBtn from "@/components/header_metarials/BellBtn";
import MenuLogo from "@/components/header_metarials/MenuLogo";
import UserBtn from "@/components/header_metarials/UserBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";

function SearchPage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<MenuLogo />}
        icons_right={
          <div className="flex gap-[12px] items-center">
            <BellBtn />
            <UserBtn />
          </div>
        }
        hasTab={true}
      />
    </div>
  );
}

export default SearchPage;
