import Link from "next/link";
import RealtimeLineChartLoader from "./_components/RealtimeLineChartLoader";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <Link
        href="/d3/week2"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6 inline-block"
      >
        ← 2주차
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        실시간 라인 차트
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        슬라이딩 윈도우 · React-centric Pattern · useLineChart 커스텀 훅
      </p>
      <div className="flex flex-wrap gap-1.5 mb-10">
        {[
          "scaleTime",
          "area generator",
          "curveCatmullRom",
          "setInterval",
          "useLineChart",
        ].map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <RealtimeLineChartLoader />
    </main>
  );
}
