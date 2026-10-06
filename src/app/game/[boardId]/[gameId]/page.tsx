import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameBoard } from "../../../../components/game-board";

export const metadata: Metadata = { title: "Find the characters | Where's Waldo?" };

export default async function GamePage({
  params,
}: {
  params: Promise<{ boardId: string; gameId: string }>;
}) {
  const { boardId, gameId } = await params;
  const parsedBoardId = Number(boardId);
  const parsedGameId = Number(gameId);
  if (
    !Number.isInteger(parsedBoardId) ||
    parsedBoardId < 1 ||
    parsedBoardId > 4 ||
    !Number.isSafeInteger(parsedGameId) ||
    parsedGameId < 1
  ) {
    notFound();
  }

  return <GameBoard boardId={parsedBoardId} gameId={parsedGameId} />;
}
