import { getCityPage } from "@/lib/getCityPage"
import { Section } from "@/types/page"
import { notFound } from "next/navigation"

export default function CityPage({
  params,
}: {
  params: { city: string }
}) {
  let page

  try {
    page = getCityPage(params.city, "the-city")
  } catch {
    return notFound()
  }

  return (
    <main className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">{page.title}</h1>

      {page.sections.map((section: Section, i: number) => {
        if (section.type === "text") {
          return (
            <section key={i}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-2">{section.content}</p>
            </section>
          )
        }

        if (section.type === "list") {
          return (
            <section key={i}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <ul className="list-disc pl-6 mt-2">
                {section.items.map((item: string, j: number) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </section>
          )
        }
      })}
    </main>
  )
}