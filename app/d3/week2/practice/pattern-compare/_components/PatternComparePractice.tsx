'use client'
// Blackbox 패턴 힌트:
//   useRef로 <svg> 참조 → useEffect에서 D3가 DOM을 직접 조작
//   select(svgRef.current) → .selectAll('rect').data(data).join(...)
//   transition: .transition().duration(600).attr('height', ...)
//
// React-centric 패턴 힌트:
//   useMemo로 scale 계산 (scaleBand, scaleLinear)
//   JSX에서 data.map(d => <rect key={d.label} ... />) 로 렌더링
//   useRef + D3 axis 함수로 축만 D3에 위임: select(axisRef.current).call(axisBottom(xScale))

export default function PatternComparePractice() {
  return (
    <div className="p-8 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 text-sm text-center">
      여기에 직접 구현해보세요
    </div>
  );
}
