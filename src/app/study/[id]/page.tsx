import BellUser from "@/components/header_metarials/BellBtn";
import MenuLogo from "@/components/header_metarials/MenuLogo";
import HeaderForamt from "@/components/header_metarials/headerForamt";

function StudyPage() {
  return (
    <div>
      {" "}
      <HeaderForamt
        icons_left={<MenuLogo />}
        icons_right={<BellUser />}
        hasTab={true}
      />
    </div>
  );
}

export default StudyPage;
