import { AmbientBackground } from "@/components/home/AmbientBackground";
import { HeroCircleInput } from "@/components/home/HeroCircleInput";
import { PrimaryNav } from "@/components/layout/PrimaryNav";

export function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-o78-black text-white">
      <PrimaryNav />
      <AmbientBackground />
      <HeroCircleInput />
    </main>
  );
}
