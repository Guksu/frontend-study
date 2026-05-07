'use client'

import dynamic from "next/dynamic";

const BrushDashboard = dynamic(() => import("./BrushDashboard"), { ssr: false });

export default function BrushDashboardLoader() {
  return <BrushDashboard />;
}
