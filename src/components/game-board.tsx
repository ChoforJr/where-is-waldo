"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, CircleHelp } from "lucide-react";
import { api } from "../lib/api";
import { characters, levels } from "../lib/game-data";
import { useGameSocket } from "../hooks/use-game-socket";
import type { BoardId, CharacterName, GameplayRecord } from "../types/game";

export function GameBoard({
  boardId,
  gameId,
}: {
  boardId: number;
  gameId: number;
}) {
  const router = useRouter();
  const board = levels.find((level) => level.id === boardId);
  const imageRef = useRef<HTMLImageElement>(null);
  const [game, setGame] = useState<GameplayRecord>();
  const [isLoading, setIsLoading] = useState(true);
  const [isGuessing, setIsGuessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [player, setPlayer] = useState("");
  const [now, setNow] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number }>();
  const [menuPosition, setMenuPosition] = useState<{ left: number; top: number }>();
  const [error, setError] = useState("");
  const { isConnected, socketGame } = useGameSocket(gameId);

  useEffect(() => {
    let cancelled = false;
    api
      .getGame(gameId)
      .then((current) => {
        if (!cancelled) setGame(current);
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Unable to load this game.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameId]);

  const displayedGame =
    socketGame?.id === gameId ? socketGame : game;

  useEffect(() => {
    if (!displayedGame || displayedGame.endAt) return;
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [displayedGame, displayedGame?.endAt]);

  const foundCount = displayedGame
    ? characters.filter(({ name }) => displayedGame[name]).length
    : 0;
  const finishTime = displayedGame?.endAt
    ? new Date(displayedGame.endAt).getTime()
    : now;
  const elapsedSeconds = displayedGame
    ? Math.max(
        0,
        Math.floor(
          (finishTime - new Date(displayedGame.startAt).getTime()) / 1000
        )
      )
    : 0;
  const formattedTime = `${Math.floor(elapsedSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(elapsedSeconds % 60).toString().padStart(2, "0")}`;

  if (!board) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="text-3xl font-black">That board doesn&apos;t exist.</h1>
        <Link href="/" className="mt-5 inline-block font-bold text-[#244d3b] underline">Choose a board</Link>
      </section>
    );
  }

  function openTargetMenu(event: MouseEvent<HTMLImageElement>) {
    if (!imageRef.current || !displayedGame || displayedGame.endAt) return;
    const image = imageRef.current;
    if (!image.naturalWidth || !image.naturalHeight) return;
    const bounds = image.getBoundingClientRect();
    const scale = Math.min(
      bounds.width / image.naturalWidth,
      bounds.height / image.naturalHeight
    );
    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;
    const imageLeft = (bounds.width - imageWidth) / 2;
    const imageTop = (bounds.height - imageHeight) / 2;
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const imageX = relativeX - imageLeft;
    const imageY = relativeY - imageTop;
    if (
      imageX < 0 ||
      imageX >= imageWidth ||
      imageY < 0 ||
      imageY >= imageHeight
    ) {
      return;
    }

    const x = Math.floor((imageX / imageWidth) * 800);
    const y = Math.floor((imageY / imageHeight) * 500);
    setSelectedPoint({ x, y });
    setMenuPosition({
      left: Math.min(relativeX, Math.max(8, bounds.width - 190)),
      top: Math.min(relativeY, Math.max(8, bounds.height - 190)),
    });
    setError("");
  }

  async function selectCharacter(character: CharacterName) {
    if (!selectedPoint) return;
    setIsGuessing(true);
    setError("");
    try {
      const boardKey: BoardId =
        boardId === 1
          ? "board1"
          : boardId === 2
            ? "board2"
            : boardId === 3
              ? "board3"
              : "board4";
      const result = await api.guess(gameId, {
        board: boardKey,
        character,
        currentPos: selectedPoint,
      });
      if (result.found) {
        setGame(result.gameplay);
        setSelectedPoint(undefined);
        setMenuPosition(undefined);
        setError(`${characters.find((item) => item.name === character)?.label} found!`);
      } else {
        setError("Not quite — keep looking!");
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your guess couldn't be checked.");
    } finally {
      setIsGuessing(false);
    }
  }

  async function saveScore(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    try {
      await api.savePlayer(gameId, player.trim());
      router.push(`/rankings/${boardId}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your score could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-[#516158] hover:text-[#e94f45]">
          <ChevronLeft size={18} /> All boards
        </Link>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#536257] shadow-sm">
            <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-[#4caa70]" : "bg-[#c8cfc8]"}`} />
            {isConnected ? "Live game connected" : "Reconnecting…"}
          </span>
          <Link href="/help" aria-label="How to play" className="rounded-full bg-white p-2 text-[#536257] shadow-sm hover:text-[#e94f45]">
            <CircleHelp size={19} />
          </Link>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">Board {boardId} · {board.difficulty}</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">{board.name}</h1>
        </div>
        <div className="rounded-2xl bg-[#244d3b] px-5 py-3 text-right text-white">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/65">Time</p>
          <p className="font-mono text-2xl font-bold tabular-nums">{formattedTime}</p>
        </div>
      </div>
      <section aria-label="Characters to find" className="mb-4 flex flex-wrap gap-2">
        {characters.map((character) => {
          const found = Boolean(displayedGame?.[character.name]);
          return (
            <div key={character.name} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold ${found ? "border-[#b7d3bf] bg-[#e4f1e6] text-[#315b3c]" : "border-[#e6e9e2] bg-white text-[#627067]"}`}>
              <Image src={character.image} alt="" width={28} height={28} className={`h-7 w-7 object-contain ${found ? "opacity-50 grayscale" : ""}`} />
              <span className={found ? "line-through decoration-2" : ""}>{character.label}</span>
              {found && <Check size={15} aria-label="Found" />}
            </div>
          );
        })}
        <span className="ml-auto self-center text-sm font-semibold text-[#69766e]">{foundCount}/4 found</span>
      </section>
      <div className="relative overflow-hidden rounded-2xl border border-[#dfe5dc] bg-white p-1 shadow-[0_20px_60px_-40px_rgba(23,34,29,.55)] sm:rounded-3xl sm:p-2">
        {isLoading ? (
          <div className="flex aspect-[8/5] items-center justify-center gap-3 text-sm font-semibold text-[#69766e]">
            <span className="spinner text-[#244d3b]" /> Loading your board…
          </div>
        ) : (
          <Image
            ref={imageRef}
            src={board.image}
            alt={`Game board ${board.level}: ${board.name}`}
            width={1600}
            height={1000}
            onClick={openTargetMenu}
            className={`board-image rounded-xl ${displayedGame?.endAt ? "cursor-default" : "cursor-crosshair"}`}
          />
        )}
        {menuPosition && !displayedGame?.endAt && (
          <div
            role="dialog"
            aria-label="Choose the character you found"
            onClick={(event) => event.stopPropagation()}
            className="absolute z-10 min-w-44 rounded-2xl border border-[#e4e8df] bg-white p-3 shadow-xl"
            style={{ left: menuPosition.left, top: menuPosition.top }}
          >
            <p className="px-2 pb-2 text-xs font-bold uppercase tracking-wide text-[#69766e]">Who did you spot?</p>
            <div className="grid gap-1">
              {characters.filter((character) => !displayedGame?.[character.name]).map((character) => (
                <button
                  key={character.name}
                  type="button"
                  disabled={isGuessing}
                  onClick={() => void selectCharacter(character.name)}
                  className="flex items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-semibold hover:bg-[#f2f5ef] disabled:opacity-50"
                >
                  <Image src={character.image} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                  {character.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setMenuPosition(undefined)} className="mt-2 w-full rounded-lg px-2 py-1.5 text-xs font-bold text-[#69766e] hover:bg-[#f2f5ef]">Cancel</button>
          </div>
        )}
        {displayedGame?.endAt && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#10251c]/55 p-4 backdrop-blur-[2px]">
            <form onSubmit={(event) => void saveScore(event)} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4f1e6] text-[#315b3c]"><Check /></span>
              <h2 className="mt-4 text-2xl font-black">You found them all!</h2>
              <p className="mt-2 text-sm leading-6 text-[#69766e]">Great searching. Your time was <strong className="text-[#244d3b]">{formattedTime}</strong>. Add a name to the board rankings.</p>
              <label htmlFor="player-name" className="mt-5 block text-sm font-bold">Your name</label>
              <input
                id="player-name"
                name="player"
                value={player}
                onChange={(event) => setPlayer(event.target.value)}
                maxLength={20}
                required
                autoComplete="nickname"
                placeholder="e.g. The Eagle Eye"
                className="mt-2 w-full rounded-xl border border-[#dce3da] px-4 py-3 outline-none focus:border-[#244d3b]"
              />
              {error && <p role="alert" className="mt-3 text-sm text-[#b9362e]">{error}</p>}
              <button type="submit" disabled={isSaving} className="mt-4 flex w-full justify-center rounded-xl bg-[#244d3b] px-4 py-3 font-bold text-white hover:bg-[#193d2d] disabled:opacity-60">
                {isSaving ? "Saving your time…" : "Save my time"}
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="mt-4 min-h-6 text-center text-sm font-semibold" aria-live="polite">
        {error && !displayedGame?.endAt && <p className={error.includes("found!") ? "text-[#315b3c]" : "text-[#b9362e]"}>{error}</p>}
      </div>
      <p className="mt-1 text-center text-xs text-[#859188]">Click or tap anywhere you think a character is hiding.</p>
    </div>
  );
}
