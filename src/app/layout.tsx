import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <div className="w-screen h-screen">{children}</div>
      </body>
    </html>
  );
}

// header 도 slot처리 해야 하나?
