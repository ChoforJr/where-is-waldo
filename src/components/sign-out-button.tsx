"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../lib/api";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    setError("");
    try {
      await api.logout();
      router.replace("/sign-in");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign out failed.");
      setIsSigningOut(false);
    }
  }

  return (
    <div>
      <button onClick={() => void signOut()} disabled={isSigningOut} className="rounded-xl border border-[#dce3da] px-4 py-2.5 text-sm font-bold text-[#435349] hover:bg-[#f6f7f2] disabled:opacity-60">
        {isSigningOut ? "Signing out…" : "Sign out"}
      </button>
      {error && <p role="alert" className="mt-2 text-sm text-[#b9362e]">{error}</p>}
    </div>
  );
}
