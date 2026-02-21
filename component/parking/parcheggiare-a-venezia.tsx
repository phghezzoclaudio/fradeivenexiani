"use client";

import { useState } from "react";

/* ===== TYPES ===== */

type AreaParcheggio = "Piazzale Roma" | "Tronchetto";

type Parcheggio = {
  nome: string;
  dettagli: string;
  percorso: string;
};

export default function ParcheggiareAVenezia() {
  const [from, setFrom] = useState<AreaParcheggio>("Piazzale Roma");

  const parcheggi: Record<AreaParcheggio, Parcheggio[]> = {
    "Piazzale Roma": [
      {
        nome: "Garage San Marco",
        dettagli:
          "900 posti auto, colonnine di ricarica elettrica, vicino alle fermate del vaporetto.",
        percorso:
          "🚶‍♂️ 5 min a piedi\n🛥 Vaporetto Linea 1 - 2\n⏱ Tempo stimato: 10 min",
      },
      {
        nome: "Autorimessa Comunale AVM S.P.A",
        dettagli:
          "Parcheggio più capiente di Piazzale Roma, vicino agli imbarchi di tutte le linee di navigazione.",
        percorso:
          "🚶‍♂️ 3 min a piedi\n🛥 Vaporetto Linea 1 - 2\n⏱ Tempo stimato: 12 min",
      },
    ],
    Tronchetto: [
      {
        nome: "Venezia Center Parking Garage",
        dettagli:
          "Parcheggio coperto sotterraneo, accesso diretto dal Ponte della Libertà.",
        percorso:
          "🚶‍♂️ 10 min a piedi\n🛥 Vaporetto Linea 2\n⏱ Tempo stimato: 20 min",
      },
      {
        nome: "Interparking – Venezia Tronchetto Parking",
        dettagli:
          "Parcheggio economico e comodo per visitare la città o partire in crociera.",
        percorso:
          "🚶‍♂️ 8 min a piedi\n🛥 Vaporetto Linea 2\n⏱ Tempo stimato: 18 min",
      },
    ],
  };

  return (
    <section className="w-full">
      <div className="bg-white border border-venice-border shadow-sm rounded-2xl p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-venice-graphite">
            Dove parcheggiare a Venezia
          </h2>
          <p className="text-venice-muted mt-2">
            Scegli l’area e scopri le soluzioni migliori.
          </p>
        </div>

        {/* Select */}
        <div className="max-w-sm mx-auto mb-8">
          <label className="block mb-2 font-semibold text-venice-graphite">
            Area parcheggio
          </label>

          <select
            className="
              w-full rounded-xl border border-venice-border
              bg-venice-ivory px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-venice-red
            "
            value={from}
            onChange={(e) => setFrom(e.target.value as AreaParcheggio)}
          >
            <option value="Piazzale Roma">Piazzale Roma</option>
            <option value="Tronchetto">Tronchetto</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {parcheggi[from].map((g, index) => (
            <div
              key={index}
              className="
                bg-venice-ivory
                border border-venice-border
                rounded-2xl p-5
                hover:shadow-md
                transition
              "
            >
              <h3 className="font-bold text-lg text-venice-graphite mb-2">
                {g.nome}
              </h3>

              <p className="text-sm text-venice-muted mb-4">
                {g.dettagli}
              </p>

              <div className="bg-white rounded-xl p-3 border-l-4 border-venice-red">
                <pre className="whitespace-pre-line text-sm text-venice-graphite font-sans">
                  {g.percorso}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}