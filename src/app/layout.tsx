import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/providers/AuthWrapper";
import { UserStatusProvider } from "@/providers/UserStatusProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import ModalProvider from "@/providers/ModalProvider";

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
  const session = await getServerSession(authOptions); // 동적처리 => ssr

  return (
    <html lang="en">
      {/* <Head>
        <link
          rel="preload"
          href="/globals.css"
          as="style"
          type="text/css"
          crossOrigin="anonymous"
        />
      </Head> */}
      <body className="flex justify-center ">
        <div
          id="rootLayout"
          className={
            `scrollbar-hide relative w-[375px] h-auto overflow-x-hidden ` +
            roboto.className
          }
        >
          <AuthWrapper session={session}>
            <UserStatusProvider>
              <ModalProvider>{children}</ModalProvider>
            </UserStatusProvider>
          </AuthWrapper>
        </div>
      </body>
    </html>
  );
}
