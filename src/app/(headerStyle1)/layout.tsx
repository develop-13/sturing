// 메뉴와 로고가 있는 헤더

import HeaderForamt from "@/components/header_metarials/headerForamt";
import MenuLogo from "@/components/header_metarials/MenuLogo";
import BellUser from "@/components/header_metarials/BellUser";

// 로그인 여부를 전달 받아서 로그인 여부에 따라 icons_right부분을 다르게 해줌
function HeaderStyle1Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderForamt
        icons_left={<MenuLogo />}
        icons_right={<BellUser />}
        hasTab={true}
      />
      {children}
    </div>
  );
}

export default HeaderStyle1Layout;
