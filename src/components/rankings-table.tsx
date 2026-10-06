"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { api } from "../lib/api";
import type { LeaderboardEntry } from "../types/game";

export function RankingsTable({ level }: { level?: number }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .getRankings()
      .then((rankings) => {
        if (!cancelled) setEntries(rankings);
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "Rankings are unavailable.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = entries
    .filter((entry) => !level || entry.level === level)
    .sort((first, second) => first.time - second.time);

  return (
    <div>
      <nav aria-label="Choose a board" className="flex flex-wrap gap-2">
        <Link href="/rankings" className={`rounded-full px-4 py-2 text-sm font-bold ${!level ? "bg-[#244d3b] text-white" : "bg-white text-[#526158] hover:bg-[#e9eee6]"}`}>All boards</Link>
        {[1, 2, 3, 4].map((id) => (
          <Link key={id} href={`/rankings/${id}`} className={`rounded-full px-4 py-2 text-sm font-bold ${level === id ? "bg-[#244d3b] text-white" : "bg-white text-[#526158] hover:bg-[#e9eee6]"}`}>Board {id}</Link>
        ))}
      </nav>
      <div className="mt-5 overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white shadow-sm">
        <div className="grid grid-cols-[4rem_1fr_5rem_6rem] gap-2 border-b border-[#e9ece7] bg-[#fafbf8] px-4 py-4 text-xs font-extrabold uppercase tracking-wide text-[#748077] sm:grid-cols-[5rem_1fr_8rem_9rem] sm:px-7">
          <span>Rank</span><span>Player</span><span>Board</span><span className="text-right">Time</span>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center gap-3 px-5 py-16 text-sm font-semibold text-[#69766e]"><span className="spinner text-[#244d3b]" /> Finding the fastest times…</div>
        ) : error ? (
          <div role="alert" className="px-5 py-12 text-center text-sm text-[#b9362e]">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Trophy className="mx-auto text-[#a5b0a7]" size={30} />
            <p className="mt-3 font-bold">No times on this board yet</p>
            <p className="mt-1 text-sm text-[#69766e]">Play a round and be the first to make the rankings.</p>
            <Link href="/" className="mt-4 inline-block font-bold text-[#244d3b] underline underline-offset-4">Choose a board</Link>
          </div>
        ) : (
          <ol>
            {filtered.map((entry, index) => (
              <li key={entry.keyID} className="grid grid-cols-[4rem_1fr_5rem_6rem] items-center gap-2 border-b border-[#f0f2ed] px-4 py-4 last:border-0 sm:grid-cols-[5rem_1fr_8rem_9rem] sm:px-7">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${index === 0 ? "bg-[#f8e6bb] text-[#805b1e]" : "bg-[#f0f3ee] text-[#69766e]"}`}>{index + 1}</span>
                <span className="truncate font-bold">{entry.player}</span>
                <span className="text-sm text-[#69766e]">{entry.level}</span>
                <span className="text-right font-mono font-bold tabular-nums">{Math.floor(entry.time / 60).toString().padStart(2, "0")}:{(entry.time % 60).toString().padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
