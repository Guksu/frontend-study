'use client'
import dynamic from "next/dynamic";

const RealtimeChartPractice = dynamic(() => import("./RealtimeChartPractice"), { ssr: false });

export default function RealtimeChartPracticeLoader() {
  return <RealtimeChartPractice />;
}
