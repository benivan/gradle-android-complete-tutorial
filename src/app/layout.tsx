import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Complete Gradle Tutorial for Android Development",
  description: "A comprehensive guide covering Gradle from beginner to expert level for Android developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
