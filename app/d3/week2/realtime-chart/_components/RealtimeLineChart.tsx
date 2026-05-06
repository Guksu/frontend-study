"use client";

import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { useLineChart, CHART, IW, IH } from "../_hooks/useLineChart";

function fmtTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

export default function RealtimeLineChart() {
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
      select(yAxisRef.current).call(
        axisLeft(yScale).ticks(5).tickSizeOuter(0),
      );
  }, [yScale]);

  const { W, H, M } = CHART;
  const gridLines = yScale.ticks(5);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-6 flex-wrap">
        {[
          { label: "현재", val: latest.value.toFixed(1), color: "text-blue-500 dark:text-blue-400" },
          { label: "최소", val: min.toFixed(1), color: "text-emerald-500 dark:text-emerald-400" },
          { label: "최대", val: max.toFixed(1), color: "text-red-400" },
          { label: "평균", val: avg.toFixed(1), color: "text-zinc-500 dark:text-zinc-400" },
        ].map(({ label, val, color }) => (
          <div key={label} className="text-sm">
            <span className="text-zinc-400 dark:text-zinc-500 mr-1.5">{label}</span>
            <span className={`font-mono font-semibold tabular-nums ${color}`}>{val}</span>
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

      {/* Hook architecture note */}
      <div className="max-w-lg rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
        <p>
          <span className="text-sky-400">useLineChart()</span> 훅이 반환하는 것
        </p>
        <p className="pl-3">└ data — 슬라이딩 윈도우 (30 pts × 500 ms)</p>
        <p className="pl-3">└ linePath / areaPath — d3-shape line·area 계산 결과</p>
        <p className="pl-3">└ xScale (scaleTime) / yScale (scaleLinear)</p>
        <p className="pl-3">└ latest, min, max, avg</p>
        <p className="mt-1">
          <span className="text-emerald-400">RealtimeLineChart</span> 는 React JSX로만 SVG 렌더 —
          D3는 axes 호출에만 사용
        </p>
      </div>
    </div>
  );
}
