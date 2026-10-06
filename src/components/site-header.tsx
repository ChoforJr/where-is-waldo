import Link from "next/link";
import Image from "next/image";
import { AlignEndHorizontal, Info, UserRound } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-[#e4e8df] bg-white/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight sm:text-xl">
          <Image src="/logo.webp" alt="" width={30} height={30} className="h-[30px] w-[30px] shrink-0" />
          Where&apos;s <span className="text-[#e94f45]">Waldo?</span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 text-sm font-semibold text-[#435349] sm:gap-7">
          <Link href="/help" className="flex items-center gap-2 hover:text-[#e94f45]">
            <Info size={18} aria-hidden="true" /> <span className="hidden sm:inline">How to play</span>
          </Link>
          <Link href="/rankings" className="flex items-center gap-2 hover:text-[#e94f45]">
            <AlignEndHorizontal size={18} aria-hidden="true" /> <span className="hidden sm:inline">Rankings</span>
          </Link>
          <Link href="/account" className="flex items-center gap-2 hover:text-[#e94f45]">
            <UserRound size={18} aria-hidden="true" /> <span className="hidden sm:inline">Account</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
