import { studyBanners } from "@/db/studyBanners";

const getBannerImages = () => {
  return studyBanners;
};
const getPopularStudies = () => {};
const getNewStudies = () => {};

import RecommendPage from "@/components/pages/RecommendPage";
async function page() {
  // const bannerImages = await getBannerImages();
  const popularStudies = await getPopularStudies();
  const newStudies = await getNewStudies();

  return <RecommendPage />;
}

export default page;
