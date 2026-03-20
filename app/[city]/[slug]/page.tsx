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
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold">{page.title}</h1>

      {page.excerpt && (
        <p className="text-gray-600 mt-2">{page.excerpt}</p>
      )}

      <div className="mt-6">
        {page.content.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}
      </div>
    </main>
  )
}