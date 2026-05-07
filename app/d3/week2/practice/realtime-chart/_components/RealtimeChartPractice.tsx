"use client";

import {
  CHART,
  IH,
  IW,
  useLineChart,
} from "../../../realtime-chart/_hooks/useLineChart";

import { useRef, useEffect } from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import "d3-transition";

// ── 구현 순서 ──────────────────────────────────────────────────
// 1. 데이터 타입 정의
//    type Point = { time: Date; value: number }
//
// 2. 상수 정의
//    W, H, M(margin), IW, IH, MAX_POINTS(윈도우 크기, 예: 30)
//
// 3. 초기 데이터 생성 함수
//    최초에 MAX_POINTS개의 포인트를 과거 시간으로 채워 시작
//
// 4. useRef + useState
//    svgRef: SVGSVGElement, data: Point[]
//
// 5. setInterval로 0.5초마다 새 포인트 추가
//    setData(prev => [...prev.slice(-(MAX_POINTS - 1)), newPoint])
//    useEffect cleanup에서 clearInterval 호출
//
// 6. useEffect([data])에서 D3 렌더링
//    6-1. scaleTime: domain = extent(data, d => d.time)
//    6-2. scaleLinear: domain = [0, max(data, d => d.value) * 1.1]
//    6-3. line generator: .x(d => xScale(d.time)).y(d => yScale(d.value)).curve(curveCatmullRom)
//    6-4. path 업데이트: select(".line-path").attr("d", lineGen(data))
//    6-5. 축 업데이트: .call(axisBottom(xScale))
// ──────────────────────────────────────────────────────────────

// 참고 패턴 — setInterval로 슬라이딩 윈도우
// useEffect(() => {
//   const id = setInterval(() => {
//     setData(prev => [
//       ...prev.slice(-(MAX_POINTS - 1)),
//       { time: new Date(), value: Math.random() * 100 },
//     ]);
//   }, 500);
//   return () => clearInterval(id);
// }, []);

// 참고 패턴 — line generator
// const lineGen = line<Point>()
//   .x(d => xScale(d.time))
//   .y(d => yScale(d.value))
//   .curve(curveCatmullRom);
// select(".line-path").attr("d", lineGen(data) ?? "");

// 참고 패턴 — area generator (선 아래 채우기)
// const areaGen = area<Point>()
//   .x(d => xScale(d.time))
//   .y0(IH)
//   .y1(d => yScale(d.value))
//   .curve(curveCatmullRom);

function fmtTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

export default function RealtimeChartPractice() {
  const { linePath, areaPath, xScale, yScale, latest, min, max, avg } =
    useLineChart();
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (xAxisRef.current)
      select(xAxisRef.current).call(
        axisBottom(xScale)
          .ticks(5)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .tickFormat((d: any) => fmtTime(+d))
          .tickSizeOuter(0),
      );
  }, [xScale]);

  useEffect(() => {
    if (yAxisRef.current)
      select(yAxisRef.current).call(axisLeft(yScale).ticks(5).tickSizeOuter(0));
  }, [yScale]);

  const { W, H, M } = CHART;
  const gridLines = yScale.ticks(5);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-6 flex-wrap">
        {[
          {
            label: "현재",
            val: latest.value.toFixed(1),
            color: "text-blue-500 dark:text-blue-400",
          },
          {
            label: "최소",
            val: min.toFixed(1),
            color: "text-emerald-500 dark:text-emerald-400",
          },
          { label: "최대", val: max.toFixed(1), color: "text-red-400" },
          {
            label: "평균",
            val: avg.toFixed(1),
            color: "text-zinc-500 dark:text-zinc-400",
          },
        ].map(({ label, val, color }) => (
          <div key={label} className="text-sm">
            <span className="text-zinc-400 dark:text-zinc-500 mr-1.5">
              {label}
            </span>
            <span className={`font-mono font-semibold tabular-nums ${color}`}>
              {val}
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="inline-block rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 overflow-x-auto">
        <svg width={W} height={H}>
          <defs>
            <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
            <clipPath id="chart-clip">
              <rect x={0} y={-4} width={IW} height={IH + 8} />
            </clipPath>
          </defs>
          <g transform={`translate(${M.left},${M.top})`}>
            {/* Horizontal grid lines */}
            {gridLines.map((tick) => (
              <line
                key={tick}
                x1={0}
                x2={IW}
                y1={yScale(tick)}
                y2={yScale(tick)}
                stroke="currentColor"
                strokeOpacity={0.07}
                strokeDasharray="4 3"
              />
            ))}

            {/* Area fill */}
            <path
              d={areaPath}
              fill="url(#area-grad)"
              clipPath="url(#chart-clip)"
            />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeLinecap="round"
              clipPath="url(#chart-clip)"
            />

            {/* Latest point — glow ring */}
            <circle
              cx={xScale(latest.time)}
              cy={yScale(latest.value)}
              r={9}
              fill="#3b82f6"
              opacity={0.15}
            />
            {/* Latest point — solid dot */}
            <circle
              cx={xScale(latest.time)}
              cy={yScale(latest.value)}
              r={4}
              fill="#3b82f6"
            />

            {/* Axes — only these use D3 DOM manipulation */}
            <g ref={xAxisRef} transform={`translate(0,${IH})`} />
            <g ref={yAxisRef} />
          </g>
        </svg>
      </div>
    </div>
  );
}
