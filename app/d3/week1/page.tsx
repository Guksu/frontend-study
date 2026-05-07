import Link from "next/link";

const PAGES = [
  {
    title: "SVG 기초 샌드박스",
    desc: "rect · circle · line · path · g · text 요소를 직접 다뤄봅니다.",
    tags: ["rect", "path", "g", "text", "transform"],
    refHref: "/d3/week1/svg-basic",
    practiceHref: "/d3/week1/practice/svg-basic",
  },
  {
    title: "D3 막대그래프",
    desc: "data join 패턴으로 데이터 변경 시 enter / update / exit transition 동작을 확인합니다.",
    tags: ["data join", "scaleBand", "axisBottom", "transition"],
    refHref: "/d3/week1/bar-chart",
    practiceHref: "/d3/week1/practice/bar-chart",
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
        1주차 — D3 철학 + SVG 기초
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        Selections · data join · Scales · Axes
      </p>
      <p className="text-sm text-sky-600 dark:text-sky-400 mb-10">
        미션: 동적 막대그래프 + 축
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
