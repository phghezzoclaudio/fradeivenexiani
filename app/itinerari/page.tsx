export const dynamic = "force-dynamic"

import CicloturismoList from "@/component/CicloturismoList"
import CicloturismoMapClient from "@/components/CicloturismoMapClient"

export default function Itinerari() {

  return (
    <main className="bg-venice-ivory text-venice-graphite">

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Itinerari Cicloturistici
          </h2>

          <CicloturismoMapClient />

          <div className="mt-12">
            <CicloturismoList />
          </div>

        </div>
      </section>

    </main>
  )
}