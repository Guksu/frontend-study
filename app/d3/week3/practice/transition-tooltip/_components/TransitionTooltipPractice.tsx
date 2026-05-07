"use client";
// import { useRef, useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { select } from "d3-selection";
// import { scaleBand, scaleLinear } from "d3-scale";
// import { axisBottom, axisLeft } from "d3-axis";
// import { max } from "d3-array";
// import "d3-transition";

// ── 구현 순서 ──────────────────────────────────────────────────
// 1. 데이터 타입 + 연도별 데이터 상수 정의
//    type Datum = { label: string; value: number }
//    const DATA: Record<string, Datum[]> = { "2022": [...], "2023": [...], "2024": [...] }
//
// 2. 상수: W, H, M, IW, IH, DUR
//
// 3. useState
//    year: string (선택된 연도)
//    tooltip: { x: number; y: number; label: string; value: number } | null
//
// 4. useRef: svgRef
//
// 5. useEffect([year])에서 D3 렌더링
//    5-1. 현재 연도 데이터로 xScale(scaleBand), yScale(scaleLinear) 설정
//    5-2. 축 업데이트
//    5-3. data join — key function: d => d.label
//         enter:  y=IH, height=0 → transition → 실제 위치
//         update: transition → 새 y, height
//         exit:   transition → y=IH, height=0 → remove()
//    5-4. 막대에 onMouseEnter/onMouseLeave 대신 D3 .on("mouseenter", ...) 사용
//         setTooltip({ x: event.pageX, y: event.pageY, ... })
//
// 6. Tooltip — createPortal로 document.body에 렌더링
//    tooltip && createPortal(<div style={{ left: tooltip.x, top: tooltip.y }}>...</div>, document.body)
// ──────────────────────────────────────────────────────────────

// 참고 패턴 — enter/update/exit
// const bars = g.select(".bars")
//   .selectAll<SVGRectElement, Datum>("rect")
//   .data(data, d => d.label);
//
// bars.join(
//   enter => enter.append("rect")
//     .attr("y", IH).attr("height", 0)   // 시작점
//     .call(sel => sel.transition().duration(DUR)
//       .attr("y", d => yScale(d.value))
//       .attr("height", d => IH - yScale(d.value))),
//   update => update
//     .call(sel => sel.transition().duration(DUR)
//       .attr("y", d => yScale(d.value))
//       .attr("height", d => IH - yScale(d.value))),
//   exit => exit
//     .call(sel => sel.transition().duration(DUR)
//       .attr("y", IH).attr("height", 0).remove()),
// );

// 참고 패턴 — Portal Tooltip
// {tooltip && createPortal(
//   <div
//     className="fixed z-50 pointer-events-none bg-zinc-900 text-white text-xs px-2 py-1 rounded"
//     style={{ left: tooltip.x + 12, top: tooltip.y - 28 }}
//   >
//     {tooltip.label}: {tooltip.value}
//   </div>,
//   document.body
// )}

export default function TransitionTooltipPractice() {
  return (
    <div className="p-8 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 text-sm text-center">
      여기에 직접 구현해보세요
    </div>
  );
}
