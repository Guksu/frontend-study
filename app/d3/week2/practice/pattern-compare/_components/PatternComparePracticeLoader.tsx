'use client'
import dynamic from "next/dynamic";

const PatternComparePractice = dynamic(() => import("./PatternComparePractice"), { ssr: false });

export default function PatternComparePracticeLoader() {
  return <PatternComparePractice />;
}
