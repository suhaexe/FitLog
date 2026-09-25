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
        <div className="hidden items-center md:flex gap-8">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-semibold text-sm text-accent px-4 py-2 rounded-full bg-card"
                : "font-semibold text-sm text-muted"
            }
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "text-sm font-semibold text-accent px-4 py-2 rounded-full bg-card"
                : "text-sm font-semibold text-muted"
            }
          >
            My Plan
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-wite text-sm">Plan</span>
            <span className="text-black text-xs font-bold bg-accent w-6 h-6 rounded-full flex items-center justify-center">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-muted text-sm">Saved</span>
            <span className="text-xs font-bold border border-line w-6 h-6 rounded-full flex items-center justify-center">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
