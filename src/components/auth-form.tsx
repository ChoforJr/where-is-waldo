"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api } from "../lib/api";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      if (isRegister) await api.register(email, password);
      else await api.login(email, password);
      router.replace("/account");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We couldn't sign you in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={(event) => void submit(event)} className="mt-7 space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-bold">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#dce3da] bg-white px-4 py-3 outline-none focus:border-[#244d3b]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-bold">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          minLength={8}
          maxLength={72}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#dce3da] bg-white px-4 py-3 outline-none focus:border-[#244d3b]"
          placeholder="At least 8 characters"
        />
      </div>
      {error && <p role="alert" className="rounded-xl bg-[#fff0ee] px-4 py-3 text-sm font-medium text-[#b9362e]">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-[#244d3b] px-4 py-3.5 font-bold text-white transition hover:bg-[#193d2d] disabled:cursor-wait disabled:opacity-60">
        {isSubmitting ? "Please wait…" : isRegister ? "Create your account" : "Sign in"}
      </button>
      <p className="text-center text-sm text-[#69766e]">
        {isRegister ? "Already have an account?" : "New to the game?"}{" "}
        <Link href={isRegister ? "/sign-in" : "/sign-up"} className="font-bold text-[#244d3b] underline underline-offset-4">
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
