'use client'

import dynamic from "next/dynamic";

const PatternCompareView = dynamic(() => import("./PatternCompareView"), { ssr: false });

export default function PatternCompareLoader() {
  return <PatternCompareView />;
}
