"use client";

import { Line } from "rc-progress";

export function RatingLine({
  percent,
  strokeWidth,
  strokeColor,
  trailColor,
}: {
  percent: number;
  strokeWidth: number;
  strokeColor: string;
  trailColor: string;
}) {
  return (
    <Line
      percent={percent}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      trailColor={trailColor}
    />
  );
}
