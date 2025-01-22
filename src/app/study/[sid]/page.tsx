import { authOptions } from "@/app/utils/authOptions";
import Icon from "@/components/atoms/Icon";
import Header from "@/components/organisms/Header";
import StudyOverview from "@/components/organisms/StudyOverview";
import StudyInfoPage from "@/components/pages/StudyInfoPage";
import { baseUrl } from "@/constants/url";
import { getServerSession } from "next-auth";

async function page({ params }: { params: { sid: string } }) {
  const session = await getServerSession(authOptions);

  const fetchStudyInfo = async () => {
    const data = await fetch(
      `${baseUrl}/study/${params.sid}/api?userEmail=${session?.user.email}`
    ).then((res) => res.json());

    return data;
  };

  const { study: studyInfo, status } = await fetchStudyInfo();

  return (
    <StudyInfoPage
      studyInfo={studyInfo}
      status={status}
      session={session?.user}
    >
      {" "}
      <Header
        position="absolute"
        className="px-4"
        leftSlot={<Icon type="BACK" />}
      />
      <StudyOverview
        props={{
          _id: studyInfo._id,
          type: studyInfo.type,
          categories: studyInfo.categories,
          title: studyInfo.title,
          period: studyInfo.period,
          imgSrc: studyInfo.imgSrc,
        }}
      />
    </StudyInfoPage>
  );
}

export default page;
