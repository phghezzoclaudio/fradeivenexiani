"use client";

import { useState } from "react";
import SearchForm from "@/component/trasporti/SearchFoem/";
import ResultCard from "@/component/trasporti/ResultCard/";

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

      if (!data) {
        setError("Nessuna corsa trovata");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Errore di connessione");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Trasporti Vaporetto
        </h1>

        <SearchForm onSearch={handleSearch} />

        {loading && (
          <p className="text-center mt-6">Caricamento...</p>
        )}

        {error && (
          <p className="text-center mt-6 text-red-500">
            {error}
          </p>
        )}

        {result && <ResultCard data={result} />}
      </div>
    </div>
  );
}