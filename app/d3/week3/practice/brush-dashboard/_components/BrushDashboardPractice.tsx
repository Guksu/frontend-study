"use client";
// import { useRef, useEffect, useState, useMemo } from "react";
// import { select } from "d3-selection";
// import { brushX, BrushBehavior } from "d3-brush";
// import { scaleTime, scaleLinear } from "d3-scale";
// import { line, area, curveCatmullRom } from "d3-shape";
// import { axisBottom, axisLeft } from "d3-axis";
// import { extent, max } from "d3-array";
// import "d3-transition";

// ── 구현 순서 ──────────────────────────────────────────────────
// 1. 데이터 타입 + 90일치 더미 데이터 생성
//    type Point = { date: Date; value: number }
//    Array.from({ length: 90 }, (_, i) => ({ date: subDays(today, 89 - i), value: ... }))
//    또는 직접 new Date(today - i * 86400000) 으로 생성
//
// 2. 상수: Overview(미니맵) 크기, Detail(상세) 크기, Margin
//
// 3. useState: brushRange — [Date, Date] | null (브러시 선택 범위)
//
// 4. useRef: overviewSvgRef, detailSvgRef, brushBehaviorRef
//    brushBehaviorRef: useRef<BrushBehavior<unknown> | null>(null)
//
// 5. Overview 렌더링 (brushX Blackbox)
//    5-1. xScaleOverview = scaleTime().domain(전체범위).range([0, OW])
//    5-2. area/line path 그리기 (React-centric: useMemo로 path string 계산)
//    5-3. brushX<unknown>() 생성 → .extent([[0,0],[OW,OH]])
//    5-4. brush 이벤트: event.selection as [number, number] | null
//         → xScaleOverview.invert()로 픽셀 → Date 변환 → setBrushRange
//    5-5. select(brushGroupRef.current).call(brushBehavior)
//
// 6. Detail 렌더링 (React-centric)
//    brushRange가 있으면 해당 범위, 없으면 전체 범위로 xScale domain 설정
//    useMemo로 filteredData + xScaleDetail + path 재계산
//    축은 useEffect에서 D3로 그리기
// ──────────────────────────────────────────────────────────────

// 참고 패턴 — brushX 설정 (datum 타입 unknown 주의)
// const brush = brushX<unknown>()
//   .extent([[0, 0], [OW, OH]])
//   .on("brush end", (event) => {
//     const sel = event.selection as [number, number] | null;
//     if (!sel) { setBrushRange(null); return; }
//     setBrushRange([xScaleOverview.invert(sel[0]), xScaleOverview.invert(sel[1])]);
//   });
// brushBehaviorRef.current = brush;
// select(brushGroupRef.current).call(brush);

// 참고 패턴 — Detail xScale (brushRange 반영)
// const xScaleDetail = useMemo(() =>
//   scaleTime()
//     .domain(brushRange ?? extent(allData, d => d.date) as [Date, Date])
//     .range([0, DW]),
// [brushRange]);

export default function BrushDashboardPractice() {
  return (
    <div className="p-8 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 text-sm text-center">
      여기에 직접 구현해보세요
    </div>
  );
}
