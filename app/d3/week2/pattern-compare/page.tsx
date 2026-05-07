import Link from "next/link";
import PatternCompareLoader from "./_components/PatternCompareLoader";

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
        Blackbox vs React-centric Pattern
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        같은 막대그래프를 두 패턴으로 구현 — 코드 복잡도와 구조 차이를 직접 비교
      </p>
      <div className="flex flex-wrap gap-1.5 mb-10">
        {["useRef + useEffect", "D3 data join", "useMemo scales", "JSX SVG rendering"].map(
          (tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              {tag}
            </span>
          ),
        )}
      </div>

      <PatternCompareLoader />
    </main>
  );
}
