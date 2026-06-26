"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function HeroCircleInput() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState("");

  function focusQuestion() {
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function submitQuestion(event?: FormEvent) {
    event?.preventDefault();
    const trimmed = question.trim();

    if (!trimmed) {
      focusQuestion();
      return;
    }

    router.push(`/draw?question=${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="relative h-screen min-h-[640px] px-6" aria-label="o78 home">
      <form
        className="group absolute left-1/2 top-1/2 z-10 flex w-[min(88vw,680px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
        onSubmit={submitQuestion}
      >
        <div className="absolute bottom-[calc(100%+152px)] flex items-center gap-3 rounded-full border border-[#3a3a42] bg-[#111116]/70 px-5 py-2 text-sm font-light leading-none text-white/70 shadow-[inset_0_0_16px_rgba(214,215,220,0.025),0_0_24px_rgba(0,0,0,0.32)] backdrop-blur-md">
          <span className="text-base leading-none text-white/65">✧</span>
          <span>Modern tarot for reflection and clarity.</span>
        </div>

        <h1
          className="absolute bottom-[calc(100%+48px)] whitespace-nowrap text-[56px] font-light leading-none text-white/90 transition duration-500 group-hover:text-white/52 group-focus-within:text-white/45 max-sm:text-[40px]"
        >
          What keeps returning ?
        </h1>

        <div className="flex h-16 w-full items-center rounded-[28px] border border-white/[0.06] bg-[#101014]/78 px-5 text-left shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-md transition duration-500 hover:animate-[input-breath-glow_10s_ease-in-out_infinite] hover:border-white/20 focus-within:animate-[input-breath-glow_10s_ease-in-out_infinite] focus-within:border-white/38 focus-within:bg-[#15151a]/90">
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask what keeps returning..."
            className="h-10 flex-1 border-0 bg-transparent text-base font-light leading-6 text-white outline-none placeholder:text-white/35"
            maxLength={180}
          />

          <button
            type="submit"
            className={`ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0b0b0f] transition duration-300 hover:bg-white/90 ${
              question.trim() ? "opacity-100" : "pointer-events-none opacity-25"
            }`}
            aria-label="Begin reading"
          >
            ↑
          </button>
        </div>
      </form>
    </section>
  );
}
