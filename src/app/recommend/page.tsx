import { studyBanners } from "@/db/studyBanners";
import RecommendPage from "@/components/pages/RecommendPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";
import Image from "@/components/atoms/Image";

const getInitialStudies = async () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";

  return await fetch(
    `${baseUrl}/recommend/api?studyType=common&userEmail=${null}`
  ).then((res) => res.json());
};

const renderBannerImages = async () => {
  return studyBanners.map((banner) => (
    <Image
      loading="eager" // 즉시 로드
      key={banner.id}
      src={banner.src}
      width={375}
      height={194}
      priority // Lazy Loading 해제
    />
  ));
};

async function page() {
  const session = await getServerSession(authOptions);

  const { firstStudies: popularStudies, secondStudies: newStudies } =
    await getInitialStudies();

  const bannerImages = await renderBannerImages();

  return (
    <RecommendPage
      bannerImages={bannerImages}
      popularStudies={popularStudies}
      newStudies={newStudies}
      userFromServer={session?.user}
    />
  );
}

export default page;
