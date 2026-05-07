"use client";
// 힌트: SVG 요소를 JSX로 직접 작성하세요
// <svg>, <rect>, <circle>, <line>, <path>, <g>, <text> 태그를 사용합니다
// viewBox="0 0 400 300" 로 좌표계를 고정하면 편리합니다
// <g transform="translate(x,y) rotate(deg)"> 로 그룹 변환을 적용할 수 있습니다
// path d 속성: M(이동) L(직선) Q(2차 베지어) C(3차 베지어) A(호) Z(닫기)

export default function SVGPractice() {
  return (
    <div className="p-8 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 text-sm text-center">
      <svg viewBox="0 0 600 100" className="w-full">
        <rect x={10} y={10} width={100} height={100} fill="red" />
      </svg>

      <svg viewBox="0 0 600 100" className="w-full">
        <circle cx={60} cy={60} r={40} fill="red" />
        <ellipse
          cx="210"
          cy="48"
          rx="80"
          ry="34"
          fill="#f59e0b"
          opacity="0.35"
        />
        <line
          x1={10}
          x2={20}
          y1={10}
          y2={20}
          stroke="#8b5cf6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
