import Image from "next/image";


export default function AcquaAltaInfo() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      
      {/* ===== INFO CARD ===== */}
      <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6 md:p-10">
        
        <h2 className="text-2xl md:text-3xl font-bold text-venice-graphite mb-6">
          Piano di Viabilità Pedonale
        </h2>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Dal <strong className="text-venice-red">15 settembre</strong> al{" "}
            <strong className="text-venice-red">30 aprile</strong>, 
            l’Amministrazione Comunale, sulla base delle previsioni del Centro
            Maree, attiva il <strong>Piano di Viabilità Pedonale</strong> mediante
            l’installazione di passerelle.
          </p>

          <p>
            La gestione e la posa delle strutture sono affidate alla società{" "}
            <strong>VERITAS S.p.A.</strong> Durante questo periodo è più
            probabile il verificarsi del fenomeno dell’<strong>acqua alta</strong>.
          </p>

          <p>
            I percorsi indicati nella mappa consentono la viabilità a{" "}
            <strong>“piedi asciutti”</strong> fino a una quota di marea pari a{" "}
            <strong className="text-venice-red">+120 cm</strong>. Oltre tale
            livello alcuni tratti potrebbero risultare temporaneamente
            inagibili.
          </p>
        </div>
      </div>

      {/* ===== LEVEL BADGES ===== */}
      <div className="grid sm:grid-cols-3 gap-4">
        
        <div className="bg-white rounded-2xl border border-venice-border p-6 text-center">
          <div className="text-sm text-venice-muted mb-2">Marea sostenuta</div>
          <div className="text-2xl font-bold text-green-600">80 cm</div>
        </div>

        <div className="bg-white rounded-2xl border border-venice-border p-6 text-center">
          <div className="text-sm text-venice-muted mb-2">Passerelle attive</div>
          <div className="text-2xl font-bold text-amber-600">100–120 cm</div>
        </div>

        <div className="bg-white rounded-2xl border border-venice-border p-6 text-center">
          <div className="text-sm text-venice-muted mb-2">Possibili criticità</div>
          <div className="text-2xl font-bold text-red-600"> 120 cm</div>
        </div>

      </div>

      {/* ===== MAP ===== */}
      <div className="bg-white rounded-2xl border border-venice-border shadow-sm p-6 md:p-10">
        
        <h3 className="text-xl font-semibold text-venice-graphite mb-4">
          🗺️ Mappa passerelle città di Venezia
        </h3>

        <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden">
          <Image
           src="/images/maree/Mappa_passerelle.png"
            alt="Mappa percorsi passerelle a Venezia"
            fill
            className="object-contain"
            />
        </div>

        <p className="text-sm text-venice-muted mt-4">
          I percorsi garantiscono la viabilità pedonale fino a +120 cm di marea.
        </p>
      </div>

      {/* ===== ENGLISH ===== */}
      <div className="bg-venice-ivory rounded-2xl border border-venice-border p-6 md:p-10">
        
        <h3 className="text-xl font-semibold text-venice-graphite mb-4">
          Pedestrian Mobility Plan
        </h3>

        <p className="text-gray-600 leading-relaxed">
          From <strong>September 15th</strong> to <strong>April 30th</strong>,
          the local administration activates the Pedestrian Mobility Plan based
          on tide forecasts. Raised walkways, managed by{" "}
          <strong>VERITAS S.p.A.</strong>, allow pedestrians to remain dry up to
          a tide level of <strong className="text-venice-red">+120 cm</strong>.
          Above this level, some routes may become temporarily impracticable.
        </p>
      </div>

    </section>
  );
}