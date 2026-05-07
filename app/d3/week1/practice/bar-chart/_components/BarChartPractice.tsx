"use client";
import { useRef, useEffect, useState } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";

import "d3-transition";

// ── 구현 순서 ──────────────────────────────────────────────────
// 1. 데이터 타입 정의 & 초기 데이터 선언
// 2. SVG 크기 상수 (width, height, margin) 정의
// 3. useRef로 <svg> 참조
// 4. useState로 현재 데이터 관리 (버튼 클릭 시 교체)
// 5. useEffect에서 D3 로직 작성 (data가 바뀔 때마다 실행)
//    5-1. scaleBand (x축) / scaleLinear (y축) 설정
//    5-2. 축 그리기: select(axisRef.current).call(axisBottom(xScale))
//    5-3. data join: svg.selectAll('rect').data(data, d => d.label).join(enter, update, exit)
//    5-4. enter: 막대가 바닥에서 올라오는 transition
//    5-5. update: 높이/위치 변경 transition
//    5-6. exit: 막대가 바닥으로 내려가며 제거
// ──────────────────────────────────────────────────────────────

type Data = {
  label: string;
  value: number;
};

const INITIAL: Data[] = [
  {
    label: "월요일",
    value: 300,
  },
  {
    label: "화요일",
    value: 500,
  },
  {
    label: "수요일",
    value: 300,
  },
  {
    label: "목요일",
    value: 600,
  },
  {
    label: "금요일",
    value: 1000,
  },
  {
    label: "토요일",
    value: 100,
  },
  {
    label: "일요일",
    value: 700,
  },
];

// 참고 패턴 — scaleBand/scaleLinear 설정
// const xScale = scaleBand()
//   .domain(data.map(d => d.label))
//   .range([0, innerWidth])
//   .padding(0.2);
// const yScale = scaleLinear()
//   .domain([0, d3.max(data, d => d.value)!])
//   .range([innerHeight, 0]);

// 참고 패턴 — data join with key function
// svg.selectAll<SVGRectElement, Datum>("rect")
//   .data(data, d => d.label)
//   .join(
//     enter => enter.append("rect").attr("y", innerHeight).attr("height", 0),
//     update => update,
//     exit => exit.transition().duration(400).attr("y", innerHeight).attr("height", 0).remove()
//   )
//   .transition().duration(600)
//   .attr("x", d => xScale(d.label)!)
//   .attr("y", d => yScale(d.value))
//   .attr("width", xScale.bandwidth())
//   .attr("height", d => innerHeight - yScale(d.value));

const randomize = (data: Data[]): Data[] => {
  return data.map((d) => ({
    ...d,
    value: Math.floor(Math.random() * 88) + 10,
  }));
};

const W = 1000;
const H = 600;
const M = { top: 24, right: 20, bottom: 36, left: 46 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const DUR = 600;

export default function BarChartPractice() {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<Data[]>(INITIAL);

  useEffect(() => {
    if (!chartRef.current) return;
    const g = select(chartRef.current).select<SVGGElement>(".chart-g");

    // ── Scales ────────────────────────────────────────────────

    const xScale = scaleBand<string>()
      .domain(data.map((d) => d.label))
      .range([0, IW])
      .padding(0.32);

    const yScale = scaleLinear<number>()
      .domain([0, (max(data, (d) => d.value) ?? 100) * 1.12])
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
      .selectAll<SVGRectElement, Data>("rect")
      .data(data, (d) => d.label)
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
      .selectAll<SVGTextElement, Data>("text")
      .data(data, (d) => d.label)
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
      select(chartRef.current).selectAll("*").interrupt();
    };
  }, [data, chartRef]);

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <button
          onClick={() => setData((d) => randomize(d))}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        >
          데이터 변경
        </button>
      </div>

      {/* Chart */}
      <div className="inline-block rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg ref={chartRef} width={W} height={H}>
          <g className="chart-g" transform={`translate(${M.left},${M.top})`}>
            <g className="x-axis" transform={`translate(0,${IH})`} />
            <g className="y-axis" />
            <g className="bars" />
            <g className="labels" />
          </g>
        </svg>
      </div>
    </div>
  );
}
