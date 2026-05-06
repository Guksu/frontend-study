"use client";

import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3-array";
import "d3-transition";

export type Datum = { label: string; value: number };

const W = 460;
const H = 260;
const M = { top: 20, right: 16, bottom: 36, left: 46 };
const IW = W - M.left - M.right;
const IH = H - M.top - M.bottom;
const DUR = 600;

export default function BlackboxBarChart({ data }: { data: Datum[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const g = select(svgRef.current).select<SVGGElement>(".chart-g");

    const xScale = scaleBand<string>()
      .domain(data.map((d) => d.label))
      .range([0, IW])
      .padding(0.32);

    const yScale = scaleLinear()
      .domain([0, (max(data, (d) => d.value) ?? 100) * 1.12])
      .nice()
      .range([IH, 0]);

    g.select<SVGGElement>(".x-axis")
      .transition()
      .duration(DUR)
      .call(axisBottom(xScale).tickSizeOuter(0));

    g.select<SVGGElement>(".y-axis")
      .transition()
      .duration(DUR)
      .call(axisLeft(yScale).ticks(5).tickSizeOuter(0));

    g.select<SVGGElement>(".bars")
      .selectAll<SVGRectElement, Datum>("rect")
      .data(data, (d) => d.label)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("fill", "#3b82f6")
            .attr("rx", 4)
            .attr("x", (d) => xScale(d.label) ?? 0)
            .attr("width", xScale.bandwidth())
            .attr("y", IH)
            .attr("height", 0)
            .call((sel) =>
              sel
                .transition()
                .duration(DUR)
                .attr("y", (d) => yScale(d.value))
                .attr("height", (d) => IH - yScale(d.value)),
            ),
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

    g.select<SVGGElement>(".labels")
      .selectAll<SVGTextElement, Datum>("text")
      .data(data, (d) => d.label)
      .join(
        (enter) =>
          enter
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "11")
            .attr("fill", "#9ca3af")
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
          update.text((d) => d.value).call((sel) =>
            sel
              .transition()
              .duration(DUR)
              .attr("x", (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
              .attr("y", (d) => yScale(d.value) - 6),
          ),
        (exit) => exit.remove(),
      );

    return () => {
      if (svgRef.current) select(svgRef.current).selectAll("*").interrupt();
    };
  }, [data]);

  return (
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
  );
}
