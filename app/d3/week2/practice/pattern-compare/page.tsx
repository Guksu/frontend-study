import Link from "next/link";
import PatternComparePracticeLoader from "./_components/PatternComparePracticeLoader";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/d3/week2"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          ← 2주차
        </Link>
        <Link
          href="/d3/week2/pattern-compare"
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          참고 구현 보기 →
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        Blackbox vs React-centric — 실습
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        같은 막대그래프를 두 패턴으로 직접 구현해보세요.
      </p>

      <PatternComparePracticeLoader />
    </main>
  );
}
