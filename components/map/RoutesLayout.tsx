"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import RoutesSidebar from "./RoutesSidebar";

const RoutesMap = dynamic(
  () => import("./RoutesMap"),
  { ssr: false }
);

export default function RoutesLayout() {

  const [selectedRoute, setSelectedRoute] =
    useState<string | null>(null);

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)"
      }}
    >
      <RoutesSidebar
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />

      <RoutesMap selectedRoute={selectedRoute} />
    </div>
  );
}