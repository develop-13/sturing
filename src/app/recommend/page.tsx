import RecommendPage from "@/components/pages/RecommendPage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
async function page() {
  const session = await getServerSession(authOptions); // 동적처리 => ssr
  return <RecommendPage session={session} />;
}

export default page;
