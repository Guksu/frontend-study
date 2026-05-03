import Link from "next/link";

const d3Weeks = [
  { week: 1, title: "D3 철학 + SVG 기초", desc: "Selections, data join, Scales, Axes", mission: "동적 막대그래프 + 축" },
  { week: 2, title: "React + D3 통합 패턴", desc: "Blackbox Pattern, React-centric Pattern, TypeScript 타입", mission: "실시간 라인 차트" },
  { week: 3, title: "고급 인터랙션 + 애니메이션", desc: "Transitions, Brushing, Zoom, Tooltip, Sankey", mission: "인터랙티브 대시보드 위젯" },
  { week: 4, title: "Canvas 최적화 + 고급 시각화", desc: "SVG vs Canvas, Force Graph, Treemap, Sunburst", mission: "1만 개+ 데이터 포인트 60fps" },
  { week: 5, title: "커스텀 훅 라이브러리 + npm 배포", desc: "tsup 번들링, 제네릭 훅 설계, GitHub Actions", mission: "npm 패키지 배포" },
];

const securityWeeks = [
  { week: 1, title: "XSS", desc: "Stored · Reflected · DOM XSS, DOMPurify" },
  { week: 2, title: "CSRF · CORS", desc: "SameSite 쿠키, CSRF 토큰, Preflight" },
  { week: 3, title: "인증 보안", desc: "JWT 구조, HttpOnly 쿠키, OAuth PKCE" },
  { week: 4, title: "CSP · 보안 헤더", desc: "nonce, HSTS, X-Frame-Options" },
  { week: 5, title: "인젝션 · 입력값 검증", desc: "SQL/NoSQL Injection, Zod, Parameterized Query" },
  { week: 6, title: "HTTPS · 의존성 보안", desc: "TLS, npm audit, OWASP Top 10" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Frontend Study
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">
          D3.js 데이터 시각화 · 웹 보안 — 11주 학습 프로젝트
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Track 1 — D3.js 데이터 시각화
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d3Weeks.map(({ week, title, desc, mission }) => (
              <Link
                key={week}
                href={`/d3/week${week}`}
                className="block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {week}주차
                </span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{desc}</p>
                <p className="text-xs text-sky-600 dark:text-sky-400 mt-2">미션: {mission}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            Track 2 — 웹 보안
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {securityWeeks.map(({ week, title, desc }) => (
              <Link
                key={week}
                href={`/security/week${week}`}
                className="block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                  {week}주차
                </span>
                <p className="font-medium text-zinc-900 dark:text-zinc-100 mt-1">{title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
