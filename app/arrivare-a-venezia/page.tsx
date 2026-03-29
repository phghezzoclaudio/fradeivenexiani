"use client";

import ParcheggiareAVenezia from "@/component/parking/parcheggiare-a-venezia";
import Link from "next/link";

export default function ArrivareAVenezia() {
  return (
    <main className="bg-venice-ivory text-venice-graphite">
      
      {/* Hero */}
      <section className="bg-venice-red text-white text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Arrivare a Venezia
          </h1>
          <p className="text-lg md:text-xl">
            Le migliori opzioni di trasporto per raggiungere la città lagunare, con
            consigli pratici per viaggiare senza stress.
          </p>
        </div>
      </section>

      {/* Treni */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-bold text-venice-graphite">
          🚆 In treno
        </h2>

        <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6">
          <p className="leading-relaxed text-gray-700">
            La stazione principale è <strong>Venezia Santa Lucia</strong>, situata
            nel centro storico. Arrivando in treno, sarai già immerso nella
            città, con collegamenti frequenti dalle principali città italiane.
          </p>

          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Alta velocità da Milano, Bologna, Firenze e Roma</li>
            <li>Collegamenti regionali da Veneto e Friuli</li>
            <li>Ottimo per viaggi sostenibili</li>
          </ul>
        </div>
      </section>

      {/* Auto */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-bold text-venice-graphite">
          🚗 In auto
        </h2>

        <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6">
          <p className="leading-relaxed text-gray-700">
            Non è possibile guidare nel centro storico di Venezia. Lascia
            l’auto o nella vicina Mestre la terraferma Veneziana , nei parcheggi ufficiali a Venezia che sono situati a:
          </p>
             <ParcheggiareAVenezia />
          <p className="mt-4 leading-relaxed text-gray-700">
            Da qui puoi proseguire con <strong>vaporetto</strong>, taxi acqueo o a
            piedi.
          </p>
        </div>
      </section>

      {/* Aereo */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-bold text-venice-graphite">
          ✈️ In aereo
        </h2>

        <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6">
          <p className="leading-relaxed text-gray-700">
            L’aeroporto più vicino è <strong>Venezia Marco Polo (VCE)</strong>, con
            voli nazionali e internazionali.
          </p>

          <p className="mt-4 leading-relaxed text-gray-700">
            Collegamenti:
            <p className="list-disc list-inside mt-2 text-gray-700">
              <li>Bus navetta da/per Piazzale Roma</li>
              <li>Water taxi diretto</li>
              <li>Transfer privati</li>
            </p>
          </p>
        </div>
      </section>

      {/* Autobus */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-bold text-venice-graphite">
          🚌 In autobus
        </h2>

        <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6">
          <p className="leading-relaxed text-gray-700">
            Le principali compagnie di autobus collegano Venezia con tutta Italia
            e l’Europa. Le fermate principali si trovano a Piazzale Roma e Mestre.
          </p>
        </div>
      </section>

      {/* Collegamenti barche */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <h2 className="text-3xl font-bold text-venice-graphite">
          🚤 Collegamenti via acqua
        </h2>

        <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6">
          <p className="leading-relaxed text-gray-700">
            È possibile raggiungere Venezia via laguna con servizi di
            transfer/acqueo privati o taxi acquatico da aree limitrofe.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-venice-gold py-12 px-6 text-venice-red text-center rounded-xl mx-6 my-10">
        <h3 className="text-2xl font-bold">Pronto per partire?</h3>
        <p className="mt-2 mb-4">
          Scopri i nostri itinerari per vivere Venezia come un locale.
        </p>
        <Link
          href="/itinerari"
          className="inline-block px-6 py-3 rounded-full bg-white text-venice-red font-semibold hover:bg-venice-ivory transition"
        >
          Esplora gli itinerari
        </Link>
      </section>

    </main>
  );
}