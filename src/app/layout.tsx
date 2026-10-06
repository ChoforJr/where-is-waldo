import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Where's Waldo? — Find the hidden characters",
  description:
    "Find Waldo, Wilma, Odlaw and the Wizard in four lively hidden-object boards.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#e4e8df] bg-white px-5 py-6 text-center text-sm text-[#69766e]">
          Made with care by{" "}
          <Link
            href="https://github.com/ChoforJr/where-is-waldo"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#244d3b] underline decoration-[#c2cec4] underline-offset-4"
          >
            Chofor Forsakang
          </Link>
        </footer>
      </body>
    </html>
  );
}
