import Link from "next/link";
import BarChartPracticeLoader from "./_components/BarChartPracticeLoader";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/d3/week1"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          ← 1주차
        </Link>
        <Link
          href="/d3/week1/bar-chart"
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          참고 구현 보기 →
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        D3 막대그래프 — 실습
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        data join 패턴으로 enter / update / exit transition을 직접 구현해보세요.
      </p>

      <BarChartPracticeLoader />
    </main>
  );
}
