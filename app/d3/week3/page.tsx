import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6 inline-block"
      >
        ← 홈으로
      </Link>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        3주차 — 고급 인터랙션 + 애니메이션
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        Transitions, Brushing, Zoom, Tooltip, Sankey
      </p>
      <p className="text-sm text-sky-600 dark:text-sky-400 mb-8">
        미션: 인터랙티브 대시보드 위젯
      </p>
      <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center text-zinc-400 dark:text-zinc-600">
        실습 준비 중
      </div>
    </main>
  );
}
