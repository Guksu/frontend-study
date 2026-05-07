'use client'

import dynamic from "next/dynamic";

const RealtimeLineChart = dynamic(() => import("./RealtimeLineChart"), { ssr: false });

export default function RealtimeLineChartLoader() {
  return <RealtimeLineChart />;
}
