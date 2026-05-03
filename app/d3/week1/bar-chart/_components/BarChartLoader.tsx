'use client'

import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./BarChart"), { ssr: false });

export default function BarChartLoader() {
  return <BarChart />;
}
