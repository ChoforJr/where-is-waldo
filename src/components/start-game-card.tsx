"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { LevelInfo } from "../types/game";
import { api } from "../lib/api";

export function StartGameCard({ level }: { level: LevelInfo }) {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  async function startGame() {
    setIsStarting(true);
    setError("");
    try {
      const [game] = await api.startGame(level.id);
      if (!game) throw new Error("The game server did not start a session.");
      router.push(`/game/${level.id}/${game.id}`);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Couldn't start the game. Please try again."
      );
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-[#e5e9e2] bg-white shadow-[0_15px_45px_-32px_rgba(23,34,29,.35)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_-30px_rgba(23,34,29,.35)]">
      <div className="relative">
        <Image
          src={level.image}
          alt=""
          width={800}
          height={500}
          loading={level.id === 1 ? "eager" : "lazy"}
          className="aspect-[8/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#355441]">
          {level.difficulty} · board {level.level}
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">{level.name}</h2>
            <p className="mt-1 text-sm text-[#69766e]">Find all four characters</p>
          </div>
          <span aria-hidden="true" className="text-sm font-bold text-[#a7b2a8]">0{level.level}</span>
        </div>
        <button
          type="button"
          onClick={startGame}
          disabled={isStarting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#244d3b] px-4 py-3 font-bold text-white transition hover:bg-[#193d2d] disabled:cursor-wait disabled:opacity-70"
        >
          {isStarting ? <><span className="spinner" /> Starting…</> : <>Play this board <ArrowUpRight size={18} /></>}
        </button>
        {error && <p role="alert" className="mt-3 text-sm text-[#b9362e]">{error}</p>}
      </div>
    </article>
  );
}
