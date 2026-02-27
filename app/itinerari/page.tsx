"use client";

import VaporettoMapClient from "@/component/map/VaporettoMapClient";

export default function TestMappa() {
  const fakePath = [
    { lat: 45.4371, lon: 12.3326 },
    { lat: 45.4385, lon: 12.3350 }
  ];

  return (
    <div className="p-10">
      <VaporettoMapClient path={fakePath} />
    </div>
  );
}