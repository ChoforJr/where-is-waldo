import type { Metadata } from "next";
import Image from "next/image";
import { PersonStanding, ScrollText } from "lucide-react";
import { characters } from "../../lib/game-data";

export const metadata: Metadata = { title: "How to play | Where's Waldo?" };

const rules = [
  ["Choose a board", "Pick one of the illustrated scenes. Your timer begins when the board starts."],
  ["Look around", "Click or tap where you think a character is hiding to open the character picker."],
  ["Make your guess", "Choose the character you spotted. A correct find is marked on your checklist."],
  ["Find all four", "Locate Waldo, Wilma, Odlaw and the Wizard to finish your round and save your time."],
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#e94f45]">The field guide</p>
      <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">How to play</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#69766e]">Take a breath, scan the scene, and trust your eyes. Here&apos;s how your search works.</p>
      <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-9">
        <h2 className="flex items-center gap-3 text-2xl font-extrabold"><ScrollText className="text-[#e94f45]" /> Four steps to a great find</h2>
        <ol className="mt-7 grid gap-5 md:grid-cols-2">
          {rules.map(([title, detail], index) => (
            <li key={title} className="flex gap-4 rounded-2xl bg-[#f6f7f2] p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#244d3b] text-sm font-black text-white">0{index + 1}</span>
              <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#69766e]">{detail}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-9">
        <h2 className="flex items-center gap-3 text-2xl font-extrabold"><PersonStanding className="text-[#e94f45]" /> Meet the characters</h2>
        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {characters.map((character) => (
            <article key={character.name} className="rounded-2xl bg-[#f6f7f2] p-4 text-center">
              <div className="flex h-28 items-center justify-center">
                <Image src={character.image} alt="" width={96} height={96} className="max-h-24 max-w-full object-contain" />
              </div>
              <h3 className="mt-2 font-bold">{character.label}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
