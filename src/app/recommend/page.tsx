import RecommendPage from "@/components/pages/RecommendPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getNewStudies, getPopularStudies } from "@/lib/studyUtils";
async function page() {
  return <RecommendPage />;
}

export default page;
