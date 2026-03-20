import { getCityPage } from "@/lib/getCityPage"
import { Page } from "@/types/page"
import RenderBlock from "@/components/RenderBlock"
import { notFound } from "next/navigation"

export default async function PageComponent({
  params,
}: {
  params: Promise<{ city: string; slug: string }>
}) {
  const { city, slug } = await params

  let page: Page

  try {
    page = getCityPage(city.toLowerCase(), slug)
  } catch {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-venice-ivory">

    <div className="min-h-screen bg-venice-ivory">

      {/* ===== HERO HEADER ===== */}

      <section className="bg-venice-red text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold">
            {page.title}
          </h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}

      <section className="max-w-6xl mx-auto px-6 py-12">

        {page.excerpt && (
          <p className="text-gray-600 text-lg">
            {page.excerpt}
          </p>
        )}

        <div className="mt-8 space-y-6">
          {page.content.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </div>

      </section>

    </div>
    </main>
    
  )
}