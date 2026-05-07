'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { select } from 'd3-selection'
import { scaleTime, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { brushX } from 'd3-brush'
import type { BrushBehavior } from 'd3-brush'
import { line, area, curveCatmullRom } from 'd3-shape'
import { extent, max } from 'd3-array'
import 'd3-transition'

type Datum = { date: Date; value: number }

// 결정론적 시계열 90일 데이터 (2024-01-01 ~ 2024-03-31)
function generateData(): Datum[] {
  const base = new Date(2024, 0, 1)
  return Array.from({ length: 90 }, (_, i) => {
    const seed = Math.sin(i) * 10000
    const rand = seed - Math.floor(seed)
    return {
      date: new Date(base.getTime() + i * 86_400_000),
      value: Math.round(
        50 + Math.sin(i * 0.15) * 22 + Math.sin(i * 0.05) * 10 + (rand - 0.5) * 8,
      ),
    }
  })
}

const FULL_DATA = generateData()
const DATE_EXTENT = extent(FULL_DATA, (d) => d.date) as [Date, Date]
const INITIAL_SELECTION: [Date, Date] = [FULL_DATA[60].date, FULL_DATA[89].date]

// ── 레이아웃 상수 ──────────────────────────────────────────────
const W  = 580
const MO = { top: 8,  right: 16, bottom: 20, left: 46 }  // overview margin
const MD = { top: 16, right: 16, bottom: 32, left: 46 }  // detail margin
const HO = 80  // overview total height
const HD = 260 // detail total height
const IW = W  - MO.left - MO.right
const IHO = HO - MO.top  - MO.bottom
const IHD = HD - MD.top  - MD.bottom

export default function BrushDashboard() {
  const brushGroupRef    = useRef<SVGGElement>(null)
  const brushBehaviorRef = useRef<BrushBehavior<unknown> | null>(null)
  const detailXAxisRef   = useRef<SVGGElement>(null)
  const detailYAxisRef   = useRef<SVGGElement>(null)

  const [selection, setSelection] = useState<[Date, Date]>(INITIAL_SELECTION)

  // ── Overview 스케일 (고정) ─────────────────────────────────
  const overviewX = useMemo(
    () => scaleTime().domain(DATE_EXTENT).range([0, IW]),
    [],
  )
  const overviewY = useMemo(
    () =>
      scaleLinear()
        .domain([0, (max(FULL_DATA, (d) => d.value) ?? 100) * 1.1])
        .range([IHO, 0]),
    [],
  )

  // ── Detail 스케일 (선택 구간에 따라 변동) ─────────────────
  const detailX = useMemo(
    () => scaleTime().domain(selection).range([0, IW]),
    [selection],
  )
  const detailY = useMemo(
    () =>
      scaleLinear()
        .domain([0, (max(FULL_DATA, (d) => d.value) ?? 100) * 1.1])
        .nice()
        .range([IHD, 0]),
    [],
  )

  // ── 선택 구간 데이터 필터 ──────────────────────────────────
  const detailData = useMemo(
    () => FULL_DATA.filter((d) => d.date >= selection[0] && d.date <= selection[1]),
    [selection],
  )

  // ── React-centric: D3 path 생성기로 JSX용 d 속성만 계산 ───
  const overviewLinePath = useMemo(() => {
    const gen = line<Datum>()
      .x((d) => overviewX(d.date))
      .y((d) => overviewY(d.value))
      .curve(curveCatmullRom)
    return gen(FULL_DATA) ?? ''
  }, [overviewX, overviewY])

  const detailAreaPath = useMemo(() => {
    const gen = area<Datum>()
      .x((d) => detailX(d.date))
      .y0(IHD)
      .y1((d) => detailY(d.value))
      .curve(curveCatmullRom)
    return gen(detailData) ?? ''
  }, [detailData, detailX, detailY])

  const detailLinePath = useMemo(() => {
    const gen = line<Datum>()
      .x((d) => detailX(d.date))
      .y((d) => detailY(d.value))
      .curve(curveCatmullRom)
    return gen(detailData) ?? ''
  }, [detailData, detailX, detailY])

  // ── D3 Brush 초기화 (Blackbox — brush는 DOM 직접 조작 필요) ─
  useEffect(() => {
    if (!brushGroupRef.current) return

    const brush = brushX<unknown>()
      .extent([[0, 0], [IW, IHO]])
      .on('brush end', (event) => {
        const sel = event.selection as [number, number] | null
        if (!sel) return
        setSelection([overviewX.invert(sel[0]), overviewX.invert(sel[1])])
      })

    brushBehaviorRef.current = brush

    const g = select(brushGroupRef.current)
    g.call(brush)

    // 초기 선택 구간 설정 (마지막 30일)
    g.call(brush.move, [
      overviewX(INITIAL_SELECTION[0]),
      overviewX(INITIAL_SELECTION[1]),
    ])

    return () => { g.on('.brush', null) }
  }, [overviewX])

  // ── Detail 축 업데이트 ─────────────────────────────────────
  useEffect(() => {
    if (!detailXAxisRef.current || !detailYAxisRef.current) return

    select(detailXAxisRef.current)
      .transition().duration(300)
      .call(
        axisBottom(detailX)
          .ticks(5)
          .tickSizeOuter(0)
          .tickFormat((d) =>
            (d as Date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
          ),
      )

    select(detailYAxisRef.current)
      .call(axisLeft(detailY).ticks(5).tickSizeOuter(0))
  }, [detailX, detailY])

  // 전체 보기 리셋
  const handleReset = useCallback(() => {
    if (!brushGroupRef.current || !brushBehaviorRef.current) return
    select(brushGroupRef.current).call(
      brushBehaviorRef.current.move,
      [overviewX(DATE_EXTENT[0]), overviewX(DATE_EXTENT[1])],
    )
  }, [overviewX])

  const dayCount = Math.round(
    (selection[1].getTime() - selection[0].getTime()) / 86_400_000,
  )

  return (
    <div className="space-y-2 max-w-2xl">
      {/* ── Overview (미니맵) ──────────────────────────────── */}
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-1">
        <p className="text-xs text-zinc-400 mb-1 font-medium">전체 기간 (90일) — 드래그로 구간 선택</p>
        <svg width={W} height={HO}>
          <defs>
            {/* brush selection 스타일 오버라이드 */}
            <style>{`
              .brush-overview .selection {
                fill: #3b82f6;
                fill-opacity: 0.18;
                stroke: #3b82f6;
                stroke-width: 1px;
              }
              .brush-overview .handle {
                fill: #3b82f6;
                fill-opacity: 0.6;
              }
            `}</style>
          </defs>
          <g transform={`translate(${MO.left},${MO.top})`}>
            {/* React-centric: path는 JSX로 직접 렌더링 */}
            <path d={overviewLinePath} fill="none" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Blackbox: brush는 D3가 DOM 직접 조작 */}
            <g ref={brushGroupRef} className="brush-overview" />
          </g>
        </svg>
      </div>

      {/* ── 구간 정보 + 리셋 버튼 ─────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-zinc-500">
          {selection[0].toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
          {' — '}
          {selection[1].toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
          <span className="ml-2 text-zinc-400">({dayCount}일)</span>
        </p>
        <button
          onClick={handleReset}
          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors underline-offset-2 hover:underline"
        >
          전체 보기
        </button>
      </div>

      {/* ── Detail 차트 ───────────────────────────────────────── */}
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 pt-3 pb-2">
        <p className="text-xs text-zinc-400 mb-1 font-medium">상세 보기</p>
        <svg width={W} height={HD}>
          <g transform={`translate(${MD.left},${MD.top})`}>
            {/* React-centric: area + line path를 JSX로 렌더링 */}
            <path d={detailAreaPath} fill="#3b82f6" fillOpacity={0.08} />
            <path d={detailLinePath} fill="none" stroke="#3b82f6" strokeWidth="2" />
            {/* Blackbox: 축은 D3가 DOM 조작 */}
            <g ref={detailXAxisRef} transform={`translate(0,${IHD})`} />
            <g ref={detailYAxisRef} />
          </g>
        </svg>
      </div>

      {/* 패턴 설명 */}
      <div className="rounded-lg border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-mono">
        <p>path 계산 — <span className="text-sky-400">React-centric</span> (D3 generator → JSX path d=)</p>
        <p>Brush — <span className="text-amber-400">Blackbox</span> (D3가 SVG 직접 조작, 결과만 React state로)</p>
        <p>Axes — <span className="text-amber-400">Blackbox</span> (D3 axisBottom/axisLeft)</p>
      </div>
    </div>
  )
}
