"use client";

import { useState } from "react";
import RoutesSidebar from "./RoutesSidebar";
import RoutesMap from "./RoutesMap";

export default function RoutesLayout() {
  const [selectedRoute, setSelectedRoute] =
    useState<string | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <RoutesSidebar
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />
      <RoutesMap selectedRoute={selectedRoute} />
    </div>
  );
}