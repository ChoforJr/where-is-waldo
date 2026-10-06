import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "../../components/auth-form";

export const metadata: Metadata = { title: "Sign in | Where's Waldo?" };

export default function SignInPage() {
  return (
    <section className="mx-auto max-w-md px-5 py-14 sm:py-20">
      <div className="rounded-3xl border border-[#e5e9e2] bg-white p-6 shadow-sm sm:p-9">
        <Link href="/" className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">Where&apos;s Waldo?</Link>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-[#69766e]">Sign in to your account to see your player profile.</p>
        <AuthForm mode="login" />
      </div>
    </section>
  );
}
