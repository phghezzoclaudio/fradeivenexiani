"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import RoutesSidebar from "./RoutesSidebar";

/* la mappa viene caricata solo lato client */
const RoutesMap = dynamic(
  () => import("./RoutesMap"),
  { ssr: false }
);

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