import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { getPopularStudies, getNewStudies } from "@/lib/studyUtils";
import { getBanners } from "@/lib/bannerUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [popularStudies, newStudies, banners] = await Promise.all([
        getPopularStudies(dbConnect, Study),
        getNewStudies(dbConnect, Study),
        getBanners(),
      ]);

      res.status(200).json({
        popularStudies,
        newStudies,
        banners,
      });
    } catch (error) {
      res.status(500).json({ message: "서버 오류 발생", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
