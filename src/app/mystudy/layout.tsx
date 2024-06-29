import BellBtn from "@/components/header_metarials/BellBtn";
import MenuLogo from "@/components/header_metarials/MenuLogo";
import UserBtn from "@/components/header_metarials/UserBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
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
        icons_left={<MenuLogo />}
        icons_right={
          <div className="flex gap-[12px] items-center">
            <BellBtn />
            <UserBtn />
          </div>
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
