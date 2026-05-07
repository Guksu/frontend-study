'use client'

import dynamic from "next/dynamic";

const TransitionTooltipChart = dynamic(
  () => import("./TransitionTooltipChart"),
  { ssr: false },
);

export default function TransitionTooltipLoader() {
  return <TransitionTooltipChart />;
}
