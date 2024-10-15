import MatchingPage from "@/components/pages/MatchingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function page() {
  const session = await getServerSession(authOptions);
  // 페이지 요청할 때 마다 세션을 가져옴, 동적처리 => ssr

  return <MatchingPage session={session} />;
}

export default page;
