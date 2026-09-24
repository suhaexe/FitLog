"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  return (
    <header className="border-b border-line sticky top-0 z-50 bg-bg">
      <nav className="flex items-center justify-between mx-auto max-w-7xl px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog" width={28} height={28} />
          <span className="font-display text-xl tracking-widest">FITLOG</span>
        </Link>
        <div className="hidden md:flex gap-8">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-semibold text-sm text-white uppercase"
                : "text-sm font-semibold uppercase text-muted"
            }
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "text-sm font-semibold text-white uppercase"
                : "text-sm font-semibold text-muted uppercase"
            }
          >
            My Plan
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="bg-accent text-black text-xs font-bold uppercase px-3 py-1.5 rounded-full"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="border border-line text-xs font-bold uppercase px-3 py-1.5 rounded-full"
          >
            Saved {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
