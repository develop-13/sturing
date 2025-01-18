import { authOptions } from "@/app/utils/authOptions";
import StudyInfoPage from "@/components/pages/StudyInfoPage";
import { getServerSession } from "next-auth";

async function page({ params }: { params: { sid: string } }) {
  const session = await getServerSession(authOptions);

  const fetchStudyInfo = async () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // 기본 URL 설정
    const data = await fetch(
      `${baseUrl}/study/${params.sid}/api?userEmail=${session?.user.email}`
    ).then((res) => res.json());

    return data;
  };

  const { study: studyInfo, status } = await fetchStudyInfo();

  // console.log("session");
  // console.log(session?.user);
  console.log("params");
  console.log(params);

  return <StudyInfoPage studyInfo={studyInfo} status={status} />;
}

export default page;
