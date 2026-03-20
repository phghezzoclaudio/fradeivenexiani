import { getCityPages } from "@/lib/getCityPages"
import CityCard from "@/components/CityCard"

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city } = await params

  let pages = []

  try {
    pages = getCityPages(city.toLowerCase())
  } catch {
    return <div className="p-8">Città non trovata</div>
  }

  return (
    <main className="max-w-5xl mx-auto p-8">

      {/* HERO */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold capitalize">
          {city}
        </h1>
        <p className="text-gray-600 mt-2">
          Scopri cosa vedere, la storia e i luoghi principali.
        </p>
      </section>

      {/* GRID */}
      <section className="grid md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <CityCard
            key={page.slug}
            city={city}
            slug={page.slug}
            title={page.title}
            excerpt={page.excerpt}
          />
        ))}
      </section>

    </main>
  )
}