import Link from "next/link";
import BrushDashboardLoader from "./_components/BrushDashboardLoader";

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
        Overview + Detail 대시보드
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        미니맵 Brush 드래그 → 하단 상세 차트 구간 업데이트 · React-centric + Blackbox 하이브리드
      </p>

      <BrushDashboardLoader />
    </main>
  );
}
