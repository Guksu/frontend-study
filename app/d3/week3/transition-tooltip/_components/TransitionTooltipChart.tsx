'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { max } from 'd3-array'
import 'd3-transition'

type Datum = { label: string; value: number }
type TooltipInfo = { x: number; y: number; datum: Datum }

// Stack Overflow 개발자 설문 — 언어 사용률 (%)
const DATASETS: Record<string, Datum[]> = {
  '2022': [
    { label: 'Python',     value: 67 },
    { label: 'JS',         value: 65 },
    { label: 'TypeScript', value: 34 },
    { label: 'Java',       value: 33 },
    { label: 'C#',         value: 27 },
    { label: 'Rust',       value:  9 },
  ],
  '2023': [
    { label: 'Python',     value: 71 },
    { label: 'JS',         value: 63 },
    { label: 'TypeScript', value: 38 },
    { label: 'Java',       value: 30 },
    { label: 'C#',         value: 26 },
    { label: 'Rust',       value: 13 },
  ],
  '2024': [
    { label: 'Python',     value: 74 },
    { label: 'JS',         value: 60 },
    { label: 'TypeScript', value: 43 },
    { label: 'Java',       value: 28 },
    { label: 'C#',         value: 25 },
    { label: 'Rust',       value: 17 },
  ],
}

const W = 560
const H = 320
const M = { top: 20, right: 20, bottom: 36, left: 46 }
const IW = W - M.left - M.right
const IH = H - M.top  - M.bottom
const DUR = 500

export default function TransitionTooltipChart() {
  const barsRef  = useRef<SVGGElement>(null)
  const xAxisRef = useRef<SVGGElement>(null)
  const yAxisRef = useRef<SVGGElement>(null)

  const [year, setYear]       = useState<keyof typeof DATASETS>('2022')
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)

  const data = DATASETS[year]

  // ── React-centric: D3는 스케일 계산만 ──────────────────────
  const xScale = useMemo(
    () =>
      scaleBand<string>()
        .domain(data.map((d) => d.label))
        .range([0, IW])
        .padding(0.3),
    [data],
  )

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, (max(data, (d) => d.value) ?? 100) * 1.12])
        .nice()
        .range([IH, 0]),
    [data],
  )

  // ── Axes: D3 DOM (Blackbox) ────────────────────────────────
  useEffect(() => {
    if (!xAxisRef.current || !yAxisRef.current) return
    select(xAxisRef.current)
      .transition().duration(DUR)
      .call(axisBottom(xScale).tickSizeOuter(0))
    select(yAxisRef.current)
      .transition().duration(DUR)
      .call(axisLeft(yScale).ticks(5).tickSizeOuter(0))
  }, [xScale, yScale])

  // ── Bars: D3 data join + transitions (Blackbox) ────────────
  useEffect(() => {
    if (!barsRef.current) return
    const g = select(barsRef.current)

    g.selectAll<SVGRectElement, Datum>('rect')
      .data(data, (d) => d.label)  // key 함수로 레이블별 DOM 추적
      .join(
        // enter: 새 레이블 → rect 생성 후 바닥에서 올라오는 애니메이션
        (enter) =>
          enter
            .append('rect')
            .attr('fill', '#3b82f6')
            .attr('rx', 4)
            .attr('cursor', 'pointer')
            .attr('x', (d) => xScale(d.label) ?? 0)
            .attr('width', xScale.bandwidth())
            .attr('y', IH)
            .attr('height', 0)
            .on('mouseenter', (event, d) => {
              select(event.currentTarget as SVGRectElement)
                .transition().duration(120).attr('fill', '#2563eb')
              const e = event as MouseEvent
              setTooltip({ x: e.clientX, y: e.clientY, datum: d })
            })
            .on('mousemove', (event) => {
              const e = event as MouseEvent
              setTooltip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : null))
            })
            .on('mouseleave', (event) => {
              select(event.currentTarget as SVGRectElement)
                .transition().duration(120).attr('fill', '#3b82f6')
              setTooltip(null)
            })
            .call((sel) =>
              sel.transition().duration(DUR)
                .attr('y', (d) => yScale(d.value))
                .attr('height', (d) => IH - yScale(d.value)),
            ),

        // update: 값 변경 → 위치·높이 부드럽게 갱신
        (update) =>
          update.call((sel) =>
            sel.transition().duration(DUR)
              .attr('x', (d) => xScale(d.label) ?? 0)
              .attr('width', xScale.bandwidth())
              .attr('y', (d) => yScale(d.value))
              .attr('height', (d) => IH - yScale(d.value)),
          ),

        // exit: 사라진 레이블 → 바닥으로 내려간 뒤 제거
        (exit) =>
          exit.call((sel) =>
            sel.transition().duration(DUR / 2)
              .attr('y', IH).attr('height', 0).remove(),
          ),
      )

    return () => { g.selectAll('*').interrupt() }
  }, [data, xScale, yScale])

  return (
    <div className="space-y-4">
      {/* 연도 스위처 */}
      <div className="flex gap-2">
        {(Object.keys(DATASETS) as Array<keyof typeof DATASETS>).map((y) => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
              year === y
                ? 'bg-blue-500 text-white border-transparent'
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      <p className="text-xs text-zinc-400">Stack Overflow 개발자 설문 — 언어 사용률 (%)</p>

      {/* 차트 */}
      <div className="inline-block rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
        <svg width={W} height={H}>
          <g transform={`translate(${M.left},${M.top})`}>
            <g ref={xAxisRef} transform={`translate(0,${IH})`} />
            <g ref={yAxisRef} />
            <g ref={barsRef} />
          </g>
        </svg>
      </div>

      {/* 패턴 설명 */}
      <div className="max-w-lg rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
        <p>스케일 계산 — <span className="text-sky-400">React-centric</span> (useMemo, D3 계산만)</p>
        <p>막대 애니메이션 — <span className="text-amber-400">Blackbox</span> (D3 data join + transition)</p>
        <p>툴팁 — <span className="text-green-400">React Portal</span> (createPortal → document.body)</p>
      </div>

      {/* Portal Tooltip */}
      {tooltip &&
        createPortal(
          <div
            className="fixed z-50 pointer-events-none rounded-lg bg-zinc-900 text-white px-3 py-2 text-sm shadow-xl border border-zinc-700"
            style={{ left: tooltip.x + 14, top: tooltip.y - 52 }}
          >
            <p className="font-semibold">{tooltip.datum.label}</p>
            <p className="text-zinc-300 text-xs mt-0.5">{tooltip.datum.value}% 사용률</p>
          </div>,
          document.body,
        )}
    </div>
  )
}
