// import { studyBanners } from "@/db/studyBanners";
import { getPopularStudies } from "@/lib/studyUtils";
import { getNewStudies } from "@/lib/studyUtils";
import RecommendPage from "@/components/pages/RecommendPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import { TStudyItem } from "@/types/study";

// export const revalidate = 60; // Cache for 1 minute

// const getBannerImages = () => {
//   return studyBanners;
// };

// const getUserStudies = async (email: string) => {
//   const baseUrl =
//     process.env.NODE_ENV === "production"
//       ? process.env.NEXT_PUBLIC_BASE_URL
//       : "http://localhost:3000";

//   console.log(`baseUrl=${baseUrl}`);

//   return await fetch(
//     `${baseUrl}/recommend/api?studyType=userMatching&userEmail=${email}`
//   ).then((res) => res.json());
// };

const getInitialStudies = async () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";

  return await fetch(
    `${baseUrl}/recommend/api?studyType=common&userEmail=${null}`
  ).then((res) => res.json());
};

async function page() {
  const session = await getServerSession(authOptions);
  // // console.log(session);

  // let [firstStudies, secondStudies]: [TStudyItem[], TStudyItem[]] = [[], []];

  // if (session) {
  //   const fetchedStudies = await getUserStudies(session.user.email);
  //   firstStudies = fetchedStudies?.firstStudies;
  //   secondStudies = fetchedStudies?.secondStudies;
  // } else {
  //   [firstStudies, secondStudies] = await Promise.all([
  //     getPopularStudies(),
  //     getNewStudies(),
  //   ]);
  // }
  const { firstStudies: popularStudies, secondStudies: newStudies } =
    await getInitialStudies();

  return (
    <RecommendPage
      popularStudies={popularStudies}
      newStudies={newStudies}
      user={session?.user}
    />
  );
}

export default page;
