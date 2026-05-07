'use client'
import dynamic from "next/dynamic";

const BarChartPractice = dynamic(() => import("./BarChartPractice"), { ssr: false });

export default function BarChartPracticeLoader() {
  return <BarChartPractice />;
}
