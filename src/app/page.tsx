import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Search, Sparkles, Trophy } from "lucide-react";
import { StartGameCard } from "../components/start-game-card";
import { levels } from "../lib/game-data";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#183a2b] text-white">
        <div className="pointer-events-none absolute -right-24 -top-36 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-10 -top-20 h-[26rem] w-[26rem] rounded-full border border-white/10" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_.85fr]">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[.16em] text-[#c8d8c9]">
              <Sparkles size={14} /> A little game of focus
            </span>
            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.04] tracking-[-.045em] sm:text-7xl">
              A world of people. <span className="text-[#f27868]">Four to find.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#d1ddd3] sm:text-lg">
              Somewhere in the crowd, Waldo and friends are waiting. Pick a scene, slow down, and see what you can spot.
            </p>
            <a href="#boards" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#f27868] px-5 py-3.5 font-bold text-[#2a2925] transition hover:bg-[#ff9381]">
              Choose a board <ArrowDown size={18} />
            </a>
          </div>
          <div className="relative">
            <div className="absolute -inset-5 rotate-2 rounded-[2rem] bg-[#f27868]/20" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 p-2 shadow-2xl">
              <Image src="/boards/board_1.jpg" alt="A busy illustrated scene full of people" width={800} height={500} preload loading="eager" className="aspect-[8/5] w-full rounded-2xl object-cover" />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 text-[#183a2b] shadow-xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#69766e]">Your next challenge</p>
                <p className="mt-1 font-extrabold">Can you spot them all?</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="boards" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">Pick your scene</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Where will you look first?</h2>
            <p className="mt-2 max-w-xl text-[#69766e]">Four boards, four different crowds. Your timer starts as soon as you choose.</p>
          </div>
          <Link href="/rankings" className="inline-flex items-center gap-2 font-bold text-[#244d3b] hover:text-[#e94f45]">
            <Trophy size={18} /> See the fastest times
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {levels.map((level) => <StartGameCard key={level.keyID} level={level} />)}
        </div>
        <div className="mt-9 flex items-center justify-center gap-2 text-sm text-[#69766e]">
          <Search size={16} /> No rush — look closely and enjoy the hunt.
        </div>
      </section>
    </div>
  );
}
