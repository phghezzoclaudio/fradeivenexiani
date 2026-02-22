import { useState } from "react";

interface Props {
  onSearch: (from: string, to: string) => void;
}

export default function SearchForm({ onSearch }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <input
        type="text"
        placeholder="Da dove parti?"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full border p-3 rounded-lg mb-3"
      />

      <input
        type="text"
        placeholder="Dove vuoi andare?"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
      />

      <button
        onClick={() => onSearch(from, to)}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Cerca percorso
      </button>
    </div>
  );
}