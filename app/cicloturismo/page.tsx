export const dynamic = "force-dynamic"

import CicloturismoMapClient from "@/components/CicloturismoMapClient"

export default function Page() {

 return (

  <main className="max-w-6xl mx-auto px-6 py-12">

   <h1 className="text-4xl font-bold mb-8 text-center">
    Cicloturismo Venezia
   </h1>

   <CicloturismoMapClient />

  </main>

 )

}