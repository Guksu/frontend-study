export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
        1주차 XSS — 방어 코드
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">
        DOMPurify를 활용한 XSS 방어 구현
      </p>
      <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-4">
        <p className="text-green-600 dark:text-green-400 text-sm font-medium">
          방어 코드 구현 예정
        </p>
      </div>
    </main>
  );
}
