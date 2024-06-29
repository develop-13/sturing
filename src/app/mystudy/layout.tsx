import TwoIconsFormat from "@/components/header_metarials/atoms/TwoIconsFormat";
import BellBtn from "@/components/header_metarials/molecules/BellBtn";
import LogoBtn from "@/components/header_metarials/molecules/LogoBtn";
import MenuLogo from "@/components/header_metarials/molecules/MenuBtn";
import UserBtn from "@/components/header_metarials/molecules/UserBtn";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
function MyStudyLayout({
  children,
  MyStudyList,
  UpcomingStudyList,
}: {
  children: React.ReactNode;
  MyStudyList: React.ReactNode;
  UpcomingStudyList: React.ReactNode;
}) {
  return (
    <div>
      <HeaderForamt
        icons_left={
          <TwoIconsFormat gap={8}>
            <MenuLogo />
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
      <main className="flex flex-col gap-10">
        <div>{UpcomingStudyList}</div>
        {MyStudyList}
      </main>
    </div>
  );
}

export default MyStudyLayout;
