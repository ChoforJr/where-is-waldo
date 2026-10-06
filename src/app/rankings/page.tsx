import type { Metadata } from "next";
import { RankingsTable } from "../../components/rankings-table";

export const metadata: Metadata = { title: "Rankings | Where's Waldo?" };

export default function RankingsPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">The hall of focus</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Fastest finds</h1>
      <p className="mt-3 text-[#69766e]">The quickest completed rounds, across every board.</p>
      <div className="mt-8"><RankingsTable /></div>
    </section>
  );
}
