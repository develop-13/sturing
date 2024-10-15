"use client";
import { Session } from "next-auth";
import RecommedClient from "../templates/recommend/RecommedClient";
import { TStudyItem } from "@/types/study";
import { SessionProvider } from "next-auth/react";

type TRecommendPage = {
  popularStudies: TStudyItem[];
  newStudies: TStudyItem[];
  session: Session | null;
};

// 추후에 srp 에 맞게 리팩토링할 것
export default function RecommendPage({
  popularStudies,
  newStudies,
  session,
}: TRecommendPage) {
  return (
    <SessionProvider session={session}>
      <RecommedClient popularStudies={popularStudies} newStudies={newStudies} />
    </SessionProvider>
  );
}
