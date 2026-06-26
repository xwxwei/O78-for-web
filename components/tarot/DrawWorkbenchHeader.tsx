"use client";

import { useRouter } from "next/navigation";
import { O78Logo } from "@/components/brand";

export function DrawWorkbenchHeader() {
  const router = useRouter();

  return (
    <header className="absolute left-0 top-0 z-40 grid h-16 w-full grid-cols-3 items-center px-5 text-white sm:h-20 sm:px-8">
      <button
        type="button"
        className="h-4 w-4 justify-self-start bg-white/55 transition hover:bg-white"
        onClick={() => router.push("/home")}
        aria-label="Back"
        style={{
          mask: "url('/return.svg') center / contain no-repeat",
          WebkitMask: "url('/return.svg') center / contain no-repeat",
        }}
      >
      </button>

      <O78Logo className="h-4 w-11 justify-self-center text-white" />

      <div aria-hidden="true" />
    </header>
  );
}
