import RecommendPage from "@/components/pages/RecommendPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getNewStudies, getPopularStudies } from "@/lib/studyUtils";
async function page() {
  const session = await getServerSession(authOptions); // 동적처리 => ssr
  const popularStudies = await getPopularStudies();
  const newStudies = await getNewStudies();
  return (
    <RecommendPage
      session={session}
      popularStudies={popularStudies}
      newStudies={newStudies}
    />
  );
}

export default page;
