import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

interface Props {
  onSearch: (from: string, to: string) => void;
}

export default function TransportSearch({ onSearch }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function swap() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-[var(--oro-veneziano)]/30">

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Da dove parti?"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[var(--azzurro-veneziano)] outline-none"
        />

        <div className="flex justify-center">
          <button
            onClick={swap}
            className="p-2 rounded-full bg-[var(--oro-veneziano)] text-white hover:opacity-90 transition"
          >
            <ArrowUpDown size={18} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Dove vuoi andare?"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-[var(--azzurro-veneziano)] outline-none"
        />

        <button
          onClick={() => onSearch(from, to)}
          className="w-full bg-[var(--rosso-veneziano)] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          Cerca percorso
        </button>
      </div>
    </div>
  );
}