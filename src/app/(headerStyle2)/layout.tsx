import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import MoreInfo from "@/components/header_metarials/MoreInfo";
import ShareBtn from "@/components/header_metarials/ShareBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import { headers } from "next/headers";

function HeaderStyle2Layout({ children }: { children: React.ReactNode }) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  console.log(pathname);
  console.log("above is pathname");

  return (
    <div>
      <HeaderForamt
        icons_left={<ArrowBackBtn />}
        icons_right={
          <div className="flex gap-3">
            <ShareBtn />
            <MoreInfo />
          </div>
        }
      />
      {children}
    </div>
  );
}

export default HeaderStyle2Layout;
