import { useState, useEffect, useMemo } from "react";
import { scaleLinear, scaleTime } from "d3-scale";
import { line, area, curveCatmullRom } from "d3-shape";

export type Point = { time: number; value: number };

const MAX_POINTS = 30;
const TICK_MS = 500;

export const CHART = {
  W: 640,
  H: 300,
  M: { top: 20, right: 24, bottom: 36, left: 46 },
} as const;

export const IW = CHART.W - CHART.M.left - CHART.M.right;
export const IH = CHART.H - CHART.M.top - CHART.M.bottom;

function makePoint(): Point {
  return { time: Date.now(), value: +(Math.random() * 80 + 10).toFixed(1) };
}

export function useLineChart() {
  const [data, setData] = useState<Point[]>(() => {
    const now = Date.now();
    return Array.from({ length: MAX_POINTS }, (_, i) => ({
      time: now - (MAX_POINTS - 1 - i) * TICK_MS,
      value: +(Math.random() * 80 + 10).toFixed(1),
    }));
  });

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => [...prev.slice(-(MAX_POINTS - 1)), makePoint()]);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain([data[0].time, data[data.length - 1].time])
        .range([0, IW]),
    [data],
  );

  // Fixed y domain — no need to recompute on every tick
  const yScale = useMemo(
    () => scaleLinear().domain([0, 100]).nice().range([IH, 0]),
    [],
  );

  const linePath = useMemo(() => {
    const gen = line<Point>()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
      .curve(curveCatmullRom.alpha(0.5));
    return gen(data) ?? "";
  }, [data, xScale, yScale]);

  const areaPath = useMemo(() => {
    const gen = area<Point>()
      .x((d) => xScale(d.time))
      .y0(IH)
      .y1((d) => yScale(d.value))
      .curve(curveCatmullRom.alpha(0.5));
    return gen(data) ?? "";
  }, [data, xScale, yScale]);

  const latest = data[data.length - 1];
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = +(values.reduce((s, v) => s + v, 0) / values.length).toFixed(1);

  return { data, linePath, areaPath, xScale, yScale, latest, min, max, avg };
}
