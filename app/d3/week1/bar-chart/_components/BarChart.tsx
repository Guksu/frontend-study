"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";
import "d3-transition";

type Datum = { label: string; value: number };

const INITIAL: Datum[] = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 42 },
  { label: "Mar", value: 78 },
  { label: "Apr", value: 53 },
  { label: "May", value: 91 },
  { label: "Jun", value: 37 },
  { label: "Jul", value: 84 },
];

const W = 560;
const H = 320;
const M = { top: 24, right: 20, bottom: 36, left: 46 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const DUR = 600;

function randomize(data: Datum[]): Datum[] {
  return data.map((d) => ({
    ...d,
    value: Math.floor(Math.random() * 88) + 10,
  }));
}

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<Datum[]>(INITIAL);
  const [sorted, setSorted] = useState(false);

  const displayed = useMemo(
    () => (sorted ? [...data].sort((a, b) => b.value - a.value) : data),
    [data, sorted],
  );

  useEffect(() => {
    if (!svgRef.current) return;
    const g = select(svgRef.current).select<SVGGElement>(".chart-g");

    // ── Scales ────────────────────────────────────────────────
    const xScale = scaleBand<string>()
      .domain(displayed.map((d) => d.label))
      .range([0, IW])
      .padding(0.32);

    const yScale = scaleLinear()
      .domain([0, (max(displayed, (d) => d.value) ?? 100) * 1.12])
      .nice()
      .range([IH, 0]);

    // ── Axes ──────────────────────────────────────────────────
    g.select<SVGGElement>(".x-axis")
      .transition()
      .duration(DUR)
      .call(axisBottom(xScale).tickSizeOuter(0));

    g.select<SVGGElement>(".y-axis")
      .transition()
      .duration(DUR)
      .call(axisLeft(yScale).ticks(5).tickSizeOuter(0));

    // ── Bars  (data join: enter / update / exit) ───────────────
    // .data(displayed, d => d.label) — key 함수로 레이블별 DOM 요소 추적
    g.select<SVGGElement>(".bars")
      .selectAll<SVGRectElement, Datum>("rect")
      .data(displayed, (d) => d.label)
      .join(
        // enter: 이번 렌더에 처음 등장하는 데이터 → 새 rect 생성
        (enter) =>
          enter
            .append("rect")
            .attr("fill", "#3b82f6")
            .attr("rx", 4)
            .attr("x", (d) => xScale(d.label) ?? 0)
            .attr("width", xScale.bandwidth())
            .attr("y", IH) // 바닥에서 시작
            .attr("height", 0)
            .call((sel) =>
              sel
                .transition()
                .duration(DUR)
                .attr("y", (d) => yScale(d.value))
                .attr("height", (d) => IH - yScale(d.value)),
            ),

        // update: 이미 존재하는 요소 → 위치·크기 갱신
        (update) =>
          update.call((sel) =>
            sel
              .transition()
              .duration(DUR)
              .attr("x", (d) => xScale(d.label) ?? 0)
              .attr("width", xScale.bandwidth())
              .attr("y", (d) => yScale(d.value))
              .attr("height", (d) => IH - yScale(d.value)),
          ),

        // exit: 이번 렌더에 없는 요소 → 축소 후 제거
        (exit) =>
          exit.call((sel) =>
            sel
              .transition()
              .duration(DUR / 2)
              .attr("y", IH)
              .attr("height", 0)
              .remove(),
          ),
      );

    // ── Value labels ──────────────────────────────────────────
    g.select<SVGGElement>(".labels")
      .selectAll<SVGTextElement, Datum>("text")
      .data(displayed, (d) => d.label)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "12")
            .attr("fill", "#6b7280")
            .attr("x", (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
            .attr("y", IH)
            .text((d) => d.value)
            .call((sel) =>
              sel
                .transition()
                .duration(DUR)
                .attr("y", (d) => yScale(d.value) - 6),
            ),
        (update) =>
          update
            .text((d) => d.value)
            .call((sel) =>
              sel
                .transition()
                .duration(DUR)
                .attr(
                  "x",
                  (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2,
                )
                .attr("y", (d) => yScale(d.value) - 6),
            ),
        (exit) => exit.remove(),
      );

    return () => {
      select(svgRef.current).selectAll("*").interrupt();
    };
  }, [displayed]);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setData((d) => randomize(d))}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        >
          데이터 변경
        </button>
        <button
          onClick={() => setSorted((s) => !s)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
            sorted
              ? "bg-zinc-800 dark:bg-zinc-700 text-white border-transparent"
              : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}
        >
          {sorted ? "▲ 정렬됨" : "정렬"}
        </button>
      </div>

      {/* Chart */}
      <div className="inline-block rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg ref={svgRef} width={W} height={H}>
          <g className="chart-g" transform={`translate(${M.left},${M.top})`}>
            <g className="x-axis" transform={`translate(0,${IH})`} />
            <g className="y-axis" />
            <g className="bars" />
            <g className="labels" />
          </g>
        </svg>
      </div>

      {/* Data join 설명 */}
      <div className="max-w-lg rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
        <p>
          <span className="text-green-500">enter</span> — 새 데이터에 대응하는
          DOM 요소 생성
        </p>
        <p>
          <span className="text-blue-400">update</span> — 기존 요소 위치·크기
          갱신
        </p>
        <p>
          <span className="text-red-400">exit</span> — 없어진 데이터의 DOM 요소
          제거
        </p>
      </div>
    </div>
  );
}
