import AcquaAltaInfo from "@/component/tides/AcquaAltaInfo";
import TideDashboard from "@/component/tides/TideDashboard";

export default function MareePage() {
  return (
    <main className="min-h-screen bg-venice-ivory">

      {/* ===== HERO HEADER ===== */}
      <section className="bg-venice-red text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          
          <p className="text-venice-gold uppercase tracking-[0.25em] text-xs mb-4">
            Venice Smart
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Maree Venezia Live
          </h1>

          <p className="text-white/90 max-w-2xl mx-auto">
            Controlla in tempo reale il livello della marea e resta aggiornato
            sull’acqua alta in laguna.
          </p>
        </div>
      </section>

      {/* ===== DASHBOARD ===== */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="
          bg-white
          rounded-2xl
          border border-venice-border
          shadow-sm
          p-6 md:p-10
        ">
          <TideDashboard />
          <AcquaAltaInfo />
        </div>
          
      </section>

    </main>
  );
}