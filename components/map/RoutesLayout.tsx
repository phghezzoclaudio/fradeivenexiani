"use client";

import { useState } from "react";
import RoutesSidebar from "./RoutesSidebar";
import RoutesMap from "./RoutesMap";

export default function RoutesLayout() {

  const [selectedRoute, setSelectedRoute] =
    useState<string | null>(null);

  const [selectedTerminal, setSelectedTerminal] =
    useState<string | null>(null);

  return (

    <div
      style={{
        display: "flex",
        height: "calc(100vh - 70px)",
        marginTop: 70
      }}
    >

      <RoutesSidebar
        selectedRoute={selectedRoute}
        selectedTerminal={selectedTerminal}
        onSelectRoute={setSelectedRoute}
        onSelectTerminal={setSelectedTerminal}
      />

      <RoutesMap
        selectedRoute={selectedRoute}
        selectedTerminal={selectedTerminal}
      />

    </div>

  );

}