import dynamic from "next/dynamic"
import CicloturismoList from "@/component/CicloturismoList"

const CicloturismoMapClient = dynamic(
  () => import("@/components/CicloturismoMapClient"),
  { ssr: false }
)

export default function Itinerari() {

  return (
    <main className="bg-venice-ivory text-venice-graphite">

      {/* HERO */}
      <section className="relative overflow-hidden bg-venice-red">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">

          <p className="text-venice-gold uppercase tracking-[0.25em] text-xs mb-6">
            Itinerari
          </p>

          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Scopriamo Venezia e le sue due anime: laguna e terraferma
          </h1>

        </div>
      </section>

      {/* CONTENUTO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Itinerari Cicloturistici
          </h2>

          {/* MAPPA */}
          <CicloturismoMapClient />

          {/* LISTA */}
          <div className="mt-12">
            <CicloturismoList />
          </div>

        </div>
      </section>

    </main>
  )
}