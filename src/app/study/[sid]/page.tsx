import { authOptions } from "@/app/utils/authOptions";
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
    />
  );
}

export default page;
