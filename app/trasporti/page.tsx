"use client";

import { useState } from "react";
import TransportSearch from "../../component/trasporti/TransportSearch";
import RouteResult from "../../component/trasporti/RouteResult";
import Loader from "../../component/trasporti/Loader";

export default function TrasportiPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(from: string, to: string) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `/api/route-search?from=${from}&to=${to}`
      );
      const data = await res.json();

      if (!data) setError("Nessuna corsa trovata.");
      else setResult(data);
    } catch {
      setError("Errore di connessione.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[var(--sfondo-chiaro)]">

      {/* HERO */}
      <div className="pt-16 pb-10 text-center px-6">
        <h1 className="text-4xl font-bold text-[var(--rosso-veneziano)]">
          Trasporti Veneziani
        </h1>
        <p className="text-gray-600 mt-3 max-w-md mx-auto">
          Muoviti tra calli e canali con semplicità.
        </p>
        <div className="mt-4 h-1 w-24 bg-[var(--oro-veneziano)] mx-auto rounded-full"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-lg mx-auto px-6 pb-16">
        <TransportSearch onSearch={handleSearch} />

        {loading && <Loader />}

        {error && (
          <div className="mt-6 text-center text-red-600">
            {error}
          </div>
        )}

        {result && <RouteResult data={result} />}
      </div>
    </div>
  );
}