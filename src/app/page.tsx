import { setSessionData } from "@/storages/getClientDatas";
import { categories } from "@/db/categories";

import { redirect } from "next/navigation";
//defind;

export default function Home() {
  redirect("/recommend");
}
