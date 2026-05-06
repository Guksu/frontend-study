"use client";

import { useEffect, useMemo, useRef } from "react";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";
import { select } from "d3-selection";
import type { Datum } from "./BlackboxBarChart";

const W = 460;
const H = 260;
const M = { top: 20, right: 16, bottom: 36, left: 46 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;

export default function ReactBarChart({ data }: { data: Datum[] }) {
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);

  const xScale = useMemo(
    () =>
      scaleBand<string>()
        .domain(data.map((d) => d.label))
        .range([0, IW])
        .padding(0.32),
    [data],
  );

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, (max(data, (d) => d.value) ?? 100) * 1.12])
        .nice()
        .range([IH, 0]),
    [data],
  );

  useEffect(() => {
    if (xAxisRef.current)
      select(xAxisRef.current).call(axisBottom(xScale).tickSizeOuter(0));
  }, [xScale]);

  useEffect(() => {
    if (yAxisRef.current)
      select(yAxisRef.current).call(
        axisLeft(yScale).ticks(5).tickSizeOuter(0),
      );
  }, [yScale]);

  return (
    <div className="inline-block rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
      <svg width={W} height={H}>
        <g transform={`translate(${M.left},${M.top})`}>
          <g ref={xAxisRef} transform={`translate(0,${IH})`} />
          <g ref={yAxisRef} />
          {data.map((d) => {
            const x = xScale(d.label) ?? 0;
            const y = yScale(d.value);
            const bw = xScale.bandwidth();
            return (
              <g key={d.label}>
                <rect
                  x={x}
                  y={y}
                  width={bw}
                  height={IH - y}
                  fill="#10b981"
                  rx={4}
                  style={{
                    transition: "x 0.4s ease, y 0.4s ease, width 0.4s ease, height 0.4s ease",
                  }}
                />
                <text
                  x={x + bw / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#9ca3af"
                  style={{ transition: "x 0.4s ease, y 0.4s ease" }}
                >
                  {d.value}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
