import type {
  ApiErrorResponse,
  CharacterGuessResponse,
  GameplayRecord,
  LeaderboardEntry,
  LocationGuessRequest,
} from "../types/game";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:5000/api";

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    throw new ApiRequestError(
      "We couldn't reach the game server. Please try again.",
      0
    );
  }

  if (!response.ok) {
    let error: ApiErrorResponse = {};
    try {
      error = (await response.json()) as ApiErrorResponse;
    } catch {
      // Return the HTTP status message below when the server has no JSON body.
    }
    throw new ApiRequestError(
      error.message ?? `Request failed (${response.status})`,
      response.status
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  startGame: (level: number) =>
    request<GameplayRecord[]>(`/gameplay/level/${level}`, { method: "POST" }),
  getGame: (id: number) => request<GameplayRecord>(`/gameplay/${id}`),
  guess: (id: number, payload: LocationGuessRequest) =>
    request<CharacterGuessResponse>(`/gameplay/${id}/character`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  savePlayer: (id: number, player: string) =>
    request<GameplayRecord[]>(`/gameplay/${id}/player`, {
      method: "PATCH",
      body: JSON.stringify({ player }),
    }),
  getRankings: () =>
    request<GameplayRecord[]>("/gameplay/finished").then((games) =>
      games
        .filter(
          (game): game is GameplayRecord & { endAt: string; player: string } =>
            Boolean(game.endAt && game.player)
        )
        .map(
          (game): LeaderboardEntry => ({
            id: game.id,
            keyID: `game-${game.id}`,
            level: game.level,
            time: Math.floor(
              (new Date(game.endAt).getTime() -
                new Date(game.startAt).getTime()) /
                1000
            ),
            player: game.player,
          })
        )
    ),
  register: (email: string, password: string) =>
    request<{ user: { id: number; email: string } }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<{ user: { id: number; email: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
};

export function getApiBaseUrl(): string {
  return apiUrl;
}
