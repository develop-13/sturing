import MyStudyPage from "@/components/pages/MyStudyPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { baseUrl } from "../../constants/url";
import { redirect } from "next/navigation";

const getUserSchedules = async (userEmail: string) => {
  try {
    const fetchedSchedules = await (
      await fetch(
        `${baseUrl}/mystudy/api?userEmail=${userEmail}&type=schedules`
      )
    ).json();

    return fetchedSchedules;
  } catch (err) {
    console.error(err);
  }
};

async function page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const email = user?.email || "none";
  const userSchedule = await getUserSchedules(email);

  if (!user) {
    console.log("not logged in currently");
    redirect(`${baseUrl}/`);
  }

  return <MyStudyPage userSchedule={userSchedule} session={session} />;
}

export default page;
