import Link from "next/link";
import TransitionTooltipLoader from "./_components/TransitionTooltipLoader";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <Link
        href="/d3/week3"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6 inline-block"
      >
        ← 3주차
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        Transition + Tooltip
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        연도 전환 → Enter/Update/Exit 애니메이션 · 막대 hover → Portal Tooltip
      </p>

      <TransitionTooltipLoader />
    </main>
  );
}
