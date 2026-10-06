import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RankingsTable } from "../../../components/rankings-table";

export const metadata: Metadata = { title: "Board rankings | Where's Waldo?" };

export default async function LevelRankingsPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const parsedLevel = Number(level);
  if (!Number.isInteger(parsedLevel) || parsedLevel < 1 || parsedLevel > 4) notFound();

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">The hall of focus</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Board {parsedLevel} rankings</h1>
      <p className="mt-3 text-[#69766e]">The fastest completed rounds on this board.</p>
      <div className="mt-8"><RankingsTable level={parsedLevel} /></div>
    </section>
  );
}
