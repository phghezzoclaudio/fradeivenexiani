"use client";

import { useEffect, useState } from "react";

interface Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
}

interface Props {

  onChange: (stopId: string) => void;

  placeholder?: string;

}

export default function StopsAutocomplete({
  onChange,
  placeholder = "Cerca fermata"
}: Props) {

  const [stops, setStops] = useState<Stop[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Stop[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    fetch("/api/stops")
      .then(res => res.json())
      .then(data => {

        console.log("Stops loaded:", data.length);

        setStops(data);

      });

  }, []);

  useEffect(() => {

    if (!query) {

      setResults([]);

      return;

    }

    const q = query.toLowerCase();

    const filtered = stops
      .filter(s =>
        s.stop_name &&
        s.stop_name.toLowerCase().includes(q)
      )
      .slice(0, 6);

    setResults(filtered);

  }, [query, stops]);

  function selectStop(stop: Stop) {

    setQuery(stop.stop_name);

    setOpen(false);

    onChange(stop.stop_id);

  }

  return (

    <div className="relative w-full max-w-md">

      <input
        value={query}
        onChange={(e) => {

          setQuery(e.target.value);

          setOpen(true);

        }}
        placeholder={placeholder}
        className="w-full border px-3 py-2 rounded"
      />

      {open && results.length > 0 && (

        <div className="absolute z-50 bg-white border w-full mt-1 rounded shadow">

          {results.map(stop => (

            <div
              key={stop.stop_id}
              onClick={() => selectStop(stop)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {stop.stop_name}
            </div>

          ))}

        </div>

      )}

    </div>

  );

}