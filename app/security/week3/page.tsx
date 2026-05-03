import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        3주차 — 인증 보안
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">
        JWT 구조, 토큰 저장 위치, OAuth PKCE
      </p>
      <div className="flex gap-4">
        <Link
          href="/security/week3/attack"
          className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
        >
          공격 시나리오
        </Link>
        <Link
          href="/security/week3/defense"
          className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 font-medium hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
        >
          방어 코드
        </Link>
      </div>
    </main>
  );
}
