'use client'
import dynamic from "next/dynamic";

const BrushDashboardPractice = dynamic(() => import("./BrushDashboardPractice"), { ssr: false });

export default function BrushDashboardPracticeLoader() {
  return <BrushDashboardPractice />;
}
