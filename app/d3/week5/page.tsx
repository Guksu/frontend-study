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
        5주차 — 커스텀 훅 라이브러리 + npm 배포
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-2">
        tsup 번들링, 제네릭 훅 설계, GitHub Actions
      </p>
      <p className="text-sm text-sky-600 dark:text-sky-400 mb-8">
        미션: npm 패키지 배포
      </p>
      <div className="rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center text-zinc-400 dark:text-zinc-600">
        실습 준비 중
      </div>
    </main>
  );
}
