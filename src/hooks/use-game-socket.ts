"use client";

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  GameplayRecord,
  ServerToClientEvents,
} from "../types/game";
import { getApiBaseUrl } from "../lib/api";

export function useGameSocket(gameId: number) {
  const [isConnected, setIsConnected] = useState(false);
  const [socketGame, setSocketGame] = useState<GameplayRecord>();

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      getApiBaseUrl().replace(/\/api$/, ""),
      {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 500,
        reconnectionDelayMax: 5000,
        timeout: 10000,
      }
    );

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("game:join", { gameId });
    };
    const onDisconnect = () => setIsConnected(false);
    const onGameState = (game: GameplayRecord) => setSocketGame(game);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("game:state", onGameState);

    return () => {
      socket.emit("game:leave", { gameId });
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("game:state", onGameState);
      socket.disconnect();
    };
  }, [gameId]);

  return { isConnected, socketGame };
}
