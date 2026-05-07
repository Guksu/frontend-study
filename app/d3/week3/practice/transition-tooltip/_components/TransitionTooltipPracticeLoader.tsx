'use client'
import dynamic from "next/dynamic";

const TransitionTooltipPractice = dynamic(() => import("./TransitionTooltipPractice"), { ssr: false });

export default function TransitionTooltipPracticeLoader() {
  return <TransitionTooltipPractice />;
}
