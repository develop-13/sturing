import TwoIconsFormat from "@/components/header_metarials/atoms/TwoIconsFormat";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
import Icon from "@/components/common/atoms/Icon";
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
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </TwoIconsFormat>
        }
        icons_right={
          <TwoIconsFormat gap={12}>
            <Icon type="BELL" />
            <Icon type="USER" />
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
