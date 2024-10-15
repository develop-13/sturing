import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/organisms/auth-components/AuthWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions); // 동적처리 => ssr

  return (
    <html lang="en">
      <body className="flex justify-center">
        <div
          className={
            `relative w-[375px] h-screen overflow-x-hidden ` + roboto.className
          }
        >
          {children}
        </div>
      </body>
    </html>
  );
}
