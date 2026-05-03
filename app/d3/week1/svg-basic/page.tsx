import Link from "next/link";
import SVGSandbox from "./_components/SVGSandbox";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <Link
        href="/d3/week1"
        className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors mb-6 inline-block"
      >
        ← 1주차
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        SVG 기초 샌드박스
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">
        rect · circle · line · path · g · text — SVG 핵심 요소와 속성을 직접 확인합니다.
      </p>

      <SVGSandbox />
    </main>
  );
}
