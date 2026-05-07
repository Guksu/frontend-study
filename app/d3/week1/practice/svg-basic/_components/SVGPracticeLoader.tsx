'use client'
import dynamic from "next/dynamic";

const SVGPractice = dynamic(() => import("./SVGPractice"), { ssr: false });

export default function SVGPracticeLoader() {
  return <SVGPractice />;
}
