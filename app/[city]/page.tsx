import { getCityPage } from "@/lib/getCityPage"
import { Section, Page } from "@/types/page"
import { notFound } from "next/navigation"

export default async function CityPage({
  params,
}: {
  params: { city: string }
}) {
  const city = params.city // 👈 QUESTO è il fix

  let page

  try {
    page = getCityPage(city, "the-city")
  } catch {
    return notFound()
  }

  return (
    <main>
      <h1>{page.title}</h1>
    </main>
  )
}