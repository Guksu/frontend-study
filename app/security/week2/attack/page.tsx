// ⚠️ 실습용 취약 코드 — 프로덕션 사용 금지

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
        2주차 CSRF · CORS — 공격 시나리오
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">SameSite 쿠키, CSRF 토큰, Preflight</p>
      <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4">
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
          ⚠️ 실습용 페이지 — 공격 코드 구현 예정
        </p>
      </div>
    </main>
  );
}
