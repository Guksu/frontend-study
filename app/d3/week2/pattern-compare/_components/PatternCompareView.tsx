"use client";

import { useState } from "react";
import BlackboxBarChart, { type Datum } from "./BlackboxBarChart";
import ReactBarChart from "./ReactBarChart";

const INITIAL: Datum[] = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 42 },
  { label: "Mar", value: 78 },
  { label: "Apr", value: 53 },
  { label: "May", value: 91 },
  { label: "Jun", value: 37 },
];

function randomize(data: Datum[]): Datum[] {
  return data.map((d) => ({ ...d, value: Math.floor(Math.random() * 88) + 10 }));
}

type PatternInfo = {
  name: string;
  color: "blue" | "green";
  tagline: string;
  flow: string[];
  pros: string[];
  cons: string[];
};

const BLACKBOX: PatternInfo = {
  name: "Blackbox Pattern",
  color: "blue",
  tagline: "React는 컨테이너, D3가 DOM을 직접 제어",
  flow: ["useRef(svgRef)", "useEffect([data])", "D3 select", "enter/update/exit", "D3 transition"],
  pros: ["D3 transition 완전 활용", "기존 D3 코드 이식 쉬움", "SVG 렌더 제어 자유로움"],
  cons: ["React·D3 DOM 충돌 위험", "React DevTools 불투명", "단위 테스트 어려움"],
};

const REACT_CENTRIC: PatternInfo = {
  name: "React-centric Pattern",
  color: "green",
  tagline: "React가 SVG 렌더링, D3는 수학(스케일·축)만",
  flow: ["useMemo(scales)", "data.map() → JSX", "useEffect(axis만)", "CSS transition", "React 상태 관리"],
  pros: ["React 생명주기 자연스럽게 활용", "DevTools 투명·SSR 가능", "단위 테스트 쉬움"],
  cons: ["D3 transition 직접 사용 불가", "SVG JSX가 장황해질 수 있음"],
};

function PatternCard({
  info,
  chart,
}: {
  info: PatternInfo;
  chart: React.ReactNode;
}) {
  const isBlue = info.color === "blue";
  const cardBg = isBlue
    ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50"
    : "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50";
  const badge = isBlue
    ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
    : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300";
  const flowChip = isBlue
    ? "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    : "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";

  return (
    <div className={`rounded-2xl border p-6 space-y-5 ${cardBg}`}>
      <div>
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${badge}`}>
          {info.name}
        </span>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{info.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-1 items-center font-mono text-xs">
        {info.flow.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            <span
              className={`px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900/80 border ${flowChip}`}
            >
              {step}
            </span>
            {i < info.flow.length - 1 && (
              <span className="text-zinc-400 dark:text-zinc-600">→</span>
            )}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">{chart}</div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-2">장점</p>
          <ul className="space-y-1.5">
            {info.pros.map((p) => (
              <li key={p} className="flex gap-1.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="text-emerald-500 shrink-0 mt-0.5">+</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-zinc-700 dark:text-zinc-300 mb-2">단점</p>
          <ul className="space-y-1.5">
            {info.cons.map((c) => (
              <li key={c} className="flex gap-1.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="text-red-400 shrink-0 mt-0.5">−</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function PatternCompareView() {
  const [data, setData] = useState<Datum[]>(INITIAL);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setData((d) => randomize(d))}
          className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          데이터 변경
        </button>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          같은 데이터 → 두 패턴으로 동시 렌더
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <PatternCard info={BLACKBOX} chart={<BlackboxBarChart data={data} />} />
        <PatternCard info={REACT_CENTRIC} chart={<ReactBarChart data={data} />} />
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-sm text-zinc-600 dark:text-zinc-400 space-y-2 max-w-2xl">
        <p className="font-medium text-zinc-800 dark:text-zinc-200">언제 어떤 패턴을?</p>
        <p>
          <span className="font-medium text-blue-600 dark:text-blue-400">Blackbox</span>
          {" — "}D3 transition·brush·zoom 등 D3 고유 기능을 적극 활용할 때, 기존 D3 코드를 React 앱에 이식할 때
        </p>
        <p>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">React-centric</span>
          {" — "}React 상태관리와 긴밀하게 연동할 때, SSR·테스트가 중요한 프로젝트에서
        </p>
      </div>
    </div>
  );
}
