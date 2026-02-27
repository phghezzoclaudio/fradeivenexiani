"use client";

import { useState } from "react";

interface Stop {
  stop_id: string;
  stop_name: string;
}

export default function Trasporti() {

  const [fromInput, setFromInput] =
    useState("");

  const [toInput, setToInput] =
    useState("");

  const [fromStop, setFromStop] =
    useState<Stop | null>(null);

  const [toStop, setToStop] =
    useState<Stop | null>(null);

  const [fromResults, setFromResults] =
    useState<Stop[]>([]);

  const [toResults, setToResults] =
    useState<Stop[]>([]);

  const [route, setRoute] =
    useState<any>(null);

  async function searchStops(
    value: string,
    setter: Function
  ) {

    const res =
      await fetch(
        `/api/stops/search?q=${value}`
      );

    const data =
      await res.json();

    setter(data);

  }

  async function searchRoute() {

    if (!fromStop || !toStop)
      return;

    const res =
      await fetch(
        `/api/route-search?from=${fromStop.stop_name}&to=${toStop.stop_name}`
      );

    const data =
      await res.json();

    setRoute(data);

  }

  return (

    <main className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Trasporti Venezia
      </h1>

      {/* FROM */}
      <input
        value={fromInput}
        onChange={e => {

          setFromInput(e.target.value);

          searchStops(
            e.target.value,
            setFromResults
          );

        }}
        placeholder="Partenza"
        className="w-full border p-3 rounded mb-2"
      />

      {fromResults.map(stop => (

        <div
          key={stop.stop_id}
          onClick={() => {

            setFromStop(stop);

            setFromInput(stop.stop_name);

            setFromResults([]);

          }}
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {stop.stop_name}
        </div>

      ))}

      {/* TO */}
      <input
        value={toInput}
        onChange={e => {

          setToInput(e.target.value);

          searchStops(
            e.target.value,
            setToResults
          );

        }}
        placeholder="Arrivo"
        className="w-full border p-3 rounded mt-4 mb-2"
      />

      {toResults.map(stop => (

        <div
          key={stop.stop_id}
          onClick={() => {

            setToStop(stop);

            setToInput(stop.stop_name);

            setToResults([]);

          }}
          className="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {stop.stop_name}
        </div>

      ))}

      <button
        onClick={searchRoute}
        className="bg-venice-red text-white px-6 py-3 rounded mt-4"
      >
        Cerca
      </button>

      {route && (

        <div className="mt-6 border p-4 rounded">

          <h2 className="font-bold text-lg">
            Linea {route.routeName}
          </h2>

          <p>
            Partenza:
            {" "}
            {route.fromStop}
          </p>

          <p>
            Arrivo:
            {" "}
            {route.toStop}
          </p>

          <p>
            Parte:
            {" "}
            {route.departure}
          </p>

          <p>
            Arriva:
            {" "}
            {route.arrival}
          </p>

        </div>

      )}

    </main>

  );

}