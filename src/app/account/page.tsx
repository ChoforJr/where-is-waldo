import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignOutButton } from "../../components/sign-out-button";
import { getApiBaseUrl } from "../../lib/api";

export const metadata: Metadata = { title: "Your account | Where's Waldo?" };

interface UserResponse {
  user: { id: number; email: string; createdAt: string };
}

interface AccountStats {
  gamesPlayed: number;
  fastestTime: number | null;
  recentGames: Array<{ id: number; level: number; time: number }>;
}

export default async function AccountPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("waldo_session");
  if (!sessionCookie) redirect("/sign-in");

  const headers = { Cookie: `${sessionCookie.name}=${sessionCookie.value}` };
  const [userResponse, statsResponse] = await Promise.all([
    fetch(`${getApiBaseUrl()}/auth/me`, { headers, cache: "no-store" }),
    fetch(`${getApiBaseUrl()}/auth/stats`, { headers, cache: "no-store" }),
  ]);
  if (userResponse.status === 401 || statsResponse.status === 401) {
    redirect("/sign-in");
  }
  if (!userResponse.ok || !statsResponse.ok) {
    throw new Error("Could not load your account. Try again later.");
  }
  const [{ user }, stats] = (await Promise.all([
    userResponse.json(),
    statsResponse.json(),
  ])) as [UserResponse, AccountStats];

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">Player account</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">Your profile</h1>
      <div className="mt-8 flex flex-col justify-between gap-6 rounded-3xl border border-[#e5e9e2] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#849087]">Signed in as</p>
          <p className="mt-2 break-all text-xl font-extrabold">{user.email}</p>
          <p className="mt-2 text-sm text-[#69766e]">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <SignOutButton />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-[#849087]">Completed rounds</p>
          <p className="mt-2 text-3xl font-black">{stats.gamesPlayed}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-[#849087]">Fastest time</p>
          <p className="mt-2 text-3xl font-black">
            {stats.fastestTime === null
              ? "—"
              : `${Math.floor(stats.fastestTime / 60)
                  .toString()
                  .padStart(2, "0")}:${(stats.fastestTime % 60)
                  .toString()
                  .padStart(2, "0")}`}
          </p>
        </div>
      </div>
      {stats.recentGames.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-extrabold">Your recent rounds</h2>
          <ul className="mt-3 divide-y divide-[#e5e9e2] rounded-2xl bg-white px-5 shadow-sm">
            {stats.recentGames.map((game) => (
              <li key={game.id} className="flex items-center justify-between gap-4 py-4 text-sm">
                <span className="font-semibold">Board {game.level}</span>
                <span className="font-mono font-bold tabular-nums">
                  {Math.floor(game.time / 60)
                    .toString()
                    .padStart(2, "0")}:
                  {(game.time % 60).toString().padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="mt-5 text-sm leading-6 text-[#69766e]">Your account is protected by a server-side session. Your password is never stored in plain text.</p>
    </section>
  );
}
