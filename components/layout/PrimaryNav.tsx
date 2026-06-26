import Link from "next/link";
import { O78Logo } from "@/components/brand";

const navItems = [
  { label: "Readings", href: "/readings" },
  { label: "Daily", href: "/daily" },
  { label: "Journal", href: "/journal" },
];

export function PrimaryNav() {
  return (
    <header className="absolute left-0 top-0 z-20 flex h-[72px] w-full items-center justify-between px-6 text-xs font-light leading-none tracking-normal text-white">
      <Link className="flex items-center gap-2" href="/home" aria-label="o78 home">
        <O78Logo />
      </Link>

      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 sm:flex">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <a href="#sign-in" className="text-right">
        Sign in
      </a>
    </header>
  );
}
