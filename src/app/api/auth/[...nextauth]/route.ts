import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
export const runtime = "nodejs";
