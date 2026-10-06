export type BoardId = "board1" | "board2" | "board3" | "board4";

export type CharacterName = "waldo" | "wilma" | "wizard" | "odlaw";

export interface Coordinates {
  x: number;
  y: number;
}

export interface GameplayRecord {
  id: number;
  level: number;
  startAt: string;
  endAt: string | null;
  waldo: boolean;
  wilma: boolean;
  wizard: boolean;
  odlaw: boolean;
  player: string | null;
}

export type CharacterGuessResponse =
  | { found: false }
  | { found: true; gameplay: GameplayRecord };

export interface LeaderboardEntry {
  id: number;
  keyID: string;
  level: number;
  time: number;
  player: string;
}

export interface LevelInfo {
  id: number;
  keyID: string;
  level: number;
  difficulty: "easy" | "normal";
  image: string;
  name: string;
}

export interface LocationGuessRequest {
  board: BoardId;
  character: CharacterName;
  currentPos: Coordinates;
}

export interface ApiErrorResponse {
  status?: string;
  message?: string;
  errors?: Array<{
    msg: string;
    path?: string;
  }>;
}

export interface ClientToServerEvents {
  "game:join": (payload: { gameId: number }) => void;
  "game:leave": (payload: { gameId: number }) => void;
}

export interface RealtimeLeaderboardEntry {
  id: number;
  level: number;
  time: number;
  player: string;
}

export interface ServerToClientEvents {
  "game:state": (game: GameplayRecord) => void;
  "game:character:found": (payload: {
    gameId: number;
    character: CharacterName;
  }) => void;
  "game:completed": (payload: { gameId: number; endAt: string }) => void;
  "game:error": (error: ApiErrorResponse) => void;
  "leaderboard:updated": (entry: RealtimeLeaderboardEntry) => void;
}
