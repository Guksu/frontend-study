"use client";

import { useState } from "react";

const PATH_EXAMPLES: Record<string, string> = {
  // M x y       : 펜을 올려 시작점 이동 (Move to)
  // L x y       : 현재점 → (x, y) 직선
  "M L  직선": "M 30 80 L 180 20 L 330 80",

  // M x y           : 시작점
  // Q cx cy x y     : 제어점(cx, cy) 1개로 곡선을 당겨 (x, y)까지 이차 베지어
  "Q  이차 베지어": "M 30 80 Q 180 10 330 80",

  // M x y                    : 시작점
  // C cx1 cy1 cx2 cy2 x y    : 제어점 2개(cx1,cy1 / cx2,cy2)로 S자 곡선을 만들어 (x,y)까지
  "C  삼차 베지어": "M 30 80 C 110 10 250 10 330 80",

  // M x y                          : 시작점
  // A rx ry x축회전 large-arc sweep x y
  //   rx=150 : x축 반지름
  //   ry=60  : y축 반지름
  //   0      : 타원 x축 회전각 (degree), 호를 그릴 때 기준이 되는 타원 자체를 기울이는 각도
  //   0      : large-arc-flag  (0=짧은 호, 1=긴 호)
  //   1      : sweep-flag      (0=반시계, 1=시계 방향)
  //   330 60 : 끝점
  "A  호": "M 30 80 A 150 60 0 0 1 330 80",
};

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <code className="text-sm font-mono font-semibold text-zinc-800 dark:text-zinc-200">
          {title}
        </code>
        <span className="text-xs text-zinc-400">{desc}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function SVGSandbox() {
  const [pathKey, setPathKey] = useState<string>("M L  직선");
  const [groupRotate, setGroupRotate] = useState(0);

  return (
    <div className="max-w-2xl space-y-6">
      {/* ── rect ─────────────────────────────────── */}
      <Card
        title="<rect>"
        desc="x · y · width · height · fill · stroke · rx · opacity"
      >
        <svg viewBox="0 0 560 104" className="w-full">
          <rect x="10" y="10" width="110" height="70" fill="#3b82f6" />
          <text x="65" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            fill
          </text>

          <rect
            x="150"
            y="10"
            width="110"
            height="70"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
          />
          <text x="205" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            stroke
          </text>

          <rect x="290" y="10" width="110" height="70" fill="#3b82f6" rx="14" />
          <text x="345" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            rx (rounded)
          </text>

          <rect
            x="430"
            y="10"
            width="110"
            height="70"
            fill="#3b82f6"
            opacity="0.25"
          />
          <text x="485" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            opacity
          </text>
        </svg>
      </Card>

      {/* ── circle · ellipse · line ───────────────── */}
      <Card
        title="<circle> · <ellipse> · <line>"
        desc="cx · cy · r · strokeDasharray"
      >
        <svg viewBox="0 0 520 104" className="w-full">
          {/* r = 반지름 */}
          <circle cx="60" cy="48" r="38" fill="#10b981" />
          <text x="60" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            circle
          </text>

          {/* rx = x축 반지름 */}
          {/* ry = y축 반지름 */}
          <ellipse
            cx="210"
            cy="48"
            rx="80"
            ry="34"
            fill="#f59e0b"
            opacity="0.85"
          />
          <text x="210" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            ellipse
          </text>

          <line
            x1="330"
            y1="14"
            x2="420"
            y2="82"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="375" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            line
          </text>

          <line
            x1="445"
            y1="14"
            x2="510"
            y2="82"
            stroke="#ec4899"
            strokeWidth="3"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
          <text x="477" y="99" textAnchor="middle" fontSize="11" fill="#9ca3af">
            dashed
          </text>
        </svg>
      </Card>

      {/* ── path ─────────────────────────────────── */}
      <Card
        title='<path d="…">'
        desc="M(moveto) · L(lineto) · Q(quadratic) · C(cubic) · A(arc)"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(PATH_EXAMPLES).map((k) => (
            <button
              key={k}
              onClick={() => setPathKey(k)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                pathKey === k
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <svg
          viewBox="0 0 360 100"
          className="w-full rounded-lg border border-zinc-100 dark:border-zinc-800"
        >
          <path
            d={PATH_EXAMPLES[pathKey]}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <code className="mt-2.5 block text-xs font-mono text-zinc-400 dark:text-zinc-500 break-all">
          d=&quot;{PATH_EXAMPLES[pathKey]}&quot;
        </code>
      </Card>

      {/* ── g transform ──────────────────────────── */}
      <Card
        title='<g transform="…">'
        desc="translate(x, y) · rotate(deg) · scale(n)"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm text-zinc-500 w-32 shrink-0">
            rotate: {groupRotate}°
          </span>
          <input
            type="range"
            min={0}
            max={360}
            value={groupRotate}
            onChange={(e) => setGroupRotate(Number(e.target.value))}
            className="flex-1"
          />
        </div>
        <svg viewBox="0 0 420 180" className="w-full">
          {/* 원본 */}
          <g transform="translate(70, 90)">
            <rect
              x="-45"
              y="-35"
              width="90"
              height="70"
              fill="#3b82f6"
              opacity="0.15"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text y="4" textAnchor="middle" fontSize="11" fill="#6b7280">
              원본
            </text>
          </g>

          {/* rotate */}
          <g transform="translate(200, 90)">
            <g transform={`rotate(${groupRotate})`}>
              <rect
                x="-45"
                y="-35"
                width="90"
                height="70"
                fill="#3b82f6"
                rx="4"
              />
              <text y="4" textAnchor="middle" fontSize="11" fill="white">
                rotate({groupRotate}°)
              </text>
            </g>
          </g>

          {/* scale */}
          <g transform="translate(350, 90)">
            <g transform="scale(0.65)">
              <rect
                x="-45"
                y="-35"
                width="90"
                height="70"
                fill="#3b82f6"
                opacity="0.65"
                rx="4"
              />
              <text y="4" textAnchor="middle" fontSize="11" fill="white">
                scale(0.65)
              </text>
            </g>
          </g>
        </svg>
      </Card>

      {/* ── text ─────────────────────────────────── */}
      <Card
        title="<text>"
        desc="x · y · textAnchor · dominantBaseline · fontSize"
      >
        <svg viewBox="0 0 520 160" className="w-full">
          {/* textAnchor */}
          <line
            x1="130"
            y1="0"
            x2="130"
            y2="135"
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          {/* 130이 텍스트의 왼쪽 끝 */}
          <text x="130" y="38" textAnchor="start" fontSize="13" fill="#374151">
            textAnchor=&quot;start&quot;
          </text>
          {/* 130이 텍스트 가운데 */}
          <text x="130" y="75" textAnchor="middle" fontSize="13" fill="#374151">
            textAnchor=&quot;middle&quot;
          </text>
          {/* 13이 텍스트트의 끝 */}
          <text x="130" y="112" textAnchor="end" fontSize="13" fill="#374151">
            textAnchor=&quot;end&quot;
          </text>
          <text x="10" y="150" fontSize="10" fill="#9ca3af">
            ↑ 기준점 x=130
          </text>

          {/* dominantBaseline */}
          <line
            x1="290"
            y1="80"
            x2="520"
            y2="80"
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <text
            x="305"
            y="80"
            dominantBaseline="auto"
            fontSize="13"
            fill="#6b7280"
          >
            auto
          </text>
          <text
            x="365"
            y="80"
            dominantBaseline="middle"
            fontSize="13"
            fill="#374151"
          >
            middle
          </text>
          <text
            x="430"
            y="80"
            dominantBaseline="hanging"
            fontSize="13"
            fill="#6b7280"
          >
            hanging
          </text>
          <text
            x="405"
            y="130"
            textAnchor="middle"
            fontSize="10"
            fill="#9ca3af"
          >
            ↑ 기준점 y=80
          </text>
        </svg>
      </Card>
    </div>
  );
}
