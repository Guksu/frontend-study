import Link from "next/link";

const PAGES = [
  {
    href: "/d3/week2/pattern-compare",
    title: "Blackbox vs React-centric",
    desc: "같은 막대그래프를 두 패턴으로 구현해 코드 복잡도와 구조 차이를 나란히 비교합니다.",
    tags: ["Blackbox Pattern", "React-centric", "data join", "D3 transition"],
  },
  {
    href: "/d3/week2/realtime-chart",
    title: "실시간 라인 차트",
    desc: "0.5초마다 새 데이터를 추가하고 오래된 데이터를 제거하는 슬라이딩 윈도우 라인 차트입니다.",
    tags: ["useLineChart", "scaleTime", "area", "curveCatmullRom", "setInterval"],
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
        2주차 — React + D3 통합 패턴
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        Blackbox Pattern, React-centric Pattern, TypeScript 타입
      </p>
      <p className="text-sm text-sky-600 dark:text-sky-400 mb-10">
        미션: 실시간 라인 차트
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {PAGES.map(({ href, title, desc, tags }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">{desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
