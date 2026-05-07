import Link from "next/link";

const PAGES = [
  {
    title: "Transition + Tooltip",
    desc: "연도별 데이터 전환 시 Enter/Update/Exit 애니메이션, 막대 hover에서 Portal Tooltip.",
    tags: ["data join", "transition", "createPortal", "hybrid"],
    refHref: "/d3/week3/transition-tooltip",
    practiceHref: "/d3/week3/practice/transition-tooltip",
  },
  {
    title: "Overview + Detail 대시보드",
    desc: "상단 미니맵의 Brush 드래그로 범위를 선택하면 하단 상세 차트가 해당 구간으로 업데이트됩니다.",
    tags: ["brushX", "scaleTime", "area", "curveCatmullRom", "React-centric"],
    refHref: "/d3/week3/brush-dashboard",
    practiceHref: "/d3/week3/practice/brush-dashboard",
  },
];

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
        Transitions · Brushing · Tooltip · Portal
      </p>
      <p className="text-sm text-sky-600 dark:text-sky-400 mb-10">
        미션: 인터랙티브 대시보드 위젯
      </p>

      <div className="max-w-2xl space-y-3">
        {PAGES.map(({ title, desc, tags, refHref, practiceHref }) => (
          <div
            key={refHref}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Link
                href={refHref}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                참고 구현
              </Link>
              <Link
                href={practiceHref}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                직접 실습 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
