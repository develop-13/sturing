import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import MoreInfo from "@/components/header_metarials/MoreInfo";
import ShareBtn from "@/components/header_metarials/ShareBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";

function LecturePage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<ArrowBackBtn />}
        icons_right={
          <div className="flex items-center gap-[12px]">
            <ShareBtn />
            <MoreInfo />
          </div>
        }
      />
    </div>
  );
}

export default LecturePage;
